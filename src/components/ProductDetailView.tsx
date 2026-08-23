import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Layers,
  FileCheck,
  GitCompare,
  Box,
  Share2,
  Sliders,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Tag,
  Wrench,
  Check,
  Edit2,
  Save,
  HelpCircle,
  Copy,
  Info
} from 'lucide-react';
import { IndustrialProduct, TechnicalSpec, ValidationIssue } from '../types';

interface ProductDetailViewProps {
  product: IndustrialProduct;
  onBack: () => void;
  onUpdateProduct: (updated: IndustrialProduct) => void;
  onOpenSyndication: (product: IndustrialProduct) => void;
  onOpenCopilotWithContext: (product: IndustrialProduct) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onUpdateProduct,
  onOpenSyndication,
  onOpenCopilotWithContext
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'specs' | 'evidence' | 'crossref' | 'bom' | 'commerce'>('specs');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial' | 'dual'>('dual');
  const [selectedEvidenceSpec, setSelectedEvidenceSpec] = useState<TechnicalSpec | null>(null);
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editSpecs, setEditSpecs] = useState<TechnicalSpec[]>(product.specs || []);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAutoFixIssue = (issue: ValidationIssue) => {
    const field = issue.field || '';
    if (field.includes('seal_material') || field.includes('max_temperature')) {
      // Apply recommended engineering fix: upgrade seat to PEEK or clamp temperature
      const updatedSpecs = (product.specs || []).map(s => {
        if (s.key === 'seal_material') {
          return {
            ...s,
            rawValue: 'Carbon-filled PEEK',
            normalizedValue: 'Carbon-Filled PEEK (Polyetheretherketone)',
            status: 'valid' as const,
            warningMessage: undefined
          };
        }
        if (s.key === 'max_temperature') {
          return {
            ...s,
            status: 'valid' as const,
            warningMessage: undefined
          };
        }
        return s;
      });

      const updatedProduct: IndustrialProduct = {
        ...product,
        specs: updatedSpecs,
        validationIssues: (product.validationIssues || []).filter(i => i.id !== issue.id),
        reviewStatus: 'VERIFIED_READY',
        dataQualityScore: 95,
        overallConfidence: 94,
        changeHistory: [
          ...(product.changeHistory || []),
          {
            timestamp: new Date().toISOString(),
            user: 'Automated Engineering Fix',
            action: 'Resolved thermal seal conflict: upgraded seat to Carbon-filled PEEK'
          }
        ]
      };

      onUpdateProduct(updatedProduct);
    }
  };

  const handleSaveInlineEdits = () => {
    const updated: IndustrialProduct = {
      ...product,
      specs: editSpecs,
      updatedAt: new Date().toISOString(),
      changeHistory: [
        ...(product.changeHistory || []),
        {
          timestamp: new Date().toISOString(),
          user: 'Lead Catalog Engineer',
          action: 'Updated normalized technical specifications'
        }
      ]
    };
    onUpdateProduct(updated);
    setIsEditing(false);
  };

  return (
    <div id="product-detail-view" className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog Intelligence</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onOpenCopilotWithContext(product)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 text-xs font-semibold shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Copilot about this SKU</span>
          </button>

          <button
            onClick={() => onOpenSyndication(product)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Syndicate (BMEcat / ETIM / CSV)</span>
          </button>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-slate-900 text-white font-mono font-bold text-xs">
                {product.manufacturer}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-mono font-semibold">
                {product.sector}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono">
                {product.category}
              </span>

              {/* Status Pill */}
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                  product.reviewStatus === 'AUTO_APPROVED'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : product.reviewStatus === 'FLAGGED_CONFLICT'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                    : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                }`}
              >
                {product.reviewStatus}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {product.productName}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600">
              <span className="flex items-center gap-1">
                <strong>MPN:</strong> {product.mpn}
                <button
                  onClick={() => handleCopy(product.mpn, 'mpn')}
                  className="text-slate-400 hover:text-slate-600 ml-1"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </span>
              <span>•</span>
              <span><strong>SKU:</strong> {product.sku}</span>
              <span>•</span>
              <span><strong>Series:</strong> {product.series}</span>
            </div>
          </div>

          {/* Scorecards */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center min-w-[90px]">
              <div className="text-xs text-slate-500 font-mono">Confidence</div>
              <div className="text-xl font-bold font-mono text-emerald-600">
                {product.overallConfidence}%
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center min-w-[90px]">
              <div className="text-xs text-slate-500 font-mono">Completeness</div>
              <div className="text-xl font-bold font-mono text-cyan-600">
                {product.completenessScore}%
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center min-w-[90px]">
              <div className="text-xs text-slate-500 font-mono">Data Quality</div>
              <div className="text-xl font-bold font-mono text-indigo-600">
                {product.dataQualityScore}%
              </div>
            </div>
          </div>
        </div>

        {/* Taxonomies & Standards Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2 font-mono">
            <div className="bg-slate-100 px-2.5 py-1 rounded border border-slate-200 text-slate-800">
              <strong>ETIM 9.0:</strong> {product.etimClassCode} — {product.etimClassTitle}
            </div>
            <div className="bg-slate-100 px-2.5 py-1 rounded border border-slate-200 text-slate-800">
              <strong>UNSPSC:</strong> {product.unspscCode} ({product.unspscTitle})
            </div>
            {product.eclassCode && (
              <div className="bg-slate-100 px-2.5 py-1 rounded border border-slate-200 text-slate-800">
                <strong>eClass:</strong> {product.eclassCode}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-xs">
            {product.cadModelAvailable && (
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono text-[11px] border border-emerald-200">
                <Box className="w-3 h-3" />
                3D CAD STEP Ready
              </span>
            )}
            {product.datasheetUrl && (
              <a
                href={product.datasheetUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-cyan-700 hover:text-cyan-800 font-mono text-[11px] underline"
              >
                <span>Datasheet</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Validation Issues / Conflicts Alert */}
        {product.validationIssues && product.validationIssues.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Data Quality & Physical Consistency Engine Flagged {product.validationIssues.length} Anomaly:</span>
            </div>
            <div className="space-y-2">
              {product.validationIssues.map((issue) => (
                <div key={issue.id} className="bg-white/80 p-3 rounded-lg border border-amber-200/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-semibold text-amber-900">[{issue.field}]: </span>
                    <span className="text-slate-700">{issue.message}</span>
                    {issue.suggestedFix && (
                      <div className="text-[11px] text-indigo-700 mt-1 font-mono">
                        Recommendation: {issue.suggestedFix}
                      </div>
                    )}
                  </div>
                  {issue.autoFixAvailable && (
                    <button
                      onClick={() => handleAutoFixIssue(issue)}
                      className="shrink-0 px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-sm transition-all"
                    >
                      Apply Recommended Fix
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Sub-Tabs */}
      <div className="border-b border-slate-200 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveSubTab('specs')}
            className={`flex items-center gap-2 px-4 py-2.5 font-semibold text-xs border-b-2 transition-all ${
              activeSubTab === 'specs'
                ? 'border-cyan-600 text-cyan-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Normalized Specifications ({product.specs?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('evidence')}
            className={`flex items-center gap-2 px-4 py-2.5 font-semibold text-xs border-b-2 transition-all ${
              activeSubTab === 'evidence'
                ? 'border-cyan-600 text-cyan-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Traceable Audit & Grounding</span>
          </button>

          <button
            onClick={() => setActiveSubTab('crossref')}
            className={`flex items-center gap-2 px-4 py-2.5 font-semibold text-xs border-b-2 transition-all ${
              activeSubTab === 'crossref'
                ? 'border-cyan-600 text-cyan-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>Competitor Equivalents ({product.crossReferences?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bom')}
            className={`flex items-center gap-2 px-4 py-2.5 font-semibold text-xs border-b-2 transition-all ${
              activeSubTab === 'bom'
                ? 'border-cyan-600 text-cyan-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Accessories & Spares ({product.accessoriesAndSpares?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('commerce')}
            className={`flex items-center gap-2 px-4 py-2.5 font-semibold text-xs border-b-2 transition-all ${
              activeSubTab === 'commerce'
                ? 'border-cyan-600 text-cyan-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Commerce & Marketing Pitch</span>
          </button>
        </div>

        {/* Unit Toggle for Specs */}
        {activeSubTab === 'specs' && (
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-mono mb-2">
            <span className="text-[11px] text-slate-500 px-2">Units:</span>
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-2 py-0.5 rounded ${unitSystem === 'metric' ? 'bg-white font-bold text-cyan-800 shadow-xs' : 'text-slate-600'}`}
            >
              Metric (SI)
            </button>
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-2 py-0.5 rounded ${unitSystem === 'imperial' ? 'bg-white font-bold text-cyan-800 shadow-xs' : 'text-slate-600'}`}
            >
              Imperial
            </button>
            <button
              onClick={() => setUnitSystem('dual')}
              className={`px-2 py-0.5 rounded ${unitSystem === 'dual' ? 'bg-white font-bold text-cyan-800 shadow-xs' : 'text-slate-600'}`}
            >
              Dual Display
            </button>
          </div>
        )}
      </div>

      {/* Sub-Tab 1: Specifications Matrix */}
      {activeSubTab === 'specs' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="text-xs font-bold text-slate-800 uppercase font-mono tracking-wider">
                Standardized Attribute Catalog (ETIM 9.0 Verified)
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <button
                    onClick={handleSaveInlineEdits}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-600 text-white font-semibold text-xs shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Overrides</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditSpecs(product.specs || []);
                      setIsEditing(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Override / Edit Specs</span>
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-mono text-[10px] bg-slate-50/50">
                    <th className="p-3 font-semibold">Category</th>
                    <th className="p-3 font-semibold">Attribute Label</th>
                    <th className="p-3 font-semibold">Normalized Value (Metric)</th>
                    <th className="p-3 font-semibold">Imperial Conversion</th>
                    <th className="p-3 font-semibold">ETIM Feature</th>
                    <th className="p-3 font-semibold">Evidence Traceability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(product.specs || []).map((spec, sIdx) => (
                    <tr key={sIdx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-mono text-slate-500 text-[11px]">
                        {spec.category}
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        {spec.label}
                        {spec.isKeyCommerceFilter && (
                          <span className="ml-2 px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 text-[10px] font-mono">
                            Filter Key
                          </span>
                        )}
                        {spec.warningMessage && (
                          <div className="text-[11px] text-amber-700 font-normal mt-0.5">
                            ⚠️ {spec.warningMessage}
                          </div>
                        )}
                      </td>

                      <td className="p-3 font-mono">
                        {isEditing ? (
                          <input
                            type="text"
                            value={String(editSpecs[sIdx]?.normalizedValue || '')}
                            onChange={(e) => {
                              const updated = [...editSpecs];
                              updated[sIdx].normalizedValue = e.target.value;
                              setEditSpecs(updated);
                            }}
                            className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-mono w-32"
                          />
                        ) : (
                          <span className="text-cyan-900 font-bold">
                            {String(spec.normalizedValue)} <span className="text-slate-500 font-normal">{spec.unit}</span>
                          </span>
                        )}
                      </td>

                      <td className="p-3 font-mono text-slate-600">
                        {unitSystem !== 'metric' && spec.imperialValue ? (
                          <span>{spec.imperialValue}</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      <td className="p-3 font-mono text-slate-500 text-[11px]">
                        {spec.etimFeatureCode || 'EF_STANDARD'}
                      </td>

                      <td className="p-3">
                        {spec.evidence ? (
                          <button
                            onClick={() => setSelectedEvidenceSpec(spec)}
                            className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded font-mono text-[10px] border border-emerald-200 transition-colors"
                          >
                            <ShieldCheck className="w-3 h-3" />
                            <span>{spec.evidence.evidenceType} ({Math.round(spec.evidence.confidence * 100)}%)</span>
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs">Standard Inferred</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Model Breakdown Drawer if available */}
          {product.modelCodeBreakdown && product.modelCodeBreakdown.length > 0 && (
            <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Decoded Model Nomenclature Blueprint: {product.mpn}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {product.modelCodeBreakdown.map((seg, sIdx) => (
                  <div key={sIdx} className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-1">
                    <div className="font-mono font-bold text-cyan-400 text-sm">{seg.segment}</div>
                    <div className="text-[10px] uppercase font-mono text-slate-400">{seg.meaning}</div>
                    <div className="text-xs text-slate-200">{seg.decodedValue}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 2: Evidence & Grounding Traceability */}
      {activeSubTab === 'evidence' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              Traceable Explainability & Grounding Audit Trail
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Every extracted attribute links back to mathematical evidence, nomenclature deciphering rules, or source document text.
            </p>
          </div>

          {/* Raw Grounding Source */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2 border border-slate-800">
            <div className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
              Source Document / Input Grounding Snippet:
            </div>
            <div className="bg-slate-950 p-3 rounded text-cyan-300 border border-slate-800 leading-relaxed">
              {product.rawInputSnippet || 'Input provided via direct catalog ingestion pipeline.'}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-4">
              <span>Source Type: <strong className="text-slate-200">{product.sourceType}</strong></span>
              <span>Ingested: <strong className="text-slate-200">{new Date(product.createdAt).toLocaleString()}</strong></span>
            </div>
          </div>

          {/* Audit Trail List */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-800 uppercase font-mono">
              Attribute Deduction Reasoning Chains
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(product.specs || []).filter(s => s.evidence).map((spec, eIdx) => (
                <div key={eIdx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{spec.label}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                      {spec.evidence?.evidenceType} ({Math.round((spec.evidence?.confidence || 0) * 100)}%)
                    </span>
                  </div>

                  {spec.evidence?.sourceText && (
                    <div className="text-[11px] text-slate-600 font-mono bg-white p-2 rounded border border-slate-200">
                      <strong>Source match:</strong> "{spec.evidence.sourceText}"
                    </div>
                  )}

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {spec.evidence?.reasoning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Competitor Cross-References */}
      {activeSubTab === 'crossref' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-cyan-600" />
                Interchangeable Competitor Equivalents Matrix
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                AI cross-references interchange databases to identify drop-in functional alternatives for procurement resilience and replacement.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(product.crossReferences || []).map((cross, cIdx) => (
              <div key={cIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-slate-900 text-white font-mono font-bold text-xs">
                    {cross.brand}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold">
                    {cross.compatibilityScore}% Compatible
                  </span>
                </div>

                <div>
                  <div className="font-bold text-slate-900 text-sm font-mono">{cross.mpn}</div>
                  <div className="text-xs text-slate-500 font-mono">{cross.series}</div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {cross.notes}
                </p>

                {cross.keyDeltas && cross.keyDeltas.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase font-mono">Key Delta Considerations:</div>
                    {cross.keyDeltas.map((delta, dIdx) => (
                      <div key={dIdx} className="text-[11px] text-slate-600 flex items-start gap-1">
                        <span className="text-cyan-600">•</span>
                        <span>{delta}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Accessories & Spares */}
      {activeSubTab === 'bom' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-600" />
              Mating Accessories, Brackets & Spares Hierarchy
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Automatically associated accessory parts, seal replacement kits, and mating hardware for turnkey industrial commerce bundles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(product.accessoriesAndSpares || []).map((acc, aIdx) => (
              <div key={aIdx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 font-bold border border-cyan-200">
                    {acc.type}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    acc.compatibilityType === 'Required' ? 'bg-amber-100 text-amber-800 font-bold' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {acc.compatibilityType}
                  </span>
                </div>

                <div className="font-bold text-slate-900 text-xs">
                  {acc.name}
                </div>
                <div className="text-xs font-mono text-slate-500">
                  Part #: {acc.partNumber}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {acc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 5: Commerce Content */}
      {activeSubTab === 'commerce' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase font-mono">
                B2B Engineering Marketing Pitch
              </label>
              <p className="text-xs text-slate-800 bg-slate-50 p-3.5 rounded-lg border border-slate-200 mt-1 leading-relaxed">
                {product.marketingSummary}
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase font-mono">
                Key Industrial Features (Bullet Points)
              </label>
              <div className="mt-1 space-y-1.5">
                {(product.bulletPoints || []).map((bp, bpIdx) => (
                  <div key={bpIdx} className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50/60 p-2.5 rounded border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{bp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase font-mono">
                Target Industrial Applications
              </label>
              <div className="flex flex-wrap gap-2 mt-1">
                {(product.applications || []).map((app, apIdx) => (
                  <span key={apIdx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-mono text-xs border border-slate-200">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grounding Evidence Modal / Drawer */}
      {selectedEvidenceSpec && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  Traceability Evidence: {selectedEvidenceSpec.label}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvidenceSpec(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                <div className="text-slate-500 font-mono text-[11px]">Normalized SI Value:</div>
                <div className="text-cyan-900 font-bold font-mono text-sm">
                  {String(selectedEvidenceSpec.normalizedValue)} {selectedEvidenceSpec.unit}
                  {selectedEvidenceSpec.imperialValue && (
                    <span className="text-slate-500 text-xs font-normal ml-2">
                      ({selectedEvidenceSpec.imperialValue})
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-500 font-mono text-[11px]">Evidence Type & Confidence:</div>
                <div className="font-bold text-emerald-700 font-mono">
                  {selectedEvidenceSpec.evidence?.evidenceType} — {Math.round((selectedEvidenceSpec.evidence?.confidence || 0) * 100)}% Confidence
                </div>
              </div>

              {selectedEvidenceSpec.evidence?.sourceText && (
                <div className="space-y-1">
                  <div className="text-slate-500 font-mono text-[11px]">Source Document Match:</div>
                  <div className="p-2.5 rounded bg-slate-900 text-cyan-300 font-mono">
                    "{selectedEvidenceSpec.evidence.sourceText}"
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <div className="text-slate-500 font-mono text-[11px]">Deduction Reasoning Chain:</div>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded">
                  {selectedEvidenceSpec.evidence?.reasoning}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedEvidenceSpec(null)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow"
            >
              Close Traceability Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
