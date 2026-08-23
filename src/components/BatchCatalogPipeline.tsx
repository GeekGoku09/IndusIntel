import React, { useState, useEffect } from 'react';
import {
  Layers,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Cpu,
  Download,
  Share2,
  FileSpreadsheet,
  Zap,
  Sparkles
} from 'lucide-react';
import { IndustrialProduct } from '../types';

interface BatchCatalogPipelineProps {
  products: IndustrialProduct[];
  onBatchCompleted?: (newProducts: IndustrialProduct[]) => void;
}

interface BatchJobLog {
  id: string;
  timestamp: string;
  sku: string;
  brand: string;
  status: 'SUCCESS' | 'CONFLICT' | 'ENRICHED';
  durationMs: number;
  etimCode: string;
  attributesCount: number;
}

export const BatchCatalogPipeline: React.FC<BatchCatalogPipelineProps> = ({
  products,
  onBatchCompleted
}) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [batchTarget, setBatchTarget] = useState<number>(250);
  const [processedCount, setProcessedCount] = useState<number>(142);
  const [autoApprovedCount, setAutoApprovedCount] = useState<number>(135);
  const [conflictCount, setConflictCount] = useState<number>(7);
  const [totalAttributesEnriched, setTotalAttributesEnriched] = useState<number>(1420);
  const [logs, setLogs] = useState<BatchJobLog[]>([
    {
      id: 'log-01',
      timestamp: '14:02:11',
      sku: 'PKR-P1D-050-0100',
      brand: 'Parker Hannifin',
      status: 'ENRICHED',
      durationMs: 142,
      etimCode: 'EC011283',
      attributesCount: 14
    },
    {
      id: 'log-02',
      timestamp: '14:02:13',
      sku: 'GDF-CR3-15-A',
      brand: 'Grundfos',
      status: 'ENRICHED',
      durationMs: 168,
      etimCode: 'EC010051',
      attributesCount: 12
    },
    {
      id: 'log-03',
      timestamp: '14:02:15',
      sku: 'FLG-HPBV-200-NBR',
      brand: 'FlowGuard',
      status: 'CONFLICT',
      durationMs: 195,
      etimCode: 'EC010150',
      attributesCount: 9
    }
  ]);

  // Streaming runner simulation
  useEffect(() => {
    let interval: any = null;
    if (isRunning && processedCount < batchTarget) {
      interval = setInterval(() => {
        setProcessedCount(prev => {
          const next = prev + 1;
          const isConflict = Math.random() < 0.05;
          const brandList = ['Parker', 'Siemens', 'Grundfos', 'Festo', 'SKF', 'Endress+Hauser', 'ABB', 'SMC'];
          const randomBrand = brandList[Math.floor(Math.random() * brandList.length)];
          const randomSku = `IND-${randomBrand.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

          if (isConflict) {
            setConflictCount(c => c + 1);
          } else {
            setAutoApprovedCount(a => a + 1);
          }
          setTotalAttributesEnriched(t => t + Math.floor(8 + Math.random() * 8));

            const uniqueLogId = `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${next}`;
            setLogs(currentLogs => [
              {
                id: uniqueLogId,
                timestamp: new Date().toLocaleTimeString(),
                sku: randomSku,
                brand: randomBrand,
                status: isConflict ? 'CONFLICT' : 'ENRICHED',
                durationMs: Math.floor(110 + Math.random() * 90),
                etimCode: `EC00${Math.floor(1000 + Math.random() * 8999)}`,
                attributesCount: Math.floor(8 + Math.random() * 8)
              },
              ...currentLogs.slice(0, 40)
            ]);

          if (next >= batchTarget) {
            setIsRunning(false);
          }
          return next;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isRunning, processedCount, batchTarget]);

  const progressPercentage = Math.min(100, Math.round((processedCount / batchTarget) * 100));

  return (
    <div id="batch-catalog-pipeline" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                High-Throughput Transformation Engine
              </span>
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
                Async Parallel Worker Pools
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Industrial Catalog Batch Ingestion & Normalization
            </h2>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl leading-relaxed">
              Scale automation across hundreds or thousands of supplier SKU records. Standardizes inconsistent nomenclature, calculates SI conversions, and validates physical constraints at high speed.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20 active:scale-95'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Pipeline</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start Batch Pipeline</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setProcessedCount(0);
                setAutoApprovedCount(0);
                setConflictCount(0);
                setTotalAttributesEnriched(0);
              }}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              title="Reset Run"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Batch Execution Progress: {processedCount} / {batchTarget} SKUs ({progressPercentage}%)
            </span>
            <span className="text-cyan-300 font-bold">
              Throughput: ~6.2 SKUs/sec
            </span>
          </div>

          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* KPI Metric Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-mono">Total Processed SKUs</div>
          <div className="text-2xl font-bold font-mono text-slate-900">{processedCount}</div>
          <div className="text-[11px] text-slate-400 font-mono">Catalog Target: {batchTarget}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-mono">Auto-Approved (&gt;90% Conf)</div>
          <div className="text-2xl font-bold font-mono text-emerald-600">{autoApprovedCount}</div>
          <div className="text-[11px] text-emerald-600 font-mono font-semibold">
            {Math.round((autoApprovedCount / (processedCount || 1)) * 100)}% Auto-Resolution Rate
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-mono">Flagged for HITL Review</div>
          <div className="text-2xl font-bold font-mono text-amber-600">{conflictCount}</div>
          <div className="text-[11px] text-amber-600 font-mono">Physical conflict exceptions</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-mono">Attributes Standardized</div>
          <div className="text-2xl font-bold font-mono text-cyan-600">{totalAttributesEnriched}</div>
          <div className="text-[11px] text-slate-400 font-mono">ETIM 9.0 compliant keys</div>
        </div>
      </div>

      {/* Live Ingestion Event Stream Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-2">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-800 uppercase font-mono flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-600" />
            Live Worker Stream Events Log
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Real-time async ledger</span>
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-500 uppercase text-[10px]">
                <th className="p-3">Time</th>
                <th className="p-3">Target SKU</th>
                <th className="p-3">Manufacturer</th>
                <th className="p-3">ETIM Class</th>
                <th className="p-3">Attributes</th>
                <th className="p-3">Latency</th>
                <th className="p-3 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log, idx) => (
                <tr key={`${log.id || 'log'}-${idx}`} className="hover:bg-slate-50/80 transition-colors text-[11px]">
                  <td className="p-3 text-slate-400">{log.timestamp}</td>
                  <td className="p-3 font-bold text-slate-900">{log.sku}</td>
                  <td className="p-3 text-slate-700">{log.brand}</td>
                  <td className="p-3 text-cyan-700 font-bold">{log.etimCode}</td>
                  <td className="p-3 text-slate-600">{log.attributesCount} specs</td>
                  <td className="p-3 text-slate-500">{log.durationMs}ms</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      log.status === 'ENRICHED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
