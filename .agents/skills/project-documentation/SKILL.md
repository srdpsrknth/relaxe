---
name: project-documentation
description: Maintain Relaxe for Reddit project knowledge after approved architectural or design decisions, substantial implementation, verification changes, or milestone completion. Update concise existing documents and handoff state; skip routine minor edits that add no durable knowledge.
---

# Project documentation

Use the repository root containing AGENTS.md. Read the relevant existing document before
editing. Documentation is part of the current authorized task; do not start unrelated work.

## Route the knowledge

- `docs/ARCHITECTURE.md`: confirmed source boundaries, approved technical decisions, reasons,
  trade-offs, and changed contracts. Preserve the exact upstream baseline when relevant.
- `docs/DESIGN.md`: approved product behavior, shared interface rules, and design specifications.
- `docs/ROADMAP.md`: milestone state, meaningful verification, limitations, next task, and handoff.
- `docs/UPSTREAM.md`: imported upstream commit, repeatable integration/build procedure, and
  changes to its checks or release boundaries.
- `AGENTS.md`: durable working instructions and entry points only; keep volatile progress in
  ROADMAP.md instead.

## Update only material changes

1. Establish what was approved, implemented, and actually verified from the user's decisions,
   current source/diff, and current command results. Label proposals and unverified behavior.
   An agreed application ID does not mean the Gradle configuration has been changed.
2. Update the smallest relevant existing section. Keep rationale/trade-offs for important
   decisions; omit chronological narration and minor-edit logs. Do not create a new document
   when the existing structure can hold the information without duplication.
3. For substantial implementation, record changed behavior/contracts, meaningful verification,
   and unresolved limitations. Record commands, outcomes and useful counts; distinguish a failed
   check from a check not run. Cached historical reports are not evidence of a fresh run.
4. At a milestone boundary, set an honest status and leave a concrete next task. If a new chat
   is useful, update the handoff with relevant document paths and remaining questions.
5. Check the updated text against the current diff/results and remove superseded statements.
   Keep a single authoritative home for each fact; link to it from other documents.

If nothing durable changed, make no documentation edit and say so only if it matters to the
handoff. Never mark a milestone complete while required work remains; a blocked verification
attempt can be recorded accurately without claiming a passing build.

Do not copy credentials, signing data, private account/device identifiers, full logs, or
unrelated local machine details. Do not rewrite upstream README/CHANGELOG for internal progress.
This skill does not authorize commits, pushes, merging, publication, external messages, or
scheduled automation. Preserve the current task's scope and the user's existing authorization.
