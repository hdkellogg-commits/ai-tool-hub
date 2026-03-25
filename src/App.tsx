/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Terminal, Info, ChevronRight, Zap, Code, Palette, Lightbulb, Search, RefreshCw } from 'lucide-react';
import { TOOLS } from './data';
import { AIDesignTool } from './types';
import { WORKFLOWS } from './workflows';
import { GlowCard } from './components/GlowCard';

export default function App() {
  const [tools, setTools] = useState<AIDesignTool[]>([]);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({
    Coding: '',
    Design: '',
    Inspiration: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [h1, setH1] = useState(255);
  const [h2, setH2] = useState(222);
  const detailsRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('/api/tools');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setTools(data);
      } catch (error) {
        console.error('Error loading tools:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTools();
  }, []);

  const selectedTool = tools.find(t => t.id === selectedToolId);

  useEffect(() => {
    if (selectedToolId && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedToolId]);

  useEffect(() => {
    document.documentElement.style.setProperty('--h1', h1.toString());
    document.documentElement.style.setProperty('--h2', h2.toString());
  }, [h1, h2]);

  const categories = [
    { name: 'Inspiration', icon: <Lightbulb /> },
    { name: 'Design', icon: <Palette /> },
    { name: 'Coding', icon: <Code /> }
  ];

  const handleSearchChange = (category: string, query: string) => {
    setSearchQueries(prev => ({ ...prev, [category]: query }));
  };

  return (
    <div className="min-h-screen selection:bg-white/20">
      {/* Header */}
      <header className="terminal-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="terminal-title"
        >
          AI Knowledge Terminal
        </motion.h1>
        <p className="text-text-dim text-xs font-orbitron tracking-[2px] mt-2 opacity-50 uppercase">
          Select a tool to initialize analysis
        </p>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-10">
        
        {/* Triple Neuromorphic Category Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((cat, idx) => {
            const filteredTools = tools.filter(t => 
              t.category === cat.name && 
              (t.name.toLowerCase().includes(searchQueries[cat.name].toLowerCase()) || 
               t.description.toLowerCase().includes(searchQueries[cat.name].toLowerCase()))
            );

            return (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <GlowCard 
                  customSize 
                  glowColor={idx === 0 ? 'blue' : idx === 1 ? 'purple' : 'green'}
                  className="neu-raised p-2 rounded-3xl group border border-white/5 relative overflow-hidden h-full"
                >
                  <div className="shimmer absolute inset-0 opacity-5 pointer-events-none" />
                  
                  <div className="p-4">
                    <header className="flex items-center gap-2 mb-4 px-2">
                      <div className="p-2 rounded-lg bg-white/5 text-[var(--clr1)]">
                        {cat.icon}
                      </div>
                      <h2 className="font-orbitron text-xs uppercase tracking-widest text-text-main">
                        {cat.name} Tools
                      </h2>
                    </header>

                    <div className="search neu-inset rounded-xl mb-6 flex items-center gap-2 px-4 py-3">
                      <Search className="w-4 h-4 text-text-dim" />
                      <input 
                        type="text" 
                        placeholder={`Search ${cat.name.toLowerCase()}...`} 
                        className="bg-transparent border-none outline-none text-xs text-text-main w-full placeholder:text-text-dim/50"
                        value={searchQueries[cat.name]}
                        onChange={(e) => handleSearchChange(cat.name, e.target.value)}
                      />
                    </div>
                    
                    <section>
                      <ul className="space-y-2">
                        {isLoading ? (
                          [1,2,3].map(i => (
                            <li key={i} className="h-10 rounded-xl bg-white/5 animate-pulse" />
                          ))
                        ) : (
                          filteredTools.map((tool) => (
                            <li 
                              key={tool.id}
                              onClick={() => setSelectedToolId(tool.id)}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 text-sm font-medium neu-btn ${
                                selectedToolId === tool.id 
                                  ? 'selected neu-inset text-white' 
                                  : 'text-text-main/80 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <Zap className={`w-4 h-4 ${selectedToolId === tool.id ? 'text-[var(--clr1)] animate-pulse' : 'text-text-dim'}`} />
                              {tool.name}
                            </li>
                          ))
                        )}
                        {!isLoading && filteredTools.length === 0 && (
                          <li className="opacity-30 italic text-xs text-center py-8">
                            No matching tools
                          </li>
                        )}
                      </ul>
                    </section>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

        {/* Details Section */}
        <AnimatePresence mode="wait">
          {selectedTool && (
            <div ref={detailsRef} className="details-section mb-20">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-linear-to-r from-[var(--clr1)]/50 to-transparent" />
                  <h2 className="font-orbitron text-[var(--clr1)] uppercase tracking-wider text-xl flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    Tool Analysis
                  </h2>
                  <div className="h-px flex-1 bg-linear-to-l from-[var(--clr1)]/50 to-transparent" />
                </div>

                <GlowCard 
                  customSize 
                  glowColor="blue"
                  className="neu-raised p-8 rounded-3xl relative overflow-hidden group border border-white/5"
                >
                  <span className="shine shine-top"></span>
                  <span className="shine shine-bottom"></span>
                  <span className="glow glow-top opacity-5"></span>
                  <span className="glow glow-bottom opacity-5"></span>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                      <div className="flex items-center gap-6">
                        {selectedTool.url && (
                          <div className="w-20 h-20 rounded-2xl neu-inset p-3 flex items-center justify-center overflow-hidden shrink-0">
                            <img 
                              src={`https://logo.clearbit.com/${new URL(selectedTool.url).hostname}`}
                              alt={`${selectedTool.name} logo`}
                              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=${new URL(selectedTool.url!).hostname}&sz=128`;
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-orbitron text-[0.7rem] text-[var(--clr2)] font-bold tracking-widest uppercase">
                              REF: "{selectedTool.id.toUpperCase()}"
                            </span>
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <span className="font-orbitron text-[0.7rem] text-[var(--clr1)]/60 font-bold tracking-widest uppercase">
                              TYPE: {selectedTool.category}
                            </span>
                          </div>
                          <h3 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                            {selectedTool.name}
                            {selectedTool.url && (
                              <a 
                                href={selectedTool.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[var(--clr1)] hover:text-[var(--clr2)] transition-colors"
                              >
                                <ExternalLink className="w-6 h-6" />
                              </a>
                            )}
                          </h3>
                        </div>
                      </div>
                      
                      {selectedTool.url && (
                        <a
                          href={selectedTool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neu-btn px-8 py-4 bg-[var(--clr1)] text-black font-orbitron text-sm font-bold rounded-xl hover:bg-white transition-all shadow-[0_8px_20px_hsla(var(--h1),100%,50%,0.3)] flex items-center gap-2 group/btn"
                        >
                          INITIALIZE LINK
                          <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </a>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-[var(--clr1)]">
                          <Info className="w-4 h-4" />
                          <h4 className="font-orbitron text-xs uppercase tracking-widest">Description</h4>
                        </div>
                        <p className="text-text-main text-lg leading-relaxed border-l-2 border-[var(--clr1)]/20 pl-6">
                          {selectedTool.description || "No description provided for this tool."}
                        </p>
                        {selectedTool.longDescription && (
                          <div className="mt-4 text-text-dim text-sm leading-relaxed pl-6 border-l-2 border-white/5">
                            {selectedTool.longDescription}
                          </div>
                        )}
                      </div>

                      {selectedTool.bestFor && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 text-[var(--clr2)]">
                            <Zap className="w-4 h-4" />
                            <h4 className="font-orbitron text-xs uppercase tracking-widest">Optimal Use Case</h4>
                          </div>
                          <div className="neu-inset p-6 rounded-2xl italic text-text-dim text-lg relative">
                            <span className="absolute -top-3 -left-2 text-4xl text-[var(--clr2)]/20 font-serif">"</span>
                            {selectedTool.bestFor}
                            <span className="absolute -bottom-8 -right-2 text-4xl text-[var(--clr2)]/20 font-serif">"</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Redefined Workflows Section */}
        <section ref={workflowRef} className="mt-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-linear-to-r from-[var(--clr2)]/50 to-transparent" />
            <h2 className="font-orbitron text-[var(--clr2)] uppercase tracking-wider text-2xl flex items-center gap-3">
              <RefreshCw className="w-6 h-6" />
              Redefined Workflows
            </h2>
            <div className="h-px flex-1 bg-linear-to-l from-[var(--clr2)]/50 to-transparent" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            {WORKFLOWS.map((workflow, wIdx) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: wIdx * 0.2 }}
                className="relative"
              >
                <GlowCard
                  customSize
                  glowColor={wIdx === 0 ? 'orange' : 'purple'}
                  className="neu-raised p-8 rounded-3xl flex flex-col gap-8 relative group border border-white/5 h-full"
                >
                  <div className="shimmer absolute inset-0 opacity-10 pointer-events-none" />

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-orbitron tracking-tight">
                      {workflow.title}
                    </h3>
                    <p className="text-text-dim text-sm">
                      {workflow.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-6 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[15px] top-4 bottom-4 w-px bg-linear-to-b from-[var(--clr1)]/50 via-[var(--clr2)]/50 to-[var(--clr1)]/50" />

                    {workflow.steps.map((step, sIdx) => {
                      const tool = tools.find(t => t.id === step.toolId);
                      return (
                        <div key={sIdx} className="flex gap-6 relative group/step">
                          <div className="relative z-10">
                            <div className="w-8 h-8 rounded-full bg-bg-dark border border-white/10 flex items-center justify-center text-[10px] font-bold text-white shadow-[4px_4px_8px_rgba(0,0,0,0.5),-2px_-2px_6px_rgba(255,255,255,0.05)] group-hover/step:border-[var(--clr1)] transition-all">
                              {sIdx + 1}
                            </div>
                          </div>
                          <div 
                            className="flex-1 neu-btn neu-inset p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5"
                            onClick={() => setSelectedToolId(step.toolId)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-orbitron font-bold text-accent-blue uppercase tracking-widest">
                                {tool?.name || 'Unknown Tool'}
                              </span>
                              <ChevronRight className="w-3 h-3 text-text-dim opacity-0 group-hover/step:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-sm text-text-main/80">
                              {step.action}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </section>

        {!selectedTool && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-text-dim font-orbitron text-[0.6rem] tracking-[4px] uppercase opacity-40">
              Waiting for tool selection...
            </p>
          </motion.div>
        )}

      </main>

      <div className="text-center py-20 text-text-dim font-orbitron text-[0.7rem] tracking-[2px] opacity-30">
        &mdash; AI WORKFLOW TERMINAL v1.0 &mdash;
      </div>
    </div>
  );
}
