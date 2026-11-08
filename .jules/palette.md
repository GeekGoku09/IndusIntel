## 2025-05-22 - Modal Dialog Accessibility & Escape Dismissal
**Learning:** Overlay modals and AI copilot dialogs lacking Escape key listeners and ARIA dialog semantics (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) trap keyboard and screen reader users, forcing manual mouse navigation to click icon-only close buttons.
**Action:** Always bind a window `keydown` listener for `Escape` when an overlay modal mounts/opens (with proper cleanup), declare `role="dialog"` with `aria-modal="true"` and an `aria-labelledby` id, and add explicit `aria-label`s to icon-only action buttons.
