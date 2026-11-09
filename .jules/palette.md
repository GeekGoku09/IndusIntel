# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Modal Dialog Keyboard Accessibility & Backdrop Dismissal
**Learning:** In Tailwind-based industrial dashboards with overlay modal drawers, modals frequently rely only on a mouse click on an icon `X` button. Screen readers lose dialog context without `role="dialog"` and `aria-labelledby`, while keyboard users are trapped without an `Escape` key listener or focus rings on icon buttons. Additionally, hover-only action buttons (like copy buttons in chat threads) are invisible to keyboard navigators unless paired with `focus-visible:opacity-100`.
**Action:** When creating or auditing modal overlays, always enforce:
1. `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
2. Global `Escape` key listener cleaned up on unmount/close.
3. Backdrop `onClick` with `e.target === e.currentTarget` check.
4. Descriptive `aria-label` and `focus-visible:ring-2` on icon-only buttons.
5. `focus-visible:opacity-100` alongside `group-hover:opacity-100` for contextual action triggers.
