import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
  Check,
  X,
  Eye,
  Sliders,
  Sparkles,
  ShieldCheck,
  Layers,
  ArrowRight,
  Search
} from 'lucide-react';
import { IndustrialProduct, ReviewStatus } from '../types';

interface HITLReviewQueueProps {
  products: IndustrialProduct[];
  onSelectProduct: (product: IndustrialProduct) => void;
  onUpdateProductStatus: (productId: string, newStatus: ReviewStatus) => void;
  onBulkApprove: (productIds: string[]) => void;
}

export const HITLReviewQueue: React.FC<HITLReviewQueueProps> = ({
  products,
  onSelectProduct,
  onUpdateProductStatus,
  onBulkApprove
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDiffProduct, setActiveDiffProduct] = useState<IndustrialProduct | null>(null);

  // Performance optimization: Single-pass status count computation to avoid repeated O(N) array filters.
  const statusCounts = useMemo(() => {
    const counts = { FLAGGED_CONFLICT: 0, AUTO_APPROVED: 0, VERIFIED_READY: 0 };
    for (const p of products || []) {
      if (p.reviewStatus && p.reviewStatus in counts) {
        counts[p.reviewStatus as keyof typeof counts]++;
      }
    }
    return counts;
  }, [products]);

  // Performance optimization: Memoize filtered products and short-circuit early on status mismatch.
  const filteredProducts = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    const safeProducts = products || [];

    return safeProducts.filter(p => {
      const matchesStatus = statusFilter === 'ALL' || p.reviewStatus === statusFilter;
      if (!matchesStatus) return false;
      if (!q) return true;

      return (
        (p.productName || '').toLowerCase().includes(q) ||
        (p.mpn || '').toLowerCase().includes(q) ||
        (p.manufacturer || '').toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q) ||
        (p.etimClassCode || '').toLowerCase().includes(q)
      );
    });
  }, [products, statusFilter, searchQuery]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map(p => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div id="hitl-review-queue" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-mono font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Human-in-the-Loop (HITL) Quality Control
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Audit & Governance Stage
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Industrial Catalog Staging & Exception Review Queue
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Review high-value equipment transformations, verify low-confidence attributes, resolve physical engineering anomalies, and approve records for syndication into ERP / PIM / B2B marketplaces.
          </p>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onBulkApprove(selectedIds);
                setSelectedIds([]);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Bulk Approve ({selectedIds.length} SKUs)</span>
            </button>
          </div>
        )}
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Items ({products.length})
          </button>

          <button
            onClick={() => setStatusFilter('FLAGGED_CONFLICT')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              statusFilter === 'FLAGGED_CONFLICT'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Flagged Conflicts ({statusCounts.FLAGGED_CONFLICT})</span>
          </button>

          <button
            onClick={() => setStatusFilter('AUTO_APPROVED')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              statusFilter === 'AUTO_APPROVED'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Auto-Approved ({statusCounts.AUTO_APPROVED})</span>
          </button>

          <button
            onClick={() => setStatusFilter('VERIFIED_READY')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              statusFilter === 'VERIFIED_READY'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
            <span>Verified Ready ({statusCounts.VERIFIED_READY})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search MPN, Brand, SKU..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Review Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-mono text-[10px]">
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                </th>
                <th className="p-3 font-semibold">Manufacturer & Part</th>
                <th className="p-3 font-semibold">ETIM Classification</th>
                <th className="p-3 font-semibold text-center">Confidence</th>
                <th className="p-3 font-semibold text-center">Quality</th>
                <th className="p-3 font-semibold">Status / Issues</th>
                <th className="p-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(prod.id)}
                      onChange={() => toggleSelectOne(prod.id)}
                      className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                    />
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono font-bold text-[11px]">
                        {prod.manufacturer}
                      </span>
                      <span className="font-mono text-cyan-800 font-semibold">{prod.mpn}</span>
                    </div>
                    <div className="text-slate-900 font-medium text-xs mt-0.5 truncate max-w-sm">
                      {prod.productName}
                    </div>
                  </td>

                  <td className="p-3 font-mono text-slate-600">
                    <div className="text-slate-900 font-semibold">{prod.etimClassCode}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-xs">{prod.etimClassTitle}</div>
                  </td>

                  <td className="p-3 text-center font-mono font-bold">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                      prod.overallConfidence >= 90
                        ? 'bg-emerald-100 text-emerald-800'
                        : prod.overallConfidence >= 75
                        ? 'bg-cyan-100 text-cyan-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {prod.overallConfidence}%
                    </span>
                  </td>

                  <td className="p-3 text-center font-mono font-bold">
                    <span className="text-indigo-800 text-[11px]">
                      {prod.dataQualityScore}%
                    </span>
                  </td>

                  <td className="p-3">
                    {prod.reviewStatus === 'FLAGGED_CONFLICT' ? (
                      <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200 text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                        <span className="truncate max-w-xs font-semibold">
                          {prod.validationIssues?.[0]?.message || 'Physical rule conflict'}
                        </span>
                      </div>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                        {prod.reviewStatus}
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setActiveDiffProduct(prod)}
                        title="Side-by-side Source Diff"
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        <Sliders className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onSelectProduct(prod)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>

                      {prod.reviewStatus !== 'VERIFIED_READY' && (
                        <button
                          onClick={() => onUpdateProductStatus(prod.id, 'VERIFIED_READY')}
                          title="Mark Verified Ready"
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Diff Modal */}
      {activeDiffProduct && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full p-6 space-y-4 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Side-by-Side Source Ingestion vs. Enriched Intelligence
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {activeDiffProduct.manufacturer} — {activeDiffProduct.mpn}
                </p>
              </div>
              <button
                onClick={() => setActiveDiffProduct(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-base"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Raw Input Column */}
              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono space-y-3">
                <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                  1. Raw Fragmented Ingestion Source
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {activeDiffProduct.rawInputSnippet || 'Direct catalog import payload'}
                </div>
                <div className="text-[11px] text-slate-400">
                  Source: <strong>{activeDiffProduct.sourceType}</strong>
                </div>
              </div>

              {/* Enriched Column */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-cyan-900 font-bold uppercase tracking-wider text-[11px] font-mono">
                  2. AI Enriched & ETIM 9.0 Standardized
                </div>
                <div className="space-y-1.5">
                  <div className="font-bold text-slate-900">{activeDiffProduct.productName}</div>
                  <div className="text-slate-600 text-[11px]">{activeDiffProduct.shortDescription}</div>
                  <div className="pt-2 border-t border-slate-200 font-mono text-[11px] text-slate-700">
                    <div><strong>ETIM:</strong> {activeDiffProduct.etimClassCode} — {activeDiffProduct.etimClassTitle}</div>
                    <div><strong>UNSPSC:</strong> {activeDiffProduct.unspscCode}</div>
                    <div><strong>Total Specs:</strong> {activeDiffProduct.specs?.length || 0} normalized attributes</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveDiffProduct(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Close Diff
              </button>
              <button
                onClick={() => {
                  onUpdateProductStatus(activeDiffProduct.id, 'VERIFIED_READY');
                  setActiveDiffProduct(null);
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
              >
                Approve & Mark Verified Ready
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
