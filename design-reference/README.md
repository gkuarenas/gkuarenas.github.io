# Handoff: Guillaume Arenas Portfolio Site

## Overview
A personal portfolio site (Guillaume Arenas — engineering projects) with a landing
page, a reusable project-detail template, and two live project pages (GripVT, and
the Low-Cost Automated Visuotactile Sensor Testing Rig). Goal: deploy as a static
site on **GitHub Pages**.

## About the design files
The `.dc.html` files in this bundle are **design references**, built in a
prototyping tool's proprietary component format (they load a `support.js` runtime
that only exists inside that tool). They will **not run as-is on GitHub Pages**.

Your task: recreate these designs as plain static **HTML/CSS/JS** (no build step
required, or a minimal one if you prefer — e.g. Vite — but GitHub Pages needs the
final output to be static files). Preserve layout, styling, copy, and interactions
exactly; port the `renderVals()`/state logic in each `.dc.html`'s `<script>` block
into plain JS (vanilla, or a lightweight framework if you set one up).

## Fidelity
**High-fidelity.** Colors, type, spacing, and copy in the `.dc.html` files are final
— recreate pixel-for-pixel, not just "in the spirit of."

## Design tokens
- Background: `#14161A` · Surface/cards: `#1C1F26` · Border: `#2C2F36`
- Text: `#F2F0EC` · Muted text: `#8B8983` / `#C9C7C0` · Body copy: `#D7DEE3`
- Accent (icons/avatar bg): `#33475B`
- Font: Manrope (Google Fonts), weights 300–800
- Radius: 8–16px depending on element (buttons 8px, cards 10–16px, pills 999px)
- Nav: fixed, frosted-glass (`backdrop-filter: blur(10px)`, translucent background)

## Screens

### 1. Main Landing Page (`Main Landing Page.dc.html`)
Home/index page. Nav links point to `#home`, `#projects`, `#contact` anchors and to
the two project pages. Recreate as `index.html`.

### 2. Project Detail (`Project Detail.dc.html`)
Generic project template — check if GripVT/Rig pages are meant to reuse this
shell or are fully custom (they currently look like standalone pages with the same
nav/footer pattern). Confirm with the designer if unsure before diverging.

### 3. GripVT (`GripVT.dc.html`) → recreate as `gripvt.html`
Wearable grip-force sensor project page: hero, image gallery with a lightbox
(click to expand, arrow nav, Esc/click-outside to close), sidebar with tech-stack
tags and links, and long-form sections (Overview, Problem & Approach, Key Features,
Results).

**Feature: "Request the Manuscript" pop-up.** Clicking the sidebar link (styled as
a light pill button, mail icon) opens a centered modal over a dark scrim:
- Fields: Name, Affiliation/Institution, Email (all required), Purpose (optional
  textarea). Plus a visually-hidden honeypot input (`name="website"`) for spam —
  real users never fill it; if it's non-empty on submit, treat as a bot.
- **Send Request** button — disabled/dimmed until Name, Affiliation, and a
  valid-looking Email are filled. On click: POST JSON `{name, affiliation, email,
  purpose, website}` to a Cloudflare Worker URL (see below).
- States: idle → **Sending…** (button label) → on success, green inline banner
  "✓ Sent — thanks, I'll get back to you soon." and the modal auto-closes after
  ~1.8s, clearing the form. On failure: red inline banner with the error, and a
  **Copy Details** button appears next to **Try Again** so the visitor can paste
  the info elsewhere if the relay is down.
- Close via the X button, clicking the dark backdrop, or Esc.
- Exact JS behavior (validation, state machine, styles) is in the `<script>` block
  of `GripVT.dc.html` — port it faithfully into plain JS.

**Backend: Telegram relay.** The form does *not* email anyone — it posts to a
Cloudflare Worker (`telegram-worker/worker.js` in this bundle) that forwards the
message to Guillaume's Telegram via the Bot API, keeping the bot token off the
public page. `telegram-worker/SETUP.md` has full deploy steps (Cloudflare account →
paste worker code → set `BOT_TOKEN`/`CHAT_ID` secrets → copy the resulting
`*.workers.dev` URL). **That URL needs to go wherever the recreated page's fetch
call points** — currently a placeholder (`telegramWorkerUrl` in the DC's logic,
search for `REPLACE-WITH-YOUR-WORKER`). Deploying the Worker itself is a one-time
manual step in the Cloudflare dashboard (not something Claude Code needs to do
for you, but flag it to the user if the URL is still a placeholder).

### 4. Low-Cost Automated Visuotactile Sensor Testing Rig
(`Low-Cost Automated Visuotactile Sensor Testing Rig.dc.html`) → recreate as its
own page, same visual system as GripVT (nav, hero, gallery, sidebar, sections).

## Assets
`uploads/` and `assets/` contain all images referenced by the pages (project
photos, figures, logos, headshot). Carry them over as-is; paths in the recreated
HTML should point at wherever you relocate them (e.g. an `images/` folder).

## Files in this bundle
- `Main Landing Page.dc.html`, `Project Detail.dc.html`, `GripVT.dc.html`,
  `Low-Cost Automated Visuotactile Sensor Testing Rig.dc.html` — design references
- `telegram-worker/worker.js` — Cloudflare Worker source (deploy as-is)
- `telegram-worker/SETUP.md` — deploy steps for the Worker
- `uploads/`, `assets/` — all image assets used across the pages
