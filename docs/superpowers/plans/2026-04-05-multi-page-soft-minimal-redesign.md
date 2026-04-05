# Multi-Page Soft Minimal Redesign

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the single-page portfolio into a multi-page site with React Router, strip the hero section, switch to Soft Minimal design (white bg, #fafafa cards), and add About/Experience/Projects detail pages with a condensed home page acting as a highlight reel.

**Architecture:** 4-page React Router app: Home (condensed highlights + "See more" links), About (casual personal intro), Experience (full detail), Projects (full detail). Shared header component across all pages. Home page shows top 2-3 items per section as soft cards, linking to full pages.

**Tech Stack:** React 18, React Router v7, TypeScript, Tailwind CSS, Vite

---

## File Structure

```
src/
  main.tsx                          — Modify: wrap App in BrowserRouter
  App.tsx                           — Modify: replace single-page layout with Routes
  index.css                         — Modify: white background, adjust base styles
  lib/
    constants.ts                    — Modify: add about page content
  types/
    index.ts                        — Modify: add AboutContent type
  components/
    layout/
      Header.tsx                    — Create: shared header (name left, about/contact/resume right)
      PageWrapper.tsx               — Create: shared page wrapper (max-width, padding, fade-in)
    sections/
      Nav.tsx                       — Delete (replaced by Header)
      Hero.tsx                      — Delete (removed per plan)
      Experience.tsx                — Modify: reuse for full experience detail page
      Projects.tsx                  — Modify: reuse for full projects detail page
      Skills.tsx                    — Modify: pill tags style
      Contact.tsx                   — Modify: simple footer style
    home/
      ExperiencePreview.tsx         — Create: condensed experience cards for home
      ProjectsPreview.tsx           — Create: condensed project cards for home
  pages/
    HomePage.tsx                    — Create: highlight reel (previews + skills + contact)
    AboutPage.tsx                   — Create: casual personal intro
    ExperiencePage.tsx              — Create: full experience detail
    ProjectsPage.tsx                — Create: full projects detail
```

---

### Task 1: Install React Router and Set Up Routing Skeleton

**Files:**
- Modify: `package.json` (add react-router dependency)
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Install react-router**

```bash
cd /Users/leiayun/Desktop/Codes/personal_website_leiayun && npm install react-router
```

- [ ] **Step 2: Update main.tsx to add BrowserRouter**

Replace `src/main.tsx` with:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

- [ ] **Step 3: Update App.tsx with route skeleton**

Replace `src/App.tsx` with:

```tsx
import { Routes, Route } from 'react-router';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <>
      <Header />
      <main className="max-w-[680px] mx-auto px-6 max-sm:px-5 pt-24 pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
```

Note: narrower max-width (680px vs 1100px) for the text-first minimal feel. We create placeholder pages in the next tasks.

- [ ] **Step 4: Create placeholder pages so the app compiles**

Create `src/pages/HomePage.tsx`:
```tsx
export default function HomePage() {
  return <div>Home</div>;
}
```

Create `src/pages/AboutPage.tsx`:
```tsx
export default function AboutPage() {
  return <div>About</div>;
}
```

Create `src/pages/ExperiencePage.tsx`:
```tsx
export default function ExperiencePage() {
  return <div>Experience</div>;
}
```

Create `src/pages/ProjectsPage.tsx`:
```tsx
export default function ProjectsPage() {
  return <div>Projects</div>;
}
```

- [ ] **Step 5: Create the shared Header component**

Create `src/components/layout/Header.tsx`:

```tsx
import { Link, useLocation } from 'react-router';
import { SITE } from '../../lib/constants';

const NAV_LINKS = [
  { label: 'about', to: '/about' },
  { label: 'contact', to: '/#contact' },
  { label: 'resume', href: SITE.resume },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-[680px] mx-auto px-6 max-sm:px-5 py-5 max-sm:py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-[16px] font-medium text-[#1a1a1a] no-underline"
        >
          {SITE.name}
        </Link>
        <div className="flex gap-6 max-sm:gap-4">
          {NAV_LINKS.map((link) =>
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#555] no-underline transition-colors duration-150 hover:text-[#1a1a1a]"
              >
                {link.label} <span className="text-[11px]">&#8599;</span>
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to!}
                className={`text-[13px] no-underline transition-colors duration-150 hover:text-[#1a1a1a] ${
                  location.pathname === link.to ? 'text-[#1a1a1a]' : 'text-[#555]'
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 6: Update global styles for white background**

Replace `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    font-size: 15px;
    line-height: 1.7;
    color: #1a1a1a;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    letter-spacing: -0.01em;
  }
}
```

- [ ] **Step 7: Verify the app compiles and routes work**

```bash
cd /Users/leiayun/Desktop/Codes/personal_website_leiayun && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/main.tsx src/App.tsx src/index.css src/components/layout/Header.tsx src/pages/HomePage.tsx src/pages/AboutPage.tsx src/pages/ExperiencePage.tsx src/pages/ProjectsPage.tsx package.json package-lock.json
git commit -m "feat: add React Router with 4-page skeleton and shared header"
```

---

### Task 2: Build the Home Page (Highlight Reel)

**Files:**
- Create: `src/components/home/ExperiencePreview.tsx`
- Create: `src/components/home/ProjectsPreview.tsx`
- Modify: `src/components/sections/Skills.tsx` — pill tag style
- Modify: `src/components/sections/Contact.tsx` — simple footer
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Create ExperiencePreview component**

Create `src/components/home/ExperiencePreview.tsx`:

```tsx
import { Link } from 'react-router';
import { EXPERIENCE } from '../../lib/constants';

export default function ExperiencePreview() {
  const preview = EXPERIENCE.slice(0, 3);

  return (
    <section className="mb-12">
      <div className="text-[14px] font-medium text-[#1a1a1a] mb-4">
        Experience
      </div>
      <div className="flex flex-col gap-2">
        {preview.map((exp) => (
          <div
            key={exp.company}
            className="bg-[#fafafa] rounded-lg px-5 py-4 max-sm:px-4 max-sm:py-3"
          >
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[13px] font-medium text-[#1a1a1a]">
                {exp.company}
              </span>
              <span className="text-[12px] text-[#999]">{exp.date}</span>
            </div>
            <div className="text-[12px] text-[#666]">{exp.role}</div>
          </div>
        ))}
      </div>
      <Link
        to="/experience"
        className="text-[12px] text-[#555] no-underline mt-3 inline-block transition-colors duration-150 hover:text-[#1a1a1a]"
      >
        See more &rarr;
      </Link>
    </section>
  );
}
```

- [ ] **Step 2: Create ProjectsPreview component**

Create `src/components/home/ProjectsPreview.tsx`:

```tsx
import { Link } from 'react-router';
import { PROJECTS } from '../../lib/constants';

export default function ProjectsPreview() {
  const preview = PROJECTS.slice(0, 3);

  return (
    <section className="mb-12">
      <div className="text-[14px] font-medium text-[#1a1a1a] mb-4">
        Projects
      </div>
      <div className="flex flex-col gap-2">
        {preview.map((proj) => (
          <div
            key={proj.name}
            className="bg-[#fafafa] rounded-lg px-5 py-4 max-sm:px-4 max-sm:py-3"
          >
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[13px] font-medium text-[#1a1a1a]">
                {proj.name}
              </span>
              <span className="text-[12px] text-[#999]">{proj.sub}</span>
            </div>
            <div className="text-[11px] text-[#888]">{proj.desc}</div>
          </div>
        ))}
      </div>
      <Link
        to="/projects"
        className="text-[12px] text-[#555] no-underline mt-3 inline-block transition-colors duration-150 hover:text-[#1a1a1a]"
      >
        See more &rarr;
      </Link>
    </section>
  );
}
```

- [ ] **Step 3: Update Skills to pill tag style**

Replace the content of `src/components/sections/Skills.tsx` with:

```tsx
import { SKILLS } from '../../lib/constants';

export default function Skills() {
  return (
    <section className="mb-12">
      <div className="text-[14px] font-medium text-[#1a1a1a] mb-4">
        Skills
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SKILLS.flatMap((group) =>
          group.values.map((val) => (
            <span
              key={val}
              className="bg-[#fafafa] rounded-md px-3 py-1.5 text-[12px] text-[#555]"
            >
              {val}
            </span>
          )),
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update Contact to simple footer**

Replace the content of `src/components/sections/Contact.tsx` with:

```tsx
import { CONTACTS } from '../../lib/constants';

export default function Contact() {
  return (
    <footer id="contact" className="pt-8 pb-16 border-t border-[#eee]">
      <div className="flex gap-5 text-[13px]">
        {CONTACTS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-[#555] no-underline transition-colors duration-150 hover:text-[#1a1a1a]"
          >
            {link.label}
            {link.external && <span className="text-[11px] ml-0.5">&#8599;</span>}
          </a>
        ))}
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Wire up HomePage**

Replace `src/pages/HomePage.tsx` with:

```tsx
import ExperiencePreview from '../components/home/ExperiencePreview';
import ProjectsPreview from '../components/home/ProjectsPreview';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <ExperiencePreview />
      <ProjectsPreview />
      <Skills />
      <Contact />
    </>
  );
}
```

- [ ] **Step 6: Verify compilation**

```bash
npx tsc --noEmit
```

- [ ] **Step 7: Commit**

```bash
git add src/pages/HomePage.tsx src/components/home/ExperiencePreview.tsx src/components/home/ProjectsPreview.tsx src/components/sections/Skills.tsx src/components/sections/Contact.tsx
git commit -m "feat: build home page as highlight reel with soft minimal cards"
```

---

### Task 3: Build the About Page

**Files:**
- Modify: `src/lib/constants.ts` — add ABOUT content
- Modify: `src/types/index.ts` — add AboutContent type
- Modify: `src/pages/AboutPage.tsx`

- [ ] **Step 1: Add AboutContent type**

In `src/types/index.ts`, add at the end:

```ts
export interface AboutContent {
  intro: string[];
  currently: string[];
}
```

- [ ] **Step 2: Add ABOUT constant**

In `src/lib/constants.ts`, add import for `AboutContent` and the constant:

Add `AboutContent` to the import line:
```ts
import type { ExperienceItem, ProjectRow, SkillGroup, ContactLink, AboutContent } from '../types';
```

Add after `SITE`:
```ts
export const ABOUT: AboutContent = {
  intro: [
    "Hi! I'm Leia — a CS and Data Science student at NYU.",
    "I like building things that make people's lives a little easier. Most recently I was at Planfit, where I shipped AI features and ran way too many A/B tests.",
    "Before that, I interned at Parachute building RAG pipelines, and I run LikeLion @NYU where we teach people to code and ship projects together.",
  ],
  currently: [
    "Exploring product + engineering roles for 2026",
    "Building side projects with LLMs",
    "Trying to cook more and scroll less",
  ],
};
```

- [ ] **Step 3: Build AboutPage**

Replace `src/pages/AboutPage.tsx` with:

```tsx
import { ABOUT, SITE } from '../lib/constants';

export default function AboutPage() {
  return (
    <div>
      <div className="mb-10">
        {ABOUT.intro.map((p, i) => (
          <p
            key={i}
            className="text-[14px] leading-[1.8] text-[#444] mb-4 last:mb-0"
          >
            {p}
          </p>
        ))}
      </div>

      <div className="mb-10">
        <div className="text-[14px] font-medium text-[#1a1a1a] mb-3">
          Currently
        </div>
        <ul className="list-none flex flex-col gap-1.5">
          {ABOUT.currently.map((item, i) => (
            <li
              key={i}
              className="text-[13px] text-[#555] pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#999]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-5 text-[13px]">
        <a
          href={`mailto:${SITE.email}`}
          className="text-[#555] no-underline hover:text-[#1a1a1a] transition-colors duration-150"
        >
          {SITE.email}
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify compilation**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/types/index.ts src/lib/constants.ts src/pages/AboutPage.tsx
git commit -m "feat: add about page with casual personal intro"
```

---

### Task 4: Build the Full Experience Page

**Files:**
- Modify: `src/pages/ExperiencePage.tsx`
- Modify: `src/components/sections/Experience.tsx` — restyle for soft minimal

- [ ] **Step 1: Restyle Experience component for soft minimal**

Replace `src/components/sections/Experience.tsx` with:

```tsx
import { EXPERIENCE } from '../../lib/constants';
import type { Bullet } from '../../types';

function highlightKeywords(text: string, keywords?: string[]) {
  if (!keywords || keywords.length === 0) return text;

  const pattern = new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    keywords.some(k => k === part) ? (
      <span key={i} className="font-normal text-[#1a1a1a]">{part}</span>
    ) : (
      part
    ),
  );
}

function BulletList({ bullets }: { bullets: Bullet[] }) {
  return (
    <ul className="list-none flex flex-col gap-2.5">
      {bullets.map((b, i) => (
        <li
          key={i}
          className="text-[13px] leading-[1.7] text-[#555] font-light pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#999] before:font-bold"
        >
          {b.metric && (
            <span className="font-medium text-[#1a1a1a]">{b.metric}</span>
          )}
          {b.metric && <span className="text-[#ccc] mx-1.5">|</span>}
          <span>{highlightKeywords(b.text, b.keywords)}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Experience() {
  return (
    <div className="flex flex-col gap-10">
      {EXPERIENCE.map((exp) => (
        <div key={exp.company}>
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-[15px] font-medium text-[#1a1a1a]">
              {exp.company}
            </span>
            <span className="text-[12px] text-[#999]">{exp.date}</span>
          </div>
          <div className="text-[13px] text-[#666] mb-4">{exp.role}</div>

          {exp.subTeams && (
            <div className="flex flex-col gap-3">
              {exp.subTeams.map((team) => (
                <div
                  key={team.label}
                  className="bg-[#fafafa] rounded-lg px-5 py-4 max-sm:px-4 max-sm:py-3"
                >
                  <div className="text-[11px] font-medium text-[#999] tracking-[0.05em] uppercase mb-2.5">
                    {team.label}
                  </div>
                  <BulletList bullets={team.bullets} />
                </div>
              ))}
            </div>
          )}

          {exp.bullets && (
            <div className="bg-[#fafafa] rounded-lg px-5 py-4 max-sm:px-4 max-sm:py-3">
              <BulletList bullets={exp.bullets} />
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-4">
            {exp.skills.map((skill) => (
              <span
                key={skill}
                className="bg-[#fafafa] rounded-md px-2.5 py-1 text-[11px] text-[#777]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Wire up ExperiencePage**

Replace `src/pages/ExperiencePage.tsx` with:

```tsx
import Experience from '../components/sections/Experience';

export default function ExperiencePage() {
  return (
    <div>
      <div className="text-[14px] font-medium text-[#1a1a1a] mb-8">
        Experience
      </div>
      <Experience />
    </div>
  );
}
```

- [ ] **Step 3: Verify compilation**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Experience.tsx src/pages/ExperiencePage.tsx
git commit -m "feat: build full experience detail page with soft minimal cards"
```

---

### Task 5: Build the Full Projects Page

**Files:**
- Modify: `src/components/sections/Projects.tsx` — restyle for soft minimal cards
- Modify: `src/pages/ProjectsPage.tsx`

- [ ] **Step 1: Restyle Projects component**

Replace `src/components/sections/Projects.tsx` with:

```tsx
import { PROJECTS } from '../../lib/constants';

export default function Projects() {
  return (
    <div className="flex flex-col gap-2">
      {PROJECTS.map((proj) => (
        <div
          key={proj.name}
          className="bg-[#fafafa] rounded-lg px-5 py-4 max-sm:px-4 max-sm:py-3"
        >
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-[13px] font-medium text-[#1a1a1a]">
              {proj.name}
            </span>
            <span className="text-[12px] text-[#999]">{proj.sub}</span>
          </div>
          <div className="text-[12px] text-[#666] mb-1">{proj.desc}</div>
          {proj.metric && (
            <div className="text-[12px] font-medium text-[#1a1a1a]">
              {proj.metric}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Wire up ProjectsPage**

Replace `src/pages/ProjectsPage.tsx` with:

```tsx
import Projects from '../components/sections/Projects';

export default function ProjectsPage() {
  return (
    <div>
      <div className="text-[14px] font-medium text-[#1a1a1a] mb-8">
        Projects
      </div>
      <Projects />
    </div>
  );
}
```

- [ ] **Step 3: Verify compilation**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Projects.tsx src/pages/ProjectsPage.tsx
git commit -m "feat: build full projects detail page with soft minimal cards"
```

---

### Task 6: Cleanup and Vite SPA Config

**Files:**
- Delete: `src/components/sections/Nav.tsx`
- Delete: `src/components/sections/Hero.tsx`
- Modify: `src/hooks/useFadeIn.ts` — remove if unused, or keep if we want fade-in on pages
- Modify: `vite.config.ts` — add SPA fallback for client-side routing in production

- [ ] **Step 1: Delete old Nav and Hero**

```bash
rm src/components/sections/Nav.tsx src/components/sections/Hero.tsx
```

- [ ] **Step 2: Remove useFadeIn if no longer imported**

Check if any remaining file imports `useFadeIn`. If not, delete it:

```bash
rm src/hooks/useFadeIn.ts
```

- [ ] **Step 3: Configure Vite for SPA routing**

Replace `vite.config.ts` with:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

(No change needed — Vite's dev server already handles SPA fallback. For production hosting, a `_redirects` or equivalent file is needed depending on host, but that's outside this scope.)

- [ ] **Step 4: Verify the full build compiles**

```bash
npx tsc --noEmit && npm run build
```

Expected: clean build, no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove old Nav/Hero components, clean up unused code"
```

---

### Task 7: Scroll-to-Top on Navigation and Polish

**Files:**
- Modify: `src/App.tsx` — add scroll restoration

- [ ] **Step 1: Add scroll-to-top on route change**

Update `src/App.tsx`:

```tsx
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="max-w-[680px] mx-auto px-6 max-sm:px-5 pt-24 pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
```

- [ ] **Step 2: Verify compilation**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add scroll-to-top on route change"
```
