# CLAUDE.md

## Working with Guillaume

- Start every reply with "Guillaume" — hard requirement, no exceptions.
- Follow the `tldr` skill for every reply: lead with the next action, number multi-step work, restate state each turn, no preamble/recap/closing filler. Guillaume has ADHD; shape output so it is actionable, not just short.
- When planning or writing code, apply `andrej-karpathy-skills:karpathy-guidelines`: think before coding and surface assumptions, keep changes minimal and surgical, define verifiable success criteria before looping.
- Use the `grilling` skill to ask clarifying questions before acting on vague or underspecified requests. Settle the design tree with Guillaume via `AskUserQuestion` rather than guessing — re-editing after a wrong guess wastes more tokens than asking up front.

## Project

Personal portfolio website.

- **Stack:** static HTML/CSS/JS. No build step, no framework, no package manager.
- **Hosting:** GitHub Pages, user site — repo will be named `<username>.github.io`, served at the root domain.
- **Domain:** default `github.io` URL. No custom domain planned.
- **Repo state:** git initialized locally. No GitHub remote yet — connect it once Guillaume creates the repo and shares the URL.

Content, layout, and design decisions are still open and will be added here (or to new files) as they're settled.
