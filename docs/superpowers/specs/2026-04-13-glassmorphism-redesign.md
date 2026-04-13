# Glassmorphism Redesign — Light Glass Steel Blue

## Overview

Light minimalist portfolio → glassmorphism with cool-tone background, steel blue blobs, and frosted glass cards. Single-column layout preserved. Applied to all pages (Home, Work, PlanfitDetail, ParachuteDetail).

## Design Tokens

### Background
- Page background: `#f0f2f5` (cool-tone light gray)
- Blobs (3 per page, fixed, pointer-events-none, -z-10):
  - Top-right: `rgba(100,140,180,0.25)` — 500px, blur 120px
  - Bottom-left: `rgba(120,155,190,0.2)` — 450px, blur 110px
  - Center: `rgba(140,170,200,0.15)` — 350px, blur 90px

### Glass Card
- Background: `bg-white/15`
- Backdrop filter: `backdrop-blur-[16px]`
- Border: `border border-white/30`
- Box shadow: `shadow-[0_2px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)]`
- Hover: `bg-white/25`, shadow `0_4px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)`
- Active/selected: `bg-white/25 border-white/40`

### Glass Button (secondary)
- Background: `bg-white/15`
- Backdrop filter: `backdrop-blur-[12px]`
- Border: `border border-white/30`
- Hover: `bg-white/25`

### Glass ToolPill
- Background: `bg-white/15`
- Backdrop filter: `backdrop-blur-[8px]`
- Border: `border border-white/30`

### Glass Chat Panel (DetailPanel)
- Panel: `bg-white/15 backdrop-blur-[24px] border border-white/30`
- Bubbles: `bg-white/50 backdrop-blur-[12px] border border-white/60`
- Close button: `bg-white/50 backdrop-blur-[8px] border border-white/60`
- Typing dots: `bg-black/15`
- Avatar ring: `ring-white/70`

### Typography
- Primary text: `#1d1d1f` — headings, names, bold
- Secondary text: `#444` — body copy, descriptions (font-normal weight)
- Tertiary text: `#555` — hero metrics
- Labels: `#999` — section headers, dates (11px uppercase tracking-[0.14em])
- Nav links: `#666` — navigation, tagline
- Chat text: `#666` — bubble content

### Typography Sizes
- Header name: `32px` (mobile: 26px), font-bold
- Header tagline: `15px` (mobile: 14px), font-normal
- Nav links: `14px` (mobile: 12px), font-medium
- Buttons: `13px`, font-medium
- Section labels: `11px`, font-semibold, uppercase
- Experience role: `17px` (mobile: 15px)
- Card subtitle: `15px` (mobile: 14px), font-normal
- Body text: `15px`, font-normal, leading-[1.7]
- Detail hero: `36-44px` Lora serif, italic
- Detail headings: `26px`, font-bold
- Impact numbers: `40-52px` Lora serif

### Dividers
- `h-px bg-black/5` (replaces old `bg-[#e8e8ed]`)

## Pages Modified
- `src/index.css` — body background
- `src/pages/Home.tsx` — blobs
- `src/pages/Work.tsx` — blobs, glass buttons/placeholders
- `src/pages/PlanfitDetail.tsx` — blobs, glass cards/tabs/pills
- `src/pages/ParachuteDetail.tsx` — blobs, glass cards/pills
- `src/components/Header.tsx` — glass secondary button, nav colors
- `src/components/ExperienceSection.tsx` — glass cards
- `src/components/ProjectsSection.tsx` — glass cards
- `src/components/ContactSection.tsx` — glass card
- `src/components/DetailPanel.tsx` — glass panel, bubbles, close button
