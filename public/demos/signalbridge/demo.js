/* SignalBridge concept prototype. Everything is scripted with synthetic data; no AI calls. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const view = $('#view');
  const drawer = $('#drawer');
  const scrim = $('#scrim');
  const sw = $('#switch');
  const nudge = $('#nudge');

  // ---------- Synthetic data ----------
  const MY_VIEW = 'Tariff plus a weaker peso squeezes US manufacturers that buy from Mexico. Expect hedging demand on MXN payables in the next 4–6 weeks.';
  const CHIPS = ['MXN', 'Mexico supply chain', 'Manufacturing', 'Hedging', '4–6 weeks'];
  const DEFAULT_W = { r: 45, u: 35, e: 20 };
  const CLIENTS = [
    { id: 'A', sector: 'Auto parts · Ohio', biz: 'MXN forward hedge', bizSub: '~$40M Mexico payables', ev: 'doc', rm: 'Sarah Kim', av: 'SK', f: { r: 94, u: 86, e: 78 } },
    { id: 'B', sector: 'Freight · Texas', biz: 'MXN cash mgmt', bizSub: 'Peso receivables', ev: 'inf', rm: 'David Ortiz', av: 'DO', f: { r: 80, u: 66, e: 62 } },
    { id: 'C', sector: 'Food importer · CA', biz: 'MXN option collar', bizSub: 'Seasonal imports', ev: 'inf', rm: 'Maya Chen', av: 'MC', f: { r: 70, u: 98, e: 38 } },
  ];
  const EVIDENCE = [
    { tag: 'doc', label: 'CRM note', src: 'Meeting note · Sep 30', locked: true },
    { tag: '', label: 'Market data', src: 'MXN −4.1% · 1M vol 16.8%' },
    { tag: '', label: 'News', src: 'Tariff announcement · Nov 11' },
  ];

  // ---------- State ----------
  let run = 0;
  let S;
  const fresh = () => ({ mode: 'spec', spec: 'brief', rm: 'home', sent: false, approved: false, rejected: false, w: { ...DEFAULT_W }, typed: false });

  const wait = (ms) => {
    const id = run;
    return new Promise((res, rej) => setTimeout(() => (id === run ? res() : rej('cancelled')), ms));
  };
  window.addEventListener('unhandledrejection', (e) => { if (e.reason === 'cancelled') e.preventDefault(); });

  const score = (c, w = S.w) => {
    const t = w.r + w.u + w.e;
    return t ? Math.round((w.r * c.f.r + w.u * c.f.u + w.e * c.f.e) / t) : 0;
  };
  const flagged = (c) => c.f.u >= 70 && c.f.e < 50;
  const tier = (n) => (n >= 80 ? '' : n >= 65 ? 'mid' : 'low');

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
    $('#me-av').textContent = spec ? 'JL' : 'SK';
    $('#me-av').classList.toggle('blue', !spec);
    $('#me-name').textContent = spec ? 'Jordan Lee' : 'Sarah Kim';
    $('#me-role').textContent = spec ? 'FX Specialist' : 'Relationship Manager';
    $('#role-av').textContent = spec ? 'JL' : 'SK';
    $('#role-title').textContent = spec ? 'Specialist\'s view' : 'RM\'s view';
    $('#role-sub').textContent = spec ? 'Jordan Lee · FX Product Specialist' : 'Sarah Kim · Relationship Manager, Mid-market Industrials';
    const role = $('.role');
    role.classList.remove('flip'); void role.offsetWidth; role.classList.add('flip');
  }
  function unlockRM() {
    const b = $('[data-mode="rm"]', sw);
    b.removeAttribute('aria-disabled');
    sw.classList.add('ready');
    nudge.classList.remove('warn');
    nudge.innerHTML = 'Sent. See Sarah\'s side <b>→</b>';
    nudge.classList.add('show');
  }
  async function swap(render) {
    view.classList.add('out');
    await wait(180);
    render();
    view.scrollTop = 0;
    view.classList.remove('out');
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
    sw.classList.remove('ready');
    nudge.classList.remove('show');
    closeDrawer();
    $('.notif')?.remove();
    setMe(mode);
    if (mode === 'rm') swap(renderRM); else swap(renderSpec);
  });

  // =========================================================
  // Specialist
  // =========================================================
  function renderSpec() {
    setBadge(0);
    setNav('signal');
    if (S.spec === 'brief') specBrief();
    else specMap();
  }

  // ---- Screen 1: AI market brief + chat box ----
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
        <div class="composer pulse" id="composer">
          <div class="txt" id="txt"><span class="ph">What's your read on today's market?</span></div>
          <div class="bar">
            <span class="hint" id="hint">Click to add your view</span>
            <button class="btn primary enter" id="enter" disabled>Enter ↵</button>
          </div>
        </div>
        <div id="after"></div>
      </div>`;
    $('#composer').addEventListener('click', typeView, { once: true });
  }

  function spark() {
    const pts = [8, 9, 7, 8, 6, 7, 6, 12, 18, 22, 21, 24];
    const d = pts.map((y, i) => `${i ? 'L' : 'M'}${(i * 100) / (pts.length - 1)} ${y}`).join(' ');
    return `<svg class="spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" fill="none" stroke="#c82d4c" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>`;
  }

  async function typeView() {
    const box = $('#composer');
    const txt = $('#txt');
    box.classList.remove('pulse');
    box.classList.add('focus');
    $('#hint').textContent = 'Typing…';
    const start = performance.now();
    const dur = 2200;
    await new Promise((res) => {
      const id = run;
      const tick = (now) => {
        if (id !== run) return;
        const n = Math.min(MY_VIEW.length, Math.round(((now - start) / dur) * MY_VIEW.length));
        txt.innerHTML = `${MY_VIEW.slice(0, n)}<span class="caret"></span>`;
        if (n < MY_VIEW.length) requestAnimationFrame(tick); else res();
      };
      requestAnimationFrame(tick);
    });
    S.typed = true;
    $('#hint').textContent = 'AI will find who this matters to';
    const enter = $('#enter');
    enter.disabled = false;
    enter.classList.add('pulse');
    enter.addEventListener('click', analyze, { once: true });
  }

  async function analyze() {
    const enter = $('#enter');
    enter.disabled = true;
    enter.classList.remove('pulse');
    $('#composer').classList.remove('focus');
    $('#txt .caret')?.remove();
    const steps = [
      ['Reading your view', ''],
      ['Scanning client book', '42 clients'],
      ['Checking information barriers', '1 restricted'],
      ['Scoring opportunities', '3 matches'],
    ];
    const box = document.createElement('div');
    box.className = 'card loading fade-in';
    box.innerHTML = steps.map(([t]) => `<div class="ln"><i></i>${t}<span class="n"></span></div>`).join('');
    $('#after').append(box);
    const lines = $$('.ln', box);
    for (let i = 0; i < lines.length; i++) {
      lines[i].classList.add('run');
      await wait(650);
      lines[i].classList.replace('run', 'ok');
      $('.n', lines[i]).textContent = steps[i][1];
    }
    await wait(350);
    S.spec = 'map';
    swap(specMap);
  }

  // ---- Screen 2: relationship graph + weights ----
  const LANE_STEP = 100;
  const LANE_TOP = 12;
  const laneY = {};

  function specMap() {
    setStep(S.sent ? (S.approved ? 4 : 3) : 2);
    view.innerHTML = `
      <div class="page fade-in">
        <button class="back" id="back">← Market today</button>
        <div class="head">
          <h1>Opportunity map</h1>
          <span class="sub">3 of 42 clients</span>
        </div>
        <div class="card viewline">
          <span class="label">Your view</span>
          <q>${MY_VIEW}</q>
          <span class="chips">${CHIPS.map((c) => `<span class="tag">${c}</span>`).join('')}</span>
        </div>
        <div class="mapgrid">
          <div class="card weights">
            <span class="label">Priority weights</span>
            ${slider('r', 'Relevance')}
            ${slider('u', 'Urgency')}
            ${slider('e', 'Evidence')}
            <button class="reset" id="resetw">Reset to default</button>
            <div class="legend">
              <span><i class="solid"></i>Thicker = higher score</span>
              <span><i class="dash"></i>Urgent, weak evidence</span>
            </div>
          </div>
          <div class="card mapcard">
            <div class="scroll">
              <div class="maphead"><span>Market</span><span></span><span>Client</span><span></span><span>Business</span><span></span><span>RM</span><span></span></div>
              <div class="map" id="map">
                <svg class="wires" id="wires" aria-hidden="true"></svg>
                <div class="node market">
                  <b>US tariff on Mexico</b>
                  <div class="mrow"><span class="tag hi">Policy</span>Nov 11</div>
                  <div class="mrow"><span class="tag">MXN</span><span class="down">−4.1%</span></div>
                </div>
                ${CLIENTS.map(lane).join('')}
              </div>
            </div>
            <div class="mapfoot">
              <span><i></i>38 not shown · low relevance</span>
              <span><i class="r"></i>1 restricted · information barrier</span>
            </div>
          </div>
        </div>
      </div>`;

    $('#back').addEventListener('click', () => { S.spec = 'brief'; swap(specBriefDone); });
    $$('.weights input').forEach((inp) => inp.addEventListener('input', () => {
      S.w[inp.name] = +inp.value;
      $(`output[for="w-${inp.name}"]`).textContent = inp.value;
      update(true);
    }));
    $('#resetw').addEventListener('click', () => {
      S.w = { ...DEFAULT_W };
      $$('.weights input').forEach((inp) => { inp.value = S.w[inp.name]; $(`output[for="w-${inp.name}"]`).textContent = inp.value; });
      update(true);
    });
    $$('.lane .send').forEach((b) => b.addEventListener('click', () => onSend(b.closest('.lane').dataset.id)));
    Object.keys(laneY).forEach((k) => delete laneY[k]);
    update(false);
  }

  function specBriefDone() {
    specBrief();
    // Keep the typed view so going back feels continuous.
    const txt = $('#txt');
    txt.textContent = MY_VIEW;
    $('#composer').classList.remove('pulse');
    $('#hint').textContent = '3 opportunities found';
    const enter = $('#enter');
    enter.disabled = false;
    enter.textContent = 'View map →';
    enter.addEventListener('click', () => { S.spec = 'map'; swap(specMap); }, { once: true });
  }

  function slider(k, name) {
    return `<label class="wrow"><div><span>${name}</span><output for="w-${k}">${S.w[k]}</output></div>
      <input type="range" id="w-${k}" name="${k}" min="0" max="100" step="5" value="${S.w[k]}"></label>`;
  }

  function lane(c) {
    const flag = flagged(c);
    const sent = c.id === 'A' && S.sent;
    let act = `<button class="btn sm ${c.id === 'A' && !S.sent ? 'primary' : ''} send">Send to ${c.rm.split(' ')[0]}</button>`;
    if (sent) act = `<button class="btn sm done" disabled>${S.approved ? 'Approved ✓' : S.rejected ? 'Rejected' : 'Sent ✓'}</button>`;
    return `
      <div class="lane ${flag ? 'flag' : ''}" data-id="${c.id}">
        <div class="node client">
          <div class="top-row"><b>Client ${c.id}</b><span class="score" data-score></span></div>
          <small>${c.sector}</small>
          ${flag ? '<span class="tag warn" style="align-self:flex-start;margin-top:4px">⚠ Verify first</span>' : ''}
          <div class="tip">Relevance ${c.f.r} · Urgency ${c.f.u} · Evidence ${c.f.e}</div>
        </div>
        <i class="link"></i>
        <div class="node biz">
          <b>${c.biz}</b><small>${c.bizSub}</small>
          <span class="tag ${c.ev}">${c.ev === 'doc' ? 'Documented' : 'Inferred'}</span>
        </div>
        <i class="link"></i>
        <div class="node rmn"><span class="av sm">${c.av}</span><b>${c.rm}</b></div>
        <div class="act">${act}</div>
      </div>`;
  }

  function update(animate) {
    const ranked = [...CLIENTS].sort((a, b) => score(b) - score(a));
    const target = {};
    ranked.forEach((c, i) => { target[c.id] = LANE_TOP + i * LANE_STEP; });
    CLIENTS.forEach((c) => {
      const el = $(`.lane[data-id="${c.id}"] [data-score]`);
      if (!el) return;
      const s = score(c);
      el.textContent = s;
      el.className = `score ${tier(s)}`;
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
    const x1 = 150, y1 = 150, x2 = 196;
    $('#wires').innerHTML = CLIENTS.map((c) => {
      const y2 = laneY[c.id] + 38;
      const s = score(c);
      const w = Math.max(1.2, (s - 40) / 10);
      const col = flagged(c) ? '#b4610e' : s >= 80 ? '#2272b4' : '#9fb6cb';
      return `<path d="M${x1} ${y1} C ${x1 + 34} ${y1}, ${x2 - 34} ${y2}, ${x2} ${y2}" fill="none" stroke="${col}" stroke-width="${w}" ${flagged(c) ? 'stroke-dasharray="5 4"' : ''} stroke-linecap="round"/>`;
    }).join('');
  }

  // ---- Send package drawer ----
  function onSend(id) {
    if (id !== 'A') { toast('This demo follows Client A → Sarah Kim'); return; }
    if (S.sent) return;
    const c = CLIENTS[0];
    openDrawer(`
      <div class="dh"><span class="av blue">SK</span><div><h2>Send to Sarah Kim</h2><small>RM · Mid-market Industrials</small></div><button class="x" data-close aria-label="Close">×</button></div>
      <div class="db">
        <div class="kv"><span class="label">Client</span><div><b>Client A</b><small>Name shown to Sarah only</small></div></div>
        <div class="kv"><span class="label">Business</span><div><b>${c.biz}</b> <span class="tag doc">Documented</span></div></div>
        <div class="kv"><span class="label">Market</span><div>US tariff on Mexican auto parts · MXN −4.1%</div></div>
        <div class="kv"><span class="label">Your view</span><q>${MY_VIEW}</q></div>
        <div class="kv"><span class="label">Evidence</span><div class="ev">${EVIDENCE.map((e) => `<div><span class="tag ${e.tag}">${e.label}</span><span class="src">${e.src}${e.locked ? ' · 🔒 RM only' : ''}</span></div>`).join('')}</div></div>
        <div class="kv"><span class="label">Score</span><div class="wts"><span><b>${score(c)}</b></span><span>R ${S.w.r}</span><span>U ${S.w.u}</span><span>E ${S.w.e}</span></div></div>
      </div>
      <div class="df"><button class="btn" data-close>Cancel</button><button class="btn primary" id="confirm">Send to Sarah</button></div>`);
    $('#confirm').addEventListener('click', confirmSend, { once: true });
  }

  async function confirmSend() {
    const b = $('#confirm');
    b.disabled = true;
    b.innerHTML = '<span class="spin"></span>Checking access';
    await wait(700);
    b.innerHTML = '<span class="spin"></span>Packaging evidence';
    await wait(700);
    b.innerHTML = 'Sent ✓';
    await wait(400);
    closeDrawer();
    S.sent = true;
    S.sentScore = score(CLIENTS[0]);
    S.sentW = { ...S.w };
    setStep(3);
    const act = $('.lane[data-id="A"] .act');
    if (act) act.innerHTML = '<button class="btn sm done" disabled>Sent ✓</button>';
    toast('Sent to Sarah Kim');
    unlockRM();
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

  // =========================================================
  // Relationship manager
  // =========================================================
  function renderRM() {
    if (S.rm === 'brief') return rmBrief();
    if (S.rm === 'review') return rmReview();
    rmHome();
  }

  // ---- Screen 3a: RM home + notification ----
  async function rmHome() {
    setStep(3);
    setNav('home');
    const pending = !S.approved && !S.rejected;
    view.innerHTML = `
      <div class="page fade-in">
        <div class="head"><h1>My accounts</h1><span class="sub">Mid-market Industrials</span></div>
        <div class="card" style="overflow-x:auto">
          <table class="table">
            <thead><tr><th>Account</th><th>Sector</th><th>Last contact</th><th>SignalBridge</th></tr></thead>
            <tbody>
              <tr class="${pending ? 'new' : ''}" id="atlas"><td><b>Atlas Components</b></td><td>Auto parts</td><td>Sep 30</td><td>${pending ? `<span class="tag inf">New · ${S.sentScore}</span>` : S.approved ? '<span class="tag doc">Approved</span>' : '<span class="tag">Rejected</span>'}</td></tr>
              <tr><td>Brightline Tools</td><td>Machinery</td><td>Oct 22</td><td><span style="color:var(--faint)">—</span></td></tr>
              <tr><td>Keystone Plastics</td><td>Packaging</td><td>Nov 3</td><td><span style="color:var(--faint)">—</span></td></tr>
              <tr><td>Northfield Metals</td><td>Steel</td><td>Oct 8</td><td><span style="color:var(--faint)">—</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>`;
    $('#atlas').addEventListener('click', () => { if (pending || S.approved) openReview(); });
    if (!pending) return;
    setBadge(1);
    await wait(700);
    const n = document.createElement('div');
    n.className = 'notif';
    n.innerHTML = `
      <div class="nh"><span class="ai">SignalBridge</span><span class="time">now</span></div>
      <div class="nb"><span class="av">JL</span><div><b>Atlas Components</b><small>MXN forward hedge · from Jordan Lee</small></div><span class="score">${S.sentScore}</span></div>
      <button class="btn primary pulse" id="review">Review</button>`;
    $('#screen').append(n);
    requestAnimationFrame(() => n.classList.add('show'));
    $('#review').addEventListener('click', openReview);
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
    const c = CLIENTS[0];
    view.innerHTML = `
      <div class="page fade-in">
        <button class="back" id="home">← My accounts</button>
        <div class="head">
          <h1>Atlas Components</h1>
          <span class="tag doc">Your client</span>
          <span class="sub">MXN forward hedge · from Jordan Lee, FX Specialist</span>
        </div>
        <div class="review">
          <div class="card main">
            <div class="kv"><span class="label">Market</span><div>US tariff on Mexican auto parts · MXN −4.1%</div></div>
            <div class="kv"><span class="label">Jordan's view</span><q>${MY_VIEW}</q></div>
            <div class="kv"><span class="label">Evidence</span>
              <div class="ev">
                ${EVIDENCE.map((e) => `<div><span class="tag ${e.tag}">${e.label}</span><span class="src">${e.src}</span></div>`).join('')}
                <div class="note-unlock">“CFO is considering moving ~30% of stamping supply to Monterrey in 2027.”</div>
              </div>
            </div>
          </div>
          <div class="card decide">
            <div class="big"><strong>${S.sentScore}</strong><span class="tag doc">Act</span></div>
            <div class="bars">
              ${bar('Relevance', c.f.r)}${bar('Urgency', c.f.u)}${bar('Evidence', c.f.e)}
            </div>
            <div class="wts"><span>Weights</span><span>R <b>${S.sentW.r}</b></span><span>U <b>${S.sentW.u}</b></span><span>E <b>${S.sentW.e}</b></span></div>
            <div id="decision">${decisionHTML()}</div>
          </div>
        </div>
      </div>`;
    $('#home').addEventListener('click', () => { S.rm = 'home'; swap(rmHome); });
    requestAnimationFrame(() => requestAnimationFrame(() => $$('.bars .f').forEach((f) => { f.style.width = `${f.dataset.v}%`; })));
    bindDecision();
  }

  const bar = (n, v) => `<div class="b"><span>${n}</span><div class="t"><div class="f" data-v="${v}"></div></div><span class="v">${v}</span></div>`;

  function decisionHTML() {
    if (S.approved) return '<button class="btn primary" id="tobrief" style="width:100%">Open brief →</button>';
    if (S.rejected) return '<div class="reasons"><span class="tag">Rejected · reason sent to Jordan</span><button class="btn sm" id="undo">Undo</button></div>';
    return '<div class="acts"><button class="btn" id="reject">Reject</button><button class="btn primary pulse" id="approve">Approve</button></div>';
  }

  function bindDecision() {
    $('#approve')?.addEventListener('click', approve, { once: true });
    $('#tobrief')?.addEventListener('click', () => { S.rm = 'brief'; swap(rmBrief); });
    $('#undo')?.addEventListener('click', () => { S.rejected = false; $('#decision').innerHTML = decisionHTML(); bindDecision(); });
    $('#reject')?.addEventListener('click', () => {
      $('#decision').innerHTML = `<div class="reasons"><span class="label">Why?</span>
        ${['Already discussed', 'Not relevant', 'Bad timing'].map((r) => `<button class="btn sm" data-r>${r}</button>`).join('')}</div>`;
      $$('[data-r]').forEach((b) => b.addEventListener('click', () => {
        S.rejected = true;
        $('#decision').innerHTML = decisionHTML();
        bindDecision();
        toast('Reason sent to Jordan. Future matches learn from it.');
      }));
    });
  }

  async function approve() {
    const b = $('#approve');
    b.classList.remove('pulse');
    b.innerHTML = '<span class="spin"></span>Drafting brief';
    $('#reject').disabled = true;
    await wait(1400);
    S.approved = true;
    toast('Approved. Jordan is notified.');
    S.rm = 'brief';
    swap(rmBrief);
  }

  // ---- Screen 4: AI brief (Outlook draft) ----
  function rmBrief() {
    setStep(4);
    setNav('accounts');
    view.innerHTML = `
      <div class="page fade-in">
        <button class="back" id="toreview">← Atlas Components</button>
        <div class="head"><h1>Meeting brief</h1><span class="ai">AI draft · edit freely</span></div>
        <div class="card mail">
          <div class="mh"><span class="ol">O</span><b>Outlook · Draft</b><span class="tag warn">Not sent</span></div>
          <div class="mf"><span>To</span><span>Sarah Kim (you)</span></div>
          <div class="mf"><span>Subject</span><span>Prep · Atlas Components · MXN hedging</span></div>
          <div class="body" contenteditable="true" spellcheck="false">
            <div><span class="label">Open with</span>
              <p class="open" style="margin-top:6px">“Yesterday's tariff and the peso move could change the cost of your Monterrey plan. Worth 30 minutes to look at locking in rates?”</p></div>
            <div><span class="label">Talking points</span>
              <ul style="margin-top:6px">
                <li>15% US tariff on Mexican auto parts from Jan 1<span class="cite">3</span></li>
                <li>MXN −4.1% this week; 1M vol up to 16.8%<span class="cite">2</span></li>
                <li>Your 2027 plan to move ~30% of stamping to Monterrey<span class="cite">1</span></li>
              </ul></div>
            <div><span class="label">Ask</span><p style="margin-top:6px">Call this week with your CFO and Jordan Lee (FX).</p></div>
          </div>
          <div class="foot">
            <span class="safe">🔒 Nothing is sent to the client</span>
            <button class="btn" id="copy">Copy</button>
            <button class="btn primary" id="outlook">Open in Outlook</button>
          </div>
        </div>
      </div>`;
    $('#toreview').addEventListener('click', () => { S.rm = 'review'; swap(rmReview); });
    $('#copy').addEventListener('click', () => toast('Copied'));
    $('#outlook').addEventListener('click', () => toast('Opened as a draft in Outlook'));
  }

  // ---------- Start / restart ----------
  function start() {
    run++;
    S = fresh();
    document.body.dataset.mode = 'spec';
    closeDrawer();
    $('.notif')?.remove();
    const rmBtn = $('[data-mode="rm"]', sw);
    rmBtn.setAttribute('aria-disabled', 'true');
    $$('button', sw).forEach((x) => x.classList.toggle('on', x.dataset.mode === 'spec'));
    sw.classList.remove('ready');
    nudge.classList.remove('show', 'warn');
    setMe('spec');
    renderSpec();
  }
  $('#restart').addEventListener('click', start);
  $('#bell').addEventListener('click', () => {
    if (S.mode === 'rm' && S.sent && !S.approved && !S.rejected) openReview();
    else toast('No new notifications');
  });
  start();
})();
