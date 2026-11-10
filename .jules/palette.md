# Palette's Journal - UX & Accessibility Learnings

## 2025-05-14 - Search Filter Empty State & Keyboard Card Navigation
**Learning:** In industrial catalog inspection grids where users frequently search complex MPNs, standard codes (ETIM/eClass), and apply sector filters, an unhandled empty result leaves users disoriented without immediate guidance or a single-action recovery path. Additionally, rich preview cards acting as navigation entry points must be keyboard accessible with explicit `role="button"`, `tabIndex={0}`, descriptive `aria-label` announcing the manufacturer and MPN, and `onKeyDown` handlers for Space and Enter.
**Action:** Always pair search and multi-facet filtering with an informative empty state containing a direct reset action (`Reset search and filters`), and ensure interactive catalog cards support both pointer and keyboard activation with visible focus indicators.
