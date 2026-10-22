## 2025-05-20 - Memoizing list filtering and sector counts in CatalogList
**Learning:** In React list views like `CatalogList`, re-filtering lists and calculating per-sector product counts inside the JSX map callback on every render causes redundant O(N * S) operations on keystrokes and state updates.
**Action:** Use `useMemo` for derived product filter results and count maps, and move constant arrays out of component renders.
## 2025-05-18 - Single-Pass Aggregation in Filter Pills

**Learning:** When rendering filter buttons or tab badges with item counts (e.g., sector counts, review status counts), running `.filter()` inside `.map()` or per button creates $O(S \cdot N)$ array scans on every render/keystroke. Replacing this with a single $O(N)$ pass in `useMemo` that builds a count dictionary significantly reduces render work and avoids redundant array allocations.

**Action:** In React components with filter pills, aggregate counts into a single lookup object via `useMemo` instead of mapping over options with inline `.filter()`.
