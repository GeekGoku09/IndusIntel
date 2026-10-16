## 2025-05-18 - Single-Pass Aggregation in Filter Pills

**Learning:** When rendering filter buttons or tab badges with item counts (e.g., sector counts, review status counts), running `.filter()` inside `.map()` or per button creates $O(S \cdot N)$ array scans on every render/keystroke. Replacing this with a single $O(N)$ pass in `useMemo` that builds a count dictionary significantly reduces render work and avoids redundant array allocations.

**Action:** In React components with filter pills, aggregate counts into a single lookup object via `useMemo` instead of mapping over options with inline `.filter()`.

## 2025-05-19 - Memoizing Catalog Serialization in Export Components

**Learning:** Export/syndication components that format complex catalog items into XML (BMEcat), JSON (ETIM), or CSV payloads in inline render functions re-run string concatenations, array mappings, and `JSON.stringify` on every render (including minor UI state updates like copy feedback or alert timeouts). Memoizing the serialized output string with `useMemo` based on `[selectedProduct, exportFormat]` eliminates redundant serialization work on UI-only state updates.

**Action:** Wrap heavy text export generators in `useMemo` so string serialization only occurs when the source record or target format actually changes.
