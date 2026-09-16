# CLAUDE.md

## Project overview

Guillaume is a BSMS Manufacturing Engineering and Management student at De La Salle University (Sep 2021–Present). This site is a portfolio to supplement his resume for internship applications. He is applying now for internships starting January 2027.

**Deadline: first working version by 2026-09-23 (one week from 2026-09-16).** Favor shipping a complete, working site over polishing any one section. Cut scope before cutting the deadline.

Audience is hybrid: both manufacturing/industrial engineering roles and software/tech roles. Content and tone must read well to both — don't tilt fully technical or fully non-technical.

Planned content:
- Personal info and contact details
- Key projects, each framed as problem → method → result, with supporting images
- Tech stack section (a plus for an engineering student applying to tech-adjacent roles)
- Downloadable/embedded resume PDF

Layout, visual design, and exact project list are still open — grill Guillaume on these before building rather than assuming.

## Ask before you assume

Never guess at intent. If a task leaves anything open — which screen, which endpoint, what happens on failure, whether it needs a migration, whether this is user-facing — stop and ask. One question up front is cheaper than half a day of work in the wrong direction.

- Ask when the request could reasonably mean two different things.
- Do not widen scope past what was asked. Note the adjacent thing you spotted; don't fix it unprompted.
- If you had to assume something you couldn't resolve, list it explicitly at the top of your summary.

## Working with Guillaume

- Start every reply with "Guillaume" — hard requirement, no exceptions.
- Follow the `tldr` skill for every reply: lead with the next action, number multi-step work, restate state each turn, no preamble/recap/closing filler. Guillaume has ADHD; shape output so it is actionable, not just short.
- When planning or writing code, apply `andrej-karpathy-skills:karpathy-guidelines`: think before coding and surface assumptions, keep changes minimal and surgical, define verifiable success criteria before looping.
- Use the `grilling` skill to ask clarifying questions before acting on vague or underspecified requests. Settle the design tree with Guillaume via `AskUserQuestion` rather than guessing — re-editing after a wrong guess wastes more tokens than asking up front.
- When asked to commit changes, make sure to follow conventional commits, do not go above 100 characters, do not include "edited by Claude Code" or the likes. Just a simple commit would do. no need to write who wrote.
- When asked to explain code and write notes, prioritize readability from a human standpoint. Avoid too much technicality, prioritize what would be important to digest, and make sure it could be understood by a junior developer with little experience.

## Project

Personal portfolio website.

- **Stack:** static HTML/CSS/JS. No build step, no framework, no package manager.
- **Hosting:** GitHub Pages, user site — repo will be named `<username>.github.io`, served at the root domain.
- **Domain:** default `github.io` URL. No custom domain planned.
- **Repo state:** git initialized locally. No GitHub remote yet — connect it once Guillaume creates the repo and shares the URL.

Content, layout, and design decisions are still open and will be added here (or to new files) as they're settled.
