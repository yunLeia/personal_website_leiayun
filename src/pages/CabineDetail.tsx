import ProjectIntro from '../components/ProjectIntro';
import { WorkSection, WorkProse, WorkList, WorkMetrics, WorkTools } from '../components/WorkItem';
import { B, Hi } from '../components/InlineMarks';

export default function CabineDetail() {
  return (
    <div className="case-study-content">
      <ProjectIntro
        name="Cabine"
        summary="A Chrome extension that brings your wardrobe beside an online store, so you can see what you’d wear a new piece with before buying it."
        facts={[
          { label: 'Role', value: 'Founder & Full-Stack Engineer' },
          { label: 'Date', value: 'Sep 2026 – Present' },
          { label: 'Status', value: 'v0.1.0, pre-launch' },
        ]}
        links={[{ label: 'Visit site', href: 'https://cabine-j7p.pages.dev', primary: true }]}
      />

      <WorkSection id="problem" num="01" title="The Problem" lede="Stores sell pieces. You wear outfits.">
        <WorkProse>
          <p>When I shop online, I often love each item on its own. I get excited, order it, and look forward to it arriving. But once I actually have it, I realize <Hi>I’m not sure what to wear it with</Hi>. I end up wearing it less than I expected, or even buying another piece just to make the first purchase work.</p>
          <p>That’s when I noticed the mismatch. When we shop for clothes online, we only ever see one piece at a time. But what we actually wear are outfits, pairing each piece with the clothes we already have in the closet.</p>
          <p>Cabine brings your own wardrobe into that moment of purchase and helps answer one question: What would I actually wear this with?</p>
        </WorkProse>
      </WorkSection>

      <WorkSection id="how-it-works" num="02" title="How It Works" lede="Take your closet shopping.">
        <WorkProse>
          <WorkList items={[
            <>Right-click a product image and choose <B>“Take it to Cabine.”</B> The piece is captured and Cabine opens in Chrome’s side panel, right next to the store.</>,
            <>Pick clothes from your own closet to pair with it, then click <B>“See them together.”</B></>,
            <>Cabine generates the outfit on a fixed mannequin. Save the look, try another combination, or go back to the product page.</>,
          ]} />
          <p>For example, bring in a black jacket, pick your white tee and dark jeans, and see the combination before deciding whether to buy the jacket.</p>
          <p>Pieces live in two places: the Fitting Room for store items you’re considering, and My Closet for clothes you own. When you actually buy something, “I got this” moves it into your closet. Cabine never handles checkout.</p>
          <p>Adding your clothes is deliberately small. Upload photos, or scan a QR code to add them from your phone. You start with an empty closet and just a few pieces you actually wear, not your entire wardrobe.</p>
        </WorkProse>
      </WorkSection>

      <WorkSection id="how-i-built-it" num="03" title="How I Built It" lede="Your wardrobe stays in the browser. The heavy lifting runs on the server.">
        <WorkProse>
          <p>The wardrobe is <B>local-first with no account</B>: garment records live in <code>chrome.storage.local</code>, and photos and rendered looks live in IndexedDB.</p>
          <p>Outfit rendering, garment-photo cleanup, and phone uploads run on a Vercel Functions backend using FASHN, with private Vercel Blob storage for cached results and temporary files, and Neon Postgres for product analytics.</p>
          <WorkList items={[
            <><B>Hash-based render caching</B>, so identical outfit requests reuse a cached result instead of rendering again.</>,
            <>Usage quotas and spending limits per install, plus duplicate-request protection.</>,
            <>Jittered retries for concurrent writes, validated with 8 concurrent renders.</>,
            <>Category inference from English and Korean keywords in page titles, across tops, bottoms, dresses, outerwear, and shoes. If Cabine can’t tell, it asks.</>,
          ]} />
          <WorkMetrics metrics={[
            { value: '8', label: 'Concurrent renders validated' },
            { value: '5', label: 'Garment categories' },
            { value: '0', label: 'Accounts required' },
          ]} />
        </WorkProse>
        <WorkTools tools={['Chrome Extension', 'Vercel Functions', 'FASHN', 'Vercel Blob', 'Neon Postgres', 'IndexedDB']} />
      </WorkSection>

      <WorkSection id="decisions" num="04" title="Decision Log" lede="Cabine shows. You decide.">
        <WorkProse>
          <p><B>Wardrobe fit, not body fit.</B> AI shows the selected garments together on a fixed, headless mannequin. It doesn’t predict your body shape, sizing, or physical fit. The question is how a new piece works with what you already own.</p>
          <p><B>Not a stylist.</B> Cabine doesn’t generate outfits, score them, or recommend what to buy. You choose the pieces and judge the result; AI only provides the visual context.</p>
          <p>Cut the Buy / Save / Pass step. Earlier versions asked you to rate each store piece. Now the flow ends with seeing the combination, saving it if you want, or going back to the store.</p>
          <p>No garment slots. The interface used to ask you to fill every category. I removed the slots so the interaction feels like answering one shopping question.</p>
          <p>An empty closet to start. New users start with nothing rather than sample clothes presented as their own, and only need a few pieces to begin.</p>
        </WorkProse>
      </WorkSection>

      <WorkSection id="whats-next" num="05" title="What’s Next" lede="Make every clothing purchase more wearable.">
        <WorkProse>
          <p>The next thing I want to learn isn’t technical. It’s <B>whether Cabine actually changes how people shop</B>: does seeing a new piece with your own clothes change or confirm your purchase decision? The signal I care about most is pairing rate, how often a captured store item gets paired with something the user already owns.</p>
          <p>Before launch, I still need to validate:</p>
          <WorkList items={[
            <>Store coverage. Capture depends on accessible product images, so compatibility across stores still needs broader testing.</>,
            <>Render quality. I need to test more garment types and combinations outside my own wardrobe.</>,
            <><B>Distribution and GTM.</B> I’ve built products before, but I haven’t taken one of my own from idea through launch and distribution. That’s the part I’m most excited to learn next: getting Cabine in front of real users, seeing where my assumptions are wrong, and iterating from actual behavior instead of my own intuition.</>,
          ]} />
          <p>Later, if the behavior is there, the next problems become API cost optimization and monetization. But first I want to prove the product is useful enough for people to come back.</p>
        </WorkProse>
      </WorkSection>
    </div>
  );
}
