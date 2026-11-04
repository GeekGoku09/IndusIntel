# Palette's UX & Accessibility Journal

## 2025-05-18 - Modal Dialog Keyboard Accessibility & ARIA Grounding
**Learning:** In complex technical workspace dashboards like IndusIntel, modal interfaces (e.g., Engineering Copilot, Grounding Evidence inspector) are frequently triggered to inspect specifications. Without proper `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, auto-focusing the interactive prompt input on open, and an `Escape` key shortcut, keyboard-only and screen reader navigation gets trapped or disrupted.
**Action:** For all modal layers and slide-outs in this design system, ensure standard modal a11y primitives: trap/bind `Escape` to close, autofocus the primary input/close control on open, provide explicit `aria-label`s on icon-only and action buttons, and provide `focus-visible` ring indicators.
