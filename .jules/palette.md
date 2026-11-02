## 2025-05-22 - Visual confirmation & accessible clipboard copying for product identifiers

**Learning:** Micro-interactions like copy-to-clipboard buttons on essential identifiers (MPN, SKU) require both screen-reader accessibility (`aria-label`, dynamic announcement) and immediate visual state transitions (`Check` icon and "Copied!" inline pill). Missing visual feedback leaves users uncertain whether the clipboard action succeeded, especially when interacting with technical identifiers.
**Action:** When adding or auditing clipboard copy buttons, pair `aria-label` / `title` with transient confirmation states (`Check` icon + inline confirmation) and visible keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-cyan-500`).
