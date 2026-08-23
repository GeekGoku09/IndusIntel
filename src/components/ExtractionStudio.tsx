import React, { useState } from 'react';
import {
  Sparkles,
  UploadCloud,
  FileText,
  Camera,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  RefreshCw,
  Eye,
  Sliders,
  Check,
  ShieldCheck,
  Zap,
  Globe,
  Tag,
  BookOpen
} from 'lucide-react';
import { IndustrialProduct, IndustrySector } from '../types';
import { SAMPLE_INPUT_PRESETS } from '../data/sampleCatalogs';

interface ExtractionStudioProps {
  onProductExtracted: (product: IndustrialProduct) => void;
  onViewProduct: (product: IndustrialProduct) => void;
}

export const ExtractionStudio: React.FC<ExtractionStudioProps> = ({
  onProductExtracted,
  onViewProduct
}) => {
  const [inputMode, setInputMode] = useState<'text' | 'image' | 'file'>('text');
  const [rawText, setRawText] = useState<string>(SAMPLE_INPUT_PRESETS[0].rawText);
  const [sectorHint, setSectorHint] = useState<IndustrySector>(SAMPLE_INPUT_PRESETS[0].sector);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string>('image/jpeg');
  const [userNotes, setUserNotes] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [extractedResult, setExtractedResult] = useState<IndustrialProduct | null>(null);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSelectPreset = (index: number) => {
    const preset = SAMPLE_INPUT_PRESETS[index];
    setRawText(preset.rawText);
    setSectorHint(preset.sector);
    setInputMode('text');
    setImagePreview(null);
    setExtractedResult(null);
    setErrorMsg(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageMime(file.type || 'image/jpeg');
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setInputMode('image');
        setExtractedResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runExtractionPipeline = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setPipelineStep(1);

    try {
      // Step simulation ticker for visual explainability
      const stepTimer1 = setTimeout(() => setPipelineStep(2), 600);
      const stepTimer2 = setTimeout(() => setPipelineStep(3), 1200);
      const stepTimer3 = setTimeout(() => setPipelineStep(4), 1800);

      let payload: any = {};
      let endpoint = '/api/extract-enrich';

      if (inputMode === 'image' && imagePreview) {
        endpoint = '/api/vision-extract';
        payload = {
          imageBase64: imagePreview,
          mimeType: imageMime,
          userNotes: userNotes || 'Industrial nameplate / technical diagram'
        };
      } else {
        payload = {
          rawInput: rawText,
          sectorHint: sectorHint,
          sourceType: inputMode === 'file' ? 'PDF_DATASHEET' : 'RAW_TEXT'
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Extraction failed with status ${res.status}`);
      }

      const data = await res.json();
      if (data.product) {
        setExtractedResult(data.product);
        setPipelineStep(5);
        onProductExtracted(data.product);
      } else {
        throw new Error('No product returned from extraction engine');
      }
    } catch (err: any) {
      console.error('Pipeline error:', err);
      setErrorMsg(err.message || 'Failed to complete AI extraction');
      setPipelineStep(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="extraction-studio" className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl border border-slate-700 shadow-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Multi-Modal Ingestion Engine
              </span>
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-semibold">
                ETIM 9.0 / UNSPSC Standardized
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              AI Industrial Product Intelligence Workbench
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl leading-relaxed">
              Transform fragmented text snippets, non-standardized distributor spreadsheets, PDF technical datasheets, or stamped nameplate photos into fully verified, normalized, and commerce-ready product intelligence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => runExtractionPipeline()}
              disabled={isLoading || (!rawText && !imagePreview)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold shadow-lg transition-all text-sm ${
                isLoading || (!rawText && !imagePreview)
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20 active:scale-95'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Processing Pipeline...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Execute Extraction & Enrichment</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pipeline Execution Flow Status */}
        {isLoading && (
          <div className="mt-6 pt-5 border-t border-slate-700/80">
            <div className="text-xs font-mono text-cyan-300 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Pipeline Execution in Progress:
              </span>
              <span>Step {pipelineStep} of 4</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className={`p-2.5 rounded-lg border ${pipelineStep >= 1 ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}>
                1. Nomenclature & OCR Decode
              </div>
              <div className={`p-2.5 rounded-lg border ${pipelineStep >= 2 ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}>
                2. ETIM/UNSPSC Taxonomy Mapping
              </div>
              <div className={`p-2.5 rounded-lg border ${pipelineStep >= 3 ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}>
                3. Unit Normalization & Tolerances
              </div>
              <div className={`p-2.5 rounded-lg border ${pipelineStep >= 4 ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200' : 'bg-slate-800/40 border-slate-700 text-slate-400'}`}>
                4. Validation & Cross-Referencing
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preset Pickers */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <BookOpen className="w-4 h-4 text-cyan-600" />
            <span>Industrial Benchmark Presets (Test Incomplete / Fragmented Inputs):</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">Select to populate raw workbench</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {SAMPLE_INPUT_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(idx)}
              className="text-left p-3 rounded-lg border border-slate-200 hover:border-cyan-500 hover:bg-cyan-50/50 transition-all text-xs group focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              <div className="font-semibold text-slate-900 group-hover:text-cyan-700 truncate">
                {preset.title}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 font-mono flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-400" />
                <span className="truncate">{preset.sector}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Workbench Dual Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Console */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-600" />
                Raw Input Ingestion
              </span>

              {/* Mode Switch */}
              <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs">
                <button
                  onClick={() => setInputMode('text')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    inputMode === 'text' ? 'bg-white text-cyan-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Raw Text / Snippet
                </button>
                <button
                  onClick={() => setInputMode('image')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    inputMode === 'image' ? 'bg-white text-cyan-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Nameplate Photo / OCR
                </button>
              </div>
            </div>

            {/* Sector Hint Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Industry Sector Domain
              </label>
              <select
                value={sectorHint}
                onChange={(e) => setSectorHint(e.target.value as IndustrySector)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none font-medium"
              >
                <option value="Fluid Power & Pneumatics">Fluid Power & Pneumatics</option>
                <option value="Pumps & Fluid Handling">Pumps & Fluid Handling</option>
                <option value="Motors & Automation Drives">Motors & Automation Drives</option>
                <option value="Process Valves & Actuation">Process Valves & Actuation</option>
                <option value="Bearings & Power Transmission">Bearings & Power Transmission</option>
                <option value="Sensors & Industrial IoT">Sensors & Industrial IoT</option>
                <option value="Electrical & Switchgear">Electrical & Switchgear</option>
              </select>
            </div>

            {/* Input Form based on Mode */}
            {inputMode === 'text' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Unstructured / Fragmented Product Spec
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {rawText.length} chars
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste unstandardized catalog text, incomplete distributor spec, or model code (e.g. Parker P1D-S050MS-0100 50mm bore 100mm stroke ISO 15552 10bar G1/4)..."
                  className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            )}

            {inputMode === 'image' && (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Industrial Nameplate / CAD Drawing Upload
                </label>
                
                {imagePreview ? (
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900 group">
                    <img
                      src={imagePreview}
                      alt="Uploaded nameplate"
                      className="w-full h-48 object-contain"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <label className="cursor-pointer px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-md">
                        Change Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors p-4 text-center">
                    <Camera className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-xs font-semibold text-slate-700">
                      Upload Stamped Nameplate or Spec Drawing
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1">
                      PNG, JPG, WebP up to 10MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Optional Engineering Notes (Tag, Application Context)
                  </label>
                  <input
                    type="text"
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="e.g. Pump skid replacement, check ATEX certification"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <div>
                  <strong className="font-semibold">Pipeline Execution Notice:</strong> {errorMsg}
                </div>
              </div>
            )}

            {/* Execute Button */}
            <button
              onClick={() => runExtractionPipeline()}
              disabled={isLoading || (!rawText && !imagePreview)}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-xs shadow transition-all ${
                isLoading || (!rawText && !imagePreview)
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-600/20 active:scale-95'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing Extraction Pipeline...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Enrich to ETIM 9.0 Standard</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Enriched Intelligence Preview */}
        <div className="lg:col-span-7">
          {extractedResult ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
              {/* Product Header */}
              <div className="p-5 bg-gradient-to-r from-slate-50 to-cyan-50/40">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-100 text-cyan-800 font-mono font-bold text-xs">
                      {extractedResult.manufacturer}
                    </span>
                    <span className="text-slate-400 font-mono text-xs">•</span>
                    <span className="font-mono text-xs text-slate-600 font-semibold">
                      MPN: {extractedResult.mpn}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[11px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Confidence: {extractedResult.overallConfidence}%
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-mono text-[11px] font-semibold">
                      Quality: {extractedResult.dataQualityScore}%
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {extractedResult.productName}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {extractedResult.shortDescription}
                </p>

                {/* Taxonomies Pill Strip */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-mono">
                  <div className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">
                    <strong className="text-slate-900">ETIM 9.0:</strong> {extractedResult.etimClassCode} ({extractedResult.etimClassTitle})
                  </div>
                  <div className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">
                    <strong className="text-slate-900">UNSPSC:</strong> {extractedResult.unspscCode}
                  </div>
                </div>
              </div>

              {/* Model Code Nomenclature Breakdown if available */}
              {extractedResult.modelCodeBreakdown && extractedResult.modelCodeBreakdown.length > 0 && (
                <div className="p-4 bg-slate-900 text-white">
                  <div className="text-xs font-mono text-cyan-300 font-semibold mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Deciphered Model Nomenclature Matrix
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    {extractedResult.modelCodeBreakdown.map((seg, sIdx) => (
                      <div key={sIdx} className="bg-slate-800/80 p-2 rounded border border-slate-700">
                        <div className="text-cyan-400 font-bold">{seg.segment}</div>
                        <div className="text-slate-400 text-[10px] uppercase mt-0.5">{seg.meaning}</div>
                        <div className="text-slate-200 text-[11px] truncate mt-1">{seg.decodedValue}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Normalized Specifications Table */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-cyan-600" />
                    Normalized Technical Specifications ({extractedResult.specs?.length || 0})
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Dual Metric / Imperial Normalized
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase font-mono text-[10px]">
                        <th className="pb-2 font-semibold">Specification Attribute</th>
                        <th className="pb-2 font-semibold">Normalized Value (Metric SI)</th>
                        <th className="pb-2 font-semibold">Imperial Conversion</th>
                        <th className="pb-2 font-semibold">Grounding Evidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(extractedResult.specs || []).slice(0, 6).map((spec, spIdx) => (
                        <tr key={spIdx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 font-medium text-slate-900">
                            {spec.label}
                            {spec.isKeyCommerceFilter && (
                              <span className="ml-1.5 px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 text-[10px] font-mono">
                                Filter Key
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 font-mono text-cyan-800 font-bold">
                            {String(spec.normalizedValue)} <span className="text-slate-500 font-normal">{spec.unit}</span>
                          </td>
                          <td className="py-2.5 font-mono text-slate-600">
                            {spec.imperialValue || '—'}
                          </td>
                          <td className="py-2.5 text-[11px]">
                            {spec.evidence ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono text-[10px] border border-emerald-200">
                                <Check className="w-2.5 h-2.5" />
                                {spec.evidence.evidenceType} ({Math.round(spec.evidence.confidence * 100)}%)
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Standards & Certifications */}
              <div className="p-4 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-semibold text-slate-700">Standards & Compliance:</span>
                  {(extractedResult.standardsCertifications || []).map((std, stdIdx) => (
                    <span key={stdIdx} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-mono text-[11px]">
                      {std}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onViewProduct(extractedResult)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs shadow-sm transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Full Intelligence Record</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-12 text-center text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mx-auto text-cyan-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">
                No Extraction Executed Yet
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Select a benchmark preset above or enter custom industrial product parameters on the left console, then click <strong>Execute Extraction & Enrichment</strong> to see structured output.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
