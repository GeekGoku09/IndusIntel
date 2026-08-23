import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareCode,
  Send,
  Sparkles,
  Bot,
  User,
  X,
  Copy,
  Check,
  RefreshCw,
  Cpu,
  Layers,
  HelpCircle
} from 'lucide-react';
import { IndustrialProduct } from '../types';

interface EngineeringCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProductContext?: IndustrialProduct | null;
  catalogCount: number;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const EngineeringCopilotModal: React.FC<EngineeringCopilotModalProps> = ({
  isOpen,
  onClose,
  activeProductContext,
  catalogCount
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Hello! I am your **IndusIntel Engineering Copilot**. I specialize in industrial taxonomies (ETIM 9.0, UNSPSC), component substitution, retrofit engineering, and technical RFQ generation.\n\n${
        activeProductContext
          ? `I have loaded context for **${activeProductContext.manufacturer} — ${activeProductContext.mpn}** (${activeProductContext.productName}). How can I assist with this part?`
          : `I have access to your active catalog with **${catalogCount} industrial SKUs**. Ask me for interchange equivalents, ETIM mapping, or spec validation!`
      }`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/copilot-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          activeProductContext: activeProductContext || null,
          catalogSummary: { totalSkus: catalogCount }
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const aiReply = data.reply || 'Analysis completed.';

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: aiReply,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ Error reaching engineering agent: ${err.message}. Please verify server connection.`,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const starterPrompts = [
    activeProductContext
      ? `Compare ${activeProductContext.mpn} with Festo/SMC equivalents and highlight key deltas`
      : 'Find drop-in pneumatic cylinder equivalents conforming to ISO 15552',
    'What are the mandatory ETIM 9.0 features for frequency inverters?',
    'Validate whether an NBR seal can withstand 180°C continuous steam application',
    'Generate an engineering RFQ specification package'
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col h-[680px] max-h-[90vh] overflow-hidden text-slate-100 animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
              <MessageSquareCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                Engineering AI Copilot
                <span className="px-2 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
                  Gemini 3.7 Industrial
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {activeProductContext
                  ? `Active SKU: ${activeProductContext.manufacturer} ${activeProductContext.mpn}`
                  : `Master Catalog: ${catalogCount} items loaded`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-6 h-6 rounded-md bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-xl max-w-[85%] space-y-2 relative group leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-cyan-600 text-white rounded-tr-none'
                    : 'bg-slate-800/90 border border-slate-700 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>{m.timestamp}</span>
                  {m.role === 'assistant' && (
                    <button
                      onClick={() => handleCopy(m.content, m.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:text-slate-200"
                    >
                      {copiedId === m.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>Copy</span>
                    </button>
                  )}
                </div>
              </div>

              {m.role === 'user' && (
                <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-6 h-6 rounded-md bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl rounded-tl-none text-xs text-slate-400 font-mono flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Reasoning with industrial engineering ontology...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Prompts */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex flex-wrap gap-1.5">
          {starterPrompts.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] font-mono text-cyan-300 hover:text-cyan-200 bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700/80 transition-colors text-left truncate max-w-xs"
            >
              ⚡ {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask technical question, substitution analysis, or ETIM feature inquiry..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim() || isLoading}
            className={`p-2.5 rounded-xl text-white font-bold transition-all shadow-md ${
              !inputVal.trim() || isLoading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
