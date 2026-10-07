## 2025-05-20 - Memoizing list filtering and sector counts in CatalogList
**Learning:** In React list views like `CatalogList`, re-filtering lists and calculating per-sector product counts inside the JSX map callback on every render causes redundant O(N * S) operations on keystrokes and state updates.
**Action:** Use `useMemo` for derived product filter results and count maps, and move constant arrays out of component renders.
