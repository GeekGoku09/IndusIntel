# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Search & Filter Empty States Pattern
**Learning:** Catalog and list views with multi-faceted filtering (sector filters + text search) often leave the user stranded with a blank grid if no results match. Providing an inline clear button on the search input plus an empty state with a direct "Reset filters" action prevents dead ends and improves perceived responsiveness.
**Action:** When working on collection or catalog views in this app, ensure search inputs feature accessible clear buttons (`aria-label`, `focus-visible`), and include an empty state offering a 1-click filter reset.
