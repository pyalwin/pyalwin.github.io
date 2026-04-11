"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface CommandResponse {
  output: React.ReactNode;
}

const commands: Record<string, CommandResponse> = {
  help: {
    output: (
      <div className="space-y-1">
        <p className="text-mauve font-bold">Available commands:</p>
        <p><span className="text-blue">about</span> - Who is Arun?</p>
        <p><span className="text-blue">projects</span> - List independent AI projects</p>
        <p><span className="text-blue">contact</span> - Get contact info</p>
        <p><span className="text-blue">clear</span> - Clear the terminal</p>
        <p><span className="text-blue">help</span> - Show this message</p>
      </div>
    ),
  },
  about: {
    output: (
      <div className="space-y-2">
        <p>
          <span className="text-mauve font-bold">Arun Venkataramanan</span> is a Senior Software Engineer and Integrations Architect based in Bangalore.
        </p>
        <p>
          With over 12 years of experience, he specializes in connecting complex enterprise systems (ERPs) with cutting-edge generative AI intelligence.
        </p>
        <p>
          Currently Architecting Integrations at <span className="text-peach font-bold">Ottimate</span>.
        </p>
      </div>
    ),
  },
  projects: {
    output: (
      <div className="space-y-1">
        <p className="text-mauve font-bold">Independent AI Projects:</p>
        <p><span className="text-sky font-bold">AgreedPro</span> - Legal Contract Analysis RAG Platform</p>
        <p><span className="text-sky font-bold">Document Intelligence</span> - Multi-Tier Extraction & GraphRAG</p>
        <p><span className="text-sky font-bold">Bifrost</span> - Desktop AI Agent Interface (Electron/React)</p>
        <p><span className="text-sky font-bold">Otticode</span> - Autonomous Coding Agent</p>
      </div>
    ),
  },
  contact: {
    output: (
      <div className="space-y-1">
        <p><span className="text-lavender">Email:</span> arun.tgode@gmail.com</p>
        <p><span className="text-lavender">LinkedIn:</span> linkedin.com/in/arun-venkataramanan</p>
        <p><span className="text-lavender">GitHub:</span> github.com/pyalwin</p>
        <p><span className="text-lavender">Location:</span> Bangalore, India</p>
      </div>
    ),
  },
};

export default function Terminal() {
  const [history, setHistory] = useState<{ command: string; output: React.ReactNode }[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Initial greeting
    setHistory([{ command: "", output: commands.help.output }]);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const response = commands[cmd] || {
      output: <p className="text-red">Command not found: {cmd}. Type <span className="font-bold underline">help</span> for available commands.</p>,
    };

    setHistory([...history, { command: input, output: response.output }]);
    setInput("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 bg-surface0 rounded-lg shadow-2xl border border-surface1 overflow-hidden font-mono text-sm sm:text-base">
      <div className="bg-surface1 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} className="text-sky" />
          <span className="text-subtext1">arun@portfolio:~</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red/80" />
          <div className="w-3 h-3 rounded-full bg-yellow/80" />
          <div className="w-3 h-3 rounded-full bg-green/80" />
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="p-4 h-64 overflow-y-auto bg-background/50 scrollbar-thin scrollbar-thumb-surface1"
      >
        {history.map((entry, i) => (
          <div key={i} className="mb-4 last:mb-0">
            {entry.command && (
              <div className="flex items-center gap-2 text-green">
                <ChevronRight size={14} />
                <span>{entry.command}</span>
              </div>
            )}
            <div className="mt-1 text-text leading-relaxed">
              {entry.output}
            </div>
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4">
          <ChevronRight size={14} className="text-green shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-text caret-mauve focus:ring-0 p-0"
            placeholder="Type a command..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
