"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, ChevronRight, Sparkles } from "lucide-react";

interface CommandResponse {
  output: React.ReactNode;
}

interface TerminalProps {
  embedded?: boolean;
  title?: string;
}

const commands: Record<string, CommandResponse> = {
  help: {
    output: (
      <div className="space-y-1">
        <p className="text-sky font-bold">Available commands</p>
        <p><span className="text-yellow">about</span> - profile snapshot</p>
        <p><span className="text-yellow">experience</span> - career timeline</p>
        <p><span className="text-yellow">projects</span> - selected technical builds</p>
        <p><span className="text-yellow">opensource</span> - public repos on GitHub</p>
        <p><span className="text-yellow">writing</span> - articles on AI and engineering</p>
        <p><span className="text-yellow">contact</span> - channels and location</p>
        <p><span className="text-yellow">clear</span> - clear the console</p>
      </div>
    ),
  },
  about: {
    output: (
      <div className="space-y-2">
        <p>
          <span className="text-sky font-bold">Arun Venkataramanan</span> is a Senior Software Engineer based in Bangalore.
        </p>
        <p>
          12+ years across product engineering, platform work, business workflows, and applied AI.
        </p>
        <p>
          Currently building business software systems at <span className="text-peach font-bold">Ottimate</span>.
        </p>
      </div>
    ),
  },
  experience: {
    output: (
      <div className="space-y-1">
        <p className="text-sky font-bold">Career timeline</p>
        <p><span className="text-green font-bold">2022-now</span> Ottimate - product and platform engineering</p>
        <p><span className="text-green font-bold">2016-2022</span> Idealoom - fintech SaaS engineering lead</p>
        <p><span className="text-green font-bold">2013-2016</span> TCS - enterprise software delivery</p>
      </div>
    ),
  },
  projects: {
    output: (
      <div className="space-y-1">
        <p className="text-sky font-bold">Selected technical builds</p>
        <p><span className="text-green font-bold">AgreedPro</span> - legal contract RAG</p>
        <p><span className="text-green font-bold">Ottimate Knowledge Bot</span> - internal Slack + Claude KB</p>
        <p><span className="text-green font-bold">Agentic Coding Bot</span> - coding automation</p>
      </div>
    ),
  },
  opensource: {
    output: (
      <div className="space-y-1">
        <p className="text-sky font-bold">Public repos</p>
        <p><span className="text-green font-bold">Bifrost</span> - desktop developer tooling</p>
        <p><span className="text-green font-bold">Codemesh</span> - code knowledge graph for AI agents</p>
        <p><span className="text-green font-bold">Cortex</span> - document extraction with GraphRAG</p>
        <p><span className="text-green font-bold">EngramDB</span> - hybrid retrieval, 92.8% recall</p>
        <p><span className="text-green font-bold">Frameforge</span> - MCP server for UI mockups</p>
      </div>
    ),
  },
  writing: {
    output: (
      <div className="space-y-1">
        <p className="text-sky font-bold">Articles</p>
        <p><span className="text-peach font-bold">dev.to</span> Beyond RAG: Graph-Aware Retrieval</p>
        <p><span className="text-peach font-bold">Medium</span> Stop Chatting with Claude Code</p>
        <p><span className="text-peach font-bold">Medium</span> Claude Code CLI as Infrastructure</p>
        <p><span className="text-peach font-bold">Medium</span> CLAUDE.md — Before You Speak</p>
        <p><span className="text-peach font-bold">dev.to</span> Beyond Simple Prompts</p>
      </div>
    ),
  },
  contact: {
    output: (
      <div className="space-y-1">
        <p><span className="text-sky">Email:</span> arun.tgode@gmail.com</p>
        <p><span className="text-sky">LinkedIn:</span> linkedin.com/in/arun-venkataramanan</p>
        <p><span className="text-sky">GitHub:</span> github.com/pyalwin</p>
        <p><span className="text-sky">Location:</span> Bangalore, India</p>
      </div>
    ),
  },
};

const suggestions = ["about", "experience", "projects", "opensource", "writing", "contact", "help"];

export default function Terminal({ embedded = false, title = "arun@portfolio:~" }: TerminalProps) {
  const [history, setHistory] = useState<{ command: string; output: React.ReactNode }[]>(() => [
    { command: "", output: commands.help.output },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim().toLowerCase();

    if (!cmd) {
      return;
    }

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const response = commands[cmd] || {
      output: <p className="text-red">Command not found: {cmd}. Try <span className="font-bold underline">help</span>.</p>,
    };

    setHistory((previous) => [...previous, { command: rawCommand, output: response.output }]);
    setInput("");
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
  };

  return (
    <div className={`w-full ${embedded ? "h-full" : "max-w-3xl mx-auto"} bg-panel rounded-lg border border-line overflow-hidden font-mono text-sm shadow-[0_18px_60px_rgba(0,0,0,0.35)] flex flex-col`}>
      <div className="bg-surface1 px-4 py-2 flex items-center justify-between border-b border-line">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} className="text-sky" />
          <span className="text-subtext1">{title}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-subtext0">
          <Sparkles size={13} className="text-yellow" />
          <span>click a command</span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar border-b border-line bg-background/35 px-3 py-2">
        {suggestions.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => {
              runCommand(command);
              inputRef.current?.focus();
            }}
            className="shrink-0 rounded-md border border-line bg-surface0 px-3 py-1 text-[12px] text-subtext1 transition hover:border-sky hover:text-sky"
          >
            {command}
          </button>
        ))}
      </div>
      
      <div 
        ref={scrollRef}
        className={`${embedded ? "flex-1 min-h-0" : "h-72"} overflow-y-auto bg-background/55 p-4`}
        onClick={() => inputRef.current?.focus()}
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
            className="min-w-0 flex-1 border-none bg-transparent p-0 text-text caret-sky outline-none"
            placeholder="Type or tap a command..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
