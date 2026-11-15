/* Genie agent concept prototype. Synthetic data; only the prompt box is interactive. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const view = $('#view');

  // ---------- Demo copy (edit freely) ----------
  const PROMPT =
    'Create an AI agent for our sales team that can answer questions about customer orders, ' +
    'revenue trends, and regional performance.';
  const AGENT_NAME = 'Sales Insights and Customer Orders';
  const THOUGHTS =
    "I'm Genie Code, and I'll help you set up your sales analytics agent — finding the right order " +
    'and revenue data, adding the business context it needs, and then checking its answers. The scope ' +
    "is clear (orders, revenue trends, regional performance), so let's start with one sample question " +
    'to anchor the setup.';
  const FIRST_QS = [
    'What is our monthly revenue trend over the past year?',
    'Which region had the highest order volume last quarter?',
    'Who are our top 10 customers by total order value?',
    'How does average order value compare across product categories?',
    'Other…',
  ];
  const SETUP_STEPS = ['Define agent details', 'Identify relevant data', 'Prepare business context', 'Add initial benchmarks'];
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

  const spacePane = () => `
    <section class="space" aria-hidden="true">
      <div class="space-bar">
        <span class="seg">${I.bubble}Chat</span>
        <span class="seg plain">${I.eye}Monitor</span>
        <span class="seg plain">${I.bars}Benchmark</span>
        <span class="ico">${I.compose}</span>
        <span class="ico">${I.history}</span>
        <span class="seg cfg">${I.gear}Configure</span>
        <span class="share">${I.lock}Share</span>
        <span class="ico">${I.kebab}</span>
      </div>

      <div class="space-body">
        <h1 class="space-title">${AGENT_NAME}</h1>
        <div class="ask">
          <div class="ask-in">Ask your question…</div>
          <span class="ask-chip">${I.agent}Agent</span>
        </div>
        <p class="ask-note">Connect apps and data sources to your agent</p>
        <p class="ask-ai">Always review the accuracy of responses.</p>
        <ul class="samples">${SAMPLE_QS.map((q) => `<li>${q}</li>`).join('')}</ul>
      </div>

      <div class="cfg-pop">
        <div class="setup">
          <div class="setup-head"><b>Finish setting up your agent</b><span>0 of 4 ${I.chevDown}</span></div>
          <div class="setup-bar"><i></i></div>
          <ol class="setup-steps">
            ${SETUP_STEPS.map((s, i) => `<li class="${i === 0 ? 'on' : ''}"><span class="n">${i + 1}</span>${s}${i === 0 ? '<span class="mini-spin"></span>' : ''}</li>`).join('')}
          </ol>
          <p class="setup-note">You can leave this page or close the agent window anytime and finish setup later.</p>
        </div>

        <div class="cfg-card">
          <div class="tabs">
            <span class="on">About</span><span>Sources</span><span>Instructions</span><span>Examples</span>
            <span class="tabs-x">${I.x}</span>
          </div>
          <div class="cfg-body">
            <div class="cfg-sec"><h3>Description</h3>${I.pencil}</div>
            <div class="suggest">
              <div class="suggest-head">${I.sparkle}<span>Genie Suggested Description</span>${I.x}</div>
              <p>${SUGGESTED_DESC.slice(0, 150)}…</p>
              <span class="link">Show more</span>
              <div class="suggest-btns"><span class="btn-sm">${I.check}Accept</span><span class="btn-sm">${I.pencil}Edit</span></div>
            </div>
            <div class="cfg-sec"><h3>Common questions</h3>${I.pencil}</div>
            ${COMMON_QS.map((q) => `<div class="cq"><span>${q}</span>${I.sparkle}${I.plus}</div>`).join('')}
          </div>
        </div>
      </div>
    </section>`;

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

        <div class="ask-card" id="askcard" hidden>
          <div class="ask-timer"><i id="timer-bar"></i></div>
          <h4>Which question would you like this agent to answer first?</h4>
          <div class="opts" role="radiogroup">
            ${FIRST_QS.map((q, i) => `<label class="opt"><input type="radio" name="firstq" value="${i}"><span>${q}</span></label>`).join('')}
          </div>
          <p class="ask-foot">When the timer ends, these questions will be skipped. Genie Code will continue with the unanswered inputs unresolved.</p>
          <div class="ask-actions">
            <span class="skip-chip" id="skipchip">Auto-skipping in <b id="secs">${SKIP_SECONDS}</b>s <button type="button" id="stopskip" aria-label="Stop auto-skip">${I.x}</button></span>
            <button type="button" class="btn-sm">Skip</button>
            <button type="button" class="btn-submit" id="submitall" disabled>Submit all</button>
          </div>
        </div>
      </div>

      <div class="composer" aria-hidden="true">
        <div class="cmp-in">Queue follow-ups</div>
        <div class="cmp-row">${I.plus}<span class="stop"></span></div>
      </div>
      <p class="as-foot">Always review the accuracy of responses.</p>
    </aside>`;

  const renderBuild = (prompt) => {
    clearTimers();
    setStep(2);
    screen.classList.add('s2');
    assistBtn.classList.add('on');
    view.innerHTML = spacePane() + assistantPane(prompt);

    // Stream the "Thoughts" text word by word, then show the question card.
    const words = THOUGHTS.split(' ');
    const th = $('#thoughts');
    const tt = $('#th-text');
    later(() => {
      th.hidden = false;
      let w = 0;
      const iv = setInterval(() => {
        w += 1;
        tt.textContent = words.slice(0, w).join(' ');
        if (w >= words.length) { clearInterval(iv); showAsk(); }
      }, 35);
      timers.push(iv);
    }, 500);
  };

  const showAsk = () => {
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

    const iv = setInterval(() => {
      left -= 1;
      secsEl.textContent = left;
      bar.style.width = `${((total - left) / total) * 100}%`;
      if (left <= 0) {
        clearInterval(iv);
        $('#skipchip').textContent = 'Skipped';
      }
    }, 1000);
    timers.push(iv);

    $('#stopskip').addEventListener('click', () => {
      clearInterval(iv);
      $('#skipchip').remove();
    });
  };

  // ======================================================================
  // Proposed version (PRD): one AI-led creation process.
  // Checklist, config tabs and Genie Code share one status language and move together.
  // ======================================================================
  const P_STEPS = [
    { label: 'Define agent details', tab: 'about', done: 'Drafted the description and common questions' },
    { label: 'Identify relevant data', tab: 'sources', done: 'Connected 4 tables. Your agent can answer questions now' },
    { label: 'Prepare business context', tab: 'instructions', done: 'Added 3 business rules' },
    { label: 'Add initial benchmarks', tab: 'examples', done: 'Added example questions to check answers' },
  ];
  const TABS = [['about', 'About'], ['sources', 'Sources'], ['instructions', 'Instructions'], ['examples', 'Examples']];
  const TABLES = [
    ['sales.orders', '1.2M rows · order date, status, order total'],
    ['sales.customers', '48K rows · account, segment, region'],
    ['sales.order_items', '3.9M rows · product, quantity, price'],
    ['sales.regions', '12 rows · region and territory names'],
  ];
  const RULES = [
    'Revenue is the sum of order_total, excluding cancelled and refunded orders.',
    'Use customers.region for regional performance, not the shipping address.',
    'Fiscal quarters start in February.',
  ];
  const EXAMPLES = [
    'Which region had the highest order volume last quarter?',
    'Who are our top 10 customers by total order value?',
    'How does average order value compare across product categories?',
  ];
  const TEST_Q = 'What is our monthly revenue trend over the past year?';
  // Slows the whole Proposed timeline. 1 = original (~12s), 2.5 = ~30s.
  const PACE = 2.5;

  const chip = {
    ai: '<span class="st-chip ai"><span class="mini-spin"></span>Genie working</span>',
    done: '<span class="st-chip ok">✓ Done</span>',
    next: '<span class="st-chip next">Up next</span>',
  };

  const pSpacePane = () => `
    <section class="space p">
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
        <div class="ask" id="askbox">
          <div class="ask-in" id="askin">Ask your question…</div>
          <span class="ask-chip">${I.agent}Agent</span>
        </div>
        <p class="ask-note">Connect apps and data sources to your agent</p>
        <p class="ask-ai">Always review the accuracy of responses.</p>
        <ul class="samples">${SAMPLE_QS.map((q) => `<li>${q}</li>`).join('')}</ul>
      </div>

      <div class="cfg-pop" id="cfgpop">
        <div class="ready" id="ready" hidden>
          <span class="ready-dot"></span>
          <div><b>Your agent is ready to test</b><small id="ready-sub">Genie is still adding business context and examples.</small></div>
          <button type="button" class="btn-test" id="testbtn">Test agent</button>
        </div>

        <div class="setup">
          <div class="setup-head"><b id="setup-title">Genie is setting up your agent</b><span><span id="setup-count">0</span> of 4 ${I.chevDown}</span></div>
          <div class="setup-bar"><i id="setup-bar"></i></div>
          <div class="legend" aria-label="Status legend">
            <span><i class="lg ai"></i>Genie working</span>
            <span><i class="lg rev"></i>Optional review</span>
            <span><i class="lg need"></i>Needs your input</span>
          </div>
          <ol class="setup-steps p" id="psteps">
            ${P_STEPS.map((s, i) => `<li data-i="${i}" data-tab="${s.tab}"><span class="n">${i + 1}</span><span class="lbl">${s.label}</span><span class="st">${chip.next}</span></li>`).join('')}
          </ol>
        </div>

        <div class="cfg-card">
          <div class="tabs" id="ptabs">
            ${TABS.map(([k, l]) => `<button type="button" class="tab pending" data-tab="${k}"><i class="ts"></i>${l}</button>`).join('')}
            <span class="tabs-x">${I.x}</span>
          </div>
          <div class="cfg-body" id="pbody">
            <div class="pane" data-pane="about">
              <div class="sec" id="sec-desc">
                <div class="cfg-sec"><h3>Description</h3>${I.pencil}</div>
                <p class="gen" id="desc"></p>
                <div class="by" id="desc-by" hidden>${I.sparkle}Written by Genie · <span class="link">Edit</span></div>
              </div>
              <div class="sec" id="sec-cq">
                <div class="cfg-sec"><h3>Common questions</h3>${I.pencil}</div>
                <div id="cqs"></div>
              </div>
            </div>
            <div class="pane" data-pane="sources" hidden>
              <div class="sec" id="sec-src">
                <div class="cfg-sec"><h3>Tables</h3>${I.plus}</div>
                <div id="tables"></div>
              </div>
            </div>
            <div class="pane" data-pane="instructions" hidden>
              <div class="sec" id="sec-rules">
                <div class="cfg-sec"><h3>Business rules</h3>${I.pencil}</div>
                <div id="rules"></div>
              </div>
            </div>
            <div class="pane" data-pane="examples" hidden>
              <div class="sec" id="sec-ex">
                <div class="cfg-sec"><h3>Example questions</h3>${I.plus}</div>
                <div id="examples"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;

  const pAssistantPane = (prompt) => `
    <aside class="assistant" aria-label="Genie Code">
      <div class="as-head" aria-hidden="true">
        <span class="ico sm">${I.expand}</span>
        <span class="as-tab"><span class="mini-spin" id="as-spin"></span><span class="as-title">AI Agent Setup for ${AGENT_NAME}</span>${I.kebab}${I.x}</span>
        <span class="as-tools"><span class="ico sm">${I.compose}</span><span class="ico sm">${I.history}</span><span class="ico sm">${I.kebab}</span><span class="ico sm">${I.x}</span></span>
      </div>

      <div class="as-feed" id="feed">
        <div class="me-msg">Help me finish setting up my Genie agent which does the following: ${esc(prompt)}</div>
        <div class="thoughts" id="thoughts" hidden><div class="th-label">Thoughts</div><p id="th-text"></p></div>

        <div class="ask-card" id="askcard" hidden>
          <div class="ask-timer"><i id="timer-bar"></i></div>
          <span class="st-chip rev">Optional</span>
          <h4>Which question would you like this agent to answer first?</h4>
          <div class="opts" role="radiogroup">
            ${FIRST_QS.slice(0, 4).map((q, i) => `<label class="opt"><input type="radio" name="firstq" value="${i}"><span>${q}</span></label>`).join('')}
          </div>
          <p class="ask-foot">Genie keeps building if you skip. Your answer becomes an example question.</p>
          <div class="ask-actions">
            <span class="skip-chip" id="skipchip">Auto-skipping in <b id="secs">${SKIP_SECONDS}</b>s <button type="button" id="stopskip" aria-label="Stop auto-skip">${I.x}</button></span>
            <button type="button" class="btn-sm" id="skipbtn">Skip</button>
            <button type="button" class="btn-submit" id="submitall" disabled>Submit</button>
          </div>
        </div>
      </div>

      <div class="composer" aria-hidden="true">
        <div class="cmp-in">Queue follow-ups</div>
        <div class="cmp-row">${I.plus}<span class="stop"></span></div>
      </div>
      <p class="as-foot">Always review the accuracy of responses.</p>
    </aside>`;

  const renderProposed = (prompt) => {
    clearTimers();
    setStep(2);
    screen.classList.add('s2');
    assistBtn.classList.add('on');
    view.innerHTML = pSpacePane() + pAssistantPane(prompt);

    // Paced timers for this screen only.
    const later = (fn, ms) => timers.push(setTimeout(fn, ms * PACE));
    const feed = $('#feed');
    const scrollFeed = () => feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });
    let follow = true; // auto-follow Genie's current tab until the user picks one
    let doneCount = 0;
    let examplesReady = false;
    let answer = null;

    const showTab = (k) => {
      document.querySelectorAll('#ptabs .tab').forEach((t) => t.classList.toggle('on', t.dataset.tab === k));
      document.querySelectorAll('#pbody .pane').forEach((p) => { p.hidden = p.dataset.pane !== k; });
    };
    const tabState = (k, st) => {
      const t = $(`#ptabs .tab[data-tab="${k}"]`);
      t.classList.remove('pending', 'working', 'review');
      t.classList.add(st);
    };
    const writing = (id, on) => $(id).classList.toggle('writing', on);
    const stepState = (i, st) => {
      const li = $(`#psteps li[data-i="${i}"]`);
      li.classList.toggle('on', st === 'ai');
      li.classList.toggle('done', st === 'done');
      $('.st', li).innerHTML = chip[st];
      if (st === 'done') $('.n', li).textContent = '✓';
    };
    const addItem = (wrap, html, cls = 'item') => {
      const d = document.createElement('div');
      d.className = `${cls} fresh`;
      d.innerHTML = html;
      $(wrap).appendChild(d);
      return d;
    };
    const genieSays = (text) => {
      const d = document.createElement('div');
      d.className = 'g-msg';
      d.innerHTML = `<span class="g-ok">✓</span><span>${text}</span>`;
      feed.appendChild(d);
      scrollFeed();
    };
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
    const finishStep = (i) => {
      stepState(i, 'done');
      tabState(P_STEPS[i].tab, 'review');
      doneCount += 1;
      $('#setup-count').textContent = doneCount;
      $('#setup-bar').style.width = `${doneCount * 25}%`;
      genieSays(P_STEPS[i].done);
    };
    const startStep = (i) => {
      stepState(i, 'ai');
      tabState(P_STEPS[i].tab, 'working');
      if (follow) showTab(P_STEPS[i].tab);
    };
    // One row per question; the user's answer re-tags an existing row instead of duplicating it.
    const addExample = (q, mine) => {
      const tag = mine ? '<span class="from-you">From your answer</span>' : I.sparkle;
      const existing = [...document.querySelectorAll('#examples .cq')].find((r) => r.dataset.q === q);
      if (existing) {
        if (mine) existing.innerHTML = `<span>${q}</span>${tag}`;
        return;
      }
      addItem('#examples', `<span>${q}</span>${tag}`, 'cq').dataset.q = q;
    };

    // User can review any tab; that stops auto-follow.
    $('#ptabs').addEventListener('click', (e) => {
      const t = e.target.closest('.tab');
      if (!t) return;
      follow = false;
      showTab(t.dataset.tab);
    });
    $('#psteps').addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li) return;
      follow = false;
      showTab(li.dataset.tab);
    });

    // Ready to test: collapse config, prefill a question.
    const openChat = () => {
      $('#cfgpop').hidden = true;
      $('#cfgseg').classList.remove('cfg');
      $('#chatseg').classList.add('active');
      $('#askin').textContent = TEST_Q;
      $('#askbox').classList.add('focus');
    };
    const openConfig = () => {
      $('#cfgpop').hidden = false;
      $('#cfgseg').classList.add('cfg');
      $('#chatseg').classList.remove('active');
      $('#askbox').classList.remove('focus');
    };
    $('#testbtn').addEventListener('click', openChat);
    $('#chatseg').addEventListener('click', () => { if (!$('#gdot').hidden) openChat(); });
    $('#cfgseg').addEventListener('click', openConfig);

    showTab('about');

    // --- Genie Code thoughts (runs alongside step 1) ---
    later(() => {
      $('#thoughts').hidden = false;
      streamInto($('#th-text'), THOUGHTS, 30);
    }, 300);

    // --- Step 1: About ---
    later(() => {
      startStep(0);
      writing('#sec-desc', true);
      streamInto($('#desc'), SUGGESTED_DESC, 70, () => {
        $('#desc-by').hidden = false;
        writing('#sec-desc', false);
        writing('#sec-cq', true);
        COMMON_QS.forEach((q, i) => later(() => addItem('#cqs', `<span>${q}</span>${I.sparkle}`, 'cq'), 350 * i));
        later(() => { writing('#sec-cq', false); finishStep(0); nextSources(); }, 350 * COMMON_QS.length + 200);
      });
    }, 500);

    // --- Step 2: Sources → ready to test ---
    const nextSources = () => later(() => {
      startStep(1);
      writing('#sec-src', true);
      later(showAsk, 400);
      TABLES.forEach(([n, d], i) => later(() => addItem('#tables',
        `<span class="tname">${n}</span><small>${d}</small>`, 'trow'), 550 * (i + 1)));
      later(() => {
        writing('#sec-src', false);
        finishStep(1);
        $('#ready').hidden = false;
        $('#gdot').hidden = false;
        nextRules();
      }, 550 * TABLES.length + 400);
    }, 400);

    // --- Step 3: Instructions ---
    const nextRules = () => later(() => {
      startStep(2);
      writing('#sec-rules', true);
      RULES.forEach((r, i) => later(() => addItem('#rules', `<span>${r}</span>`, 'cq'), 600 * (i + 1)));
      later(() => { writing('#sec-rules', false); finishStep(2); nextExamples(); }, 600 * RULES.length + 300);
    }, 600);

    // --- Step 4: Examples ---
    const nextExamples = () => later(() => {
      startStep(3);
      writing('#sec-ex', true);
      examplesReady = true;
      if (answer) addExample(answer, true);
      EXAMPLES.forEach((q, i) => later(() => addExample(q, q === answer), 550 * (i + 1)));
      later(() => {
        writing('#sec-ex', false);
        finishStep(3);
        $('#setup-title').textContent = 'Setup complete';
        $('#ready-sub').textContent = 'Setup is complete. Review any tab marked with a dot.';
        $('#as-spin').hidden = true;
      }, 550 * EXAMPLES.length + 300);
    }, 600);

    // --- Optional question card ---
    const showAsk = () => {
      const card = $('#askcard');
      card.hidden = false;
      scrollFeed();
      const submit = $('#submitall');
      const bar = $('#timer-bar');
      const total = 60;
      let left = SKIP_SECONDS;
      bar.style.width = `${((total - left) / total) * 100}%`;

      const close = (msg) => {
        clearInterval(iv);
        card.classList.add('closed');
        card.innerHTML = `<span class="g-ok">✓</span><span>${msg}</span>`;
      };
      card.addEventListener('change', () => { submit.disabled = false; submit.classList.add('ready'); });
      const iv = setInterval(() => {
        left -= 1;
        $('#secs').textContent = left;
        bar.style.width = `${((total - left) / total) * 100}%`;
        if (left <= 0) close('Skipped. Genie continued without it.');
      }, 1000);
      timers.push(iv);
      $('#stopskip').addEventListener('click', () => { clearInterval(iv); $('#skipchip').remove(); });
      $('#skipbtn').addEventListener('click', () => close('Skipped. Genie continued without it.'));
      submit.addEventListener('click', () => {
        const picked = card.querySelector('input:checked');
        if (!picked) return;
        answer = FIRST_QS[+picked.value];
        close('Added to Examples. Genie will check this question first.');
        if (examplesReady) addExample(answer, true);
      });
    };
  };

  // ---------- Current / Proposed toggle ----------
  let version = 'new';
  let lastPrompt = PROMPT;
  const ver = $('#ver');
  const startBuild = (prompt) => {
    lastPrompt = prompt;
    ver.hidden = false;
    (version === 'new' ? renderProposed : renderBuild)(prompt);
  };
  ver.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.dataset.v === version) return;
    version = b.dataset.v;
    ver.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
    startBuild(lastPrompt);
  });

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
