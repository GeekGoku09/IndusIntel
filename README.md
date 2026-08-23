# IndusIntel: Industrial Product Catalog & Multimodal Extraction Intelligence Platform

An enterprise-grade, multimodal industrial data extraction, validation, and syndication system. IndusIntel ingests complex, unstructured engineering artifacts (P&IDs, OEM datasheets, technical drawings, CAD schematics, and stamped physical nameplates) and transforms them into standard, audit-ready industrial taxonomies (ETIM 8.0, eClass, UNSPSC, GS1 BMEcat).

---

## Key Capabilities

- **Multimodal Engineering Ingestion**: Parse unstructured technical PDFs, high-resolution dimensional blueprints, and field nameplate photos with computer vision and specialized extraction prompts.
- **Physics & Standard Validation Engine**: Automated sanity checking against mechanical engineering heuristics (e.g., pressure-temperature ratings, valve seat material limits, NEMA/IP ingress rating coherence).
- **Automated ETIM 8.0 & eClass Classification**: Instant classification of industrial components with normalized attribute keys, metric/imperial unit standardizations, and confidence scoring.
- **Interactive Knowledge Graph & Cross-Referencing**: Visual relationship graphs linking components, sub-assemblies, manufacturers, and cross-reference drop-in equivalents.
- **Human-in-the-Loop (HITL) Review Queue**: Side-by-side visual diffing, attribute validation status tracking, bulk approvals, and audit trail generation.
- **Multi-Format Channel Syndication**: Export verified catalog items into standard industrial formats including BMEcat 2005 XML, ETIM Classification JSON, Shopify B2B / ERP CSV, and SAP Ariba CIF.
- **Interactive Engineering Copilot**: Context-aware industrial assistant capable of answering technical specification questions, compatibility queries, and cross-reference comparisons.
- **High-Throughput Batch Pipeline**: Streaming ingestion simulator with live metrics tracking throughput, conflict detection rates, and throughput logs.

---

## Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Motion.
- **Backend**: Express.js with TypeScript (`tsx` / `esbuild`).
- **AI / LLM Integration**: Multimodal Gemini SDK (`@google/genai`) with automatic multi-model fallback cascades and transient error retry logic.
- **Standards Supported**: ETIM 8.0, eClass 12.0, UNSPSC, BMEcat 2005.

---

## Project Structure

```text
├── server.ts                    # Express API backend with multimodal Gemini pipeline
├── src/
│   ├── main.tsx                 # Client application entry point
│   ├── App.tsx                  # Root state coordinator & view switcher
│   ├── types.ts                 # TypeScript interfaces for industrial catalogs & ETIM specs
│   ├── index.css                # Global stylesheet & Tailwind directives
│   ├── components/
│   │   ├── Header.tsx           # Global navigation & live pipeline status bar
│   │   ├── CatalogList.tsx      # Master industrial catalog explorer & search
│   │   ├── ExtractionStudio.tsx # PDF / OCR datasheet extractor & live preview
│   │   ├── ProductDetailView.tsx# Deep-dive spec sheet, physics validator & diff editor
│   │   ├── HITLReviewQueue.tsx  # Human-in-the-loop review & audit approval workflow
│   │   ├── KnowledgeGraphView.tsx # Interactive D3/SVG component dependency graph
│   │   ├── SyndicationExporter.tsx # BMEcat XML, ETIM JSON & ERP CSV exporter
│   │   ├── BatchCatalogPipeline.tsx # Streaming ingestion ledger & throughput monitor
│   │   └── EngineeringCopilotModal.tsx # AI technical copilot modal dialog
│   └── data/
│       └── sampleCatalogs.ts    # Seed industrial components & ontology definitions
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** / **yarn**

### Installation

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd indusintel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your API credentials to `.env`:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### Running Locally

Start the full-stack development server:
```bash
npm run dev
```

The application will be accessible at: `http://localhost:3000`

### Production Build

Compile the React frontend and bundle the Express backend:
```bash
npm run build
npm start
```

---

## Workflow Guide

1. **Ingest & Extract**: Open the **Extraction Studio**, select a preloaded sample datasheet (or upload your own PDF / technical diagram), and execute multimodal extraction.
2. **Review & Validate**: Inspect flagged engineering anomalies (e.g., mismatched temperature/pressure ratings) in the **Product Detail View** or **Review Queue**.
3. **Explore Knowledge Graph**: Navigate to the **Knowledge Graph** to inspect component relationships, parent assemblies, and direct OEM replacements.
4. **Syndicate & Export**: Go to **Syndication Hub** to generate and download standard BMEcat 2005 XML files, ETIM 8.0 packages, or CSV sheets ready for ERP ingestion.

---

## License

This project is licensed under the MIT License.
