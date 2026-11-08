## 2025-05-22 - CSV Formula Injection in Syndication Exporters

**Vulnerability:** Industrial catalog syndication endpoints (`/api/syndicate-export` and client-side syndication exports) outputted unescaped MPNs, SKUs, and specifications into CSV rows. In industrial catalogs, user-supplied or AI-extracted model codes or descriptions starting with formula prefixes (`=`, `+`, `-`, `@`, `\t`, `\r`) could trigger CSV formula execution (CWE-1236) when opened in Microsoft Excel, Google Sheets, or ERP procurement systems like SAP Ariba.
**Learning:** Wrapping CSV values in double quotes alone does not protect against formula execution in spreadsheet applications; spreadsheet software still evaluates formulas inside quoted cells if the first character is an operator or trigger character.
**Prevention:** Always prepend a single quote (`'`) to any cell value starting with `=, +, -, @, \t, \r` before quoting and exporting to CSV in both backend and frontend exporters.
