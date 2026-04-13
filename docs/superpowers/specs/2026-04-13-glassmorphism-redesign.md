# Glassmorphism Redesign — Light Glass Steel Blue

## Overview

Existing light minimalist portfolio → light glassmorphism style. Keep the current single-column layout and all component structure. Only change visual styling: background, card appearance, color tokens, and chat panel.

## Design Tokens

### Background
- Page background: `#f0f2f5` (cool-tone light gray)
- Blob colors (3 blobs, absolute positioned, blurred):
  - Top-right: `rgba(100,140,180,0.1)` — 350px, blur 100px
  - Bottom-left: `rgba(120,155,190,0.08)` — 280px, blur 90px
  - Center: `rgba(140,170,200,0.06)` — 200px, blur 70px

### Glass Card
- Background: `rgba(255,255,255,0.55)`
- Backdrop filter: `blur(20px)`
- Border: `1px solid rgba(255,255,255,0.7)`
- Border radius: `14px` (keep existing `rounded-xl`)
- Box shadow: `0 2px 12px rgba(0,0,0,0.04)`
- Hover: border `rgba(255,255,255,0.9)`, shadow `0 4px 20px rgba(0,0,0,0.06)`

### Typography Colors (light background)
- Primary text: `rgba(0,0,0,0.85)` — headings, names
- Secondary text: `rgba(0,0,0,0.6)` — body, descriptions
- Tertiary text: `rgba(0,0,0,0.4)` — dates, labels, subtitles
- Muted text: `rgba(0,0,0,0.3)` — section headers, timestamps

### Buttons
- Primary: keep dark background `#1d1d1f`, white text (unchanged)
- Secondary: glass style — `rgba(255,255,255,0.6)` bg, `blur(12px)`, border `rgba(0,0,0,0.08)`

### Chat Panel (DetailPanel)
- Panel background: `rgba(255,255,255,0.55)`, `blur(24px)`
- Border: `1px solid rgba(255,255,255,0.7)`
- Box shadow: `0 8px 32px rgba(0,0,0,0.08)`
- Message bubbles: `rgba(255,255,255,0.5)` with subtle border
- Avatar button: glass circle matching card style

## Files to Modify

1. **`src/index.css`** — Change body background to `#f0f2f5`
2. **`src/pages/Home.tsx`** — Add background blobs (3 absolute-positioned divs)
3. **`src/components/Header.tsx`** — Update button secondary style to glass
4. **`src/components/ExperienceSection.tsx`** — Glass card styles on experience items
5. **`src/components/ProjectsSection.tsx`** — Glass card styles on project items
6. **`src/components/ContactSection.tsx`** — Glass card style on contact card
7. **`src/components/DetailPanel.tsx`** — Glass panel + glass message bubbles
8. **`tailwind.config.ts`** — (optional) add glass utility if reuse warrants it

## What Does NOT Change

- Page layout structure (single column, max-w-1080px)
- Component hierarchy and props
- Router configuration
- Data layer (data.ts)
- Animations (fade-in, stagger reveal, bubble-in)
- Typography sizes and font families
- Mobile responsive breakpoints
