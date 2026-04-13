# Glassmorphism Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing light minimalist portfolio to a glassmorphism style with cool-tone light gray background, steel blue blobs, and frosted glass cards.

**Architecture:** Pure visual restyling — no component structure, props, or logic changes. All modifications are CSS/Tailwind class swaps. Background blobs are added as absolute-positioned divs in Home.tsx.

**Tech Stack:** React, Tailwind CSS (inline utility classes), Vite dev server

---

### Task 1: Base Background & Global Styles

**Files:**
- Modify: `src/index.css:9-13`

- [ ] **Step 1: Update body background and base color**

Change the body styles in `src/index.css`:

```css
@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    font-size: 17px;
    line-height: 1.65;
    color: #1d1d1f;
    background-color: #f0f2f5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.022em;
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

Only change: `background-color: #fff` → `background-color: #f0f2f5`

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "style: change body background to cool-tone light gray"
```

---

### Task 2: Background Blobs in Home.tsx

**Files:**
- Modify: `src/pages/Home.tsx:24-36`

- [ ] **Step 1: Add blob elements and relative positioning**

Replace the return block in `Home.tsx`:

```tsx
return (
  <div className="min-h-screen px-6 sm:px-10 pt-14 pb-12 max-sm:pb-24 relative overflow-hidden">
    {/* Background blobs */}
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[5%] -right-[5%] w-[350px] h-[350px] rounded-full bg-[rgba(100,140,180,0.1)] blur-[100px]" />
      <div className="absolute bottom-[10%] -left-[5%] w-[280px] h-[280px] rounded-full bg-[rgba(120,155,190,0.08)] blur-[90px]" />
      <div className="absolute top-[40%] left-[35%] w-[200px] h-[200px] rounded-full bg-[rgba(140,170,200,0.06)] blur-[70px]" />
    </div>

    <div className="max-w-[1080px] mx-auto">
      <Header />
      <main className="mt-10">
        <ExperienceSection onSelect={openChat} activeKey={activeKey} />
        <ProjectsSection onSelect={openChat} activeKey={activeKey} />
        <ContactSection />
      </main>
    </div>
    <DetailPanel chat={chat} onClose={closeChat} />
  </div>
);
```

Key additions:
- `relative overflow-hidden` on root div
- Fixed blob container with `pointer-events-none`, `-z-10`
- Three blobs with steel blue rgba colors and large blur values

- [ ] **Step 2: Start dev server and verify blobs render**

```bash
npm run dev
```

Open browser, confirm subtle blue-gray blobs visible against `#f0f2f5` background.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "style: add steel blue background blobs to homepage"
```

---

### Task 3: Glass Card Styles on ExperienceSection

**Files:**
- Modify: `src/components/ExperienceSection.tsx:41-43`

- [ ] **Step 1: Replace card classes**

In `ExperienceSection.tsx`, change the button className (line 41-43). Replace:

```
bg-[#fafafa] border border-[#eee] hover:border-[#d2d2d7] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]
```

With:

```
bg-white/55 backdrop-blur-[20px] border border-white/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-white/90 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]
```

And change the active state from:

```
border-[#d2d2d7] shadow-[0_2px_12px_rgba(0,0,0,0.04)]
```

To:

```
border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)]
```

The full className becomes:

```tsx
className={`group w-full text-left font-[inherit] px-6 py-5 rounded-xl cursor-pointer transition-all duration-300 bg-white/55 backdrop-blur-[20px] border border-white/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-white/90 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${
  visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
} ${activeKey === key ? 'border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : ''}`}
```

- [ ] **Step 2: Verify in browser**

Check that experience cards have frosted glass appearance with blob colors subtly visible through them.

- [ ] **Step 3: Commit**

```bash
git add src/components/ExperienceSection.tsx
git commit -m "style: apply glass card style to experience section"
```

---

### Task 4: Glass Card Styles on ProjectsSection

**Files:**
- Modify: `src/components/ProjectsSection.tsx:32-34`

- [ ] **Step 1: Replace card classes**

In `ProjectsSection.tsx`, same card class replacement as Task 3. Change the button className (line 32-34). Replace:

```
bg-[#fafafa] border border-[#eee] hover:border-[#d2d2d7] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]
```

With:

```
bg-white/55 backdrop-blur-[20px] border border-white/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-white/90 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]
```

And change the active state from:

```
border-[#d2d2d7] shadow-[0_2px_12px_rgba(0,0,0,0.04)]
```

To:

```
border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)]
```

The full className becomes:

```tsx
className={`group w-full text-left font-[inherit] px-6 py-5 rounded-xl cursor-pointer transition-all duration-300 bg-white/55 backdrop-blur-[20px] border border-white/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-white/90 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${
  visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
} ${activeKey === key ? 'border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : ''}`}
```

- [ ] **Step 2: Verify in browser**

Check project cards have the same frosted glass appearance.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectsSection.tsx
git commit -m "style: apply glass card style to projects section"
```

---

### Task 5: Glass Card Style on ContactSection

**Files:**
- Modify: `src/components/ContactSection.tsx:7`

- [ ] **Step 1: Replace card classes**

In `ContactSection.tsx`, change the card div className (line 7). Replace:

```
bg-[#fafafa] border border-[#eee] rounded-xl px-6 py-5
```

With:

```
bg-white/55 backdrop-blur-[20px] border border-white/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] rounded-xl px-6 py-5
```

- [ ] **Step 2: Verify in browser**

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactSection.tsx
git commit -m "style: apply glass card style to contact section"
```

---

### Task 6: Glass Style on Header Secondary Button

**Files:**
- Modify: `src/components/Header.tsx:73-77`

- [ ] **Step 1: Update the "download resume" button**

In `Header.tsx`, change the resume button className (line 76). Replace:

```
text-[13px] font-medium px-5 py-2 rounded-full border border-[#ddd] text-[#111] no-underline transition-all duration-200 hover:bg-[#fafafa] active:scale-[0.97]
```

With:

```
text-[13px] font-medium px-5 py-2 rounded-full bg-white/60 backdrop-blur-[12px] border border-white/70 text-[#111] no-underline transition-all duration-200 hover:bg-white/80 active:scale-[0.97]
```

- [ ] **Step 2: Verify in browser**

The "download resume" button should have a frosted glass look. The "view work" primary button stays dark/unchanged.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "style: apply glass style to header secondary button"
```

---

### Task 7: Glass Style on DetailPanel

**Files:**
- Modify: `src/components/DetailPanel.tsx:26-27,196-198,200,210,231`

- [ ] **Step 1: Update Bubble component**

In `DetailPanel.tsx`, change the `Bubble` component (line 26-27). Replace:

```tsx
function Bubble({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-[#f5f5f7] rounded-2xl rounded-bl-md px-4 py-3 max-w-[88%] ${className}`}>
      {children}
    </div>
  );
}
```

With:

```tsx
function Bubble({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white/50 backdrop-blur-[12px] border border-white/60 rounded-2xl rounded-bl-md px-4 py-3 max-w-[88%] ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Update TypingIndicator dots**

Change the dot color from `bg-[#d2d2d7]` to `bg-black/15` (3 instances in TypingIndicator, lines 18-20):

```tsx
function TypingIndicator() {
  return (
    <div className="flex gap-1.5 px-4 py-3">
      <span className="w-2 h-2 bg-black/15 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 bg-black/15 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 bg-black/15 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  );
}
```

- [ ] **Step 3: Update chat panel container**

Change the chat box div className (line 196-198). Replace:

```
bg-white/95 backdrop-blur-xl rounded-[20px] shadow-[0_8px_60px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(0,0,0,0.05)]
```

With:

```
bg-white/55 backdrop-blur-[24px] border border-white/70 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.08)]
```

- [ ] **Step 4: Update chat header border**

Change the header border (line 200) from `border-b border-[#f5f5f7]` to `border-b border-black/5`.

- [ ] **Step 5: Update close button**

Change the close button (line 210-211). Replace:

```
bg-[#f5f5f7] border-0 cursor-pointer transition-all duration-200 hover:bg-[#e8e8ed]
```

With:

```
bg-white/50 backdrop-blur-[8px] border border-white/60 cursor-pointer transition-all duration-200 hover:bg-white/70
```

- [ ] **Step 6: Update avatar button ring**

Change the avatar ring (line 232) from `ring-2 ring-[#e8e8ed] ring-offset-2` to `ring-2 ring-white/70 ring-offset-2`.

- [ ] **Step 7: Verify in browser**

Open the chat panel, check:
- Glass panel background with blobs subtly visible through it
- Glass bubbles
- Close button glass style
- Avatar ring matches glass theme

- [ ] **Step 8: Commit**

```bash
git add src/components/DetailPanel.tsx
git commit -m "style: apply glass style to chat panel and bubbles"
```

---

### Task 8: Final Verification

- [ ] **Step 1: Full page visual check**

Open dev server and verify:
- Cool gray background `#f0f2f5` with steel blue blobs
- All cards (experience, projects, contact) have frosted glass appearance
- Header secondary button is glass
- Chat panel and bubbles are glass
- Hover states work on all cards
- Active states work on cards when chat is open
- Stagger reveal animations still work
- Mobile responsive layout still works (resize to mobile width)

- [ ] **Step 2: Check mobile**

Resize browser to mobile width and verify:
- Cards stack properly
- Chat panel fills width correctly
- No horizontal overflow from blobs
- Touch targets still adequate

- [ ] **Step 3: Final commit if any tweaks needed**
