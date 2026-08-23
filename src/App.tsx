import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExtractionStudio } from './components/ExtractionStudio';
import { CatalogList } from './components/CatalogList';
import { ProductDetailView } from './components/ProductDetailView';
import { HITLReviewQueue } from './components/HITLReviewQueue';
import { BatchCatalogPipeline } from './components/BatchCatalogPipeline';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { SyndicationExporter } from './components/SyndicationExporter';
import { EngineeringCopilotModal } from './components/EngineeringCopilotModal';
import { SAMPLE_INDUSTRIAL_PRODUCTS } from './data/sampleCatalogs';
import { IndustrialProduct, ReviewStatus } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'extract' | 'catalog' | 'hitl' | 'batch' | 'graph' | 'export'>('extract');
  const [products, setProducts] = useState<IndustrialProduct[]>(SAMPLE_INDUSTRIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<IndustrialProduct | null>(null);

  // Copilot modal state
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [copilotContextProduct, setCopilotContextProduct] = useState<IndustrialProduct | null>(null);

  // Handlers
  const handleProductExtracted = (newProduct: IndustrialProduct) => {
    setProducts((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === newProduct.id || p.mpn === newProduct.mpn);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = newProduct;
        return updated;
      }
      return [newProduct, ...prev];
    });
  };

  const handleUpdateProduct = (updated: IndustrialProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProduct && selectedProduct.id === updated.id) {
      setSelectedProduct(updated);
    }
  };

  const handleUpdateProductStatus = (productId: string, newStatus: ReviewStatus) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, reviewStatus: newStatus } : p))
    );
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => (prev ? { ...prev, reviewStatus: newStatus } : null));
    }
  };

  const handleBulkApprove = (productIds: string[]) => {
    setProducts((prev) =>
      prev.map((p) =>
        productIds.includes(p.id) ? { ...p, reviewStatus: 'VERIFIED_READY' } : p
      )
    );
  };

  const handleOpenCopilot = (contextProd?: IndustrialProduct | null) => {
    setCopilotContextProduct(contextProd || null);
    setIsCopilotOpen(true);
  };

  const handleOpenSyndication = (prod: IndustrialProduct) => {
    setSelectedProduct(prod);
    setActiveTab('export');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        products={products}
        onOpenCopilot={() => handleOpenCopilot(selectedProduct)}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Tab 1: Extraction Studio */}
        {activeTab === 'extract' && (
          <ExtractionStudio
            onProductExtracted={handleProductExtracted}
            onViewProduct={(product) => {
              setSelectedProduct(product);
              setActiveTab('catalog');
            }}
          />
        )}

        {/* Tab 2: Master Catalog Repository & Product Detail Inspector */}
        {activeTab === 'catalog' && (
          selectedProduct ? (
            <ProductDetailView
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
              onUpdateProduct={handleUpdateProduct}
              onOpenSyndication={handleOpenSyndication}
              onOpenCopilotWithContext={(prod) => handleOpenCopilot(prod)}
            />
          ) : (
            <CatalogList
              products={products}
              onSelectProduct={(prod) => setSelectedProduct(prod)}
              onNewExtraction={() => setActiveTab('extract')}
            />
          )
        )}

        {/* Tab 3: HITL Review & Staging Queue */}
        {activeTab === 'hitl' && (
          <HITLReviewQueue
            products={products}
            onSelectProduct={(prod) => {
              setSelectedProduct(prod);
              setActiveTab('catalog');
            }}
            onUpdateProductStatus={handleUpdateProductStatus}
            onBulkApprove={handleBulkApprove}
          />
        )}

        {/* Tab 4: Batch Catalog Scalability Pipeline */}
        {activeTab === 'batch' && (
          <BatchCatalogPipeline products={products} />
        )}

        {/* Tab 5: Industrial Knowledge Graph & Standards Ontologies */}
        {activeTab === 'graph' && (
          <KnowledgeGraphView
            products={products}
            onSelectProduct={(prod) => {
              setSelectedProduct(prod);
              setActiveTab('catalog');
            }}
          />
        )}

        {/* Tab 6: Omnichannel Commerce Syndication (BMEcat / ETIM / CSV) */}
        {activeTab === 'export' && (
          <SyndicationExporter
            products={products}
            selectedProduct={selectedProduct}
          />
        )}
      </main>

      {/* Engineering Copilot Assistant Modal */}
      <EngineeringCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        activeProductContext={copilotContextProduct}
        catalogCount={products.length}
      />
    </div>
  );
}
