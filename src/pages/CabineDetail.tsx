import ProjectIntro from '../components/ProjectIntro';
import { WorkSection, WorkProse, WorkList } from '../components/WorkItem';
import { B, Hi } from '../components/InlineMarks';

export default function CabineDetail() {
  return (
    <div className="case-study-content">
      <ProjectIntro
        name="Cabine"
        summary="A browser extension that keeps your wardrobe beside every store, so you can combine a new piece with clothes you already own before deciding whether to buy."
        role="Product and Engineering (solo)"
        context="Fall 2026 · In progress, defining the first version"
        links={[]}
      />

      <WorkSection id="problem" num="01" title="The Problem" lede="Stores sell pieces. You wear outfits.">
        <WorkProse>
          <p>Product pages answer <em>do I like this piece?</em> but not <em>will I wear it with what I already own?</em> The item is styled in the retailer’s world, not yours, so shoppers <B>decide on the piece and find out later whether it works as an outfit</B>.</p>
          <p>Wardrobe apps organize what you own, try-on tools simulate fit, and stores help you find more to buy. <Hi color="yellow">None of them bring your wardrobe into the moment you decide.</Hi></p>
          <p>Cabine changes the loop from Browse → Like → Cart → Buy to <B>Browse → Combine with my wardrobe → Decide</B>. It’s for people who shop online often and own pieces they rarely wear, because they bought them without knowing what they’d wear them with.</p>
        </WorkProse>
      </WorkSection>

      <WorkSection id="how-it-works" num="02" title="How It Works" lede="Show the combination. Let the user judge.">
        <WorkProse>
          <p>When something catches your eye, you bring it into Cabine and place it next to clothes you already own on a simple mannequin-style canvas.</p>
          <WorkList items={[
            <><B>Find</B> a piece while shopping online.</>,
            <><B>Bring it in</B> straight from the product page.</>,
            <><B>Combine</B> it with your own tops, bottoms, and outerwear.</>,
            <><B>Decide</B> to buy, save, or skip.</>,
          ]} />
          <p>The canvas doesn’t simulate fit, and Cabine <B>never scores your outfit or recommends more to buy</B>. It answers one question: <Hi color="blue">can I imagine wearing this with what I already own?</Hi></p>
        </WorkProse>
      </WorkSection>

      <WorkSection id="decisions" num="03" title="Decision Log" lede="I log major decisions as I make them. First entry: how garment images get into Cabine.">
        <WorkProse>
          <p>The options were to extract garments from model photos and busy backgrounds, or to support only clean, standalone product and closet images. <B>I chose clean images only.</B></p>
          <p><Hi color="yellow">The hardest technical problem isn’t the most important product problem.</Hi> Before investing in computer vision or realistic try-on, I want to prove the core behavior is valuable. The tradeoff is <B>fewer supported products</B>, and users need clean photos of their own clothes.</p>
          <p>If people find the loop useful but image constraints become the main source of friction, extraction is the next problem worth solving. Until then, realistic try-on, outfit scores, and full wardrobe management wait.</p>
        </WorkProse>
      </WorkSection>

      <WorkSection id="validation" num="04" title="What I Need to Prove" lede="Does seeing a new piece with my own clothes change or confirm my purchase decision?">
        <WorkProse>
          <p>The primary signal is <Hi color="blue">pairing rate</Hi>: of the pieces brought into Cabine, how many get paired with at least one item the user already owns. I’m also watching whether people <B>try more than one combination</B>, end sessions with a clear decision, and come back during a later shopping session.</p>
          <p>The risks I want to test first:</p>
          <WorkList items={[
            <><B>Value.</B> Will people pause mid-shopping to use it, or will it feel like friction?</>,
            <><B>Setup.</B> How few owned pieces make it useful? A handful of frequently worn ones may be enough.</>,
            <><B>Fidelity.</B> Are clean cutouts enough to judge a combination, or do people expect realistic try-on?</>,
            <><B>Extraction.</B> Can Cabine reliably pull usable images from real shopping sites?</>,
          ]} />
        </WorkProse>
      </WorkSection>

      <WorkSection id="vision" num="05" title="Vision" lede="Make online shopping aware of what you already own.">
        <WorkProse>
          <p>A good purchase does more than add one item. It <B>creates more ways to wear the things already there</B>. Over time, Cabine can help wardrobes get more useful with every purchase, not just larger.</p>
        </WorkProse>
      </WorkSection>
    </div>
  );
}
