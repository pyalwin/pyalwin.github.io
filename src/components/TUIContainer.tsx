"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  BookOpen,
  Briefcase,
  Clock,
  Code,
  FileText,
  Github,
  HelpCircle,
  Mail,
  Terminal as TerminalIcon,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./Hero";
import Experience from "./Experience";
import Projects from "./Projects";
import OpenSource from "./OpenSource";
import Writing from "./Writing";
import Contact from "./Contact";
import Terminal from "./Terminal";

type Tab = "home" | "experience" | "projects" | "opensource" | "writing" | "contact" | "help";

const tabs: Array<{
  id: Tab;
  label: string;
  file: string;
  shortcut: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}> = [
  {
    id: "home",
    label: "Overview",
    file: "home.md",
    shortcut: "F1",
    icon: <FileText size={16} />,
    description: "profile, focus areas, console",
    color: "text-sky",
  },
  {
    id: "experience",
    label: "Experience",
    file: "experience.json",
    shortcut: "F2",
    icon: <Briefcase size={16} />,
    description: "roles and systems shipped",
    color: "text-green",
  },
  {
    id: "projects",
    label: "Projects",
    file: "selected_projects.py",
    shortcut: "F3",
    icon: <Code size={16} />,
    description: "selected technical builds",
    color: "text-yellow",
  },
  {
    id: "opensource",
    label: "Open Source",
    file: "open_source.sh",
    shortcut: "F4",
    icon: <Github size={16} />,
    description: "public repos and OSS work",
    color: "text-green",
  },
  {
    id: "writing",
    label: "Writing",
    file: "writing.md",
    shortcut: "F5",
    icon: <BookOpen size={16} />,
    description: "articles on AI and engineering",
    color: "text-peach",
  },
  {
    id: "contact",
    label: "Contact",
    file: "contact.sh",
    shortcut: "F6",
    icon: <Mail size={16} />,
    description: "email, LinkedIn, GitHub",
    color: "text-peach",
  },
  {
    id: "help",
    label: "Help",
    file: "help.txt",
    shortcut: "?",
    icon: <HelpCircle size={16} />,
    description: "shortcuts and controls",
    color: "text-peach",
  },
];

export default function TUIContainer() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [time, setTime] = useState("--:--:--");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeMeta = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  const toggleTerminal = useCallback(() => setIsTerminalOpen((prev) => !prev), []);

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const timer = setInterval(updateTime, 1000);
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";

      if (event.key === "F1") {
        event.preventDefault();
        setActiveTab("home");
      }
      if (event.key === "F2") {
        event.preventDefault();
        setActiveTab("experience");
      }
      if (event.key === "F3") {
        event.preventDefault();
        setActiveTab("projects");
      }
      if (event.key === "F4") {
        event.preventDefault();
        setActiveTab("opensource");
      }
      if (event.key === "F5") {
        event.preventDefault();
        setActiveTab("writing");
      }
      if (event.key === "F6") {
        event.preventDefault();
        setActiveTab("contact");
      }
      if (event.key === "?" && !isTyping) {
        event.preventDefault();
        setActiveTab("help");
      }
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setIsTerminalOpen(true);
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setIsTerminalOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0 });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Hero onOpenSection={setActiveTab} />;
      case "experience":
        return <Experience />;
      case "projects":
        return <Projects />;
      case "opensource":
        return <OpenSource />;
      case "writing":
        return <Writing />;
      case "contact":
        return <Contact />;
      case "help":
        return <HelpPanel />;
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-background text-text font-mono">
      <header className="z-50 flex h-9 shrink-0 items-center gap-2 overflow-x-auto border-b border-line bg-panel px-2 text-[11px] text-subtext1 no-scrollbar sm:px-3">
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-surface0 px-2 py-1 font-bold text-text transition hover:border-sky hover:text-sky"
          aria-label="Open overview"
        >
          <TerminalIcon size={13} className="text-sky" />
          <span>arun_os</span>
        </button>

        <div className="flex min-w-[150px] shrink-0 items-center gap-1.5 text-subtext0 sm:min-w-[210px]">
          <span>~/arun/</span>
          <span className={`truncate font-bold ${activeMeta.color}`}>{activeMeta.file}</span>
        </div>

        <nav className="flex shrink-0 items-center gap-1" aria-label="Portfolio commands">
          {tabs.map((tab) => (
            <ShortcutKey
              key={tab.id}
              keyLabel={tab.shortcut}
              label={tab.label}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTerminal}
            className={`flex items-center gap-1.5 rounded-md border px-2 py-1 transition ${
              isTerminalOpen
                ? "border-sky bg-sky text-background"
                : "border-line bg-surface0 text-subtext1 hover:border-sky hover:text-sky"
            }`}
            aria-label="Toggle command console"
          >
            <span>/</span>
            <span className="hidden sm:inline">{isTerminalOpen ? "console:open" : "console"}</span>
          </button>
          <div className="hidden items-center gap-1.5 rounded-md border border-line bg-surface0 px-2 py-1 text-text sm:flex">
            <Clock size={12} className="text-green" />
            <span>{time}</span>
          </div>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
          <div ref={scrollContainerRef} data-main-scroll className="min-h-0 flex-1 overflow-y-auto scroll-smooth">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="min-h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isTerminalOpen && (
              <motion.div
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 28, opacity: 0 }}
                className="absolute inset-x-3 bottom-3 z-40 h-[72vh] max-h-[520px] rounded-lg border border-sky/50 bg-background/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur md:inset-x-5 md:h-[44vh]"
              >
                <div className="mb-2 flex items-center justify-between px-1 text-xs text-subtext1">
                  <div className="flex items-center gap-2">
                    <TerminalIcon size={14} className="text-sky" />
                    <span>command console</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsTerminalOpen(false)}
                    className="rounded-md p-1 text-subtext1 transition hover:bg-surface1 hover:text-red"
                    aria-label="Close command console"
                  >
                    <X size={16} />
                  </button>
                </div>
                <Terminal embedded title="quick-actions:~" />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function ShortcutKey({
  keyLabel,
  label,
  active,
  onClick,
}: {
  keyLabel: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 transition ${
        active
          ? "border-sky bg-background text-sky"
          : "border-transparent text-subtext1 hover:border-line hover:bg-surface0"
      }`}
    >
      <span className="font-bold">{keyLabel}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function HelpPanel() {
  return (
    <section className="min-h-full bg-background px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 border border-line bg-panel p-5 rounded-lg">
          <div className="mb-3 flex items-center gap-3">
            <HelpCircle size={24} className="text-sky" />
            <h1 className="text-3xl font-bold">Controls</h1>
          </div>
          <p className="max-w-2xl leading-7 text-subtext1">
            Use the top command bar or keyboard shortcuts. The console accepts typed commands and clickable command chips.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <HelpItem shortcut="F1" action="Open overview" />
          <HelpItem shortcut="F2" action="Open experience" />
          <HelpItem shortcut="F3" action="Open projects" />
          <HelpItem shortcut="F4" action="Open source repos" />
          <HelpItem shortcut="F5" action="Open writing" />
          <HelpItem shortcut="F6" action="Open contact" />
          <HelpItem shortcut="/" action="Open command console" />
          <HelpItem shortcut="ESC" action="Toggle command console" />
        </div>
      </div>
    </section>
  );
}

function HelpItem({ shortcut, action }: { shortcut: string; action: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-line bg-surface0 p-4">
      <span className="font-bold text-yellow">{shortcut}</span>
      <span className="text-sm text-subtext1">{action}</span>
    </div>
  );
}
