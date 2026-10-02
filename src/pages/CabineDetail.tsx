import ProjectIntro from '../components/ProjectIntro';
import { Reveal } from '../components/shared';

// ─── Data ────────────────────────────────────────────────────────

const OVERVIEW = {
  role: 'Product and Engineering (solo)',
  context: 'Fall 2026 · In progress, defining the first version',
  summary:
    'A browser extension that keeps your wardrobe beside every store, so you can combine a new piece with clothes you already own before deciding whether to buy.',
};

const STEPS = [
  { label: 'Find', description: 'Spot a piece while shopping online.' },
  { label: 'Bring it in', description: 'Capture it from the product page. Cabine opens with it on the canvas.' },
  { label: 'Combine', description: 'Add clothes you own and swap tops, bottoms, and outerwear.' },
  { label: 'Decide', description: 'Buy, save, or skip.' },
];

const SCOPE_DECISION = {
  question: 'How do garment images get into Cabine?',
  options: 'Extract garments from model photos and busy backgrounds, or support only clean, standalone product and closet images.',
  decision: 'Clean images only.',
  reasoning:
    'The hardest technical problem isn’t the most important product problem. Before investing in computer vision or realistic try-on, I want to prove the core behavior is valuable.',
  tradeoff: 'Fewer supported products, and users need clean photos of their own clothes.',
  revisit: 'If people find the loop useful but image constraints become the main source of friction, extraction is the next problem worth solving.',
};

const OUT_OF_SCOPE = ['Realistic try-on', 'Extraction from model photos', 'Outfit recommendations or scores', 'Full wardrobe management'];

const RISKS = [
  { title: 'Value', description: 'Will people pause mid-shopping to use it, or will it feel like friction?' },
  { title: 'Setup', description: 'How few owned pieces make it useful? A handful of frequently worn ones may be enough.' },
  { title: 'Fidelity', description: 'Are clean cutouts enough to judge a combination, or do people expect realistic try-on?' },
  { title: 'Extraction', description: 'Can Cabine reliably pull usable images from real shopping sites?' },
];

const EYEBROW = 'text-[12px] font-semibold text-[#999] uppercase tracking-[0.14em] mb-3';
const H2 = 'text-[26px] max-sm:text-[22px] font-bold text-[#111] tracking-tight leading-[1.2]';
const BODY = 'text-[16px] max-sm:text-[15px] font-normal text-[#444] leading-[1.65]';
const CARD = 'bg-black/[0.03] rounded-2xl p-7 max-sm:p-6';

// ─── Page ────────────────────────────────────────────────────────

export default function CabineDetail() {
  return (
    <div className="case-study-content">

      <ProjectIntro name="Cabine" summary={OVERVIEW.summary} role={OVERVIEW.role} context={OVERVIEW.context} links={[]} />

      <div className="h-px bg-black/5 mb-16" />

      {/* Problem */}
      <Reveal className="mb-20 max-sm:mb-14" id="problem" outline="The Problem">
        <div className={EYEBROW}>The Problem</div>
        <h2 className={`${H2} mb-6`}>Stores sell pieces. You wear outfits.</h2>
        <p className={`${BODY} mb-5`}>
          Product pages answer <em>do I like this piece?</em> but not <em>will I wear it with what I already own?</em> The item is styled in the retailer's world, not yours, so shoppers decide on the piece and find out later whether it works as an outfit.
        </p>
        <p className={`${BODY} mb-10`}>
          Wardrobe apps organize what you own. Try-on tools simulate fit. Stores help you find more. None of them bring your wardrobe into the moment you decide. Cabine is for people who shop online often and own pieces they rarely wear for exactly that reason.
        </p>
        <div className={`${CARD} grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-[15px] leading-[1.6]`}>
          <div className="text-[13px] font-semibold text-[#999] uppercase tracking-wide pt-[2px]">Today</div>
          <div className="text-[#666]">Browse → Like → Cart → Buy</div>
          <div className="text-[13px] font-semibold text-[#999] uppercase tracking-wide pt-[2px]">Cabine</div>
          <div className="text-[#111] font-medium">Browse → Combine with my wardrobe → Decide → Buy or leave</div>
        </div>
      </Reveal>

      <div className="h-px bg-black/5 mb-16" />

      {/* Product */}
      <Reveal className="mb-20 max-sm:mb-14" id="how-it-works" outline="How It Works">
        <div className={EYEBROW}>How It Works</div>
        <h2 className={`${H2} mb-6`}>Show the combination. Let the user judge.</h2>
        <p className={`${BODY} mb-10`}>
          Pieces sit on a simple mannequin-style canvas. It doesn't simulate fit, and Cabine never scores your outfit or recommends more to buy. It only answers: <em>can I imagine wearing this with what I already own?</em>
        </p>
        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4">
          {STEPS.map((step, i) => (
            <div key={step.label} className={`${CARD} !p-5`}>
              <div className="text-[12px] font-semibold text-[#999] mb-2">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="text-[16px] font-semibold text-[#111] tracking-tight mb-1">{step.label}</h3>
              <p className="text-[14px] text-[#555] leading-[1.55]">{step.description}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="h-px bg-black/5 mb-16" />

      {/* Decision Log */}
      <Reveal className="mb-20 max-sm:mb-14" id="decisions" outline="Decision Log">
        <div className={EYEBROW}>Decision Log</div>
        <h2 className={`${H2} mb-3`}>Prove the behavior before the hard tech.</h2>
        <p className="text-[16px] max-sm:text-[15px] text-[#666] leading-[1.5] mb-10">
          I log major decisions as I make them. More entries as the project develops.
        </p>
        <div className={CARD}>
          <div className="text-[12px] font-semibold text-[#999] mb-2">01 · MVP scope</div>
          <h3 className="text-[18px] font-semibold text-[#111] tracking-tight mb-5">{SCOPE_DECISION.question}</h3>
          <dl className="grid grid-cols-[110px_1fr] max-sm:grid-cols-1 gap-x-6 gap-y-4 max-sm:gap-y-1 text-[15px] leading-[1.6]">
            <dt className="text-[#999] max-sm:mt-3">Options</dt><dd className="text-[#444]">{SCOPE_DECISION.options}</dd>
            <dt className="text-[#999] max-sm:mt-3">Decision</dt><dd className="text-[#111] font-semibold">{SCOPE_DECISION.decision}</dd>
            <dt className="text-[#999] max-sm:mt-3">Why</dt><dd className="text-[#444]">{SCOPE_DECISION.reasoning}</dd>
            <dt className="text-[#999] max-sm:mt-3">Tradeoff</dt><dd className="text-[#444]">{SCOPE_DECISION.tradeoff}</dd>
            <dt className="text-[#999] max-sm:mt-3">Revisit if</dt><dd className="text-[#444]">{SCOPE_DECISION.revisit}</dd>
            <dt className="text-[#999] max-sm:mt-3">Not yet</dt><dd className="text-[#666]">{OUT_OF_SCOPE.join(' · ')}</dd>
          </dl>
        </div>
      </Reveal>

      <div className="h-px bg-black/5 mb-16" />

      {/* Validation */}
      <Reveal className="mb-20 max-sm:mb-14" id="validation" outline="What I Need to Prove">
        <div className={EYEBROW}>What I Need to Prove</div>
        <h2 className={`${H2} mb-6`}>Does seeing a new piece with my own clothes change or confirm my purchase decision?</h2>
        <div className={`${CARD} mb-5`}>
          <div className="text-[13px] font-semibold text-[#999] uppercase tracking-wide mb-2">Primary signal · Pairing rate</div>
          <p className="text-[16px] text-[#111] leading-[1.6]">
            Of the pieces brought into Cabine, how many get paired with at least one item the user already owns.
          </p>
          <p className="text-[14px] text-[#666] leading-[1.6] mt-3">
            Also watching: multiple combinations tried, sessions ending in a clear decision, and return use in a later shopping session.
          </p>
        </div>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
          {RISKS.map((r) => (
            <div key={r.title} className={CARD}>
              <div className="text-[13px] font-semibold text-[#999] uppercase tracking-wide mb-2">Risk · {r.title}</div>
              <p className="text-[15px] text-[#444] leading-[1.6]">{r.description}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="h-px bg-black/5 mb-16" />

      {/* Vision */}
      <Reveal className="mb-16" id="vision" outline="Vision">
        <div className={EYEBROW}>Vision</div>
        <h2 className={`${H2} mb-6`}>Make online shopping aware of what you already own.</h2>
        <p className={BODY}>
          A good purchase does more than add one item. It creates more ways to wear the things already there. Over time, Cabine can help wardrobes get more useful with every purchase, not just larger.
        </p>
      </Reveal>
    </div>
  );
}
