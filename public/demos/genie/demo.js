/* Genie agent concept prototype. Synthetic data; only the prompt box is interactive. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const view = $('#view');

  // ---------- Demo copy (edit freely) ----------
  const PROMPT =
    'Create an AI agent for our sales team that can answer questions about customer orders, ' +
    'revenue trends, and regional performance.';
  const AGENT_NAME = 'Sales Insights and Customer Orders';
  const FIRST_QS = [
    'What is our monthly revenue trend over the past year?',
    'Which region had the highest order volume last quarter?',
    'Who are our top 10 customers by total order value?',
    'How does average order value compare across product categories?',
    'Other…',
  ];
  const SUGGESTED_DESC =
    'This Agent provides sales insights and analyzes customer order patterns to help identify trends, ' +
    'performance drivers, and new opportunities.';
  const COMMON_QS = [
    'What tables are there and how are they connected? Give me a short summary.',
    'What are the distributions of product categories in the sales data?',
    'How has total revenue changed month over month?',
  ];
  const SAMPLE_QS = [
    'What is the monthly revenue trend over the past year?',
    'What is the distribution of orders by region?',
    'What are the top customers by total order value?',
    'What tables are available and how are they connected?',
  ];
  const SKIP_SECONDS = 58;
  const TYPE_MS = 16; // per character

  const AGENTS = [
    ['Sales Insights and Customer Orders', 'Sales analytics agent for pipeline and order trends', '50 minutes ago'],
    ['Customer Orders Sample Explorer', '', '1 day ago'],
    ['Customer Orders Insights', 'Answers questions about order volume and returns', '2 days ago'],
    ['Marketing Funnel Q&A', 'Campaign spend, leads and conversion by channel', '5 days ago'],
  ];
  const OWNER = 'leia.yun';

  // ---------- Icons ----------
  const I = {
    plus: '<svg viewBox="0 0 20 20"><path d="M10 4v12M4 10h12"/></svg>',
    search: '<svg viewBox="0 0 20 20"><circle cx="9" cy="9" r="5.5"/><path d="m13 13 4 4"/></svg>',
    genie: '<svg viewBox="0 0 20 20"><path d="M3 5h9M3 5v12h12V9"/><path d="M15 2v6M12 5h6"/></svg>',
    down: '<svg viewBox="0 0 20 20"><path d="m6 8 4 4 4-4"/></svg>',
    sliders: '<svg viewBox="0 0 20 20"><path d="M6 3v14M14 3v14"/><circle cx="6" cy="12" r="2" fill="#fff"/><circle cx="14" cy="7" r="2" fill="#fff"/></svg>',
    star: '<svg viewBox="0 0 20 20" style="color:#d4a017"><path d="m10 3 2.2 4.5 4.8.7-3.5 3.4.8 4.9L10 14.2l-4.3 2.3.8-4.9L3 8.2l4.8-.7z"/></svg>',
    cert: '<svg viewBox="0 0 20 20" style="color:#2272b4"><circle cx="10" cy="10" r="7"/><path d="m7 10 2 2 4-4"/></svg>',
    fire: '<svg viewBox="0 0 20 20" style="color:#ff3621"><path d="M10 17a5 5 0 0 0 5-5c0-4-5-9-5-9s0 3-3 6a5 5 0 0 0 3 8Z"/></svg>',
    user: '<svg viewBox="0 0 20 20"><circle cx="10" cy="7" r="3"/><path d="M4 17a6 6 0 0 1 12 0"/></svg>',
    list: '<svg viewBox="0 0 20 20"><path d="M4 6h12M4 10h12M4 14h12"/></svg>',
    chat: '<svg viewBox="0 0 20 20"><path d="M4 4h12v9H8l-4 3z"/></svg>',
    x: '<svg viewBox="0 0 20 20"><path d="m5 5 10 10M15 5 5 15"/></svg>',
    up: '<svg viewBox="0 0 20 20"><path d="M10 16V4M5 9l5-5 5 5"/></svg>',
    bubble: '<svg viewBox="0 0 20 20"><path d="M10 3.5c4 0 7 2.6 7 5.8s-3 5.8-7 5.8c-.9 0-1.7-.1-2.5-.4L4 16.5l.9-3.1C3.7 12.3 3 10.9 3 9.3 3 6.1 6 3.5 10 3.5Z"/></svg>',
    eye: '<svg viewBox="0 0 20 20"><path d="M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10Z"/><circle cx="10" cy="10" r="2.5"/></svg>',
    bars: '<svg viewBox="0 0 20 20"><path d="M3 3v14h14M7 14V9M10.5 14V6M14 14v-3"/></svg>',
    compose: '<svg viewBox="0 0 20 20"><path d="M9 4H4v12h12v-5"/><path d="m14.5 3 2.5 2.5L10 12.5H7.5V10z"/></svg>',
    history: '<svg viewBox="0 0 20 20"><path d="M3.5 10a6.5 6.5 0 1 0 1.9-4.6"/><path d="M3 3v3.5h3.5M10 6.5V10l2.5 1.5"/></svg>',
    gear: '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="2.5"/><path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4"/><circle cx="10" cy="10" r="5"/></svg>',
    lock: '<svg viewBox="0 0 20 20"><rect x="4.5" y="9" width="11" height="8" rx="1.5"/><path d="M7 9V6.5a3 3 0 0 1 6 0V9"/></svg>',
    kebab: '<svg viewBox="0 0 20 20"><circle cx="10" cy="4.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="10" cy="10" r="1.3" fill="currentColor" stroke="none"/><circle cx="10" cy="15.5" r="1.3" fill="currentColor" stroke="none"/></svg>',
    expand: '<svg viewBox="0 0 20 20"><path d="M12 3h5v5M17 3l-5.5 5.5M8 17H3v-5M3 17l5.5-5.5"/></svg>',
    pencil: '<svg viewBox="0 0 20 20"><path d="m13.5 3.5 3 3L7 16H4v-3z"/><path d="m11.5 5.5 3 3"/></svg>',
    check: '<svg viewBox="0 0 20 20"><path d="m4 10.5 4 4 8-9"/></svg>',
    chevDown: '<svg viewBox="0 0 20 20"><path d="m6 8 4 4 4-4"/></svg>',
    agent: '<svg viewBox="0 0 20 20"><path d="M10 3v4M10 13v4M3 10h4M13 10h4"/><circle cx="10" cy="10" r="2"/></svg>',
    sparkle: '<svg viewBox="0 0 20 20"><defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5f7e"/><stop offset="1" stop-color="#7b4dff"/></linearGradient></defs><path d="M10 2.5c.6 3.6 1.9 4.9 5.5 5.5-3.6.6-4.9 1.9-5.5 5.5C9.4 9.9 8.1 8.6 4.5 8c3.6-.6 4.9-1.9 5.5-5.5Z" transform="translate(0 2)" stroke="url(#sg)" stroke-width="1.5"/></svg>',
    qfile: '<svg viewBox="0 0 20 20"><path d="M11.5 3H5.5v14h9V6z"/><path d="M11.5 3v3h3"/><path d="m7.5 10.5 2 1.5-2 1.5M10.5 14.5h2"/></svg>',
    tableFill: '<svg viewBox="0 0 24 24" class="solid"><path fill="currentColor" stroke="none" fill-rule="evenodd" d="M3 3h18v18H3zM5 7.6v1h14v-1zM5 10.4V19h3.6v-8.6zM10.2 10.4V19h3.6v-8.6zM15.4 10.4V19H19v-8.6z"/></svg>',
    db: '<svg viewBox="0 0 20 20"><ellipse cx="10" cy="5" rx="6" ry="2.5"/><path d="M4 5v10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V5M4 10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5"/></svg>',
    bigsearch: '<svg viewBox="0 0 20 20"><circle cx="9" cy="9" r="5.5"/><path d="m13 13 4 4"/></svg>',
    lamp: '<svg viewBox="0 0 20 20" style="color:#d6409f"><path d="M3 12c2 0 3-1.5 5-1.5s3 1.5 6 1.5c1.5 0 2.5-1 3-2.5M6 12.5c0 2 1.8 3.5 4 3.5s4-1.5 4-3.5M10 3.5c.4 1.7 1 2.3 2.7 2.7-1.7.4-2.3 1-2.7 2.7-.4-1.7-1-2.3-2.7-2.7 1.7-.4 2.3-1 2.7-2.7Z"/></svg>',
  };

  // ---------- Steps ----------
  const setStep = (n) => {
    document.querySelectorAll('#steps li').forEach((li) => {
      const s = +li.dataset.step;
      li.classList.toggle('on', s === n);
      li.classList.toggle('done', s < n);
    });
  };

  // ---------- Screen 1: Genie list + create modal ----------
  const listPage = () => `
    <div class="page" aria-hidden="true">
      <div class="page-head">
        <h1>Genie Agents</h1>
        <span class="btn-primary">${I.plus}New</span>
      </div>
      <div class="list-search">${I.search}Search Genie Agents…</div>
      <div class="chips">
        <span class="chip">${I.sliders}</span>
        <span class="chip">Domain ${I.down}</span>
        <span class="chip">Owned by me</span>
        <span class="chip">Modified this week</span>
        <span class="chip">${I.star}Favorited</span>
        <span class="chip">${I.cert}Certified</span>
        <span class="chip">${I.fire}Popular</span>
      </div>

      <h3 class="sect-title">Recently viewed</h3>
      <div class="cards">
        ${AGENTS.slice(0, 3).map(([n, d, m]) => `
          <div class="card">
            <div class="ctitle">${I.genie}${n}</div>
            <p>${d || 'No description'}</p>
            <div class="meta">Modified ${m}</div>
          </div>`).join('')}
      </div>

      <div class="tbl-head">
        <h3 class="sect-title">All Agents</h3>
        <span class="link">${I.chat}Send feedback</span>
        <span>Relevance ${I.down}</span>
        <span>${I.list}List ${I.down}</span>
      </div>
      <table>
        <colgroup><col style="width:32%"><col style="width:28%"><col style="width:14%"><col style="width:16%"><col></colgroup>
        <thead><tr><th>Name</th><th>Description</th><th>Modified</th><th>Owner</th><th>Tags</th></tr></thead>
        <tbody>
          ${AGENTS.map(([n, d, m]) => `
            <tr>
              <td><div class="nm">${I.genie}<span>${n}</span></div></td>
              <td>${d || ''}</td>
              <td>${m}</td>
              <td><div class="nm owner">${I.user}<span>${OWNER}</span></div></td>
              <td>-</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="overlay">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="mtitle">
        <span class="x" aria-hidden="true">${I.x}</span>
        <h2 id="mtitle">What should your Genie agent do?</h2>
        <div class="prompt idle" id="prompt">
          <textarea id="ta" rows="3" readonly
            aria-label="Describe what your agent should help with"
            placeholder="Describe what your agent should help with, from a broad topic like sales to specific tables you have in mind."></textarea>
          <button type="button" class="send" id="send" aria-label="Create agent" disabled>${I.up}</button>
          <span class="hint" id="hint">Click to fill in a prompt</span>
        </div>
        <span class="manual" aria-hidden="true">${I.plus}Select tables manually</span>
      </div>
    </div>`;

  let typing = null;

  const renderDescribe = () => {
    clearInterval(typing);
    setStep(1);
    view.innerHTML = listPage();

    const box = $('#prompt');
    const ta = $('#ta');
    const send = $('#send');
    const hint = $('#hint');
    let filled = false;

    const fill = () => {
      if (filled) return;
      filled = true;
      box.classList.remove('idle');
      hint.style.opacity = '0';
      let i = 0;
      typing = setInterval(() => {
        i += 1;
        ta.value = PROMPT.slice(0, i);
        if (i >= PROMPT.length) {
          clearInterval(typing);
          send.disabled = false;
          send.classList.add('ready');
          send.focus();
        }
      }, TYPE_MS);
    };

    box.addEventListener('click', (e) => { if (e.target !== send) fill(); });
    ta.addEventListener('focus', fill);
    send.addEventListener('click', () => { if (!send.disabled) startBuild(ta.value); });
  };

  // ---------- Screen 2: agent setup + Genie Code panel ----------
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const screen = $('#screen');
  const assistBtn = $('.assist');
  let timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const clearTimers = () => { timers.forEach(clearTimeout); timers.forEach(clearInterval); timers = []; };

  const assistantPane = (prompt) => `
    <aside class="assistant" aria-label="Genie Code">
      <div class="as-head" aria-hidden="true">
        <span class="ico sm">${I.expand}</span>
        <span class="as-tab"><span class="mini-spin"></span><span class="as-title">AI Agent Setup for ${AGENT_NAME}</span>${I.kebab}${I.x}</span>
        <span class="as-tools"><span class="ico sm">${I.compose}</span><span class="ico sm">${I.history}</span><span class="ico sm">${I.kebab}</span><span class="ico sm">${I.x}</span></span>
      </div>

      <div class="as-feed" id="feed">
        <div class="me-msg">Help me finish setting up my Genie agent which does the following: ${esc(prompt)}</div>
        <div class="thoughts" id="thoughts" hidden><div class="th-label">Thoughts</div><p id="th-text"></p></div>
      </div>

      <div class="ask-card" id="askcard" hidden>
        <div class="ask-timer"><i id="timer-bar"></i></div>
        <h4>Which question would you like this agent to answer first?</h4>
        <div class="opts" role="radiogroup">
          ${FIRST_QS.map((q, i) => `<label class="opt"><input type="radio" name="firstq" value="${i}"><span>${q}</span></label>`).join('')}
        </div>
        <p class="ask-foot">When the timer ends, these questions will be skipped. Genie Code will continue with the unanswered inputs unresolved.</p>
        <div class="ask-actions">
          <span class="skip-chip" id="skipchip">Auto-skipping in <b id="secs">${SKIP_SECONDS}</b>s <button type="button" id="stopskip" aria-label="Stop auto-skip">${I.x}</button></span>
          <button type="button" class="btn-sm" id="askskip">Skip</button>
          <button type="button" class="btn-submit" id="submitall" disabled>Submit all</button>
        </div>
      </div>

      <div class="composer" aria-hidden="true">
        <div class="cmp-in">Queue follow-ups</div>
        <div class="cmp-row">${I.plus}<span class="stop"></span></div>
      </div>
      <p class="as-foot">Always review the accuracy of responses.</p>
    </aside>`;

  const showAsk = (onDone) => {
    const card = $('#askcard');
    card.hidden = false;
    const feed = $('#feed');
    feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });
    const submit = $('#submitall');
    const secsEl = $('#secs');
    const bar = $('#timer-bar');
    const total = 60;
    let left = SKIP_SECONDS;
    bar.style.width = `${((total - left) / total) * 100}%`;

    card.addEventListener('change', () => {
      submit.disabled = false;
      submit.classList.add('ready');
    });

    let iv;
    let closed = false;
    const finish = (answer) => {
      if (closed) return;
      closed = true;
      clearInterval(iv);
      card.querySelectorAll('input').forEach((x) => { x.disabled = true; });
      card.classList.add('closed');
      $('#feed').appendChild(card); // answered cards become part of the conversation
      $('.ask-actions', card).innerHTML = `<span class="ask-done">${answer === null ? 'Skipped' : 'Submitted'}</span>`;
      if (onDone) onDone(answer);
    };


    iv = setInterval(() => {
      left -= 1;
      secsEl.textContent = left;
      bar.style.width = `${((total - left) / total) * 100}%`;
      if (left <= 0) finish(null);
    }, 1000);
    timers.push(iv);

    $('#stopskip').addEventListener('click', () => {
      clearInterval(iv);
      $('#skipchip').remove();
    });
    $('#askskip').addEventListener('click', () => finish(null));
    submit.addEventListener('click', () => {
      const picked = $('input:checked', card);
      if (picked) finish(Number(picked.value));
    });
    return finish;
  };

  // ---------- Genie Code feed helpers (shared by Current and Proposed) ----------
  const paced = (fn, ms) => timers.push(setTimeout(fn, ms * PACE));
  const feedBottom = () => { const f = $('#feed'); f.scrollTop = f.scrollHeight; };
  const streamInto = (el, text, ms, done) => {
    const words = text.split(' ');
    let w = 0;
    const iv = setInterval(() => {
      w += 1;
      el.textContent = words.slice(0, w).join(' ');
      if (w >= words.length) { clearInterval(iv); if (done) done(); }
    }, ms * PACE);
    timers.push(iv);
  };
  const post = (cls, html) => {
    const d = document.createElement('div');
    d.className = cls;
    d.innerHTML = html;
    $('#feed').appendChild(d);
    feedBottom();
    return d;
  };
  // Stream a message word by word; inline `code` is formatted once it lands.
  const say = (text, done) => {
    const p = post('ai-msg', '');
    const iv = setInterval(feedBottom, 200);
    timers.push(iv);
    streamInto(p, text.replace(/`/g, ''), CHAT_WORD_MS, () => {
      clearInterval(iv);
      p.innerHTML = esc(text).replace(/`([^`]+)`/g, '<code>$1</code>');
      feedBottom();
      if (done) paced(done, CHAT_PAUSE_MS);
    });
  };
  // A finished tool call row.
  const tool = (label, ms, done) => paced(() => {
    post('ai-tool', `${I.check}<span>${label.replace(/`([^`]+)`/g, '<code>$1</code>')}</span>`);
    if (done) done();
  }, ms);
  // Run steps in order: each step is fn(next).
  const run = (steps) => {
    const go = (i) => { if (i < steps.length) steps[i](() => go(i + 1)); };
    go(0);
  };

  // ======================================================================
  // Agent setup screen, shared by both versions.
  // Current = today's product (from the screen recording): the checklist glows while Genie
  //   starts, the description card says "AI Generating Description…", empty tabs show their
  //   product empty states, Genie Code shows Thinking / tool rows with spinners, and config
  //   changes land silently.
  // Proposed (PRD), minimal changes on the same screen:
  // - checklist reads as Genie's work, each step says who is handling it (P0.2)
  // - config fills in live and the tab follows Genie's step (P0.1)
  // - the section being written gets Genie's existing AI border (P1)
  // - edit controls stay hidden until Genie finishes a section
  // - the first question is optional; Genie keeps going
  // - when setup finishes: summary in Genie Code (P2.1), Chat dot + "Try your agent" (P0.3)
  // ======================================================================
  const P_STEPS = [
    { label: 'Define agent details', tab: 'about' },
    { label: 'Identify relevant data', tab: 'sources' },
    { label: 'Prepare business context', tab: 'instructions' },
    { label: 'Add initial benchmarks', tab: 'examples' },
  ];
  const TABS = [['about', 'About'], ['sources', 'Sources'], ['instructions', 'Instructions'], ['examples', 'Examples']];
  const TABLES = [
    ['sales.orders', 'Order date, status, order total'],
    ['sales.customers', 'Account, segment, region'],
    ['sales.order_items', 'Product, quantity, price'],
    ['sales.regions', 'Region and territory names'],
  ];
  // Common questions Databricks adds before Genie has looked at the data (Current).
  const CQ_GENERIC = [
    'What tables are there and how are they connected? Give me a short summary.',
    'What is the average, minimum, and maximum value of the numerical columns available in the data?',
    'What is the distribution of the values in the categorical columns?',
  ];
  const INSTR_TEMPLATE =
    'Examples:\n* MCA stands for My Company Abbreviation\n* Countries in the country_code column are stored with two characters (e.g. US, IT)\n' +
    '* When a user asks for performance they are interested in a product\'s revenue\n\n(You can use markdown text)';
  const INSTR = [
    'This agent answers questions about customer orders, revenue trends, and regional performance (sales.orders, one row per order).',
    '',
    'Revenue conventions:',
    '- By default, "revenue" means net revenue: use the Net Revenue measure, which excludes cancelled and refunded orders.',
    '- order_total is already net of discounts; do not subtract them again.',
    '',
    'Regions and dates:',
    '- Use customers.region for regional performance, not the shipping address.',
    '- Fiscal quarters start in February.',
  ];
  const exItems = (q) => [
    { t: q, k: 'QUERY', sql: "SELECT date_trunc('month', order_date) AS month, SUM(order_total) AS net_revenue FROM sales.orders WHERE status NOT IN ('cancelled', 'refunded') GROUP BY 1" },
    { t: 'Net Revenue', k: 'MEASURE', sql: "SUM(CASE WHEN sales.orders.status NOT IN ('cancelled', 'refunded') THEN sales.orders.order_total END)" },
    { t: 'Exclude cancelled and refunded orders (default for revenue)', k: 'FILTER', sql: "sales.orders.status NOT IN ('cancelled', 'refunded')" },
  ];
  const SPACE_DESC = 'Answers questions about customer orders, revenue trends, and regional performance for the sales team.';
  const P_DESC =
    'This agent answers questions about customer orders, revenue trends, and regional performance for the sales team, ' +
    'using order, customer, and region data.';
  const THOUGHTS_P =
    "I'm Genie Code, and I'll help you set up your sales analytics agent: finding the right data, " +
    "adding business context, and validating its answers. Let me first gather context and load the tools I need.";
  // Scales both timelines (1 = base speed).
  const PACE = 1.1;
  // Genie Code messages: ms per word while streaming, and a pause after each message.
  const CHAT_WORD_MS = 28;
  const CHAT_PAUSE_MS = 250;
  // Proposed config filling: description (ms per word), rows (ms each), instruction lines (ms each).
  const CFG_WORD_MS = 90;
  const CFG_ROW_MS = 1000;
  const CFG_LINE_MS = 250;

  const NOTE_START = 'You can leave this page or close the agent window anytime and finish setup later.';
  const STATUS = {
    next: '',
    ai: '<span class="mini-spin"></span>Genie · In progress',
    done: 'Optional review',
  };

  const ph = (text) => `<p class="ph">${text}</p>`; // Proposed: what Genie will do in an unfilled section
  const cqRow = (q) => `<span>${q}</span>${I.sparkle}${I.plus}`;
  const tableRow = ([t, d]) => `<span class="tname">${t}</span><small>${d}</small>`;
  const exRow = (e) => `<span class="ex-ic">${I.qfile}</span><div class="ex-main"><div class="ex-t"><span>${esc(e.t)}</span><b class="badge k-${e.k.toLowerCase()}">${e.k}</b></div><code>${esc(e.sql)}</code></div>${I.pencil}`;
  const suggestCard = (generating) => (generating
    ? `<div class="suggest" id="suggest"><div class="suggest-head">${I.sparkle}<span>AI Generating Description...</span></div><i class="sk"></i><i class="sk"></i></div>`
    : `<div class="suggest fresh" id="suggest">
        <div class="suggest-head">${I.sparkle}<span>Genie Suggested Description</span>${I.x}</div>
        <p>${SUGGESTED_DESC}</p>
        <p class="caps">Capabilities:…</p>
        <span class="link">Show more</span>
        <div class="suggest-btns"><span class="btn-sm">${I.check}Accept</span><span class="btn-sm">${I.pencil}Edit</span></div>
      </div>`);

  // mode: 'cur' | 'new'
  const setupPane = (mode) => {
    const p = mode === 'new';
    return `
    <section class="space">
      <div class="space-bar">
        <button type="button" class="seg" id="chatseg">${I.bubble}Chat<i class="gdot" id="gdot" hidden></i></button>
        <span class="seg plain">${I.eye}Monitor</span>
        <span class="seg plain">${I.bars}Benchmark</span>
        <span class="ico">${I.compose}</span>
        <span class="ico">${I.history}</span>
        <button type="button" class="seg cfg" id="cfgseg">${I.gear}Configure</button>
        <span class="share">${I.lock}Share</span>
        <span class="ico">${I.kebab}</span>
      </div>

      <div class="space-body">
        <h1 class="space-title">${AGENT_NAME}</h1>
        <p class="space-desc" id="spacedesc" hidden>${SPACE_DESC}</p>
        <div class="ask" id="askbox">
          <div class="ask-in" id="askin">Ask your question…</div>
          <span class="ask-chip">${I.agent}Agent</span>
        </div>
        <p class="ask-note">Connect apps and data sources to your agent</p>
        <p class="ask-ai">Always review the accuracy of responses.</p>
        <ul class="samples">${SAMPLE_QS.map((q) => `<li>${q}</li>`).join('')}</ul>
      </div>

      <div class="cfg-pop" id="cfgpop">
        <div class="setup${p ? '' : ' glow'}" id="setup">
          <div class="setup-head"><b id="setup-title">${p ? 'Genie is setting up your agent' : 'Finish setting up your agent'}</b><span><span id="setup-count">0</span> of 4 ${I.chevDown}</span></div>
          <div class="setup-bar"><i id="setup-bar"></i></div>
          <ol class="setup-steps${p ? ' p' : ''}" id="psteps">
            ${P_STEPS.map((s, i) => `<li data-i="${i}" data-tab="${s.tab}"><span class="n">${i + 1}</span>${s.label}<span class="st"></span></li>`).join('')}
          </ol>
          <p class="setup-note" id="setup-note">${NOTE_START}</p>
        </div>

        <div class="cfg-card">
          <div class="tabs" id="ptabs">
            ${TABS.map(([k, l]) => `<button type="button" class="tab" data-tab="${k}">${l}</button>`).join('')}
            <span class="tabs-x">${I.x}</span>
          </div>
          <div class="cfg-body" id="pbody">
            <div class="pane${p ? ' busy' : ''}" data-pane="about">
              <div class="sec" id="sec-desc">
                <div class="cfg-sec"><h3>Description</h3>${I.pencil}</div>
                <div class="rows" id="descwrap">${p ? `${ph('Genie Code is writing a description…')}<p class="desc" id="desc" hidden></p>` : suggestCard(true)}</div>
              </div>
              <hr class="sec-div">
              <div class="sec" id="sec-cq">
                <div class="cfg-sec"><h3>Common questions</h3>${I.pencil}</div>
                <div class="rows" id="cqs">${p ? ph('Genie Code will suggest questions after the description.') : CQ_GENERIC.map((q) => `<div class="cq">${cqRow(q)}</div>`).join('')}</div>
              </div>
              <hr class="sec-div">
              <div class="sec about">
                <div class="cfg-sec"><h3>About this agent</h3>${I.pencil}</div>
                <dl class="meta-list">
                  <dt>Name</dt><dd>${AGENT_NAME}</dd>
                  <dt>Owner</dt><dd>${OWNER}@example.com</dd>
                  <dt>Agent ID</dt><dd>01f1e2a47c3b19d8a6e05f2c7b8d4e91</dd>
                  <dt>Warehouse</dt><dd><i class="wh-dot"></i>Serverless Starter Warehouse</dd>
                  <dt>Tags</dt><dd></dd>
                  <dt>Thumbnail</dt><dd><span class="thumb">${I.genie}</span></dd>
                </dl>
              </div>
            </div>
            <div class="pane${p ? ' busy' : ''}" data-pane="sources" hidden>
              <div class="sec" id="sec-sources">
                <div class="cfg-sec" id="srchead"${p ? '' : ' hidden'}><h3>Tables</h3>${I.plus}</div>
                <div class="rows" id="tables">${p ? ph('Genie Code will find tables in step 2.') : `<div class="empty big">${I.tableFill}<b>No sources added yet</b><p>Add tables, metric views, files, and connectors</p><span class="btn-sm">Add</span></div>`}</div>
              </div>
            </div>
            <div class="pane${p ? ' busy' : ''}" data-pane="instructions" hidden>
              <div class="sec" id="sec-instructions">
                <div class="cfg-sec flat"><h3>General Instructions</h3></div>
                <p class="cfg-sub">Add general instructions on how you want this Genie Agent to behave.</p>
                <pre class="instr ${p ? 'wait' : 'tmpl'}" id="instr">${p ? 'Genie Code will add business context in step 3.' : INSTR_TEMPLATE}</pre>
                <div class="save-row"><span class="btn-submit">Save</span></div>
              </div>
            </div>
            <div class="pane${p ? ' busy' : ''}" data-pane="examples" hidden>
              <div class="sec" id="sec-examples">
                <div class="cfg-sec flat"><h3>Examples</h3><span class="btn-sm">Add</span></div>
                <p class="cfg-sub">Teach your agent how to answer questions with curated examples.</p>
                <div class="ex-search"><span>${I.search}Search examples...</span><span class="ex-all">All (<b id="excount">0</b>) ${I.chevDown}</span></div>
                <div class="rows" id="examples">${p ? ph('Genie Code will add example queries in step 3.') : `<div class="empty">${I.bigsearch}<p>No examples yet.</p></div>`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  };

  // Shared controls for the setup screen, bound to whatever setupPane() rendered.
  const setupKit = () => {
    let doneCount = 0;
    const kit = {};
    kit.showTab = (k) => {
      document.querySelectorAll('#ptabs .tab').forEach((t) => t.classList.toggle('on', t.dataset.tab === k));
      document.querySelectorAll('#pbody .pane').forEach((x) => { x.hidden = x.dataset.pane !== k; });
    };
    kit.step = (i, st, statusHtml) => {
      const li = $(`#psteps li[data-i="${i}"]`);
      li.classList.toggle('on', st === 'ai');
      li.classList.toggle('done', st === 'done');
      $('.st', li).innerHTML = statusHtml;
      if (st === 'done') {
        $('.n', li).innerHTML = I.check;
        doneCount += 1;
        $('#setup-count').textContent = doneCount;
        $('#setup-bar').style.width = `${doneCount * 25}%`;
      }
    };
    kit.clearPh = (wrap) => { const e = $(`${wrap} .ph, ${wrap} .empty`); if (e) e.remove(); };
    kit.addRow = (wrap, html, cls) => {
      kit.clearPh(wrap);
      const d = document.createElement('div');
      d.className = `${cls} fresh`;
      d.innerHTML = html;
      $(wrap).appendChild(d);
      if (wrap === '#examples') $('#excount').textContent = $('#examples').children.length;
      if (wrap === '#tables') $('#srchead').hidden = false;
    };
    kit.showSpaceDesc = () => { $('#spacedesc').hidden = false; };
    // Any tab or checklist step can be opened by hand.
    $('#ptabs').addEventListener('click', (e) => { const t = e.target.closest('.tab'); if (t) kit.showTab(t.dataset.tab); });
    $('#psteps').addEventListener('click', (e) => { const li = e.target.closest('li'); if (li) kit.showTab(li.dataset.tab); });
    kit.showTab('about');
    return kit;
  };

  // ---------- Current: today's flow, from the screen recording ----------
  // Genie Code status rows as they appear today.
  const think = (ms, done) => {
    const r = post('ai-think', `${I.lamp}<span>Thinking</span><i class="dots">…</i><span class="secs"></span>`);
    let s = 0;
    const iv = setInterval(() => { s += 1; $('.secs', r).textContent = `${s}s`; }, 1000 * PACE);
    timers.push(iv);
    paced(() => { clearInterval(iv); r.remove(); if (done) done(); }, ms);
  };
  const note = (text, done) => { post('ai-step', text); if (done) paced(done, 300); };
  const toolRun = (label, ms, done) => {
    const r = post('ai-step run', `<span>${label}</span><span class="mini-spin"></span>`);
    paced(() => { $('.mini-spin', r).remove(); if (done) done(); }, ms);
  };

  const renderBuild = (prompt) => {
    clearTimers();
    setStep(2);
    screen.classList.add('s2');
    assistBtn.classList.add('on');
    view.innerHTML = setupPane('cur') + assistantPane(prompt);
    const k = setupKit();
    const spin = '<span class="mini-spin"></span>';
    const checklist = (i) => { // "Updating setup checklist" lands: step i done, next one starts
      k.step(i, 'done', '');
      if (i + 1 < P_STEPS.length) k.step(i + 1, 'ai', spin);
    };
    k.step(0, 'ai', spin);

    let closeAsk = null;
    let firstQ = FIRST_QS[0];
    let answered = false;
    run([
      // The checklist glows and the description generates while Genie starts thinking.
      (n) => { paced(() => { $('#setup').classList.remove('glow'); $('#descwrap').innerHTML = suggestCard(false); }, 1800); think(2400, n); },
      (n) => note('Thoughts', n),
      (n) => note('No skills needed', n),
      (n) => say(`I'm Genie Code, and I'll help you finish setting up your ${AGENT_NAME} agent, from finding the right data to adding business context and checking its answers.`, n),
      (n) => say('Your purpose is clear (customer orders, revenue trends, and regional performance), so I just need one starting point: what kind of question should this agent answer first?', n),
      (n) => think(1200, n),
      (n) => {
        closeAsk = showAsk((ans) => {
          if (ans !== null && ans < FIRST_QS.length - 1) { firstQ = FIRST_QS[ans]; answered = true; }
        });
        think(6000, n); // Genie keeps going if there's no answer
      },
      (n) => note('Thoughts', n),
      (n) => {
        if (!answered && closeAsk) closeAsk(null);
        say(answered
          ? `Got it. I'll use "${firstQ}" as the starting question. Now I'll save a short description for your agent and start looking for relevant data.`
          : `No problem. I'll use a provisional starting question of my own choosing: "${firstQ}", and we can refine it after seeing the data. Now I'll save a short description for your agent and start looking for relevant data.`, n);
      },
      (n) => note('No skills needed', n),
      (n) => think(2200, n),
      (n) => note('Thoughts', n),
      (n) => note('Updated agent config (1)', n),
      (n) => toolRun('Updating setup checklist', 1200, () => { checklist(0); k.showSpaceDesc(); n(); }),
      // Step 2 · data (config changes land silently; the open tab doesn't change)
      (n) => say("Description saved and setup moved to the data stage. Now I'll search for sales data from several angles at once: tables, dashboards, related Genie agents, your recent activity, and any existing business definitions.", n),
      (n) => toolRun('Searching tables', 1800, n),
      (n) => toolRun('Searching dashboards and Genie agents', 1400, n),
      (n) => say('`sales.orders` is the best fit: 48,210 orders with order date, status, and order total. Attaching it with `sales.customers`, `sales.order_items`, and `sales.regions`.', n),
      (n) => { TABLES.forEach((t) => k.addRow('#tables', tableRow(t), 'trow')); note('Updated agent config (1)', n); },
      (n) => toolRun('Updating setup checklist', 1000, () => { checklist(1); n(); }),
      // Step 3 · business context
      (n) => say("Now I'll prepare the business context: revenue definitions, region and date handling, and a few example queries.", n),
      (n) => toolRun('Checking order status values', 1600, n),
      (n) => {
        const pre = $('#instr');
        pre.classList.remove('tmpl');
        pre.textContent = INSTR.join('\n');
        exItems(firstQ).forEach((e) => k.addRow('#examples', exRow(e), 'exrow'));
        note('Updated agent config (2)', n);
      },
      (n) => toolRun('Updating setup checklist', 1000, () => { checklist(2); n(); }),
      // Step 4 · benchmarks
      (n) => say('Business context is saved. Final step: benchmark questions with expected answers, to check accuracy.', n),
      (n) => toolRun('Adding benchmarks', 1200, n),
      (n) => toolRun('Running 3 benchmarks', 1800, n),
      (n) => toolRun('Updating setup checklist', 1000, () => { checklist(3); n(); }),
      (n) => say('All three benchmarks passed. Your baseline agent is ready. To build more confidence, try new questions across your use cases and turn good answers into benchmarks.', n),
      () => { if (closeAsk) closeAsk(null); $('.as-tab .mini-spin')?.remove(); },
    ]);
  };

  // ---------- Proposed ----------
  const renderProposed = (prompt) => {
    clearTimers();
    setStep(2);
    screen.classList.add('s2');
    assistBtn.classList.add('on');
    view.innerHTML = setupPane('new') + assistantPane(prompt);
    const k = setupKit();
    const later = paced;

    const startStep = (i) => {
      k.step(i, 'ai', STATUS.ai);
      k.showTab(P_STEPS[i].tab); // jump to the section Genie is now working on; a manual pick holds until then
    };
    const unbusy = (tab) => $(`#pbody .pane[data-pane="${tab}"]`).classList.remove('busy'); // edit controls appear
    const finishStep = (i) => { k.step(i, 'done', STATUS.done); unbusy(P_STEPS[i].tab); };
    const writing = (id, on) => $(id).classList.toggle('writing', on);
    const working = (wrap, text) => {
      const e = $(`${wrap} .ph`);
      if (!e) return;
      e.classList.add('active');
      e.textContent = text;
    };
    // Move the highlight to a section and say what Genie is doing there.
    const focus = (sec, wrap, text) => { writing(sec, true); working(wrap, text); };
    const addRows = (wrap, rows, cls, gap) => (next) => {
      rows.forEach((html, i) => later(() => { k.addRow(wrap, html, cls); feedBottom(); }, gap * (i + 1)));
      later(next, gap * rows.length + 300);
    };
    // Instructions are one text block: write it line by line.
    const writeLines = (lines, gap) => (next) => {
      const pre = $('#instr');
      pre.classList.remove('wait');
      pre.textContent = '';
      lines.forEach((l, i) => later(() => { pre.textContent += (i ? '\n' : '') + l; }, gap * (i + 1)));
      later(next, gap * lines.length + 300);
    };

    // Chat ↔ Configure, using the toolbar that's already there.
    const openChat = () => {
      $('#cfgpop').hidden = true;
      $('#cfgseg').classList.remove('cfg');
      $('#chatseg').classList.add('active');
      $('#askin').textContent = firstQ; // the question picked in Genie Code, or the default
      $('#askbox').classList.add('focus');
    };
    const openConfig = () => {
      $('#cfgpop').hidden = false;
      $('#cfgseg').classList.add('cfg');
      $('#chatseg').classList.remove('active');
      $('#askbox').classList.remove('focus');
    };
    $('#chatseg').addEventListener('click', () => { if (!$('#gdot').hidden) openChat(); });
    $('#cfgseg').addEventListener('click', openConfig);
    $('#setup-note').addEventListener('click', (e) => { if (e.target.closest('.link')) openChat(); });

    let firstQ = FIRST_QS[0];
    let answered = false;
    let closeAsk = null;

    run([
      // Each section: the highlight moves there first, Genie Code works in chat, then the content lands.
      // Step 1 · About: the description is in focus as soon as Genie starts.
      (n) => later(() => {
        startStep(0);
        $('#thoughts').hidden = false;
        streamInto($('#th-text'), THOUGHTS_P, CHAT_WORD_MS, n);
      }, 300),
      // The description comes into focus once Genie has introduced itself.
      (n) => { focus('#sec-desc', '#descwrap', 'Genie Code is writing a description…'); tool('Loaded agent setup tools', 900, n); },
      (n) => say("The agent already has a clear purpose and name, so I'll start with a description. Optionally, pick a question it should answer first and I'll use it as a starting example.", n),
      (n) => {
        closeAsk = showAsk((ans) => {
          if (ans !== null && ans < FIRST_QS.length - 1) { firstQ = FIRST_QS[ans]; answered = true; }
        });
        later(n, 400);
      },
      (n) => tool('Drafted a description from your prompt', 1200, n),
      (n) => {
        $('#descwrap .ph').remove();
        $('#desc').hidden = false;
        streamInto($('#desc'), P_DESC, CFG_WORD_MS, n);
      },
      (n) => { writing('#sec-desc', false); later(n, 300); },
      (n) => { focus('#sec-cq', '#cqs', 'Genie Code is drafting common questions…'); say('Next, a few common questions your team is likely to ask.', n); },
      (n) => tool('Drafted 3 common questions', 1000, n),
      addRows('#cqs', COMMON_QS.map(cqRow), 'cq', CFG_ROW_MS),
      (n) => { writing('#sec-cq', false); finishStep(0); k.showSpaceDesc(); later(n, 300); },
      // Step 2 · Sources
      (n) => { startStep(1); focus('#sec-sources', '#tables', 'Genie Code is searching for tables…'); say("Now I'll search for sales tables, dashboards, existing Genie agents, and workspace context that cover orders, revenue, and regions.", n); },
      (n) => tool('Searched tables, dashboards and Genie agents', 1400, n),
      (n) => tool('Inspected `sales.orders` and sampled rows', 1200, n),
      (n) => say('`sales.orders` is a strong fit: 48,210 orders with order date, status, and order total. I\'ll join it to `sales.customers` and `sales.regions` for regional views, and `sales.order_items` for product detail. Attaching these tables now.', n),
      addRows('#tables', TABLES.map(tableRow), 'trow', CFG_ROW_MS),
      (n) => { writing('#sec-sources', false); finishStep(1); later(n, 300); },
      // Step 3 · Instructions, then example queries
      (n) => {
        startStep(2);
        writing('#sec-instructions', true);
        $('#instr').textContent = 'Genie Code is checking the data to write business context…';
        $('#instr').classList.add('active');
        working('#examples', 'Genie Code will add example queries after the instructions.');
        say("Now I'll prepare the business context. First, a quick check on how cancelled and refunded orders show up, so the revenue guidance matches the data.", n);
      },
      (n) => tool('Checked order status values and fiscal calendar', 1400, n),
      (n) => say('About 6% of orders are cancelled or refunded but still carry an order total, so revenue should exclude them. Saving the instructions now.', n),
      writeLines(INSTR, CFG_LINE_MS),
      (n) => { writing('#sec-instructions', false); unbusy('instructions'); later(n, 300); },
      (n) => { k.showTab('examples'); focus('#sec-examples', '#examples', 'Genie Code is writing example queries…'); say('Next, example queries so the agent answers revenue and region questions the same way every time.', n); },
      (n) => tool('Wrote example queries for revenue and regions', 1200, n),
      (n) => addRows('#examples', exItems(firstQ).map(exRow), 'exrow', CFG_ROW_MS)(n),
      (n) => { writing('#sec-examples', false); finishStep(2); unbusy('examples'); later(n, 300); },
      // Step 4 · Benchmarks
      (n) => { startStep(3); say("Business context is saved. Final step: benchmark questions, which are test questions with expected answers that check the agent's accuracy.", n); },
      (n) => tool('Added 3 benchmarks', 900, n),
      (n) => tool('Ran 3 benchmarks', 1600, n),
      (n) => say('All three benchmarks passed.', n),
      (n) => {
        finishStep(3);
        if (closeAsk) closeAsk(null); // setup is done; the optional question is no longer needed
        $('.as-tab .mini-spin')?.remove();
        $('#gdot').hidden = false;
        $('#setup-title').textContent = 'Genie set up your agent';
        // Stay on the finished setup; the user decides when to test (no auto-close).
        $('#setup-note').innerHTML = '<span>Your agent is ready. Review any step, or try it now.</span><button type="button" class="btn-primary sm link">Try your agent</button>';
        $('#setup-note').classList.add('ready');
        n();
      },
      // Setup summary (P2.1)
      () => {
        post('ai-msg fresh', `<p>Your agent is ready. Here's what's in place:</p><ul>
          <li><b>Data:</b> <code>sales.orders</code> joined to customers, regions, and order items.</li>
          <li><b>Business context:</b> net revenue excludes cancelled and refunded orders, regions come from the customer record, fiscal quarters start in February, plus 3 example queries.</li>
          <li><b>Benchmarks:</b> 3 of 3 passed${answered ? ', including your first question' : ''}.</li>
        </ul><p>Try your agent whenever you're ready. I've added ${answered ? 'your first question' : 'a starter question'} to Agent Chat.</p>`);
      },
    ]);
  };

  // ---------- Current / Proposed toggle ----------
  let version = 'new';
  const ver = $('#ver');
  const startBuild = (prompt) => {
    ver.hidden = false;
    (version === 'new' ? renderProposed : renderBuild)(prompt);
  };
  ver.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.dataset.v === version) return;
    version = b.dataset.v;
    ver.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
    goDescribe(); // start the chosen version from the beginning
  });

  const goDescribe = () => {
    clearTimers();
    screen.classList.remove('s2');
    assistBtn.classList.remove('on');
    renderDescribe();
  };
  const restart = () => {
    clearTimers();
    ver.hidden = true;
    screen.classList.remove('s2');
    assistBtn.classList.remove('on');
    renderDescribe();
  };

  $('#restart').addEventListener('click', restart);
  renderDescribe();
})();
