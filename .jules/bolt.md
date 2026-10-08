## 2025-05-10 - Single-Pass Aggregation and Filtering Memoization in React Component JSX

**Learning:** Calling `.filter()` multiple times inside JSX render loops (e.g. for pill badge counts across sectors or status categories) causes $O(K \times N)$ array iterations on every re-render (such as user keystrokes in search inputs).

**Action:** Pre-compute entity counts in a single $O(N)$ pass with `useMemo`, extract static filter array constants outside component scope, and memoize filtered lists.
