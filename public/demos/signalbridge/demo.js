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
  const SUGGESTED = 'MXN volatility could raise hedging needs for US manufacturers sourcing in Mexico.';
  const DEFAULT_W = { r: 45, u: 35, e: 20 };

  // How the specialist's sentence is read: currency, region, industry, need.
  // Currency and region give context; industry and need decide which clients match.
  const IMPACTS = {
    mxn: { facet: 'Currency', label: 'MXN', fixed: true, kw: ['mxn', 'peso'] },
    mexico: { facet: 'Region', label: 'Mexico', fixed: true, kw: ['mexic', 'cross-border', 'monterrey'] },
    mfg: { facet: 'Industry', label: 'US manufacturers', kw: ['us manufacturers', 'manufactur', 'auto parts', 'auto suppliers'] },
    logistics: { facet: 'Industry', label: 'Logistics firms', kw: ['logistics firms', 'logistic', 'freight', 'shipping'] },
    importers: { facet: 'Industry', label: 'Food importers', kw: ['food importers', 'importer', 'food'] },
    hedging: { facet: 'Need', label: 'Hedging', kw: ['hedg'] },
    collections: { facet: 'Need', label: 'Collections', kw: ['collection', 'receivable', 'paid in'] },
  };
  const FACET_CLASS = { Currency: 'f-cur', Region: 'f-reg', Industry: 'f-ind', Need: 'f-need' };

  const MARKET_EV = { tag: '', label: 'Market data', src: 'MXN −4.1% · 1M vol 16.8%' };
  const NEWS_EV = { tag: '', label: 'News', src: 'Tariff announcement · Nov 11' };

  const RMS = {
    SK: { name: 'Sarah', first: 'Sarah', team: 'Mid-market Industrials', others: [['Brightline Tools', 'Machinery', 'Oct 22'], ['Keystone Plastics', 'Packaging', 'Nov 3'], ['Northfield Metals', 'Steel', 'Oct 8']] },
    DO: { name: 'David', first: 'David', team: 'Transport & Logistics', others: [['Gulfway Shipping', 'Ports', 'Oct 30'], ['Plainsman Trucking', 'Trucking', 'Nov 5'], ['Delta Cold Chain', 'Storage', 'Oct 12']] },
    PS: { name: 'Priya', first: 'Priya', team: 'Industrials West', others: [['Redwood Valves', 'Valves', 'Oct 17'], ['Mesa Robotics', 'Automation', 'Nov 6'], ['Clearwater Glass', 'Glass', 'Sep 25']] },
    TB: { name: 'Tom', first: 'Tom', team: 'Logistics South', others: [['Bayou Barge Co.', 'Barges', 'Oct 9'], ['Lone Star Rail', 'Rail', 'Nov 1'], ['Coastal Reefer', 'Cold chain', 'Oct 21']] },
    MC: { name: 'Maya', first: 'Maya', team: 'Consumer & Food', others: [['Harvest Table Co.', 'Grocery', 'Oct 19'], ['Pacific Snacks', 'Packaged food', 'Nov 2'], ['Sierra Beverages', 'Beverages', 'Oct 27']] },
  };

  const CLIENTS = [
    {
      id: 'A', name: 'Atlas Components', sector: 'Auto parts · Ohio', industry: 'Auto parts', last: 'Sep 30', contact: 'CFO',
      biz: 'MXN forward hedge', bizSub: '~$40M Mexico payables', ev: 'doc', rm: 'SK', imp: ['mfg', 'hedging'], pts: { mxn: 14, mexico: 18, mfg: 30, hedging: 26 },
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
      biz: 'MXN cash mgmt', bizSub: 'Peso receivables', ev: 'inf', rm: 'DO', imp: ['logistics', 'collections'], pts: { mxn: 15, mexico: 12, logistics: 28, collections: 22 },
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
      biz: 'MXN option collar', bizSub: 'Seasonal imports', ev: 'inf', rm: 'MC', imp: ['importers', 'hedging'], pts: { mxn: 12, mexico: 10, importers: 20, hedging: 22 },
      evid: [{ tag: 'inf', label: 'Inferred', src: 'Trade-finance data: MXN produce invoices', quote: null }, MARKET_EV, NEWS_EV],
      brief: {
        open: 'Peso swings are big right now. Before your spring produce orders, is it worth capping your MXN costs?',
        pts: [['1M MXN vol up to 16.8%', 2], ['Seasonal MXN produce invoices (trade-finance data)', 1], ['No FX discussion on file: confirm exposure first', null]],
        ask: 'Confirm MXN exposure, then a collar intro with Jordan (FX).',
      },
      yes: 'Exposure confirmed: <b>~$8M in spring produce invoices</b>. Can you show a collar vs. a forward?',
    },
    {
      id: 'D', name: 'Keystone Plastics', sector: 'Packaging · Michigan', industry: 'Packaging', last: 'Nov 3', contact: 'controller',
      biz: 'MXN forward hedge', bizSub: 'Resin bought from Mexico', ev: 'inf', rm: 'SK', imp: ['mfg', 'hedging'], pts: { mxn: 10, mexico: 12, mfg: 24, hedging: 18 },
      evid: [{ tag: 'inf', label: 'Inferred', src: 'Supplier payments to Mexico in AP data', quote: 'Controller asked about USD/MXN pricing on resin last quarter.' }, MARKET_EV, NEWS_EV],
      brief: {
        open: 'Your Mexico resin costs just moved with the peso. Worth a quick look at fixing next quarter\'s rate?',
        pts: [['MXN −4.1% this week; 1M vol 16.8%', 2], ['Resin supplier payments to Mexico', 1], ['Tariff from Jan 1 may shift sourcing', 3]],
        ask: 'Short call with your controller and Jordan (FX).',
      },
      yes: 'They want to <b>fix Q1 resin payments (~$6M)</b>. Can you price a 3-month forward?',
    },
    {
      id: 'E', name: 'Gulfway Shipping', sector: 'Ports · Louisiana', industry: 'Ports', last: 'Oct 30', contact: 'CFO',
      biz: 'MXN cash mgmt', bizSub: 'Port fees billed in MXN', ev: 'inf', rm: 'DO', imp: ['logistics', 'collections'], pts: { mxn: 12, mexico: 9, logistics: 22, collections: 18 },
      evid: [{ tag: 'inf', label: 'Inferred', src: 'Veracruz port fees billed in MXN', quote: null }, MARKET_EV, NEWS_EV],
      brief: {
        open: 'Peso swings hit your Veracruz fees when you convert. Want to look at a steadier conversion plan?',
        pts: [['1M MXN vol up to 16.8%', 2], ['Veracruz port fees billed in MXN', 1], ['Tariff may change Gulf trade volumes', 3]],
        ask: 'Intro call with your CFO and Jordan (FX).',
      },
      yes: 'They want to <b>convert MXN fees on a fixed schedule</b>. Can you suggest a structure?',
    },
  ];

  // More clients, F–Z: [id, name, sector, rm, industry, need, why, [mxn, mexico, industry, need] points]
  const MORE = [
    ['F', 'Sierra Auto Systems', 'Auto parts · Texas', 'SK', 'mfg', 'hedging', 'Runs a brake-parts plant in Saltillo', [12, 16, 28, 20]],
    ['G', 'Copperline Logistics', 'Trucking · Arizona', 'DO', 'logistics', 'collections', 'Invoices Mexican shippers in pesos', [12, 12, 26, 20]],
    ['H', 'Ironbridge Castings', 'Castings · Ohio', 'PS', 'mfg', 'hedging', 'Buys castings from a Monterrey supplier', [10, 14, 24, 18]],
    ['I', 'Bluewater Appliances', 'Appliances · Kentucky', 'PS', 'mfg', 'hedging', 'Assembles washers with Mexican motors', [11, 13, 22, 16]],
    ['J', 'Del Campo Produce', 'Produce importer · Texas', 'MC', 'importers', 'hedging', 'Buys avocados in pesos each season', [12, 11, 24, 22]],
    ['K', 'Summit Wire & Cable', 'Wire · Indiana', 'SK', 'mfg', 'hedging', 'Sources copper wire from Juárez', [10, 15, 22, 14]],
    ['L', 'Laredo Crossdock', 'Warehousing · Texas', 'TB', 'logistics', 'collections', 'Bills Mexican clients for storage in MXN', [11, 13, 24, 18]],
    ['M', 'Prairie Tractor Works', 'Farm equipment · Iowa', 'PS', 'mfg', 'collections', 'Sells tractors to Mexican dealers in pesos', [10, 10, 20, 20]],
    ['N', 'Granite Bay Electronics', 'Electronics · California', 'SK', 'mfg', 'hedging', 'Contract manufacturer in Tijuana', [12, 14, 20, 16]],
    ['O', 'Pacific Rim Freight', 'Freight · California', 'TB', 'logistics', 'hedging', 'Pays Mexican carriers in pesos', [10, 10, 18, 18]],
    ['P', 'Golden Harvest Foods', 'Food importer · Florida', 'MC', 'importers', 'hedging', 'Imports tomatoes priced in pesos', [11, 10, 20, 18]],
    ['Q', 'Riverside Plastics', 'Plastics · Georgia', 'PS', 'mfg', 'hedging', 'Buys resin pellets from Altamira', [9, 12, 18, 14]],
    ['R', 'Cascade Auto Interiors', 'Auto parts · Michigan', 'SK', 'mfg', 'hedging', 'Seats made at a Puebla supplier', [12, 16, 26, 22]],
    ['S', 'Border Express', 'Courier · Texas', 'TB', 'logistics', 'collections', 'Paid in pesos for cross-border parcels', [12, 12, 22, 18]],
    ['T', 'Heartland Pumps', 'Industrial pumps · Kansas', 'PS', 'mfg', 'collections', 'Sells pumps to Mexican mines', [9, 10, 18, 18]],
    ['U', 'Northstar Fasteners', 'Fasteners · Illinois', 'SK', 'mfg', 'hedging', 'Steel bolts sourced in Monterrey', [11, 15, 24, 18]],
    ['V', 'Sunbelt Cold Chain', 'Cold storage · Arizona', 'TB', 'logistics', 'hedging', "Pays Mexican growers' freight in MXN", [10, 9, 18, 16]],
    ['W', 'Gulf Coast Carriers', 'Shipping · Texas', 'DO', 'logistics', 'collections', 'Port of Veracruz fees in pesos', [11, 10, 22, 16]],
    ['X', 'Casa Verde Snacks', 'Snack importer · Illinois', 'MC', 'importers', 'hedging', 'Buys tortilla chips in pesos', [10, 9, 18, 16]],
    ['Y', 'Maple Leaf Grocers', 'Grocery importer · New York', 'MC', 'importers', 'collections', 'Mexican distributor pays in pesos', [9, 8, 16, 14]],
    ['Z', 'Apex Machine Tools', 'Machine tools · Wisconsin', 'PS', 'mfg', 'hedging', 'Buys Mexican-made spindles', [10, 12, 20, 14]],
  ];
  const LAST = ['Oct 2', 'Sep 18', 'Oct 27', 'Nov 4', 'Aug 29', 'Oct 11', 'Sep 9'];
  MORE.forEach(([id, name, sector, rm, who, need, why, [a, b, c, d]], i) => {
    const hedge = need === 'hedging';
    CLIENTS.push({
      id, name, sector, industry: sector.split(' · ')[0], last: LAST[i % LAST.length], contact: 'finance lead',
      biz: hedge ? 'MXN forward hedge' : 'MXN cash mgmt', bizSub: hedge ? 'Mexico supplier payments' : 'Peso receipts',
      ev: 'inf', rm, imp: [who, need], pts: { mxn: a, mexico: b, [who]: c, [need]: d }, why,
      evid: [{ tag: 'inf', label: 'Inferred', src: why, quote: null }, MARKET_EV, NEWS_EV],
      brief: {
        open: hedge
          ? 'The peso move changes what you pay your Mexican suppliers. Worth a quick look at locking in a rate?'
          : 'The weaker peso cuts what your Mexico invoices are worth in dollars. Want to look at converting faster?',
        pts: [['MXN −4.1% this week; 1M vol 16.8%', 2], [why, 1], ['US tariff on Mexican auto parts from Jan 1', 3]],
        ask: 'Short call with your finance lead and Jordan (FX).',
      },
      yes: hedge
        ? "They want to <b>hedge next quarter's MXN payments</b>. Can you price a forward?"
        : 'They want to <b>convert MXN receipts weekly</b>. Can you suggest a setup?',
    });
  });

  // ---------- State ----------
  let run = 0;
  let S;
  const fresh = () => ({
    mode: 'spec', spec: 'brief', rm: 'home', text: '', ovr: {}, w: { ...DEFAULT_W },
    target: null, chat: [], note: '', meeting: null, meetingSeen: false, approved: false, rejected: false, replied: false, replyRead: false, outcome: 'Interested',
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
  const activeKeys = () => Object.keys(IMPACTS).filter((k) => !IMPACTS[k].fixed && isOn(k));
  const visible = (c) => c.imp.some(isOn);
  const PT_ORDER = ['mxn', 'mexico', 'mfg', 'logistics', 'importers', 'hedging', 'collections'];
  const ptKeys = (c) => PT_ORDER.filter((k) => k in c.pts);
  const score = (c) => ptKeys(c).filter(isOn).reduce((n, k) => n + c.pts[k], 0);
  const flagged = () => false;
  // stacked bar: one colored segment per phrase; phrases that are off show as an outline
  const breakdown = (c, on = isOn) => `<span class="bd">${ptKeys(c).map((k) => {
    const t = IMPACTS[k];
    const live = on(k);
    return `<i class="${FACET_CLASS[t.facet]} ${live ? '' : 'off'}" style="width:${c.pts[k]}%" title="${t.label} ${live ? '+' : 'would add +'}${c.pts[k]}"></i>`;
  }).join('')}</span>`;
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
    else if (S.meeting && !S.meetingSeen) meetingNotif();
  }

  async function meetingNotif() {
    setBadge(1);
    await wait(700);
    const rm = R();
    popNotif(`
      <div class="nh"><span class="ol">O</span>Calendar<span class="time">now</span></div>
      <div class="nb"><span class="av blue">${S.target.rm}</span><div><b>${rm.name} invited you</b><small>${S.meeting.slot} · ${S.target.name}</small></div></div>
      <div class="note-unlock" style="margin:0;font-size:12px">${esc(S.meeting.agenda)}</div>
      <button class="btn primary pulse" data-open>Accept</button>`, () => {
      S.meetingSeen = true;
      setBadge(0);
      $('.notif')?.remove();
      toast(`Accepted · ${S.meeting.slot} added to your calendar`);
    });
  }

  // ---- Screen 1: AI market brief + the specialist's view ----
  function specBrief() {
    setStep(1);
    view.innerHTML = `
      <div class="page fade-in">
        <div class="mhead"><span class="label">Market today</span><span class="ai">AI summary · 6:30 AM</span><span class="tag">FX · Americas</span></div>
        <div class="signals mini">
          <div class="card sig"><span class="tag hi">Policy</span><b>US 15% tariff on Mexican auto parts</b><strong>Jan 1</strong></div>
          <div class="card sig"><span class="tag">Market</span><b>Peso falls after tariff news</b><strong class="down">−4.1%</strong></div>
          <div class="card sig"><span class="tag warn">Risk</span><b>Peso volatility jumps</b><strong>16.8%</strong></div>
        </div>

        <div class="composer hero ${S.text ? '' : 'pulse'}" id="composer">
          <div class="clabel"><h2>Your view</h2><span class="hint2">One sentence: who does this move hit, and how?</span></div>
          <div class="hlwrap">
            <div class="hl" id="hl" aria-hidden="true"></div>
            <textarea id="txt" rows="2" placeholder="Click to add your view…">${esc(S.text)}</textarea>
          </div>
          <div class="reads" id="reads"></div>
          <div class="bar">
            <span class="hint" id="hint"></span>
            <button class="btn primary enter" id="enter">Find clients →</button>
          </div>
        </div>

        <div id="after"></div>
      </div>`;
    const ta = $('#txt');
    ta.addEventListener('focus', () => {
      $('#composer').classList.add('focus');
      $('#composer').classList.remove('pulse');
      if (!S.text) typeText(SUGGESTED);
    });
    ta.addEventListener('blur', () => $('#composer').classList.remove('focus'));
    ta.addEventListener('input', () => {
      S.text = ta.value;
      autoGrow(ta);
      showPending();
      clearTimeout(detectT);
      detectT = setTimeout(detect, 800);
    });
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); analyze(); } });
    $('#enter').addEventListener('click', analyze);
    autoGrow(ta);
    if (S.text) renderReads(); else showPending();
  }

  // While the sentence is still being written: plain text, no chips yet.
  let detectT = 0;
  let detecting = false;
  function showPending() {
    if (!$('#reads')) return;
    $('#hl').innerHTML = `${esc(S.text)}\n`;
    $('#reads').innerHTML = `<span class="label">AI reads</span><span class="reading">${S.text.trim() ? 'Waiting for the full sentence…' : 'Your view will be read as currency, region, industry and need'}</span>`;
    $('#enter').disabled = true;
    $('#enter').classList.remove('pulse');
    $('#hint').textContent = S.text.trim() ? '' : 'Click the box to add your view';
  }
  // Sentence done: a short "reading" beat, then highlights and chips appear one by one.
  async function detect() {
    if (!$('#reads')) return;
    if (!S.text.trim()) return showPending();
    detecting = true;
    $('#reads').innerHTML = '<span class="label">AI reads</span><span class="reading shimmer"><span class="spin dark"></span>Reading your view…</span>';
    try {
      await wait(700);
      detecting = false;
      renderReads(true);
    } catch (e) { detecting = false; }
  }

  const autoGrow = (ta) => { ta.style.height = 'auto'; ta.style.height = `${ta.scrollHeight}px`; };

  // Find keyword hits in the text, expanded to whole words, without overlaps.
  function findHits(text) {
    const low = text.toLowerCase();
    const all = [];
    Object.keys(IMPACTS).forEach((k) => IMPACTS[k].kw.forEach((w) => {
      let i = 0;
      while ((i = low.indexOf(w, i)) !== -1) {
        let st = i;
        let en = i + w.length;
        while (st > 0 && /[a-z]/i.test(text[st - 1])) st--;
        while (en < text.length && /[a-z]/i.test(text[en])) en++;
        all.push({ st, en, k });
        i = en;
      }
    }));
    all.sort((x, y) => x.st - y.st || y.en - x.en);
    const out = [];
    let end = -1;
    all.forEach((m) => { if (m.st >= end) { out.push(m); end = m.en; } });
    return out;
  }

  function renderReads(reveal) {
    const box = $('#reads');
    if (!box) return;
    const text = S.text;
    const hits = findHits(text);

    // colored highlights behind the text
    let html = '';
    let pos = 0;
    hits.forEach((m) => {
      html += esc(text.slice(pos, m.st));
      const d = reveal ? ` style="animation-delay:${hits.indexOf(m) * 140}ms"` : '';
      html += `<mark class="${FACET_CLASS[IMPACTS[m.k].facet]} ${isOn(m.k) ? '' : 'off'} ${reveal ? 'reveal' : ''}"${d}>${esc(text.slice(m.st, m.en))}</mark>`;
      pos = m.en;
    });
    $('#hl').innerHTML = `${html + esc(text.slice(pos))}\n`;

    // one chip per phrase the AI read, labelled with what kind of signal it is
    const prev = new Set($$('.kchip.on', box).map((c) => c.dataset.k));
    const keys = Object.keys(IMPACTS).filter((k) => fromText(k) || k in S.ovr);
    box.innerHTML = `<span class="label">AI reads</span>${keys.map((k, i) => chipHTML(k, !prev.has(k), reveal ? i : -1)).join('')}`;
    $$('.kchip:not(.fixed)', box).forEach((c) => c.addEventListener('click', () => {
      const k = c.dataset.k;
      S.ovr[k] = !isOn(k);
      if (S.ovr[k] === fromText(k)) delete S.ovr[k];
      renderReads();
    }));

    const n = activeKeys().length;
    $('#hint').textContent = !text.trim() ? 'Click the box to add your view' : n ? 'Click a chip to add or remove it' : 'Add an industry or need to match on';
    const ready = !!text.trim() && n > 0 && !typing && !detecting;
    $('#enter').disabled = !ready;
    $('#enter').classList.toggle('pulse', ready);
  }

  function chipHTML(k, fresh, order = -1) {
    const t = IMPACTS[k];
    const on = isOn(k);
    const cls = `kchip ${FACET_CLASS[t.facet]} ${on ? 'on' : ''} ${t.fixed ? 'fixed' : ''} ${order >= 0 ? 'reveal' : on && fresh ? 'pop' : ''}`;
    const delay = order >= 0 ? ` style="animation-delay:${200 + order * 110}ms"` : '';
    const you = srcOf(k) === 'you' ? '<em>added by you</em>' : '';
    return `<button class="${cls}"${delay} data-k="${k}" ${t.fixed ? 'tabindex="-1"' : `title="${on ? 'Click to remove' : 'Click to add'}"`}><small>${t.facet}</small><b>${t.label}</b>${you}</button>`;
  }

  let typing = false;
  async function typeText(full) {
    if (typing || analyzing) return;
    typing = true;
    const ta = $('#txt');
    $('#composer').classList.add('focus');
    S.ovr = {};
    const start = performance.now();
    const dur = Math.max(1400, full.length * 14);
    const id = run;
    await new Promise((res) => {
      const tick = (now) => {
        if (id !== run || !document.body.contains(ta)) return res();
        const n = Math.min(full.length, Math.round(((now - start) / dur) * full.length));
        ta.value = full.slice(0, n);
        S.text = ta.value;
        autoGrow(ta);
        showPending();
        if (n < full.length) requestAnimationFrame(tick); else res();
      };
      requestAnimationFrame(tick);
    });
    typing = false;
    if (document.body.contains(ta)) { $('#composer').classList.remove('focus'); detect(); }
  }

  function spark() {
    const pts = [8, 9, 7, 8, 6, 7, 6, 12, 18, 22, 21, 24];
    const d = pts.map((y, i) => `${i ? 'L' : 'M'}${(i * 100) / (pts.length - 1)} ${y}`).join(' ');
    return `<svg class="spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" fill="none" stroke="#c82d4c" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>`;
  }

  function funnelNums() {
    const shown = CLIENTS.filter(visible).length;
    const exposed = Math.round(activeKeys().reduce((n, k) => n + EXPOSED[k], 0) * 0.75);
    const rest = Math.max(0, exposed - shown - 1);
    const hedged = Math.round(rest * 0.65);
    return { shown, exposed, hedged, weak: rest - hedged };
  }

  let analyzing = false;
  async function analyze() {
    if (analyzing || typing || detecting || $('#enter')?.disabled || !S.text.trim() || !activeKeys().length) return;
    analyzing = true;
    const enter = $('#enter');
    enter.disabled = true;
    enter.classList.remove('pulse');
    $('#txt').disabled = true;
    const f = funnelNums();
    const steps = [
      ['Reading your view', Object.keys(IMPACTS).filter(isOn).map((k) => IMPACTS[k].label).join(' · ')],
      [`Scanning ${TOTAL} clients`, `${f.exposed} exposed`],
      ['Checking information barriers', '1 restricted'],
      ['Matching CRM notes and ranking', `${f.shown} worth a call`],
    ];
    const box = document.createElement('div');
    box.className = 'card proc fade-in';
    box.innerHTML = `
      <div class="proch"><span class="spin dark"></span><b id="proct">Finding clients…</b><span class="procpct" id="procpct">0%</span></div>
      <div class="procbar"><i id="procfill"></i></div>
      ${steps.map(([t]) => `<div class="pstep"><i></i><span>${t}</span><b></b></div>`).join('')}`;
    $('#after').replaceChildren(box);
    box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    const lines = $$('.pstep', box);
    try {
      for (let i = 0; i < lines.length; i++) {
        lines[i].classList.add('run');
        await wait(i === 1 ? 900 : 600);
        lines[i].classList.replace('run', 'ok');
        $('b', lines[i]).textContent = steps[i][1];
        const pct = Math.round(((i + 1) / lines.length) * 100);
        $('#procfill').style.width = `${pct}%`;
        $('#procpct').textContent = `${pct}%`;
      }
      $('.proch .spin', box).replaceWith(Object.assign(document.createElement('span'), { className: 'okdot' }));
      $('#proct').textContent = `${f.shown} clients worth a call`;
      await wait(700);
      S.spec = 'map';
      swap(specMap);
    } finally { analyzing = false; }
  }

  // ---- Screen 2: funnel + shortlist ----
  const TOTAL = 700;
  const EXPOSED = { mfg: 41, logistics: 23, importers: 18, hedging: 30, collections: 17 };
  const WHY = {
    A: 'Plans to move 30% of supply to Monterrey',
    B: 'Bills ~40% of cross-border loads in pesos',
    C: 'Pays seasonal produce invoices in pesos',
    D: 'Pays Mexican resin suppliers',
    E: 'Port fees in Veracruz billed in pesos',
  };
  const ACT_COUNT = 4;
  let topIds = new Set();

  function specMap() {
    setStep(S.replied ? 6 : S.target ? (S.approved ? 4 : 3) : 2);
    view.innerHTML = `
      <div class="page fade-in">
        <button class="back" id="back">← Edit my view</button>
        <div class="head">
          <h1>Who to reach out to</h1>
        </div>
        <div class="card judge">
          <span class="label">Matching on</span>
          <div class="jchips" id="jchips"></div>
        </div>
        <div class="funnel" id="funnel"></div>
        <div id="lists"></div>
      </div>`;
    $('#back').addEventListener('click', () => { S.spec = 'brief'; swap(specBrief); });
    seen = new Set(CLIENTS.filter(visible).map((c) => c.id));
    update();
  }

  let seen = new Set();
  let whyOpen = false;
  let showAll = false;
  const esc = (t) => t.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  function actHTML(c) {
    if (S.target && S.target.id === c.id) {
      const label = S.replied ? (S.rejected ? `Rejected · ${S.outcome}` : `${S.outcome} ✓`) : S.approved ? 'Approved ✓' : 'Sent ✓';
      return `<button class="btn sm done" disabled>${label}</button>`;
    }
    return `<button class="btn sm ${S.target || !topIds.has(c.id) ? '' : 'primary'} send" ${S.target ? 'disabled title="One hand-off per run"' : ''}>Send to ${RMS[c.rm].first}</button>`;
  }

  function item(c, fresh) {
    const s = score(c);
    return `
      <div class="pick ${fresh ? 'fresh' : ''}" data-id="${c.id}" title="Open details">
        <span class="pscore ${tier(s)}">${s}</span>
        <span class="pwho"><b>Client ${c.id}</b><small>${WHY[c.id] || c.why}</small></span>
        ${breakdown(c)}
        <span class="prm"><span class="av sm">${c.rm}</span>${RMS[c.rm].name}</span>
        <span class="act">${actHTML(c)}</span>
      </div>`;
  }

  function update() {
    if (!$('#lists')) return;
    // judgment chips (same controls as screen 1)
    $('#jchips').innerHTML = Object.keys(IMPACTS).filter((k) => fromText(k) || k in S.ovr).map((k) => chipHTML(k, false)).join('');
    $$('#jchips .kchip:not(.fixed)').forEach((ch) => ch.addEventListener('click', () => {
      const k = ch.dataset.k;
      S.ovr[k] = !isOn(k);
      if (S.ovr[k] === fromText(k)) delete S.ovr[k];
      update();
    }));

    // funnel
    const shown = CLIENTS.filter(visible).sort((x, y) => score(y) - score(x));
    const { exposed, hedged, weak } = funnelNums();
    $('#funnel').innerHTML = `
      <span><b>${TOTAL}</b> clients</span><i class="farrow"></i><span class="fhi"><b>${shown.length}</b> worth a call</span>
      <button class="why" id="whyhidden">Why not the others?</button>
      <div class="fwhy" id="fwhy" ${whyOpen ? '' : 'hidden'}>${TOTAL - exposed} no exposure · ${hedged} already hedged · ${weak} weak evidence · 1 restricted</div>`;
    $('#whyhidden').addEventListener('click', () => { whyOpen = !whyOpen; $('#fwhy').hidden = !whyOpen; });

    // lists
    const now = shown.slice(0, ACT_COUNT);
    const later = shown.slice(ACT_COUNT);
    topIds = new Set(now.map((c) => c.id));
    const block = (title, list, cap) => {
      if (!list.length) return '';
      const cut = cap && !showAll ? list.slice(0, cap) : list;
      const more = list.length - cut.length;
      return `
      <section class="tier">
        <div class="tierhead"><b>${title}</b><em>${list.length}</em>${title === 'Act now' ? '<span class="bdlegend">Bar = what each phrase adds to the score</span>' : ''}</div>
        <div class="card picks">${cut.map((c) => item(c, !seen.has(c.id))).join('')}
          ${more ? `<button class="showmore" id="showmore">Show ${more} more</button>` : ''}</div>
      </section>`;
    };
    $('#lists').innerHTML = shown.length
      ? block('Act now', now) + block('Worth a check', later, 6)
      : '<div class="card empty">No clients match. Switch on a judgment above.</div>';
    seen = new Set(shown.map((c) => c.id));
    $('#showmore')?.addEventListener('click', () => { showAll = true; update(); });

    $$('.pick').forEach((r) => r.addEventListener('click', (e) => {
      if (e.target.closest('.send, .done')) return;
      openPackage(r.dataset.id);
    }));
    bindSends();
  }

  const bindSends = () => $$('.pick .send').forEach((b) => b.addEventListener('click', (e) => {
    e.stopPropagation();
    openPackage(b.closest('.pick').dataset.id);
  }));

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
        <div class="kv"><span class="label">Matched on</span><div class="bdlist">${ptKeys(c).map((k) => `<span class="${FACET_CLASS[IMPACTS[k].facet]} ${isOn(k) ? '' : 'off'}"><i></i>${IMPACTS[k].label}<b>${isOn(k) ? '+' : ''}${c.pts[k]}</b></span>`).join('')}</div></div>
        <div class="kv"><span class="label">Business</span><div><b>${c.biz}</b> <span class="tag ${c.ev}">${c.ev === 'doc' ? 'Documented' : 'Inferred'}</span></div></div>
        <div class="kv"><span class="label">Your view</span><q>${esc(S.text)}</q></div>
        <div class="kv"><span class="label">Evidence</span><div class="ev">${c.evid.map((e) => `<div><span class="tag ${e.tag}">${e.label}</span><span class="src">${e.src}${e.quote ? ' · 🔒 RM only' : ''}</span></div>`).join('')}</div></div>
        ${canSend
          ? `<div class="kv"><span class="label">Note</span><textarea class="note" id="note" rows="3" placeholder="Optional: add context for ${rm.first}…"></textarea></div>`
          : mine && S.note ? `<div class="kv"><span class="label">Your note</span><div>${esc(S.note)}</div></div>` : ''}
      </div>
      <div class="df">${canSend
        ? `<button class="btn" data-close>Cancel</button><button class="btn primary" id="confirm">Send to ${rm.first}</button>`
        : `<span class="hint2" style="margin-right:auto">${mine ? 'Already sent' : 'One hand-off per run · ↺ to restart'}</span><button class="btn" data-close>Close</button>`}</div>`);
    $('#confirm')?.addEventListener('click', () => confirmSend(c), { once: true });
  }

  async function confirmSend(c) {
    S.note = ($('#note')?.value || '').trim();
    if ($('#note')) $('#note').disabled = true;
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
    S.sentOn = new Set(ptKeys(c).filter(isOn));
    S.sentImp = c.imp.filter(isOn);
    setStep(3);
    CLIENTS.forEach((x) => { const a = $(`.pick[data-id="${x.id}"] .act`); if (a) a.innerHTML = actHTML(x); });
    bindSends();
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
              ${rm.others.filter(([n]) => n !== c.name).slice(0, 3).map(([n, s, d]) => `<tr><td>${n}</td><td>${s}</td><td>${d}</td><td><span style="color:var(--faint)">—</span></td></tr>`).join('')}
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

  // ---- Book a meeting with the specialist ----
  const SLOTS = ['Thu 2:00 PM', 'Thu 4:30 PM', 'Fri 10:00 AM'];
  function syncBookNav() {
    const a = $('#navbook');
    a.classList.toggle('booked', !!S.meeting);
    a.title = S.meeting ? `Meeting with Jordan · ${S.meeting.slot}` : 'Book a meeting with Jordan';
  }

  function openBooking() {
    const c = T();
    const m = S.meeting;
    let slot = m ? m.slot : SLOTS[0];
    openDrawer(`
      <div class="dh"><span class="av">JL</span><div><h2>Meeting with Jordan</h2><small>FX Specialist · Outlook calendar</small></div><button class="x" data-close aria-label="Close">×</button></div>
      <div class="db">
        <div class="kv"><span class="label">About</span><div><b>${c.name}</b><small>${c.biz}</small></div></div>
        <div class="kv"><span class="label">Jordan is free</span><div class="chips" id="slots">${SLOTS.map((t) => `<button class="chip ${t === slot ? 'on' : ''}" data-t="${t}" ${m ? 'disabled' : ''}>${t}</button>`).join('')}</div></div>
        <div class="kv"><span class="label">Length</span><div>30 min · Teams</div></div>
        <div class="kv"><span class="label">Agenda</span><textarea class="note" id="agenda" rows="3" ${m ? 'disabled' : ''}>${esc(m ? m.agenda : `Prep for ${c.name} before the client call (${c.biz}).`)}</textarea></div>
      </div>
      <div class="df">${m
        ? '<span class="hint2" style="margin-right:auto">Invite sent</span><button class="btn" data-close>Close</button>'
        : '<button class="btn" data-close>Cancel</button><button class="btn primary" id="sendinvite">Send invite</button>'}</div>`);
    if (m) return;
    $$('#slots .chip').forEach((b) => b.addEventListener('click', () => {
      slot = b.dataset.t;
      $$('#slots .chip').forEach((x) => x.classList.toggle('on', x === b));
    }));
    $('#sendinvite').addEventListener('click', async () => {
      const b = $('#sendinvite');
      b.disabled = true;
      b.innerHTML = '<span class="spin"></span>Sending';
      const agenda = $('#agenda').value.trim();
      await wait(800);
      S.meeting = { slot, agenda };
      closeDrawer();
      toast(`Invite sent to Jordan · ${slot}`);
      syncBookNav();
    }, { once: true });
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
            ${S.note ? `<div class="kv"><span class="label">Jordan's note</span><div class="note-unlock" style="margin:0">${esc(S.note)}</div></div>` : ''}
            <div class="kv"><span class="label">Matched on</span><div class="chips">${[...S.sentOn].map((k) => `<span class="tag inf">${IMPACTS[k].label}</span>`).join('')}</div></div>
            <div class="kv"><span class="label">Evidence</span>
              <div class="ev">
                ${c.evid.map((e) => `<div><span class="tag ${e.tag}">${e.label}</span><span class="src">${e.src}</span></div>`).join('')}
                ${quote ? `<div class="note-unlock">“${quote}”</div>` : ''}
              </div>
            </div>
          </div>
          <div class="card decide">
            <div class="big"><strong>${S.sentScore}</strong><span class="tag ${vc}">${v}</span></div>
            <div class="bars">${ptKeys(c).filter((k) => S.sentOn.has(k)).map((k) => bar(IMPACTS[k].label, c.pts[k], FACET_CLASS[IMPACTS[k].facet])).join('')}</div>
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

  const bar = (n, v, cls = '') => `<div class="b ${cls}"><span>${n}</span><div class="t"><div class="f" data-v="${Math.min(100, v * 3)}"></div></div><span class="v">+${v}</span></div>`;

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
    detecting = false;
    showAll = false;
    clearTimeout(detectT);
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
    syncBookNav();
    renderSpec();
  }
  $('#restart').addEventListener('click', start);
  const navBook = () => { if (S.mode === 'rm' && S.target) openBooking(); };
  $('#navbook').addEventListener('click', navBook);
  $('#navbook').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navBook(); } });
  $('#bell').addEventListener('click', () => {
    if (S.mode === 'rm' && S.target && !S.approved && !S.rejected) openReview();
    else if (S.mode === 'spec' && S.replied && !S.replyRead) openReply();
    else if (S.mode === 'spec' && S.meeting && !S.meetingSeen) meetingNotif();
    else toast('No new notifications');
  });
  start();
})();
