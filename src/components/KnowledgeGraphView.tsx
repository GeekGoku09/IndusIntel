import React, { useState } from 'react';
import {
  GitPullRequest,
  Layers,
  Network,
  Share2,
  Box,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { IndustrialProduct } from '../types';

interface KnowledgeGraphViewProps {
  products: IndustrialProduct[];
  onSelectProduct: (product: IndustrialProduct) => void;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({
  products,
  onSelectProduct
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    type: 'STANDARD' | 'ETIM_CLASS' | 'BRAND' | 'PRODUCT' | 'ACCESSORY';
    label: string;
    description: string;
    connections: string[];
  } | null>({
    id: 'iso-15552',
    type: 'STANDARD',
    label: 'ISO 15552:2018 Standard',
    description: 'International standard for pneumatic fluid power cylinders with detachable mountings (50mm, 63mm, 80mm, 100mm bores).',
    connections: ['Parker P1D Cylinder', 'Festo DSBC Equivalent', 'SMC CP96 Equivalent', 'P8S Proximity Sensor', 'Foot Bracket MNT']
  });

  const nodes = [
    {
      id: 'iso-15552',
      type: 'STANDARD' as const,
      label: 'ISO 15552 / DIN ISO 6431',
      category: 'Standards & Geometries',
      description: 'Defines interchange dimensions for pneumatic profile cylinders worldwide.',
      connections: ['Parker Hannifin', 'Festo', 'SMC Pneumatics', 'P1D Series', 'DSBC Series']
    },
    {
      id: 'etim-ec011283',
      type: 'ETIM_CLASS' as const,
      label: 'ETIM EC011283',
      category: 'Taxonomy Class',
      description: 'Pneumatic cylinder with profile tube and sensor slots.',
      connections: ['ISO 15552', 'Parker P1D', 'Festo DSBC', 'SMC CP96']
    },
    {
      id: 'etim-ec010051',
      type: 'ETIM_CLASS' as const,
      label: 'ETIM EC010051',
      category: 'Taxonomy Class',
      description: 'Multistage centrifugal pump for industrial water and chemical handling.',
      connections: ['Grundfos CR', 'Wilo Helix V', 'KSB Movitec', 'IE3 Motor Standard']
    },
    {
      id: 'brand-parker',
      type: 'BRAND' as const,
      label: 'Parker Hannifin',
      category: 'Manufacturer',
      description: 'Global manufacturer in motion and control technologies.',
      connections: ['P1D-S050MS-0100', 'P8S Magnetic Sensors', 'ISO 15552']
    },
    {
      id: 'brand-grundfos',
      type: 'BRAND' as const,
      label: 'Grundfos',
      category: 'Manufacturer',
      description: 'Leading global water and industrial pump technology provider.',
      connections: ['CR 3-15 Pump', 'HQQE Cartridge Seal', 'IE3 Standard']
    },
    {
      id: 'brand-siemens',
      type: 'BRAND' as const,
      label: 'Siemens AG',
      category: 'Manufacturer',
      description: 'Industrial automation, drive systems, and motion controllers.',
      connections: ['SINAMICS G120C', 'PROFINET IO', 'Safe Torque Off (STO)']
    },
    {
      id: 'std-atex',
      type: 'STANDARD' as const,
      label: 'ATEX Directive 2014/34/EU',
      category: 'Safety & Explosion Proof',
      description: 'Equipment for potentially explosive atmospheres (Zone 1, 2, 21, 22).',
      connections: ['Endress+Hauser Promag 10P', 'High Pressure Ball Valve', 'Parker ATEX Option']
    }
  ];

  return (
    <div id="knowledge-graph-view" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-mono font-bold flex items-center gap-1">
              <Network className="w-3.5 h-3.5" />
              Industrial Knowledge Graph
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Interchange & Standards Ontologies
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Cross-Brand Ontology, Taxonomy & Mating Parts Graph
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Visualize relationships between international engineering standards (ISO, DIN, IEC, ATEX), ETIM classes, manufacturer brands, interchangeable parts, and accessories.
          </p>
        </div>
      </div>

      {/* Graph Visualizer + Details Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Node Canvas */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl relative min-h-[480px] flex flex-col justify-between overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

          {/* Top Controls */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Active Ontology Nodes: <strong>{nodes.length}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                Click any node to inspect ontology relationships
              </span>
            </div>
          </div>

          {/* Simulated Graph Layout Cluster */}
          <div className="relative z-10 my-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-900/40 ring-2 ring-cyan-500'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                      node.type === 'STANDARD' ? 'bg-indigo-500/20 text-indigo-300' :
                      node.type === 'ETIM_CLASS' ? 'bg-cyan-500/20 text-cyan-300' :
                      'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {node.type}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {node.connections.length} links
                    </span>
                  </div>

                  <div className="font-bold text-xs tracking-tight text-white mb-1">
                    {node.label}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-2">
                    {node.description}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Graph Legend */}
          <div className="relative z-10 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
              <span>Engineering Standards</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span>ETIM 9.0 Class</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>Manufacturer Brand</span>
            </span>
          </div>
        </div>

        {/* Right: Selected Node Knowledge Inspector */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-bold uppercase">
                  {selectedNode.type} NODE
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {selectedNode.label}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800 uppercase font-mono">
                  Linked Entity Relationships ({(selectedNode.connections || []).length})
                </div>
                <div className="space-y-1.5">
                  {(selectedNode.connections || []).map((conn, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono flex items-center justify-between"
                    >
                      <span>{conn}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-600" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="text-[11px] text-slate-500 font-mono leading-relaxed">
                  💡 <strong>Commerce Impact:</strong> Connecting standards and drop-in equivalents allows automated cross-selling, substitute recommendations when items are backordered, and multi-distributor quote normalization.
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a node to inspect its ontology graph connections
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
