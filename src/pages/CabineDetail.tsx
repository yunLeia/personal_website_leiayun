import ProjectIntro from '../components/ProjectIntro';
import { WorkSection, WorkProse, WorkList, WorkTools } from '../components/WorkItem';
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
        preview={
          <figure className="cabine-demo-preview">
            <div className="cabine-demo-frame">
              <iframe
                src="/demos/cabine/index.html"
                title="Cabine demo: style a store item with pieces from your closet"
              />
            </div>
          </figure>
        }
      />

      <WorkSection id="problem" num="01" title="The Problem" lede="Stores sell pieces. You wear outfits.">
        <WorkProse>
          <p>I’ve always loved clothes and fashion. When I shop online, I’ll wait for a piece to arrive, excited to wear it. But once it does, I sometimes realize I have no idea what to pair it with. The excitement fades, and I either wear it far less than I expected or end up buying something else just to make the first purchase work.</p>
          <p>The mismatch is simple: <Hi>shopping happens piece by piece, but getting dressed happens outfit by outfit.</Hi> Online stores show how an item works in their styling; they don’t show how it works with the clothes already in your closet.</p>
          <p>Cabine brings that missing context into the moment of purchase and answers one question: <B>What would I actually wear this with?</B></p>
        </WorkProse>
      </WorkSection>

      <WorkSection id="the-solution" num="02" title="The Solution" lede="Take your closet shopping.">
        <WorkProse>
          <WorkList items={[
            <>Right-click a product image and choose <B>“Take it to Cabine.”</B> Cabine opens in Chrome’s side panel, right beside the store.</>,
            <>Choose pieces you’ve added to your closet and click <B>“See them together.”</B> Cabine generates a preview that combines the store item with your own clothes on a fixed mannequin.</>,
            <>From there, try another pairing, save the look, or return to the product page and decide whether the new piece is actually worth buying.</>,
          ]} />
        </WorkProse>
      </WorkSection>

      <WorkSection id="decisions" num="03" title="Product Decisions" lede="I kept asking myself whether AI was actually creating enough value to justify the cost and complexity.">
        <WorkProse>
          <p><B>Use AI only when it earns the cost.</B> Extracting a clean garment image requires another AI call, but store items can already be rendered from their original product photos. So items stay lightweight in the Fitting Room, and extraction only happens after a user buys something and moves it into My Closet.</p>
          <p><B>Don’t pay AI to solve a simpler problem.</B> Cabine needs to know whether an item is a top, bottom, dress, or shoe, but running an AI classification call for every capture felt wasteful. Instead, I infer the category from information already available on the product page and only ask the user to correct it when needed.</p>
          <p><B>Wardrobe fit, not body fit.</B> Cabine doesn’t pretend to predict sizing, body shape, or physical fit. A fixed mannequin keeps the scope narrow: how does this new piece work with what I already own?</p>
          <p><B>Not a stylist.</B> I considered recommendations and outfit scoring, but decided against them. You choose the pieces and make the judgment; AI only provides the visual context you were missing.</p>
          <p><B>Don’t force a complete outfit.</B> Early versions used fixed slots for tops, bottoms, and shoes, but that made it feel like users had to build a full look. I removed the slots so they could combine only the pieces they actually wanted to compare.</p>
        </WorkProse>
      </WorkSection>

      <WorkSection id="engineering" num="04" title="Engineering Decisions" lede="AI is expensive and slow. The product shouldn’t feel that way.">
        <WorkProse>
          <p><B>Build the cheapest version that could prove me wrong.</B> My first version didn’t use AI at all: I removed backgrounds from product photos and layered garments over fixed mannequin slots. It was enough to test the interaction quickly, and enough to expose the limit. Store photos often included mannequins that background removal couldn’t separate, and no 2D compositing made the result feel worn. So I deleted that direction: <Hi>keep the original image at capture, and call AI only when the user asks to see the outfit together.</Hi></p>
          <p><B>Reuse expensive work instead of starting over.</B> An outfit is built step by step (base mannequin → bottom / dress → top → outer → shoes). I built a step-level cache keyed by the previous render, garment, provider, model, and prompt version, so if only the top changes, Cabine reuses the finished bottom and pays only for the new work.</p>
          <p><B>Keep the closet local.</B> I didn’t want accounts and cloud sync to be prerequisites for proving Cabine was useful. The browser is the source of truth (metadata in <code>chrome.storage.local</code>, images in IndexedDB), and the server handles only what the browser can’t: AI rendering, temporary uploads, caching, usage limits, and analytics. Phone uploads go through a temporary inbox behind a 256-bit QR token that the server deletes after pickup.</p>
          <p><B>Treat the AI provider as a paid, unreliable dependency.</B> I added duplicate-request protection, usage quotas, global spending limits, retry/backoff with jitter, schema validation, and a provider abstraction. When concurrent requests broke shared counters, I fixed it with Blob ETags and conditional writes, then validated under simultaneous renders. Progress streams back over NDJSON, and tests run on a fake provider so nothing burns credits.</p>
          <p><B>Built with AI, not delegated to it.</B> I used Claude Code and Codex throughout the build, including almost every commit. I defined the product questions, scope, constraints, and acceptance criteria; AI helped expand options, implement, write tests, and run bounded experiments, and I decided what to keep after using the result myself. For decisions with real cost, I ran small experiments first (dry runs and mocks by default, live runs behind explicit flags and credit limits) and logged each choice as <code>Options → Why → Tradeoff → Revisit when</code>. The biggest lesson: <Hi>when implementation gets cheaper, judgment becomes the bottleneck.</Hi></p>
        </WorkProse>
        <WorkTools tools={['TypeScript', 'Chrome Extension', 'Vercel Functions', 'FASHN', 'Vercel Blob', 'IndexedDB', 'Neon Postgres', 'Caching', 'Retry/Backoff', 'Claude Code', 'Codex']} />
      </WorkSection>

      <WorkSection id="whats-next" num="05" title="What’s Next" lede="Make every purchase work with the wardrobe you already own.">
        <WorkProse>
          <p>Cabine started with a small personal frustration, but the bigger idea is to <Hi>make online shopping wardrobe-aware.</Hi> Stores are designed to help you decide whether you like a piece. I want Cabine to help you decide whether that piece actually belongs in your life, by bringing everything you already own into that decision.</p>
          <p>The next step is getting Cabine in front of real shoppers. The first thing I want to prove is simple: does seeing a new piece with your own clothes actually change or confirm what you buy? After that, I care about whether people come back the next time they shop, how many captured pieces make it into an outfit, and where the experience still creates friction.</p>
          <p>If that behavior is real, the product can grow from a fitting-room tool into a shopping layer built around your wardrobe, not around any one store. That means expanding store coverage, improving render speed and quality, learning which parts of a closet matter most at the moment of purchase, and finding an API cost and business model that can support repeated use.</p>
          <p><B>I don’t want Cabine to help people shop more. I want it to help them buy pieces they’ll actually wear.</B></p>
        </WorkProse>
      </WorkSection>
    </div>
  );
}
