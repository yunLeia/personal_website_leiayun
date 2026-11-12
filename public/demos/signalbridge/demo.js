/* SignalBridge concept prototype. Synthetic data; "AI" steps are rule-based and run locally. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const view = $('#view');
  const drawer = $('#drawer');
  const scrim = $('#scrim');
  const sw = $('#switch');
  const nudge = $('#nudge');

  // ---------- Synthetic data ----------
  const SUGGESTED = 'Tariff plus a weaker peso squeezes US manufacturers that buy from Mexico. Expect hedging demand on MXN payables in the next 4–6 weeks.';
  const DEFAULT_W = { r: 45, u: 35, e: 20 };

  // The specialist's judgment: what this market move affects.
  const IMPACTS = {
    payables: { label: 'MXN payables', sub: 'Costs rise', kw: ['payable', 'cost', 'buy', 'import', 'supplier', 'squeez', 'expens', 'pay for'] },
    supply: { label: 'Mexico supply chain', sub: 'Plans at risk', kw: ['supply', 'manufactur', 'auto', 'factory', 'plant', 'nearshor', 'monterrey', 'production', 'parts'] },
    receivables: { label: 'Peso receivables', sub: 'Income falls', kw: ['receivable', 'revenue', 'logistic', 'freight', 'export', 'paid in', 'collect', 'income', 'sell to mexico'] },
    volatility: { label: 'Peso volatility', sub: 'Hedging need', kw: ['vol', 'hedg', 'swing', 'risk', 'uncertain', 'protect', 'option'] },
  };

  const MARKET_EV = { tag: '', label: 'Market data', src: 'MXN −4.1% · 1M vol 16.8%' };
  const NEWS_EV = { tag: '', label: 'News', src: 'Tariff announcement · Nov 11' };

  const RMS = {
    SK: { name: 'Sarah', first: 'Sarah', team: 'Mid-market Industrials', others: [['Brightline Tools', 'Machinery', 'Oct 22'], ['Keystone Plastics', 'Packaging', 'Nov 3'], ['Northfield Metals', 'Steel', 'Oct 8']] },
    DO: { name: 'David', first: 'David', team: 'Transport & Logistics', others: [['Gulfway Shipping', 'Ports', 'Oct 30'], ['Plainsman Trucking', 'Trucking', 'Nov 5'], ['Delta Cold Chain', 'Storage', 'Oct 12']] },
    MC: { name: 'Maya', first: 'Maya', team: 'Consumer & Food', others: [['Harvest Table Co.', 'Grocery', 'Oct 19'], ['Pacific Snacks', 'Packaged food', 'Nov 2'], ['Sierra Beverages', 'Beverages', 'Oct 27']] },
  };

  const CLIENTS = [
    {
      id: 'A', name: 'Atlas Components', sector: 'Auto parts · Ohio', industry: 'Auto parts', last: 'Sep 30', contact: 'CFO',
      biz: 'MXN forward hedge', bizSub: '~$40M Mexico payables', ev: 'doc', rm: 'SK', imp: ['payables', 'supply'], f: { r: 94, u: 86, e: 78 },
      evid: [{ tag: 'doc', label: 'CRM note', src: 'Meeting note · Sep 30', quote: 'CFO is considering moving ~30% of stamping supply to Monterrey in 2027.' }, MARKET_EV, NEWS_EV],
      brief: {
        open: "Yesterday's tariff and the peso move could change the cost of your Monterrey plan. Worth 30 minutes to look at locking in rates?",
        pts: [['15% US tariff on Mexican auto parts from Jan 1', 3], ['MXN −4.1% this week; 1M vol up to 16.8%', 2], ['Your 2027 plan to move ~30% of stamping to Monterrey', 1]],
        ask: 'Call this week with your CFO and Jordan (FX).',
      },
      yes: 'They want to hedge <b>~$25M of 2027 MXN payables</b>. Can you price a 6-month forward by Friday?',
    },
    {
      id: 'B', name: 'Rio Freight Lines', sector: 'Freight · Texas', industry: 'Freight', last: 'Oct 14', contact: 'treasurer',
      biz: 'MXN cash mgmt', bizSub: 'Peso receivables', ev: 'inf', rm: 'DO', imp: ['receivables'], f: { r: 82, u: 70, e: 62 },
      evid: [{ tag: 'inf', label: 'Inferred', src: '~40% of cross-border loads billed in MXN', quote: 'Treasurer mentioned FX slippage on Mexico collections.' }, MARKET_EV, NEWS_EV],
      brief: {
        open: "The peso's drop cuts what your Mexico invoices are worth in dollars. Want to look at converting collections faster or locking a rate?",
        pts: [['MXN −4.1% this week; 1M vol 16.8%', 2], ['~40% of your cross-border loads billed in MXN', 1], ['Tariff may slow Mexico volumes from Jan 1', 3]],
        ask: 'Review your MXN collection cycle with Jordan (FX).',
      },
      yes: 'They want to <b>sweep MXN receipts weekly</b> instead of monthly. Can you join a call on rates and timing?',
    },
    {
      id: 'C', name: 'Verde Foods Imports', sector: 'Food importer · CA', industry: 'Food import', last: 'Aug 2', contact: 'finance lead',
      biz: 'MXN option collar', bizSub: 'Seasonal imports', ev: 'inf', rm: 'MC', imp: ['payables', 'volatility'], f: { r: 70, u: 98, e: 38 },
      evid: [{ tag: 'inf', label: 'Inferred', src: 'Trade-finance data: MXN produce invoices', quote: null }, MARKET_EV, NEWS_EV],
      brief: {
        open: 'Peso swings are big right now. Before your spring produce orders, is it worth capping your MXN costs?',
        pts: [['1M MXN vol up to 16.8%', 2], ['Seasonal MXN produce invoices (trade-finance data)', 1], ['No FX discussion on file: confirm exposure first', null]],
        ask: 'Confirm MXN exposure, then a collar intro with Jordan (FX).',
      },
      yes: 'Exposure confirmed: <b>~$8M in spring produce invoices</b>. Can you show a collar vs. a forward?',
    },
  ];

  // ---------- State ----------
  let run = 0;
  let S;
  const fresh = () => ({
    mode: 'spec', spec: 'brief', rm: 'home', text: '', ovr: {}, w: { ...DEFAULT_W },
    target: null, chat: [], approved: false, rejected: false, replied: false, replyRead: false, outcome: 'Interested',
  });

  const wait = (ms) => {
    const id = run;
    return new Promise((res, rej) => setTimeout(() => (id === run ? res() : rej('cancelled')), ms));
  };
  window.addEventListener('unhandledrejection', (e) => { if (e.reason === 'cancelled') e.preventDefault(); });

  // ---------- Rules ("AI") ----------
  const fromText = (k) => IMPACTS[k].kw.some((w) => S.text.toLowerCase().includes(w));
  const isOn = (k) => (k in S.ovr ? S.ovr[k] : fromText(k));
  const srcOf = (k) => (k in S.ovr ? (S.ovr[k] ? 'you' : '') : fromText(k) ? 'text' : '');
  const activeKeys = () => Object.keys(IMPACTS).filter(isOn);
  const visible = (c) => c.imp.some(isOn);
  const factors = (c) => {
    const missing = c.imp.filter((k) => !isOn(k)).length;
    return { r: Math.max(0, c.f.r - 12 * missing), u: c.f.u, e: c.f.e };
  };
  const score = (c, w = S.w) => {
    const f = factors(c);
    const t = w.r + w.u + w.e;
    return t ? Math.round((w.r * f.r + w.u * f.u + w.e * f.e) / t) : 0;
  };
  const flagged = (c) => c.f.u >= 70 && c.f.e < 50;
  const tier = (n) => (n >= 80 ? '' : n >= 65 ? 'mid' : 'low');
  const verdict = (c, n) => (n >= 80 ? ['Act', 'doc'] : n >= 65 ? ['Qualify', 'inf'] : ['Watch', '']);
  const T = () => S.target;
  const R = () => RMS[S.target.rm];

  // ---------- Chrome ----------
  function setStep(n) {
    $$('#steps li').forEach((li) => {
      const s = +li.dataset.step;
      li.classList.toggle('on', s === n);
      li.classList.toggle('done', s < n);
    });
  }
  function setNav(key) { $$('.nav a').forEach((a) => a.classList.toggle('on', a.dataset.nav === key)); }
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.classList.remove('show'), 2600);
  }
  function setBadge(n) { const b = $('#badge'); b.textContent = n || ''; b.classList.toggle('show', !!n); }
  function setMe(mode) {
    const spec = mode === 'spec';
    const rm = S.target ? R() : RMS.SK;
    const ini = spec ? 'JL' : S.target ? S.target.rm : 'SK';
    $('#me-av').textContent = ini;
    $('#me-av').classList.toggle('blue', !spec);
    $('#me-name').textContent = spec ? 'Jordan' : rm.name;
    $('#me-role').textContent = spec ? 'FX Specialist' : 'Relationship Manager';
    $('#role-av').textContent = ini;
    $('#role-title').textContent = spec ? 'Specialist\'s view' : 'RM\'s view';
    $('#role-sub').textContent = spec ? 'Jordan · FX Product Specialist' : `${rm.name} · Relationship Manager, ${rm.team}`;
    $('[data-mode="rm"]', sw).lastChild.textContent = S.target ? rm.first : 'RM';
    const role = $('.role');
    role.classList.remove('flip'); void role.offsetWidth; role.classList.add('flip');
  }
  function showNudge(html, cls) {
    nudge.classList.remove('warn');
    nudge.innerHTML = html;
    nudge.classList.add('show');
    sw.classList.add(cls);
  }
  async function swap(render) {
    view.classList.add('out');
    await wait(180);
    render();
    view.scrollTop = 0;
    view.classList.remove('out');
  }
  function popNotif(html, onOpen) {
    $('.notif')?.remove();
    const n = document.createElement('div');
    n.className = 'notif';
    n.innerHTML = html;
    $('#screen').append(n);
    requestAnimationFrame(() => n.classList.add('show'));
    $('[data-open]', n).addEventListener('click', onOpen);
  }

  // ---------- Mode switch ----------
  sw.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const mode = b.dataset.mode;
    if (b.getAttribute('aria-disabled') === 'true') {
      sw.classList.remove('shake'); void sw.offsetWidth; sw.classList.add('shake');
      nudge.textContent = 'Send an opportunity first';
      nudge.classList.add('show', 'warn');
      clearTimeout(nudge.t);
      nudge.t = setTimeout(() => nudge.classList.remove('show', 'warn'), 1800);
      return;
    }
    if (mode === S.mode) return;
    S.mode = mode;
    document.body.dataset.mode = mode;
    $$('button', sw).forEach((x) => x.classList.toggle('on', x === b));
    sw.classList.remove('ready', 'ready-spec');
    nudge.classList.remove('show');
    closeDrawer();
    $('.notif')?.remove();
    setMe(mode);
    swap(mode === 'rm' ? renderRM : renderSpec);
  });

  // =========================================================
  // Specialist
  // =========================================================
  function renderSpec() {
    setBadge(0);
    setNav('signal');
    if (S.spec === 'inbox') return specInbox();
    if (S.spec === 'brief') specBrief();
    else specMap();
    if (S.replied && !S.replyRead) replyNotif();
  }

  // ---- Screen 1: AI market brief + the specialist's view ----
  function specBrief() {
    setStep(1);
    view.innerHTML = `
      <div class="page fade-in">
        <div class="head">
          <h1>Market today</h1>
          <span class="ai">AI summary · 6:30 AM</span>
          <div class="right"><span class="tag">FX · Americas</span></div>
        </div>
        <div class="signals">
          <div class="card sig">
            <div class="row"><span class="tag hi">Policy</span><span class="time">Nov 11</span></div>
            <h3>US sets 15% tariff on Mexican auto parts</h3>
            <div class="metric"><strong>Jan 1</strong><span>effective</span></div>
          </div>
          <div class="card sig">
            <div class="row"><span class="tag">Market</span><span class="time">Today</span></div>
            <h3>Peso falls after tariff news</h3>
            <div class="metric"><strong class="down">−4.1%</strong><span>MXN vs USD</span></div>
            ${spark()}
          </div>
          <div class="card sig">
            <div class="row"><span class="tag warn">Risk</span><span class="time">Today</span></div>
            <h3>Peso volatility jumps</h3>
            <div class="metric"><strong>16.8%</strong><span>1M vol · +3.2 pts</span></div>
          </div>
        </div>
        <div class="composer ${S.text ? '' : 'pulse'}" id="composer">
          <textarea id="txt" rows="2" placeholder="What's your read? Who does this hit, and how?">${esc(S.text)}</textarea>
          <div class="reads" id="reads"></div>
          <div class="bar">
            <button class="suggest" id="suggest">Use an example view</button>
            <span class="hint" id="hint"></span>
            <button class="btn primary enter" id="enter">Find clients →</button>
          </div>
        </div>
        <div id="after"></div>
      </div>`;
    const ta = $('#txt');
    ta.addEventListener('focus', () => { $('#composer').classList.add('focus'); $('#composer').classList.remove('pulse'); });
    ta.addEventListener('blur', () => $('#composer').classList.remove('focus'));
    ta.addEventListener('input', () => { S.text = ta.value; autoGrow(ta); renderReads(); });
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); analyze(); } });
    $('#suggest').addEventListener('click', typeSuggested);
    $('#enter').addEventListener('click', analyze);
    autoGrow(ta);
    renderReads();
  }

  const autoGrow = (ta) => { ta.style.height = 'auto'; ta.style.height = `${ta.scrollHeight}px`; };

  function renderReads() {
    const box = $('#reads');
    if (!box) return;
    const prev = new Set($$('.imp-chip.on', box).map((c) => c.dataset.k));
    box.innerHTML = `<span class="label">AI reads</span>${Object.keys(IMPACTS).map((k) => {
      const on = isOn(k);
      const src = srcOf(k);
      return `<button class="imp-chip ${on ? 'on' : ''} ${on && !prev.has(k) ? 'pop' : ''}" data-k="${k}" title="${on ? 'Click to remove' : 'Click to add'}">${IMPACTS[k].label}${src === 'you' ? '<span class="src">you</span>' : ''}</button>`;
    }).join('')}`;
    $$('.imp-chip', box).forEach((c) => c.addEventListener('click', () => {
      const k = c.dataset.k;
      S.ovr[k] = !isOn(k);
      if (S.ovr[k] === fromText(k)) delete S.ovr[k];
      renderReads();
    }));
    const n = activeKeys().length;
    const hint = $('#hint');
    hint.textContent = !S.text.trim() ? 'Type a sentence, or use an example' : n ? `${n} impact${n > 1 ? 's' : ''} · click to add or remove` : 'No impact detected yet: add one';
    $('#enter').disabled = !S.text.trim() || !n;
  }

  let typing = false;
  async function typeSuggested() {
    if (typing) return;
    typing = true;
    const ta = $('#txt');
    $('#composer').classList.remove('pulse');
    $('#composer').classList.add('focus');
    S.ovr = {};
    const start = performance.now();
    const dur = 2000;
    const id = run;
    await new Promise((res) => {
      const tick = (now) => {
        if (id !== run || !document.body.contains(ta)) return;
        const n = Math.min(SUGGESTED.length, Math.round(((now - start) / dur) * SUGGESTED.length));
        ta.value = SUGGESTED.slice(0, n);
        S.text = ta.value;
        autoGrow(ta);
        renderReads();
        if (n < SUGGESTED.length) requestAnimationFrame(tick); else res();
      };
      requestAnimationFrame(tick);
    });
    typing = false;
    $('#enter')?.classList.add('pulse');
  }

  function spark() {
    const pts = [8, 9, 7, 8, 6, 7, 6, 12, 18, 22, 21, 24];
    const d = pts.map((y, i) => `${i ? 'L' : 'M'}${(i * 100) / (pts.length - 1)} ${y}`).join(' ');
    return `<svg class="spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" fill="none" stroke="#c82d4c" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>`;
  }

  let analyzing = false;
  async function analyze() {
    if (analyzing || typing || !S.text.trim() || !activeKeys().length) return;
    analyzing = true;
    const enter = $('#enter');
    enter.disabled = true;
    enter.classList.remove('pulse');
    $('#txt').disabled = true;
    const shown = CLIENTS.filter(visible).length;
    const steps = [
      ['Reading your view', `${activeKeys().length} impacts`],
      ['Scanning client book', '42 clients'],
      ['Checking information barriers', '1 restricted'],
      ['Scoring opportunities', `${shown} match${shown === 1 ? '' : 'es'}`],
    ];
    const box = document.createElement('div');
    box.className = 'card loading fade-in';
    box.innerHTML = steps.map(([t]) => `<div class="ln"><i></i>${t}<span class="n"></span></div>`).join('');
    $('#after').replaceChildren(box);
    const lines = $$('.ln', box);
    try {
      for (let i = 0; i < lines.length; i++) {
        lines[i].classList.add('run');
        await wait(i === 1 ? 800 : 550);
        lines[i].classList.replace('run', 'ok');
        $('.n', lines[i]).textContent = steps[i][1];
      }
      await wait(300);
      S.spec = 'map';
      swap(specMap);
    } finally { analyzing = false; }
  }

  // ---- Screen 2: judgment → client → business → RM ----
  const LANE_STEP = 100;
  const LANE_TOP = 12;
  const IMP_TOP = 16;
  const IMP_STEP = 70;
  const laneY = {};

  function specMap() {
    setStep(S.replied ? 6 : S.target ? (S.approved ? 4 : 3) : 2);
    view.innerHTML = `
      <div class="page fade-in">
        <button class="back" id="back">← Edit my view</button>
        <div class="head">
          <h1>Opportunity map</h1>
          <span class="sub" id="count"></span>
        </div>
        <div class="card ctx">
          <div class="kv"><span class="label">Market</span><div>US tariff on Mexican auto parts · <span class="down">MXN −4.1%</span> · 1M vol 16.8%</div></div>
          <div class="kv"><span class="label">Your view</span><q>${esc(S.text)}</q></div>
        </div>
        <div class="mapwrap">
          <div class="card mapcard">
            <div class="scroll">
              <div class="maphead"><span>Your judgment</span><span></span><span>Client</span></div>
              <div class="map" id="map">
                <svg class="wires" id="wires" aria-hidden="true"></svg>
                ${Object.keys(IMPACTS).map((k, i) => `
                  <div class="node imp" data-k="${k}" style="top:${IMP_TOP + i * IMP_STEP}px" role="switch" tabindex="0">
                    <span class="tg"></span><b>${IMPACTS[k].label}</b><small>${IMPACTS[k].sub}</small>
                  </div>`).join('')}
                ${CLIENTS.map(lane).join('')}
                <div class="empty-map">Switch on a judgment to see clients</div>
              </div>
            </div>
            <div class="mapfoot">
              <span class="hint2">Click a judgment to switch it · click a client for details</span>
              <span><i class="solid"></i>Thicker = higher score</span>
              <span><i class="dash"></i>Urgent, weak evidence</span>
              <span><i></i>38 not shown · low relevance</span>
              <span><i class="r"></i>1 restricted · information barrier</span>
            </div>
          </div>
        </div>
      </div>`;

    $('#back').addEventListener('click', () => { S.spec = 'brief'; swap(specBrief); });
    $$('.node.imp').forEach((n) => {
      const toggle = () => {
        const k = n.dataset.k;
        S.ovr[k] = !isOn(k);
        if (S.ovr[k] === fromText(k)) delete S.ovr[k];
        update(true);
      };
      n.addEventListener('click', toggle);
      n.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    });
    $$('.lane .client').forEach((n) => n.addEventListener('click', () => openPackage(n.closest('.lane').dataset.id)));
    $$('.lane .send').forEach((b) => b.addEventListener('click', () => openPackage(b.closest('.lane').dataset.id)));
    Object.keys(laneY).forEach((k) => delete laneY[k]);
    update(false);
  }

  const esc = (t) => t.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  function actHTML(c) {
    if (S.target && S.target.id === c.id) {
      const label = S.replied ? (S.rejected ? `Rejected · ${S.outcome}` : `${S.outcome} ✓`) : S.approved ? 'Approved ✓' : 'Sent ✓';
      return `<button class="btn sm done" disabled>${label}</button>`;
    }
    return `<button class="btn sm ${S.target ? '' : 'primary'} send" ${S.target ? 'disabled title="One hand-off per run"' : ''}>Send to ${RMS[c.rm].first}</button>`;
  }

  function lane(c) {
    return `
      <div class="lane ${flagged(c) ? 'flag' : ''}" data-id="${c.id}">
        <div class="node client" title="Open details">
          <div class="top-row"><b>Client ${c.id}</b><span class="score" data-score></span></div>
          <small>${c.sector}</small>
          <div class="tip" data-tip></div>
        </div>
        <div class="act">${actHTML(c)}</div>
      </div>`;
  }

  function update(animate) {
    if (!$('#map')) return;
    $$('.node.imp').forEach((n) => {
      const on = isOn(n.dataset.k);
      n.classList.toggle('off', !on);
      n.setAttribute('aria-checked', on);
    });
    const shown = CLIENTS.filter(visible);
    $('#count').textContent = `${shown.length} of 42 clients`;
    $('#map').classList.toggle('none', !shown.length);
    const ranked = [...CLIENTS].sort((a, b) => (visible(b) - visible(a)) || (score(b) - score(a)));
    const target = {};
    ranked.forEach((c, i) => { target[c.id] = LANE_TOP + i * LANE_STEP; });
    CLIENTS.forEach((c) => {
      const ln = $(`.lane[data-id="${c.id}"]`);
      ln.classList.toggle('off', !visible(c));
      const s = score(c);
      const el = $('[data-score]', ln);
      el.textContent = s;
      el.className = `score ${tier(s)}`;
      const f = factors(c);
      $('[data-tip]', ln).textContent = `Relevance ${f.r} · Urgency ${f.u} · Evidence ${f.e}`;
    });
    const from = { ...laneY };
    const t0 = performance.now();
    const dur = animate ? 380 : 0;
    const id = run;
    const frame = (now) => {
      if (id !== run || !$('#map')) return;
      const p = dur ? Math.min(1, (now - t0) / dur) : 1;
      const e = 1 - Math.pow(1 - p, 3);
      CLIENTS.forEach((c) => {
        const a = from[c.id] ?? target[c.id];
        laneY[c.id] = a + (target[c.id] - a) * e;
        $(`.lane[data-id="${c.id}"]`).style.top = `${laneY[c.id]}px`;
      });
      drawWires();
      if (p < 1) requestAnimationFrame(frame);
    };
    if (dur) requestAnimationFrame(frame); else frame(t0);
  }

  function drawWires() {
    const keys = Object.keys(IMPACTS);
    const x1 = 180, x2 = 320;
    const paths = [];
    CLIENTS.forEach((c) => {
      if (!visible(c)) return;
      const s = score(c);
      const w = Math.max(1.2, (s - 40) / 12);
      const col = flagged(c) ? '#b4610e' : s >= 80 ? '#2272b4' : '#9fb6cb';
      c.imp.filter(isOn).forEach((k) => {
        const y1 = IMP_TOP + keys.indexOf(k) * IMP_STEP + 29;
        const y2 = laneY[c.id] + 38;
        paths.push(`<path d="M${x1} ${y1} C ${x1 + 32} ${y1}, ${x2 - 32} ${y2}, ${x2} ${y2}" fill="none" stroke="${col}" stroke-width="${w}" ${flagged(c) ? 'stroke-dasharray="5 4"' : ''} stroke-linecap="round"/>`);
      });
    });
    $('#wires').innerHTML = paths.join('');
  }

  // ---- Package drawer (details + send) ----
  function openPackage(id) {
    const c = CLIENTS.find((x) => x.id === id);
    const rm = RMS[c.rm];
    const s = score(c);
    const [v, vc] = verdict(c, s);
    const mine = S.target && S.target.id === c.id;
    const canSend = !S.target;
    openDrawer(`
      <div class="dh"><span class="av blue">${c.rm}</span><div><h2>${canSend ? `Send to ${rm.name}` : `Client ${c.id}`}</h2><small>RM · ${rm.team}</small></div><button class="x" data-close aria-label="Close">×</button></div>
      <div class="db">
        <div class="kv"><span class="label">Client</span><div><b>Client ${c.id}</b> · ${c.sector}<small>Name shown to ${rm.first} only</small></div></div>
        <div class="kv"><span class="label">Score</span><div class="wts"><span><b>${s}</b></span><span class="tag ${vc}">${v}</span></div></div>
        <div class="kv"><span class="label">Your judgment</span><div class="chips">${c.imp.map((k) => `<span class="tag ${isOn(k) ? 'inf' : ''}">${isOn(k) ? '✓ ' : ''}${IMPACTS[k].label}</span>`).join('')}</div></div>
        <div class="kv"><span class="label">Business</span><div><b>${c.biz}</b> <span class="tag ${c.ev}">${c.ev === 'doc' ? 'Documented' : 'Inferred'}</span></div></div>
        <div class="kv"><span class="label">Your view</span><q>${esc(S.text)}</q></div>
        <div class="kv"><span class="label">Evidence</span><div class="ev">${c.evid.map((e) => `<div><span class="tag ${e.tag}">${e.label}</span><span class="src">${e.src}${e.quote ? ' · 🔒 RM only' : ''}</span></div>`).join('')}</div></div>
      </div>
      <div class="df">${canSend
        ? `<button class="btn" data-close>Cancel</button><button class="btn primary" id="confirm">Send to ${rm.first}</button>`
        : `<span class="hint2" style="margin-right:auto">${mine ? 'Already sent' : 'One hand-off per run · ↺ to restart'}</span><button class="btn" data-close>Close</button>`}</div>`);
    $('#confirm')?.addEventListener('click', () => confirmSend(c), { once: true });
  }

  async function confirmSend(c) {
    const b = $('#confirm');
    b.disabled = true;
    b.innerHTML = '<span class="spin"></span>Checking access';
    await wait(650);
    b.innerHTML = '<span class="spin"></span>Packaging evidence';
    await wait(650);
    b.innerHTML = 'Sent ✓';
    await wait(350);
    closeDrawer();
    S.target = c;
    S.sentScore = score(c);
    S.sentW = { ...S.w };
    S.sentImp = c.imp.filter(isOn);
    setStep(3);
    CLIENTS.forEach((x) => { const a = $(`.lane[data-id="${x.id}"] .act`); if (a) a.innerHTML = actHTML(x); });
    $$('.lane .send').forEach((btn) => btn.addEventListener('click', () => openPackage(btn.closest('.lane').dataset.id)));
    toast(`Sent to ${RMS[c.rm].name}`);
    const rmBtn = $('[data-mode="rm"]', sw);
    rmBtn.removeAttribute('aria-disabled');
    rmBtn.lastChild.textContent = RMS[c.rm].first;
    showNudge(`Sent. See ${RMS[c.rm].first}'s side <b>→</b>`, 'ready');
  }

  function openDrawer(html) {
    drawer.innerHTML = html;
    drawer.classList.add('show');
    drawer.setAttribute('aria-hidden', 'false');
    scrim.classList.add('show');
  }
  function closeDrawer() {
    drawer.classList.remove('show');
    drawer.setAttribute('aria-hidden', 'true');
    scrim.classList.remove('show');
  }
  scrim.addEventListener('click', closeDrawer);
  drawer.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeDrawer(); });

  // ---- Reply arrives on the specialist side ----
  async function replyNotif() {
    setBadge(1);
    await wait(700);
    const rm = R();
    popNotif(`
      <div class="nh"><span class="ol">O</span>Outlook<span class="time">now</span></div>
      <div class="nb"><span class="av blue">${S.target.rm}</span><div><b>${rm.name} replied</b><small>Re: ${S.target.name} · ${S.target.biz}</small></div></div>
      <button class="btn primary pulse" data-open>Read</button>`, openReply);
  }
  function openReply() {
    $('.notif')?.remove();
    setBadge(0);
    S.replyRead = true;
    S.spec = 'inbox';
    swap(specInbox);
  }

  function specInbox() {
    setStep(6);
    setNav('home');
    const c = T();
    const rm = R();
    view.innerHTML = `
      <div class="page fade-in">
        <button class="back" id="tomap">← Opportunity map</button>
        <div class="head"><h1>Inbox</h1><span class="sub">1 new</span></div>
        <div class="card mail">
          <div class="mh"><span class="ol">O</span><b>Re: ${c.name} · ${c.biz}</b><span class="tag ${outcomeTag()}">${S.rejected ? 'Rejected' : S.outcome}</span></div>
          <div class="mf"><span>From</span><span>${rm.name} · RM</span></div>
          <div class="mf"><span>To</span><span>Jordan (you)</span></div>
          <div class="body">${replyBody()}</div>
          <div class="foot">
            <span class="safe"><span class="ai">Outcome logged · sharpens future matches</span></span>
            <button class="btn" id="tomap2">Back to map</button>
            ${S.outcome === 'Interested' && !S.rejected ? '<button class="btn primary" id="price">Start pricing</button>' : ''}
          </div>
        </div>
      </div>`;
    $('#tomap').addEventListener('click', () => { S.spec = 'map'; swap(specMap); });
    $('#tomap2').addEventListener('click', () => { S.spec = 'map'; swap(specMap); });
    $('#price')?.addEventListener('click', () => toast('Pricing ticket opened · linked to this opportunity'));
  }

  // =========================================================
  // Relationship manager
  // =========================================================
  function renderRM() {
    if (S.rm === 'reply') return rmReply();
    if (S.rm === 'brief') return rmBrief();
    if (S.rm === 'review') return rmReview();
    rmHome();
  }

  // ---- Screen 3a: RM home + notification ----
  async function rmHome() {
    setStep(3);
    setNav('home');
    const c = T();
    const rm = R();
    const pending = !S.approved && !S.rejected;
    const status = pending ? `<span class="tag inf">New · ${S.sentScore}</span>` : S.approved ? '<span class="tag doc">Approved</span>' : '<span class="tag">Rejected</span>';
    view.innerHTML = `
      <div class="page fade-in">
        <div class="head"><h1>My accounts</h1><span class="sub">${rm.team}</span></div>
        <div class="card" style="overflow-x:auto">
          <table class="table">
            <thead><tr><th>Account</th><th>Sector</th><th>Last contact</th><th>SignalBridge</th></tr></thead>
            <tbody>
              <tr class="${pending ? 'new' : ''}" id="acct" style="cursor:pointer"><td><b>${c.name}</b></td><td>${c.industry}</td><td>${c.last}</td><td>${status}</td></tr>
              ${rm.others.map(([n, s, d]) => `<tr><td>${n}</td><td>${s}</td><td>${d}</td><td><span style="color:var(--faint)">—</span></td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    $('#acct').addEventListener('click', openReview);
    if (!pending) return;
    setBadge(1);
    await wait(700);
    popNotif(`
      <div class="nh"><span class="ai">SignalBridge</span><span class="time">now</span></div>
      <div class="nb"><span class="av">JL</span><div><b>${c.name}</b><small>${c.biz} · from Jordan</small></div><span class="score">${S.sentScore}</span></div>
      <button class="btn primary pulse" data-open>Review</button>`, openReview);
  }

  function openReview() {
    $('.notif')?.remove();
    setBadge(0);
    S.rm = 'review';
    swap(rmReview);
  }

  // ---- Screen 3b: review + approve / reject ----
  function rmReview() {
    setStep(3);
    setNav('accounts');
    const c = T();
    const f = factors(c);
    const [v, vc] = verdict(c, S.sentScore);
    const quote = c.evid[0].quote;
    view.innerHTML = `
      <div class="page fade-in">
        <button class="back" id="home">← My accounts</button>
        <div class="head">
          <h1>${c.name}</h1>
          <span class="tag doc">Your client</span>
          <span class="sub">${c.biz} · from Jordan, FX Specialist</span>
        </div>
        <div class="review">
          <div class="card main">
            <div class="kv"><span class="label">Market</span><div>US tariff on Mexican auto parts · MXN −4.1%</div></div>
            <div class="kv"><span class="label">Jordan's view</span><q>${esc(S.text)}</q></div>
            <div class="kv"><span class="label">Judgment</span><div class="chips">${S.sentImp.map((k) => `<span class="tag inf">${IMPACTS[k].label}</span>`).join('')}</div></div>
            <div class="kv"><span class="label">Evidence</span>
              <div class="ev">
                ${c.evid.map((e) => `<div><span class="tag ${e.tag}">${e.label}</span><span class="src">${e.src}</span></div>`).join('')}
                ${quote ? `<div class="note-unlock">“${quote}”</div>` : ''}
              </div>
            </div>
          </div>
          <div class="card decide">
            <div class="big"><strong>${S.sentScore}</strong><span class="tag ${vc}">${v}</span></div>
            <div class="bars">${bar('Relevance', f.r)}${bar('Urgency', f.u)}${bar('Evidence', f.e)}</div>
            <div id="decision">${decisionHTML()}</div>
            <button class="btn msg" id="msgspec"><span class="av sm">JL</span>Message Jordan${S.chat.length ? ` <span class="tag">${S.chat.length}</span>` : ''}</button>
          </div>
        </div>
      </div>`;
    $('#home').addEventListener('click', () => { S.rm = 'home'; swap(rmHome); });
    requestAnimationFrame(() => requestAnimationFrame(() => $$('.bars .f').forEach((x) => { x.style.width = `${x.dataset.v}%`; })));
    bindDecision();
    $('#msgspec').addEventListener('click', openChat);
  }

  // ---- RM ↔ specialist chat ----
  const QUICK = ['How big should the hedge be?', 'Can you join the client call?', 'Why this client now?'];
  function jordanReply(q) {
    const c = T();
    const t = q.toLowerCase();
    if (/size|big|amount|how much|notional|\$/.test(t)) return `I'd start with ~60% of their next 12 months of MXN exposure, then layer the rest. ${c.biz} fits that.`;
    if (/join|call|meet|available|time/.test(t)) return 'Yes, happy to join. Thursday or Friday afternoon works for me.';
    if (/why|evidence|sure|reason|now/.test(t)) return `The tariff starts Jan 1 and the peso just dropped 4.1%. Costs on their Mexico exposure moved this week, so timing matters.`;
    if (/thank|great|ok|perfect/.test(t)) return 'Anytime. Ping me after you talk to them.';
    return `Good question. Short answer: the peso move makes ${c.biz.toLowerCase()} more valuable right now. Want me on the call?`;
  }
  const bubbles = () => S.chat.map((m) => `<div class="bub ${m.me ? 'me' : ''}">${esc(m.t)}</div>`).join('');

  function openChat() {
    const c = T();
    openDrawer(`
      <div class="dh"><span class="av">JL</span><div><h2>Jordan</h2><small>FX Specialist · Teams</small></div><button class="x" data-close aria-label="Close">×</button></div>
      <div class="db chat" id="chat">
        <div class="ctxcard"><span class="label">About</span><b>${c.name}</b><small>${c.biz} · score ${S.sentScore}</small></div>
        <div id="bubs">${bubbles()}</div>
      </div>
      <div class="df chatfoot">
        <div class="quick" id="quick">${QUICK.map((q) => `<button class="chip" data-q="${q}">${q}</button>`).join('')}</div>
        <form class="ask" id="askform"><input id="askin" placeholder="Message Jordan…" autocomplete="off"><button class="btn primary" type="submit">Send</button></form>
      </div>`);
    const input = $('#askin');
    setTimeout(() => input.focus(), 320);
    $$('#quick .chip').forEach((b) => b.addEventListener('click', () => sendChat(b.dataset.q)));
    $('#askform').addEventListener('submit', (e) => { e.preventDefault(); sendChat(input.value); });
  }

  let replying = false;
  async function sendChat(text) {
    const t = text.trim();
    if (!t || replying) return;
    replying = true;
    $('#askin').value = '';
    S.chat.push({ me: true, t });
    const bubs = $('#bubs');
    bubs.innerHTML = `${bubbles()}<div class="bub typing"><i></i><i></i><i></i></div>`;
    $('#chat').scrollTop = 1e6;
    try {
      await wait(1100);
      S.chat.push({ me: false, t: jordanReply(t) });
      if ($('#bubs')) { $('#bubs').innerHTML = bubbles(); $('#chat').scrollTop = 1e6; }
      const btn = $('#msgspec');
      if (btn) btn.innerHTML = `<span class="av sm">JL</span>Message Jordan <span class="tag">${S.chat.length}</span>`;
    } finally { replying = false; }
  }

  const bar = (n, v) => `<div class="b"><span>${n}</span><div class="t"><div class="f" data-v="${v}"></div></div><span class="v">${v}</span></div>`;

  function decisionHTML() {
    if (S.approved) return '<button class="btn primary" id="tobrief" style="width:100%">Open brief →</button>';
    if (S.rejected) return `<div class="reasons"><span class="tag">Rejected · ${S.outcome}</span><small>Reason sent to Jordan</small></div>`;
    return '<div class="acts"><button class="btn" id="reject">Reject</button><button class="btn primary pulse" id="approve">Approve</button></div>';
  }

  function bindDecision() {
    $('#approve')?.addEventListener('click', approve, { once: true });
    $('#tobrief')?.addEventListener('click', () => { S.rm = 'brief'; swap(rmBrief); });
    $('#reject')?.addEventListener('click', () => {
      $('#decision').innerHTML = `<div class="reasons"><span class="label">Why?</span>
        ${['Already discussed', 'Not relevant', 'Bad timing'].map((r) => `<button class="btn sm" data-r="${r}">${r}</button>`).join('')}
        <button class="btn sm" id="cancelrej" style="justify-content:center">Cancel</button></div>`;
      $('#cancelrej').addEventListener('click', () => { $('#decision').innerHTML = decisionHTML(); bindDecision(); });
      $$('[data-r]').forEach((b) => b.addEventListener('click', () => {
        S.rejected = true;
        S.replied = true;
        S.outcome = b.dataset.r;
        $('#decision').innerHTML = decisionHTML();
        toast('Reason sent to Jordan · future matches learn from it');
        showNudge('<b>←</b> Feedback sent. See Jordan\'s side', 'ready-spec');
      }));
    });
  }

  async function approve() {
    const b = $('#approve');
    b.classList.remove('pulse');
    b.innerHTML = '<span class="spin"></span>Drafting brief';
    $('#reject').disabled = true;
    await wait(1300);
    S.approved = true;
    toast('Approved · Jordan is notified');
    S.rm = 'brief';
    swap(rmBrief);
  }

  // ---- Screen 4: AI brief (Outlook draft) ----
  function rmBrief() {
    setStep(4);
    setNav('accounts');
    const c = T();
    view.innerHTML = `
      <div class="page fade-in">
        <button class="back" id="toreview">← ${c.name}</button>
        <div class="head"><h1>Meeting brief</h1><span class="ai">AI draft · click to edit</span></div>
        <div class="card mail">
          <div class="mh"><span class="ol">O</span><b>Outlook · Draft</b><span class="tag warn">Not sent</span></div>
          <div class="mf"><span>To</span><span>${R().name} (you)</span></div>
          <div class="mf"><span>Subject</span><span>Prep · ${c.name} · ${c.biz}</span></div>
          <div class="body" contenteditable="true" spellcheck="false">
            <div><span class="label">Open with</span><p class="open" style="margin-top:6px">“${c.brief.open}”</p></div>
            <div><span class="label">Talking points</span>
              <ul style="margin-top:6px">${c.brief.pts.map(([t, n]) => `<li>${t}${n ? `<span class="cite">${n}</span>` : ''}</li>`).join('')}</ul></div>
            <div><span class="label">Ask</span><p style="margin-top:6px">${c.brief.ask}</p></div>
          </div>
          <div class="foot">
            <span class="safe">🔒 Nothing is sent to the client</span>
            <button class="btn" id="outlook">Open in Outlook</button>
            <button class="btn primary ${S.replied ? '' : 'pulse'}" id="toreply">After the meeting: update Jordan →</button>
          </div>
        </div>
      </div>`;
    $('#toreview').addEventListener('click', () => { S.rm = 'review'; swap(rmReview); });
    $('#outlook').addEventListener('click', () => toast('Opened as a draft in Outlook'));
    $('#toreply').addEventListener('click', () => { S.rm = 'reply'; swap(rmReply); });
  }

  // ---- Screen 5: RM replies to the specialist ----
  const OUTCOME_TAG = { Interested: 'doc', 'Not now': 'warn', 'Not a fit': '' };
  const outcomeTag = () => (S.rejected ? '' : OUTCOME_TAG[S.outcome]);
  const replyBody = () => {
    const c = T();
    const rm = R();
    if (S.rejected) return `<p>Jordan, thanks for flagging ${c.name}.</p><p>Marking this one <b>${S.outcome.toLowerCase()}</b> for now. Keep them coming.</p><p>${rm.first}</p>`;
    const hi = `<p>Jordan, thanks for the flag. Met ${c.name}${c.name.endsWith('s') ? "'" : "'s"} ${c.contact} today.</p>`;
    return hi + ({
      Interested: `<p>${c.yes}</p>`,
      'Not now': '<p>Timing is off, so <b>no hedge for now</b>. Let\'s revisit next quarter.</p>',
      'Not a fit': '<p>They already hedge peso exposure with another bank, so <b>not a fit</b> this time.</p>',
    }[S.outcome]) + `<p>${rm.first}</p>`;
  };

  function rmReply() {
    setStep(5);
    setNav('accounts');
    const c = T();
    view.innerHTML = `
      <div class="page fade-in">
        <button class="back" id="tobrief2">← Meeting brief</button>
        <div class="head"><h1>Update Jordan</h1><span class="ai">AI draft from your meeting notes</span></div>
        <div class="card mail">
          <div class="mh"><span class="ol">O</span><b>Outlook · New message</b><span class="tag ${S.replied ? 'doc' : 'warn'}" id="mstate">${S.replied ? 'Sent' : 'Draft'}</span></div>
          <div class="mf"><span>To</span><span>Jordan · FX Specialist</span></div>
          <div class="mf"><span>Subject</span><span>Re: ${c.name} · ${c.biz}</span></div>
          <div class="mf outcome"><span>Outcome</span><span class="chips" id="outcomes">
            ${Object.keys(OUTCOME_TAG).map((o) => `<button class="chip ${o === S.outcome ? 'on' : ''}" data-o="${o}" ${S.replied ? 'disabled' : ''}>${o}</button>`).join('')}
          </span></div>
          <div class="body" id="rbody" ${S.replied ? '' : 'contenteditable="true"'} spellcheck="false">${replyBody()}</div>
          <div class="foot">
            <span class="safe">Outcome is saved to SignalBridge</span>
            <button class="btn primary ${S.replied ? 'done' : ''}" id="sendreply" ${S.replied ? 'disabled' : ''}>${S.replied ? 'Sent ✓' : 'Send to Jordan'}</button>
          </div>
        </div>
      </div>`;
    $('#tobrief2').addEventListener('click', () => { S.rm = 'brief'; swap(rmBrief); });
    if (S.replied) return;
    $$('#outcomes .chip').forEach((ch) => ch.addEventListener('click', () => {
      S.outcome = ch.dataset.o;
      $$('#outcomes .chip').forEach((x) => x.classList.toggle('on', x === ch));
      $('#rbody').innerHTML = replyBody();
    }));
    $('#sendreply').addEventListener('click', sendReply, { once: true });
  }

  async function sendReply() {
    const b = $('#sendreply');
    b.disabled = true;
    b.innerHTML = '<span class="spin"></span>Sending';
    $$('#outcomes .chip').forEach((ch) => { ch.disabled = true; });
    $('#rbody').removeAttribute('contenteditable');
    await wait(900);
    b.innerHTML = 'Sent ✓';
    b.classList.add('done');
    $('#mstate').textContent = 'Sent';
    $('#mstate').className = 'tag doc';
    S.replied = true;
    toast('Sent to Jordan · outcome logged');
    showNudge('<b>←</b> Reply sent. See Jordan\'s side', 'ready-spec');
  }

  // ---------- Start / restart ----------
  function start() {
    run++;
    analyzing = false;
    typing = false;
    replying = false;
    S = fresh();
    document.body.dataset.mode = 'spec';
    closeDrawer();
    $('.notif')?.remove();
    const rmBtn = $('[data-mode="rm"]', sw);
    rmBtn.setAttribute('aria-disabled', 'true');
    $$('button', sw).forEach((x) => x.classList.toggle('on', x.dataset.mode === 'spec'));
    sw.classList.remove('ready', 'ready-spec');
    nudge.classList.remove('show', 'warn');
    setMe('spec');
    renderSpec();
  }
  $('#restart').addEventListener('click', start);
  $('#bell').addEventListener('click', () => {
    if (S.mode === 'rm' && S.target && !S.approved && !S.rejected) openReview();
    else if (S.mode === 'spec' && S.replied && !S.replyRead) openReply();
    else toast('No new notifications');
  });
  start();
})();
