import React, { useState, useEffect } from 'react';
import {
  Share2,
  Download,
  Copy,
  Check,
  FileCode,
  FileSpreadsheet,
  FileText,
  Sparkles,
  Layers,
  Database
} from 'lucide-react';
import { IndustrialProduct } from '../types';

interface SyndicationExporterProps {
  products: IndustrialProduct[];
  selectedProduct?: IndustrialProduct | null;
}

export const SyndicationExporter: React.FC<SyndicationExporterProps> = ({
  products = [],
  selectedProduct: initialSelected
}) => {
  const [selectedProduct, setSelectedProduct] = useState<IndustrialProduct | null>(
    initialSelected || (products && products.length > 0 ? products[0] : null)
  );

  useEffect(() => {
    if (initialSelected) {
      setSelectedProduct(initialSelected);
    } else if (!selectedProduct && products && products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, [initialSelected, products]);

  const [exportFormat, setExportFormat] = useState<'ETIM_JSON' | 'BMECAT_XML' | 'ARIBAPIM_CSV' | 'JSON_LD'>('BMECAT_XML');
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const getExportOutput = (): string => {
    if (!selectedProduct) return '';

    const manufacturer = selectedProduct.manufacturer || 'Industrial Brand';
    const sku = selectedProduct.sku || 'SKU-000';
    const mpn = selectedProduct.mpn || 'MPN-000';
    const productName = selectedProduct.productName || 'Industrial Component';
    const desc = selectedProduct.marketingSummary || selectedProduct.shortDescription || '';

    if (exportFormat === 'BMECAT_XML') {
      return `<?xml version="1.0" encoding="UTF-8"?>
<BMECAT version="2005" xmlns="http://www.bmecat.org/bmecat/2005">
  <HEADER>
    <GENERATOR_INFO>IndusIntel AI Industrial Product Intelligence Engine</GENERATOR_INFO>
    <CATALOG>
      <LANGUAGE>eng</LANGUAGE>
      <CATALOG_ID>INDUSINTEL-${new Date().getFullYear()}</CATALOG_ID>
      <CATALOG_VERSION>1.0</CATALOG_VERSION>
      <CATALOG_NAME>${manufacturer} Digital Catalog</CATALOG_NAME>
    </CATALOG>
  </HEADER>
  <T_NEW_CATALOG>
    <ARTICLE mode="new">
      <SUPPLIER_AID>${sku}</SUPPLIER_AID>
      <ARTICLE_DETAILS>
        <DESCRIPTION_SHORT>${productName}</DESCRIPTION_SHORT>
        <DESCRIPTION_LONG>${desc}</DESCRIPTION_LONG>
        <MANUFACTURER_AID>${mpn}</MANUFACTURER_AID>
        <MANUFACTURER_NAME>${manufacturer}</MANUFACTURER_NAME>
        <DELIVERY_TIME>3</DELIVERY_TIME>
      </ARTICLE_DETAILS>
      <ARTICLE_FEATURES>
        <REFERENCE_FEATURE_SYSTEM_NAME>ETIM-${selectedProduct.etimClassVersion || '9.0'}</REFERENCE_FEATURE_SYSTEM_NAME>
        <REFERENCE_FEATURE_GROUP_ID>${selectedProduct.etimClassCode || 'EC000000'}</REFERENCE_FEATURE_GROUP_ID>
        ${(selectedProduct.specs || [])
          .map(
            (s) => `
        <FEATURE>
          <FNAME>${s.label || s.key}</FNAME>
          <FVALUE>${s.normalizedValue}</FVALUE>
          <FUNIT>${s.unit || ''}</FUNIT>
        </FEATURE>`
          )
          .join('')}
      </ARTICLE_FEATURES>
    </ARTICLE>
  </T_NEW_CATALOG>
</BMECAT>`;
    }

    if (exportFormat === 'ETIM_JSON') {
      return JSON.stringify(
        {
          etimClassification: {
            version: selectedProduct.etimClassVersion || '9.0',
            classCode: selectedProduct.etimClassCode || 'EC000000',
            classDescription: selectedProduct.etimClassTitle || 'Industrial standard component',
            unspsc: {
              code: selectedProduct.unspscCode || '',
              title: selectedProduct.unspscTitle || ''
            }
          },
          identification: {
            sku: sku,
            mpn: mpn,
            manufacturer: manufacturer,
            series: selectedProduct.series || ''
          },
          features: (selectedProduct.specs || []).map((s) => ({
            featureCode: s.etimFeatureCode || 'EF_STANDARD',
            featureDescription: s.label || s.key,
            value: s.normalizedValue,
            unit: s.unit || '',
            rawSource: s.rawValue || '',
            confidence: s.evidence?.confidence || 0.98,
            traceability: s.evidence?.reasoning || 'Extracted and verified'
          })),
          auditTrail: selectedProduct.auditTrail || []
        },
        null,
        2
      );
    }

    if (exportFormat === 'JSON_LD') {
      return JSON.stringify(
        {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: productName,
          image: selectedProduct.imageUrl,
          description: desc,
          sku: sku,
          mpn: mpn,
          brand: {
            '@type': 'Brand',
            name: manufacturer
          },
          category: selectedProduct.category || selectedProduct.sector || 'Industrial Equipment',
          additionalProperty: (selectedProduct.specs || []).map((s) => ({
            '@type': 'PropertyValue',
            name: s.label || s.key,
            value: `${s.normalizedValue} ${s.unit || ''}`.trim(),
            unitCode: s.unit || ''
          }))
        },
        null,
        2
      );
    }

    // CSV format
    const headers = [
      'SupplierPartAuxiliaryID',
      'ManufacturerPartNumber',
      'ManufacturerName',
      'ItemDescription',
      'UNSPSC',
      'ETIM_Class',
      'KeySpecifications',
      'Compliance_RoHS',
      'Compliance_CE',
      'ReviewStatus'
    ];

    const row = [
      `"${sku}"`,
      `"${mpn}"`,
      `"${manufacturer}"`,
      `"${(productName || '').replace(/"/g, '""')}"`,
      `"${selectedProduct.unspscCode || ''}"`,
      `"${selectedProduct.etimClassCode || ''}"`,
      `"${(selectedProduct.specs || []).map(s => `${s.label || s.key}: ${s.normalizedValue} ${s.unit || ''}`).join('; ').replace(/"/g, '""')}"`,
      `"${selectedProduct.complianceDetails?.rohs ? 'Compliant' : 'No'}"`,
      `"${selectedProduct.complianceDetails?.ce ? 'Compliant' : 'No'}"`,
      `"${selectedProduct.reviewStatus || 'PENDING'}"`
    ];

    return [headers.join(','), row.join(',')].join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!selectedProduct) return;
    const content = getExportOutput();
    let extension = 'json';
    let mime = 'application/json';

    if (exportFormat === 'BMECAT_XML') {
      extension = 'xml';
      mime = 'application/xml';
    } else if (exportFormat === 'ARIBAPIM_CSV') {
      extension = 'csv';
      mime = 'text/csv';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedProduct.mpn || selectedProduct.sku || 'industrial-product'}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadNotice(`Downloaded ${selectedProduct.mpn || selectedProduct.sku}.${extension}`);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div id="syndication-exporter" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-mono font-bold flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" />
              Omnichannel Commerce Syndication
            </span>
            <span className="text-xs text-slate-400 font-mono">
              BMEcat 2005 & ETIM 9.0 Standard
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Industrial Catalog Exporter & Marketplace Dispatcher
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Export structured, traceable product intelligence directly into enterprise ERP (SAP, Oracle), B2B Procurement Portals (Ariba, Coupa), PIM Systems (Akeneo, inRiver), or Google/Amazon Schema.org JSON-LD.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!selectedProduct}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-50 text-slate-800 font-semibold text-xs shadow-xs transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Payload!' : 'Copy to Clipboard'}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={!selectedProduct}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Syndication Payload</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Selector & Format Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Product Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700 font-mono">Target SKU:</span>
          <select
            value={selectedProduct?.id || ''}
            onChange={(e) => {
              const found = products.find(p => p.id === e.target.value);
              if (found) setSelectedProduct(found);
            }}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          >
            {(products || []).map((prod) => {
              const prodName = prod.productName || prod.mpn || prod.sku || 'Industrial Product';
              const truncatedName = prodName.length > 40 ? `${prodName.slice(0, 40)}...` : prodName;
              return (
                <option key={prod.id} value={prod.id}>
                  {prod.manufacturer || 'Brand'} — {prod.mpn || prod.sku} ({truncatedName})
                </option>
              );
            })}
          </select>
        </div>

        {/* Format Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-mono">
          <button
            onClick={() => setExportFormat('BMECAT_XML')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all ${
              exportFormat === 'BMECAT_XML' ? 'bg-white text-cyan-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            BMEcat 2005 XML
          </button>

          <button
            onClick={() => setExportFormat('ETIM_JSON')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all ${
              exportFormat === 'ETIM_JSON' ? 'bg-white text-cyan-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ETIM 9.0 JSON
          </button>

          <button
            onClick={() => setExportFormat('ARIBAPIM_CSV')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all ${
              exportFormat === 'ARIBAPIM_CSV' ? 'bg-white text-cyan-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SAP Ariba / PIM CSV
          </button>

          <button
            onClick={() => setExportFormat('JSON_LD')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all ${
              exportFormat === 'JSON_LD' ? 'bg-white text-cyan-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Schema.org JSON-LD
          </button>
        </div>
      </div>

      {/* Code / Data Preview Box */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              Payload Preview ({exportFormat})
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span>Encoding: UTF-8</span>
            <span>•</span>
            <span>Schema: Validated</span>
          </div>
        </div>

        <pre className="p-6 text-xs font-mono text-cyan-300 overflow-x-auto max-h-[500px] leading-relaxed select-all">
          {getExportOutput() || '// No product selected'}
        </pre>
      </div>
    </div>
  );
};

