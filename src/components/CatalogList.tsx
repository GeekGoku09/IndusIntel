import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Layers,
  Database,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Tag,
  Eye,
  Sliders,
  Plus,
  Box
} from 'lucide-react';
import { IndustrialProduct, IndustrySector } from '../types';

interface CatalogListProps {
  products: IndustrialProduct[];
  onSelectProduct: (product: IndustrialProduct) => void;
  onNewExtraction: () => void;
}

// ⚡ Bolt Optimization: Static sectors array defined outside component to avoid re-allocating on every render
const SECTORS: IndustrySector[] = [
  'Fluid Power & Pneumatics',
  'Pumps & Fluid Handling',
  'Motors & Automation Drives',
  'Process Valves & Actuation',
  'Bearings & Power Transmission',
  'Sensors & Industrial IoT'
];

export const CatalogList: React.FC<CatalogListProps> = ({
  products,
  onSelectProduct,
  onNewExtraction
}) => {
  const [search, setSearch] = useState<string>('');
  const [sectorFilter, setSectorFilter] = useState<string>('ALL');

  // ⚡ Bolt Optimization: Calculate sector counts in a single O(N) pass with useMemo
  // avoids running products.filter() S times (O(S * N)) on every render
  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products || []) {
      if (p.sector) {
        counts[p.sector] = (counts[p.sector] || 0) + 1;
      }
    }
    return counts;
  }, [products]);

  // ⚡ Bolt Optimization: Memoize search query & sector filter calculation to prevent wasteful recalculations
  const filtered = useMemo(() => {
    const q = (search || '').trim().toLowerCase();
    return (products || []).filter(p => {
      const matchesSector = sectorFilter === 'ALL' || p.sector === sectorFilter;
      if (!q) return matchesSector;

      const name = (p.productName || '').toLowerCase();
      const mpn = (p.mpn || '').toLowerCase();
      const mfg = (p.manufacturer || '').toLowerCase();
      const etim = (p.etimClassCode || '').toLowerCase();
      const sku = (p.sku || '').toLowerCase();

      const matchesSearch =
        name.includes(q) ||
        mpn.includes(q) ||
        mfg.includes(q) ||
        etim.includes(q) ||
        sku.includes(q);

      return matchesSector && matchesSearch;
    });
  }, [products, sectorFilter, search]);

  return (
    <div id="catalog-list" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-mono font-bold flex items-center gap-1">
              <Database className="w-3.5 h-3.5" />
              Standardized Industrial Master Catalog
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ETIM 9.0 Standard Enriched
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Product Intelligence Catalog Repository
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Explore verified industrial equipment with normalized SI units, decoded nomenclature blueprints, ETIM 9.0 feature codes, and competitor interchange mappings.
          </p>
        </div>

        <button
          onClick={onNewExtraction}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Ingest & Extract New SKU</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Sector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setSectorFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              sectorFilter === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Sectors ({products.length})
          </button>
          {SECTORS.map((sec) => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                sectorFilter === sec
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {sec} ({sectorCounts[sec] || 0})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search MPN, ETIM code, brand, title..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-400 transition-all p-5 cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2.5">
              {/* Brand & Status Header */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-slate-900 text-white font-mono font-bold text-xs">
                  {product.manufacturer}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    product.reviewStatus === 'AUTO_APPROVED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : product.reviewStatus === 'FLAGGED_CONFLICT'
                      ? 'bg-amber-100 text-amber-800 animate-pulse'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {product.reviewStatus}
                </span>
              </div>

              {/* Title & MPN */}
              <div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-1">
                  {product.productName}
                </h3>
                <div className="text-xs font-mono text-cyan-800 font-semibold mt-0.5">
                  MPN: {product.mpn}
                </div>
              </div>

              {/* Short Summary */}
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Spec Highlights Pill Strip */}
              <div className="pt-2 border-t border-slate-100 space-y-1 font-mono text-[11px]">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">ETIM 9.0:</span>
                  <span className="font-semibold text-slate-800">{product.etimClassCode}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Specs Enriched:</span>
                  <span className="font-semibold text-cyan-800">{product.specs?.length || 0} attributes</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Equivalents:</span>
                  <span className="font-semibold text-indigo-700">{product.crossReferences?.length || 0} brands</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-emerald-700 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confidence: {product.overallConfidence}%</span>
              </div>

              <span className="text-cyan-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Inspect Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
