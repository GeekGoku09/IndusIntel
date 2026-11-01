# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Interactive Card Grid Keyboard Accessibility & Filter Zero-State

**Learning:** Clickable catalog cards styled with `div onClick` without keyboard semantics (`role="button"`, `tabIndex={0}`, onKeyDown for Enter/Space) exclude keyboard-only and screen reader navigators. Additionally, filtering without an empty state leaves users wondering if an error occurred or no matches were found.
**Action:** Always provide full keyboard activation support (`tabIndex`, Enter/Space key handling, visible focus rings) on interactive card elements and supply an explicit zero-state with a one-click reset action when filters yield no results.
