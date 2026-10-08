// Adapted from cabine_landing/site/dist/v2.js: the standalone store/closet demo only.
(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const $ = (selector, root = document) => root.querySelector(selector);
 const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
 const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
 // Store page → the Cabine icon is clicked → side panel opens and loads → the default look → visitors try other pieces.
 // Each finished look lives at assets/v2/looks/<top>__<outer>__<bottom>__<shoes>.webp; a missing file shows a placeholder.
 const OPTIONS = {
  outer: {label: 'Outer', items: [['boucle-jacket', 'Black bouclé jacket', 'jacket-black-boucle'], ['no-outer', 'No outer', null]], start: 'no-outer'},
  top: {label: 'Top', items: [['stripe-shirt', 'Striped shirt', 'shirt-blue-stripe'], ['charcoal-top', 'Charcoal top', 'top-charcoal-asymmetric']]},
  bottom: {label: 'Bottom', items: [['light-jeans', 'Light jeans', 'jeans-light-straight'], ['black-mini', 'Black satin mini skirt', 'skirt-black-satin-mini']]},
  shoes: {label: 'Shoes', items: [['silver-flats', 'Silver ballet flats', 'shoes-silver-ballet']]}
 };
 const ext = $('.ext-window'), lookBox = $('.ext-look'), lookImg = $('.ext-look-img'), missing = $('.ext-missing');
 const pick = Object.fromEntries(Object.entries(OPTIONS).map(([k, o]) => [k, o.start || o.items[0][0]]));
 const label = (k, v) => OPTIONS[k].items.find(i => i[0] === v)[1].toLowerCase();
 $('[data-pickers]').innerHTML = Object.entries(OPTIONS).map(([key, o]) => `<div class="picker"><small>${o.label}</small><div class="chips" role="group" aria-label="Choose ${o.label.toLowerCase()}">${
  o.items.map(([value, name, file]) => `<button class="chip" type="button" data-key="${key}" data-value="${value}" aria-pressed="${pick[key] === value}" title="${name}">${
   file ? `<img src="assets/v2/${file}.webp" alt="${name}">` : `<span class="chip-none">${name}</span>`}</button>`).join('')
 }</div></div>`).join('') + '<p class="picker-hint">Tap a piece to restyle</p>';
 // The Cabine "C" loader finishes drawing at 2.12s (it then holds for 0.8s); the look appears right as the mark completes.
 // Each load restarts the GIF from its first frame by giving it a fresh object URL.
 const LOADER_MS = 2150;
 const loaderImg = $('.ext-loading img');
 let loaderBlob = null, loaderUrl = null;
 fetch(loaderImg.getAttribute('src')).then(r => r.blob()).then(b => { loaderBlob = b; }).catch(() => {});
 const restartLoader = () => {
  if (!loaderBlob) { loaderImg.src = 'assets/brand/loading.gif?' + Date.now(); return; }
  const url = URL.createObjectURL(loaderBlob);
  loaderImg.src = url; if (loaderUrl) URL.revokeObjectURL(loaderUrl); loaderUrl = url;
 };
 let lookRequest = 0;  // only the latest selection may update the look
 const showLook = (delay = LOADER_MS) => {
  const request = ++lookRequest, started = performance.now();
  lookBox.classList.add('is-loading'); restartLoader();
  const src = `assets/v2/looks/${pick.top}__${pick.outer}__${pick.bottom}__${pick.shoes}.webp`;
  const probe = new Image();
  const done = ok => setTimeout(() => {
   if (request !== lookRequest) return;
   lookBox.classList.remove('is-loading');
   missing.hidden = ok; lookImg.hidden = !ok;
   if (ok) {
    lookImg.src = src;
    const outer = pick.outer === 'no-outer' ? '' : `${label('outer', pick.outer)} over a `;
    lookImg.alt = `${outer}${label('top', pick.top)}, ${label('bottom', pick.bottom)} and ${label('shoes', pick.shoes)}`;
   }
  }, reduced ? 0 : Math.max(0, delay - (performance.now() - started)));   // never cut the loader short
  probe.onload = () => done(true); probe.onerror = () => done(false); probe.src = src;
 };
 $$('.chip[data-key]', ext).forEach(btn => btn.addEventListener('click', () => {
  pick[btn.dataset.key] = btn.dataset.value;
  $$(`.chip[data-key="${btn.dataset.key}"]`, ext).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
  showLook();
 }));
 let running = false;
 // Once the default look is up, the black mini skirt gently pulses to invite a first tap.
 const invite = $('.chip[data-value="black-mini"]', ext);
 const stopInvite = () => invite.classList.remove('is-inviting');
 $$('.chip[data-key]', ext).forEach(b => b.addEventListener('click', stopInvite));
 const openSequence = async () => {
  if (running) return; running = true; stopInvite();
  ++lookRequest; // cancel any outfit change that was loading before replay
  lookBox.classList.remove('is-loading');
  Object.entries(OPTIONS).forEach(([k, o]) => { pick[k] = o.start || o.items[0][0]; });   // start again from the default look
  $$('.chip[data-key]', ext).forEach(b => b.setAttribute('aria-pressed', String(pick[b.dataset.key] === b.dataset.value)));
  lookImg.src = `assets/v2/looks/${pick.top}__${pick.outer}__${pick.bottom}__${pick.shoes}.webp`; lookImg.hidden = false; missing.hidden = true;
  if (reduced) { ext.dataset.state = 'ready'; running = false; return; }
  ext.dataset.state = 'store'; await sleep(600);      // the store page on its own
  ext.dataset.state = 'menu'; await sleep(650);       // right-click the product photo: the context menu opens
  ext.dataset.state = 'clicking'; await sleep(780);   // the cursor glides to "Try in Cabine", picks it, and the piece is captured
  ext.dataset.state = 'loading'; restartLoader(); await sleep(LOADER_MS);   // panel opens with the pieces; the look area plays one full loader
  ext.dataset.state = 'ready';                        // the striped shirt with light jeans; visitors can restyle it
  await sleep(900);
  if (!reduced) invite.classList.add('is-inviting');   // nudge visitors to try another piece
  running = false;
 };
 new IntersectionObserver(([e], io) => { if (e.isIntersecting) { io.disconnect(); openSequence(); } }, {threshold: .45}).observe(ext);
 $('.ext-replay').addEventListener('click', e => { e.stopPropagation(); openSequence(); });
})();
