"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Monitor, Cpu, Clock, Globe, HelpCircle, Briefcase, Code, Mail, Terminal as TerminalIcon, X, ChevronRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";
import Terminal from "./Terminal";

type Tab = "home" | "experience" | "projects" | "contact" | "help";

export default function TUIContainer() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  const toggleTerminal = useCallback(() => setIsTerminalOpen(prev => !prev), []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F1") { e.preventDefault(); setActiveTab("help"); }
      if (e.key === "F2") { e.preventDefault(); setActiveTab("experience"); }
      if (e.key === "F3") { e.preventDefault(); setActiveTab("projects"); }
      if (e.key === "F4") { e.preventDefault(); setActiveTab("contact"); }
      if (e.key === "Escape") { e.preventDefault(); toggleTerminal(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleTerminal]);

  const renderContent = () => {
    switch (activeTab) {
      case "home": return <div className="p-4 sm:p-8"><Hero /></div>;
      case "experience": return <Experience />;
      case "projects": return <Projects />;
      case "contact": return <Contact />;
      case "help": return (
        <div className="p-8 font-mono space-y-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-mauve flex items-center gap-3">
            <HelpCircle size={32} /> ARUN_OS_HELP
          </h2>
          <div className="bg-surface0 border-2 border-surface1 p-6 space-y-4">
            <p className="text-subtext1 leading-relaxed">
              Welcome to the advanced terminal interface for Arun Venkataramanan&apos;s portfolio. 
              Navigate using the sidebar or use the system shortcuts below.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <HelpItem shortcut="F1" action="System Help" color="text-mauve" />
              <HelpItem shortcut="F2" action="Experience.json" color="text-blue" />
              <HelpItem shortcut="F3" action="AI_Projects.py" color="text-green" />
              <HelpItem shortcut="F4" action="Contact.sh" color="text-peach" />
              <HelpItem shortcut="ESC" action="Toggle Terminal" color="text-red" />
            </div>
          </div>
          <div className="text-[10px] text-overlay0 font-mono italic">
            v1.0.0-stable build: 2026-04-11
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1e1e2e] text-[#cdd6f4] flex flex-col overflow-hidden font-mono selection:bg-[#b4befe] selection:text-[#1e1e2e]">
      {/* Header Status Bar */}
      <header className="h-8 bg-[#cba6f7] text-[#1e1e2e] flex items-center justify-between px-4 text-xs font-bold shrink-0 z-50 border-b border-[#313244]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Monitor size={14} />
            <span>ARUN_OS v1.0.0</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 opacity-80 border-l border-[#1e1e2e]/20 pl-4">
            <Cpu size={14} />
            <span>GEN-AI / INTEGRATIONS</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 opacity-80">
            <Globe size={14} />
            <span>IST (UTC+5:30)</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{time.toLocaleTimeString()}</span>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-[#313244] flex flex-col bg-[#1e1e2e] shrink-0 hidden md:flex">
          <div className="p-4 border-b border-[#313244] text-[10px] text-[#a6adc8] uppercase tracking-[0.2em] font-bold bg-[#313244]/30">
            File Browser
          </div>
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto scrollbar-thin scrollbar-thumb-[#45475a]">
            <NavItem active={activeTab === "home"} icon={<FileText size={16} />} label="home.md" onClick={() => setActiveTab("home")} />
            
            <div className="mt-4 mb-2 px-3 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#89b4fa]" />
              <span className="text-[10px] text-[#7f849c] uppercase tracking-widest font-bold">Work</span>
            </div>
            <NavItem active={activeTab === "experience"} icon={<Briefcase size={16} />} label="experience.json" onClick={() => setActiveTab("experience")} />
            
            <div className="mt-4 mb-2 px-3 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#a6e3a1]" />
              <span className="text-[10px] text-[#7f849c] uppercase tracking-widest font-bold">Projects</span>
            </div>
            <NavItem active={activeTab === "projects"} icon={<Code size={16} />} label="ai_projects.py" onClick={() => setActiveTab("projects")} />
            
            <div className="mt-4 mb-2 px-3 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#fab387]" />
              <span className="text-[10px] text-[#7f849c] uppercase tracking-widest font-bold">System</span>
            </div>
            <NavItem active={activeTab === "contact"} icon={<Mail size={16} />} label="contact.sh" onClick={() => setActiveTab("contact")} />
            <NavItem active={activeTab === "help"} icon={<HelpCircle size={16} />} label="help_man.txt" onClick={() => setActiveTab("help")} />
          </nav>
          <div className="p-4 bg-[#313244]/20 text-[10px] text-[#a6adc8] border-t border-[#313244] font-mono leading-relaxed">
            <p className="flex justify-between"><span>CPU</span> <span className="text-[#a6e3a1]">8.4%</span></p>
            <p className="flex justify-between"><span>MEM</span> <span className="text-[#89b4fa]">2.1 GB</span></p>
            <p className="flex justify-between"><span>UP</span> <span className="text-[#cba6f7]">14d 2h</span></p>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 flex flex-col bg-[#1e1e2e] relative overflow-hidden">
          {/* Panel Header/Tabs */}
          <div className="h-9 bg-[#313244]/50 border-b border-[#313244] flex items-center px-4 shrink-0 gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#7f849c]">~/arun/</span>
              <span className="text-[#cba6f7] font-bold flex items-center gap-1.5">
                {activeTab === 'home' ? 'home.md' : activeTab === 'experience' ? 'experience.json' : activeTab === 'projects' ? 'ai_projects.py' : activeTab === 'contact' ? 'contact.sh' : 'help_man.txt'}
                <div className="w-1.5 h-1.5 bg-[#cba6f7] rounded-full animate-pulse" />
              </span>
            </div>
            <div className="ml-auto hidden sm:flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full border border-[#f38ba8]/50" />
              <div className="w-2 h-2 rounded-full border border-[#f9e2af]/50" />
              <div className="w-2 h-2 rounded-full border border-[#a6e3a1]/50" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-[#45475a] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.995 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.005 }}
                transition={{ duration: 0.15 }}
                className="h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Terminal / REPL Overlay */}
          <AnimatePresence>
            {isTerminalOpen && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="absolute inset-x-4 bottom-4 h-1/3 bg-[#11111b]/95 border border-[#cba6f7]/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-40 flex flex-col rounded-lg backdrop-blur-xl"
              >
                <div className="h-8 flex items-center justify-between px-4 border-b border-[#313244] shrink-0 bg-[#313244]/20">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#89dceb] tracking-widest uppercase">
                    <TerminalIcon size={12} />
                    <span>Debug Console (REPL)</span>
                  </div>
                  <button onClick={() => setIsTerminalOpen(false)} className="text-[#a6adc8] hover:text-[#f38ba8] transition-colors p-1">
                    <X size={14} />
                  </button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto custom-terminal-scrollbar">
                  <Terminal />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer Shortcut Bar */}
      <footer className="h-8 bg-[#313244] border-t border-[#45475a] flex items-center px-4 text-[10px] shrink-0 overflow-x-auto gap-4 sm:gap-8 no-scrollbar">
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <ShortcutKey keyLabel="F1" label="Help" onClick={() => setActiveTab("help")} />
          <ShortcutKey keyLabel="F2" label="Experience" onClick={() => setActiveTab("experience")} />
          <ShortcutKey keyLabel="F3" label="Projects" onClick={() => setActiveTab("projects")} />
          <ShortcutKey keyLabel="F4" label="Contact" onClick={() => setActiveTab("contact")} />
          <ShortcutKey keyLabel="ESC" label={isTerminalOpen ? "Term Off" : "Term On"} onClick={toggleTerminal} />
        </div>
        <div className="ml-auto flex items-center gap-4 text-[#7f849c] shrink-0">
          <span className="flex items-center gap-1.5"><ChevronRight size={10} className="text-[#cba6f7]" /> ARUN_NODE_01</span>
          <span className="hidden sm:inline border-l border-[#45475a] h-4" />
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline border-l border-[#45475a] h-4" />
          <span className="hidden sm:inline text-[#cba6f7] font-bold">NEXT_APP</span>
        </div>
      </footer>

      {/* TUI Scanline Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
}

function NavItem({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-sm text-xs transition-all border-l-2 ${
        active 
          ? "bg-[#cba6f7]/10 text-[#cba6f7] border-[#cba6f7] font-bold" 
          : "text-[#a6adc8] border-transparent hover:bg-[#313244]/50 hover:text-[#cba6f7]"
      }`}
    >
      <span className={active ? "text-[#cba6f7]" : "text-[#7f849c]"}>{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {active && <div className="w-1 h-1 rounded-full bg-[#cba6f7]" />}
    </button>
  );
}

function ShortcutKey({ keyLabel, label, onClick }: { keyLabel: string; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 hover:bg-[#45475a] px-2 py-0.5 rounded transition-all group shrink-0">
      <span className="text-[#89b4fa] font-bold group-hover:text-[#89dceb] transition-colors">{keyLabel}</span>
      <span className="text-[#bac2de] group-hover:text-[#cdd6f4] transition-colors uppercase font-medium">{label}</span>
    </button>
  );
}

function HelpItem({ shortcut, action, color }: { shortcut: string; action: string; color: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#313244]/50 rounded border border-[#45475a]">
      <span className={`font-bold ${color}`}>{shortcut}</span>
      <span className="text-[#bac2de] text-xs font-bold uppercase tracking-wider">{action}</span>
    </div>
  );
}
