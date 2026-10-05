import ProjectIntro from '../components/ProjectIntro';
import { WorkSection, WorkProse, WorkFigure, WorkTools } from '../components/WorkItem';
import { B, Hi } from '../components/InlineMarks';

export default function CulineAIDetail() {
  return (
    <div className="case-study-content">
      <ProjectIntro
        name="CulinAI"
        summary="An AI-powered site that generates recipes from a photo of your fridge or food items."
        facts={[
          { label: 'Role', value: 'PM and AI Engineer' },
          { label: 'Date', value: 'May 2024' },
          { label: 'Context', value: 'Tech@NYU · TechTrek' },
        ]}
        links={[{ label: 'GitHub', href: 'https://github.com/leiassyun/CulinAI' }]}
      />

      <WorkSection id="problem" num="01" title="The Problem" lede="Most people already have food at home. They just don’t know how to turn it into a meal.">
        <WorkProse>
          <p>“What should I eat today?” isn’t a lack of options. It’s a <Hi>mismatch between what people have and what recipes expect</Hi>. Ingredients sit unused because recipes assume missing items, people default to the same meals or order out, and planning a meal feels harder than cooking it.</p>
          <p>CulinAI flips that: cook with what you already have, not what a recipe expects. It generates recipes from available ingredients and adapts to constraints instead of asking for substitutions.</p>
        </WorkProse>
      </WorkSection>

      <WorkSection id="how-it-works" num="02" title="How It Works" lede="Photo in, recipe out.">
        <WorkProse>
          <p>The user uploads a photo of their fridge or ingredients. LLaVA extracts the ingredients directly from the image in <B>one multimodal pass</B>, prompt-tuned outputs turn them into a recipe, and SDXL-Turbo generates a matching food image.</p>
          <p>Users can <B>save and organize</B> the recipes they like.</p>
        </WorkProse>
        <WorkFigure num="02" src="/images/culinai-upload.webp" alt="CulinAI upload interface" caption="Upload interface" />
        <WorkTools tools={['LLaVA', 'SDXL-Turbo', 'Replicate', 'JavaScript']} />
      </WorkSection>

      <WorkSection id="decisions" num="03" title="Key Decisions" lede="Ship fast, stay focused.">
        <WorkProse>
          <p><B>A multimodal model.</B> LLaVA handles vision and language in a single pass instead of a separate vision model plus an LLM. That reduced pipeline complexity and enabled real-time responses.</p>
          <p><B>Hosted inference.</B> Running models on Replicate traded infra control for iteration speed, which mattered more during a solo build.</p>
        </WorkProse>
      </WorkSection>
    </div>
  );
}
