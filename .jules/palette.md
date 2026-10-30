## 2025-05-18 - Modal Accessibility & Keyboard Dismissal Pattern

**Learning:** Modal overlays that render conditionally (`if (!isOpen) return null;`) must register a `keydown` listener for the `Escape` key while open and attach standard WAI-ARIA modal attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby="[id]"`) to ensure screen readers and keyboard-only users can navigate and exit overlays seamlessly. Icon buttons within modals (close, copy, send) must also supply explicit `aria-label` attributes and state-aware visual feedback.

**Action:** Whenever introducing or refining modal dialogs, ensure `role="dialog"`, `aria-modal="true"`, heading-associated `aria-labelledby`, `Escape` key event handling with cleanup, and explicit `aria-label` attributes on icon-only actions are included.
