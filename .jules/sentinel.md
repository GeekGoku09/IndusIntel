## 2025-05-18 - Unvalidated Link Protocol DOM XSS

**Vulnerability:** External catalog link targets (`datasheetUrl` rendered into an anchor `<a href={product.datasheetUrl} ...>`) were rendered directly into the DOM without URL protocol validation. Ingested catalog payloads or AI-extracted specifications could contain `javascript:` pseudoprotocols or unexpected URI schemes, resulting in DOM XSS upon user interaction.
**Learning:** Component properties that accept URLs from unstructured AI extractions, external catalogs, or user uploads must be strictly validated against an allowed protocol whitelist (`http:`, `https:`, or root relative `/`) before binding them to clickable anchor tags.
**Prevention:** Use an `isSafeUrl()` protocol validation helper whenever binding external URLs to anchor `href` attributes, and enforce `rel="noopener noreferrer"`.
