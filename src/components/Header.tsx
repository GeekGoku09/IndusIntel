import React, { useMemo } from 'react';
import {
  Cpu,
  Layers,
  CheckCircle2,
  GitPullRequest,
  Database,
  Share2,
  MessageSquareCode,
  Sparkles,
  Search,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { IndustrialProduct } from '../types';

interface HeaderProps {
  activeTab: 'extract' | 'catalog' | 'hitl' | 'batch' | 'graph' | 'export';
  setActiveTab: (tab: 'extract' | 'catalog' | 'hitl' | 'batch' | 'graph' | 'export') => void;
  products: IndustrialProduct[];
  onOpenCopilot: () => void;
  isAiProcessing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  products = [],
  onOpenCopilot,
  isAiProcessing = false
}) => {
  // Performance optimization: Single O(N) pass to calculate summary metrics
  // instead of running multiple .filter() and .reduce() array iterations on every render.
  const { totalProducts, autoApproved, flaggedConflicts, avgCompleteness } = useMemo(() => {
    const safeProducts = products || [];
    const total = safeProducts.length;
    let auto = 0;
    let flagged = 0;
    let completenessSum = 0;

    for (const p of safeProducts) {
      if (p.reviewStatus === 'AUTO_APPROVED' || p.reviewStatus === 'VERIFIED_READY') {
        auto++;
      } else if (p.reviewStatus === 'FLAGGED_CONFLICT') {
        flagged++;
      }
      completenessSum += p.completenessScore || 0;
    }

    const avg = total > 0 ? Math.round(completenessSum / total) : 0;
    return {
      totalProducts: total,
      autoApproved: auto,
      flaggedConflicts: flagged,
      avgCompleteness: avg
    };
  }, [products]);

  return (
    <header id="app-header" className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-lg">
      {/* Top Banner / Ticker */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ETIM 9.0 & UNSPSC Engine: Active
          </span>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Gemini 3.7 Industrial Reasoning Engine
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span>Catalog: <strong className="text-slate-200">{totalProducts} SKUs</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Avg Quality: <strong className="text-emerald-400">{avgCompleteness}%</strong></span>
          </div>
          {flaggedConflicts > 0 && (
            <div className="flex items-center gap-1.5 text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/50">
              <AlertTriangle className="w-3 h-3" />
              <span>{flaggedConflicts} Conflicts Flagged</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-900/30 border border-cyan-400/30">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                IndusIntel
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono font-medium">
                  B2B AI
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Product Intelligence & Standardized Taxonomy Pipeline for Industrial Commerce
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-slate-950/60 p-1 rounded-xl border border-slate-800 overflow-x-auto text-xs sm:text-sm">
          <button
            id="nav-tab-extract"
            onClick={() => setActiveTab('extract')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'extract'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Extraction Studio</span>
          </button>

          <button
            id="nav-tab-catalog"
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Product Intelligence</span>
            <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[11px] font-mono">
              {totalProducts}
            </span>
          </button>

          <button
            id="nav-tab-hitl"
            onClick={() => setActiveTab('hitl')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'hitl'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>HITL Review Queue</span>
            {flaggedConflicts > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono">
                {flaggedConflicts}
              </span>
            )}
          </button>

          <button
            id="nav-tab-batch"
            onClick={() => setActiveTab('batch')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'batch'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Batch Pipeline</span>
          </button>

          <button
            id="nav-tab-graph"
            onClick={() => setActiveTab('graph')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'graph'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <GitPullRequest className="w-4 h-4" />
            <span>Knowledge Graph</span>
          </button>

          <button
            id="nav-tab-export"
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'export'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Syndicate & Export</span>
          </button>
        </nav>

        {/* Right CTA: Copilot */}
        <button
          id="btn-open-copilot"
          onClick={onOpenCopilot}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold shadow-md shadow-indigo-950/50 transition-all border border-indigo-400/30"
        >
          <MessageSquareCode className="w-4 h-4 text-cyan-200" />
          <span className="hidden sm:inline">Engineering Copilot</span>
          <span className="sm:hidden">Copilot</span>
        </button>
      </div>
    </header>
  );
};
