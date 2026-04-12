"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Blocks,
  BrainCircuit,
  Briefcase,
  Code,
  DatabaseZap,
  Mail,
  Network,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Terminal as TerminalIcon,
  UserRound,
} from "lucide-react";

const signalImage = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80";

type SectionTarget = "experience" | "projects" | "contact";
type GraphNodeId = "profile" | "product" | "platform" | "automation" | "delivery" | "experience" | "projects" | "contact";
type CommandId = "whoami" | "map" | "experience" | "projects" | "contact";

interface HeroProps {
  onOpenSection: (section: SectionTarget) => void;
}

const graphNodes: Array<{
  id: GraphNodeId;
  label: string;
  eyebrow: string;
  x: number;
  y: number;
  color: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
  evidence: string[];
  target?: SectionTarget;
}> = [
  {
    id: "profile",
    label: "Arun",
    eyebrow: "senior software engineer",
    x: 50,
    y: 48,
    color: "text-sky",
    icon: <UserRound size={18} />,
    title: "Senior engineer with range",
    detail: "The center of the map: product judgment, platform depth, customer context, and enough AI fluency to apply it where it helps.",
    evidence: ["12+ years", "Bangalore, India", "Product, platform, automation"],
  },
  {
    id: "product",
    label: "Product",
    eyebrow: "business software",
    x: 27,
    y: 24,
    color: "text-green",
    icon: <Blocks size={18} />,
    title: "Product engineering",
    detail: "Turns ambiguous business workflows into software that can survive real users, deadlines, edge cases, and customer conversations.",
    evidence: ["Fintech SaaS", "AP automation", "API design"],
  },
  {
    id: "platform",
    label: "Platform",
    eyebrow: "systems and data",
    x: 73,
    y: 24,
    color: "text-yellow",
    icon: <DatabaseZap size={18} />,
    title: "Platform and data systems",
    detail: "Builds the underlying APIs, data flows, and service boundaries that let product teams move without turning every feature into a rewrite.",
    evidence: ["Service design", "Data workflows", "Operational reliability"],
  },
  {
    id: "automation",
    label: "Automation",
    eyebrow: "applied AI",
    x: 23,
    y: 73,
    color: "text-peach",
    icon: <BrainCircuit size={18} />,
    title: "Automation and applied AI",
    detail: "Uses retrieval, model routing, and agent-like workflows as tools in the kit, not as the whole identity.",
    evidence: ["Document intelligence", "Coding automation", "Evidence-first systems"],
    target: "projects",
  },
  {
    id: "delivery",
    label: "Delivery",
    eyebrow: "customer context",
    x: 77,
    y: 73,
    color: "text-sapphire",
    icon: <ShieldCheck size={18} />,
    title: "Customer-facing delivery",
    detail: "Connects engineering tradeoffs to customer constraints, timelines, and implementation realities.",
    evidence: ["Technical discovery", "Architecture choices", "Stakeholder alignment"],
  },
  {
    id: "experience",
    label: "Experience",
    eyebrow: "career path",
    x: 50,
    y: 12,
    color: "text-green",
    icon: <Briefcase size={18} />,
    title: "Career timeline",
    detail: "A path through enterprise software, fintech SaaS, and product infrastructure work.",
    evidence: ["Ottimate", "Idealoom", "TCS"],
    target: "experience",
  },
  {
    id: "projects",
    label: "Projects",
    eyebrow: "selected builds",
    x: 10,
    y: 48,
    color: "text-yellow",
    icon: <Code size={18} />,
    title: "Selected technical builds",
    detail: "Concrete work in document intelligence, developer tooling, retrieval, graph extraction, and coding automation.",
    evidence: ["AgreedPro", "Document Intelligence", "Bifrost", "Agentic Coding Bot"],
    target: "projects",
  },
  {
    id: "contact",
    label: "Contact",
    eyebrow: "next step",
    x: 90,
    y: 48,
    color: "text-peach",
    icon: <Mail size={18} />,
    title: "Contact",
    detail: "Best reached for senior software engineering conversations around products, platforms, automation, and delivery.",
    evidence: ["Email", "LinkedIn", "GitHub"],
    target: "contact",
  },
];

const graphEdges: Array<[GraphNodeId, GraphNodeId]> = [
  ["profile", "product"],
  ["profile", "platform"],
  ["profile", "automation"],
  ["profile", "delivery"],
  ["product", "experience"],
  ["platform", "experience"],
  ["automation", "projects"],
  ["product", "projects"],
  ["delivery", "contact"],
  ["platform", "projects"],
  ["experience", "contact"],
];

const commandTour: Array<{
  id: CommandId;
  command: string;
  label: string;
  result: string;
  output: string[];
  node: GraphNodeId;
  target?: SectionTarget;
}> = [
  {
    id: "whoami",
    command: "whoami --brief",
    label: "Identity",
    result: "Senior Software Engineer based in Bangalore.",
    output: ["12+ years building business software", "Product, platform, automation, and applied AI", "Pragmatic delivery across messy workflows"],
    node: "profile",
  },
  {
    id: "map",
    command: "open context.graph",
    label: "Map",
    result: "Context graph loaded. Edges highlight how the work connects.",
    output: ["Product judgment", "Platform depth", "Automation where useful", "Customer-facing delivery"],
    node: "profile",
  },
  {
    id: "experience",
    command: "inspect experience.json",
    label: "Experience",
    result: "Career path spans enterprise software, fintech SaaS, and product infrastructure.",
    output: ["Ottimate", "Idealoom", "TCS"],
    node: "experience",
    target: "experience",
  },
  {
    id: "projects",
    command: "list selected_projects.py",
    label: "Projects",
    result: "Selected builds show document intelligence, developer tooling, and automation.",
    output: ["AgreedPro", "Document Intelligence", "Bifrost", "Agentic Coding Bot"],
    node: "projects",
    target: "projects",
  },
  {
    id: "contact",
    command: "contact --channels",
    label: "Contact",
    result: "Contact channels are ready when the viewer wants the next step.",
    output: ["Email", "LinkedIn", "GitHub"],
    node: "contact",
    target: "contact",
  },
];

export default function Hero({ onOpenSection }: HeroProps) {
  const [activeNodeId, setActiveNodeId] = useState<GraphNodeId>("profile");
  const [isTourPlaying, setIsTourPlaying] = useState(true);
  const [activeCommandIndex, setActiveCommandIndex] = useState(0);
  const activeCommand = commandTour[activeCommandIndex] ?? commandTour[0];
  const visibleCommands = commandTour.slice(0, activeCommandIndex + 1);
  const displayedNodeId = activeCommand.id === "map" ? activeNodeId : activeCommand.node;
  const activeNode = graphNodes.find((node) => node.id === displayedNodeId) ?? graphNodes[0];
  const connectedNodeIds = useMemo(() => {
    const connected = new Set<GraphNodeId>([displayedNodeId]);
    graphEdges.forEach(([from, to]) => {
      if (from === displayedNodeId) connected.add(to);
      if (to === displayedNodeId) connected.add(from);
    });
    return connected;
  }, [displayedNodeId]);

  useEffect(() => {
    if (!isTourPlaying) return;
    const timer = window.setInterval(() => {
      setActiveCommandIndex((current) => (current + 1) % commandTour.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [isTourPlaying]);

  const handleManualSelect = (node: GraphNodeId) => {
    setIsTourPlaying(false);
    setActiveNodeId(node);
  };

  const handleCommandSelect = (index: number) => {
    setIsTourPlaying(false);
    setActiveCommandIndex(index);
  };

  return (
    <section className="min-h-full bg-background px-2 py-2 sm:px-3 sm:py-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mx-auto grid max-w-[1600px] gap-2 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="relative min-h-[124px] overflow-hidden rounded-md border border-line bg-panel lg:col-span-2">
          <SignalBackdrop />

          <div className="relative grid min-h-[124px] gap-3 p-3 md:grid-cols-[1fr_auto] md:items-end">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-subtext1">
              <span className="rounded-md border border-line bg-background/75 px-2 py-1 text-green backdrop-blur">available for senior software engineering roles</span>
              <span className="rounded-md border border-line bg-background/75 px-2 py-1 backdrop-blur">Bangalore, India</span>
            </div>

            <div className="max-w-4xl md:col-start-1">
              <p className="mb-1 text-xs text-sky">software engineer / product systems / platform work</p>
              <h1 className="mb-1 max-w-3xl font-mono text-2xl font-bold leading-tight text-text sm:text-3xl">
                Arun Venkataramanan
              </h1>
              <p className="hidden max-w-2xl text-sm leading-6 text-subtext1 md:block">
                Senior Software Engineer building reliable products, platforms, automation, and applied AI for complex business workflows.
              </p>
            </div>

            <div className="md:col-start-2 md:row-span-2 md:row-start-1">
              <AV01Mascot state={isTourPlaying ? "running" : "paused"} />
            </div>
          </div>
        </div>

        <div className="grid min-h-[410px] rounded-md border border-line bg-panel lg:col-span-2 lg:grid-cols-[0.92fr_1.08fr]">
          <CommandRunPanel
            activeCommandIndex={activeCommandIndex}
            visibleCommands={visibleCommands}
            isTourPlaying={isTourPlaying}
            onPlayPause={() => setIsTourPlaying((playing) => !playing)}
            onSelectCommand={handleCommandSelect}
          />
          <CommandResult
            command={activeCommand}
            activeNode={activeNode}
            connectedNodeIds={connectedNodeIds}
            isTourPlaying={isTourPlaying}
            onPlayPause={() => setIsTourPlaying((playing) => !playing)}
            onSelectNode={handleManualSelect}
            onOpenSection={onOpenSection}
          />
        </div>
      </motion.div>
    </section>
  );
}

function CommandRunPanel({
  activeCommandIndex,
  visibleCommands,
  isTourPlaying,
  onPlayPause,
  onSelectCommand,
}: {
  activeCommandIndex: number;
  visibleCommands: typeof commandTour;
  isTourPlaying: boolean;
  onPlayPause: () => void;
  onSelectCommand: (index: number) => void;
}) {
  return (
    <div className="flex min-h-[330px] flex-col border-b border-line lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between border-b border-line bg-surface1 px-2.5 py-1.5 text-xs">
        <div className="flex items-center gap-2 text-sky">
          <TerminalIcon size={14} />
          <span>arun@portfolio:~</span>
        </div>
        <button
          type="button"
          onClick={onPlayPause}
          className="flex items-center gap-1.5 rounded-md border border-line bg-background px-2 py-1 text-[11px] text-subtext1 transition hover:border-sky hover:text-sky"
        >
          {isTourPlaying ? <Pause size={14} /> : <Play size={14} />}
          {isTourPlaying ? "pause" : "play"}
        </button>
      </div>

      <div className="flex-1 space-y-1.5 overflow-y-auto p-2.5">
        {commandTour.map((item, index) => {
          const hasRun = visibleCommands.some((command) => command.id === item.id);
          const isActive = activeCommandIndex === index;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCommand(index)}
              className={`w-full rounded-md border px-2.5 py-2 text-left transition ${
                isActive
                  ? "border-sky bg-background text-text"
                  : hasRun
                    ? "border-line bg-surface0 text-subtext1"
                    : "border-line bg-background/45 text-subtext0"
              }`}
            >
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="font-mono text-xs">
                  <span className={hasRun ? "text-green" : "text-overlay1"}>&gt;</span> {item.command}
                </span>
                <span className="text-[11px] text-subtext0">{hasRun ? "done" : "queued"}</span>
              </div>
              <p className="text-xs text-subtext0">{item.result}</p>
            </button>
          );
        })}
      </div>

      <div className="border-t border-line p-2.5">
        <div className="rounded-md border border-line bg-background/55 p-2.5">
          <div className="flex items-center gap-2 text-sky">
            <AV01Mark />
            <span className="font-bold">AV-01</span>
          </div>
          <p className="mt-2 text-xs leading-5 text-subtext0">
            Auto-running the portfolio. Pause anytime, then run commands manually.
          </p>
        </div>
      </div>
    </div>
  );
}

function CommandResult({
  command,
  activeNode,
  connectedNodeIds,
  isTourPlaying,
  onPlayPause,
  onSelectNode,
  onOpenSection,
}: {
  command: (typeof commandTour)[number];
  activeNode: (typeof graphNodes)[number];
  connectedNodeIds: Set<GraphNodeId>;
  isTourPlaying: boolean;
  onPlayPause: () => void;
  onSelectNode: (node: GraphNodeId) => void;
  onOpenSection: (section: SectionTarget) => void;
}) {
  const isMap = command.id === "map";

  return (
    <div className="grid min-h-[380px] lg:grid-rows-[auto_1fr]">
      <div className="border-b border-line p-3">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-xs text-sky">command result</p>
            <h2 className="text-xl font-bold">{command.label}</h2>
          </div>
          <span className={`rounded-md border border-line bg-surface0 px-2 py-1 text-[11px] ${isTourPlaying ? "text-green" : "text-yellow"}`}>
            {isTourPlaying ? "auto-run" : "manual"}
          </span>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-subtext1">{command.result}</p>
      </div>

      {isMap ? (
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <ContextGraph
            activeNodeId={activeNode.id}
            connectedNodeIds={connectedNodeIds}
            isTourPlaying={isTourPlaying}
            onPlayPause={onPlayPause}
            onSelect={onSelectNode}
            compact
          />
          <NodeDetail node={activeNode} isTourPlaying={isTourPlaying} onOpenSection={onOpenSection} />
        </div>
      ) : (
        <div className="grid gap-3 p-3 lg:grid-cols-[1fr_240px]">
          <div className="rounded-md border border-line bg-background/55 p-3">
            <div className="mb-3 font-mono text-sm text-subtext1">
              <p>
                <span className="text-green">&gt;</span> {command.command}
              </p>
              <p className="text-sky">success: {command.node}</p>
            </div>
            <div className="grid gap-2">
              {command.output.map((line) => (
                <div key={line} className="rounded-md border border-line bg-surface0 px-2.5 py-1.5 text-sm text-subtext1">
                  {line}
                </div>
              ))}
            </div>
            {command.target && (
              <button
                type="button"
                onClick={() => onOpenSection(command.target!)}
                className="mt-4 flex w-full items-center justify-between rounded-md border border-line bg-panel px-3 py-2 text-left text-sm text-subtext1 transition hover:border-sky hover:text-sky"
              >
                <span>Open full {command.target} section</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
          <AV01Mascot state={isTourPlaying ? "running" : "paused"} />
        </div>
      )}
    </div>
  );
}

function ContextGraph({
  activeNodeId,
  connectedNodeIds,
  isTourPlaying,
  onPlayPause,
  onSelect,
  compact = false,
}: {
  activeNodeId: GraphNodeId;
  connectedNodeIds: Set<GraphNodeId>;
  isTourPlaying: boolean;
  onPlayPause: () => void;
  onSelect: (node: GraphNodeId) => void;
  compact?: boolean;
}) {
  const activeEdges = new Set(
    graphEdges
      .filter(([from, to]) => from === activeNodeId || to === activeNodeId)
      .map(([from, to]) => `${from}-${to}`),
  );

  return (
    <div className={compact ? "relative min-h-[300px] border-b border-line p-2.5 lg:min-h-[330px] lg:border-b-0 lg:border-r" : "relative min-h-[330px] border-b border-line p-2.5 lg:min-h-[380px] lg:border-b-0 lg:border-r"}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="mb-1 text-xs text-sky">context graph</p>
          <h2 className="text-lg font-bold">Click a node to inspect the network.</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPlayPause}
            className="flex items-center gap-1.5 rounded-md border border-line bg-surface0 px-2 py-1.5 text-[11px] text-subtext1 transition hover:border-sky hover:text-sky"
          >
            {isTourPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isTourPlaying ? "pause" : "play"}
          </button>
          <Network size={22} className="text-sky" />
        </div>
      </div>

      <div className={compact ? "relative h-[250px] overflow-hidden rounded-md border border-line bg-background/55 sm:h-[280px]" : "relative h-[280px] overflow-hidden rounded-md border border-line bg-background/55 sm:h-[320px]"}>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {graphEdges.map(([from, to]) => {
            const fromNode = graphNodes.find((node) => node.id === from)!;
            const toNode = graphNodes.find((node) => node.id === to)!;
            const isActive = activeEdges.has(`${from}-${to}`);

            return (
              <line
                key={`${from}-${to}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                className={isActive ? "stroke-sky" : "stroke-line"}
                strokeWidth={isActive ? 0.65 : 0.35}
                strokeDasharray={isActive ? "0" : "1.4 1.2"}
                opacity={isActive ? 0.95 : 0.55}
              />
            );
          })}
        </svg>

        {graphNodes.map((node) => {
          const isActive = activeNodeId === node.id;
          const isConnected = connectedNodeIds.has(node.id);

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => onSelect(node.id)}
              className={`absolute min-w-[76px] -translate-x-1/2 -translate-y-1/2 rounded-md border p-1.5 text-left transition ${
                isActive
                  ? "border-sky bg-sky text-background shadow-[0_0_24px_rgba(89,212,197,0.25)]"
                  : isConnected
                    ? "border-sky/70 bg-panel text-text"
                    : "border-line bg-surface0/85 text-subtext0 hover:border-surface2 hover:text-text"
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              aria-pressed={isActive}
            >
              <span className={`mb-1 block ${isActive ? "text-background" : node.color}`}>{node.icon}</span>
              <span className="block text-xs font-bold">{node.label}</span>
              <span className={`block text-[11px] ${isActive ? "text-background/75" : "text-subtext0"}`}>{node.eyebrow}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NodeDetail({
  node,
  isTourPlaying,
  onOpenSection,
}: {
  node: (typeof graphNodes)[number];
  isTourPlaying: boolean;
  onOpenSection: (section: SectionTarget) => void;
}) {
  return (
    <aside className="flex min-h-[330px] flex-col p-3">
      <div className="mb-3 flex items-center gap-2">
        <span className={`rounded-md border border-line bg-surface0 p-2 ${node.color}`}>{node.icon}</span>
        <div>
          <p className="text-xs text-subtext0">{node.eyebrow}</p>
          <h2 className="text-lg font-bold">{node.title}</h2>
        </div>
      </div>

      <p className="mb-3 text-sm leading-6 text-subtext1">{node.detail}</p>

      <div className="mb-3 rounded-md border border-line bg-background/55 p-2.5 font-mono">
        <div className="mb-2 flex items-center justify-between text-xs text-subtext0">
          <span>run trace</span>
          <span className={isTourPlaying ? "text-green" : "text-yellow"}>{isTourPlaying ? "running" : "paused"}</span>
        </div>
        <p className="text-sm leading-6 text-subtext1">
          <span className="text-green">&gt;</span> inspect node <span className="text-sky">{node.id}</span>
        </p>
        <p className="text-xs leading-5 text-subtext0">loaded: {node.evidence.join(" / ")}</p>
      </div>

      <div className="mb-3">
        <p className="mb-2 text-sm text-sky">evidence</p>
        <div className="flex flex-wrap gap-2">
          {node.evidence.map((item) => (
            <span key={item} className="rounded-md border border-line bg-surface0 px-2 py-1 text-xs text-subtext1">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto rounded-md border border-line bg-background/55 p-2.5">
        <div className="mb-2 flex items-center gap-2 text-xs text-green">
          <Sparkles size={15} />
          <span>connected edges are highlighted on selection</span>
        </div>
        {node.target ? (
          <button
            type="button"
            onClick={() => onOpenSection(node.target!)}
            className="flex w-full items-center justify-between rounded-md border border-line bg-surface0 px-3 py-2 text-left text-sm text-subtext1 transition hover:border-sky hover:text-sky"
          >
            <span>Open full {node.target} section</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <p className="text-xs leading-5 text-subtext0">Select a connected node to move through the portfolio without exposing every detail up front.</p>
        )}
      </div>
    </aside>
  );
}

function AV01Mascot({ state }: { state: "running" | "paused" }) {
  return (
    <div className="rounded-md border border-line bg-background/70 p-2.5 backdrop-blur">
      <div className="flex items-center gap-3">
        <AV01Mark />
        <div>
          <p className="text-sm font-bold text-text">AV-01</p>
          <p className={state === "running" ? "text-xs text-green" : "text-xs text-yellow"}>
            {state === "running" ? "auto-running commands" : "manual control"}
          </p>
        </div>
      </div>
      <p className="mt-2 text-xs leading-5 text-subtext0">
        A small terminal guide for this portfolio. It runs the first pass, then gets out of the way.
      </p>
    </div>
  );
}

function AV01Mark() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 shrink-0"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32 6L52 18V42L32 58L12 42V18L32 6Z" fill="#121512" stroke="#59d4c5" strokeWidth="3" />
      <path d="M22 24H42L48 32L42 40H22L16 32L22 24Z" fill="#222720" stroke="#8fd178" strokeWidth="2" />
      <path d="M25 32H30" stroke="#eef4ed" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 32H41" stroke="#eef4ed" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 43L32 47L36 43" stroke="#ef8f5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 6V1" stroke="#59d4c5" strokeWidth="2" strokeLinecap="round" />
      <path d="M27 13L20 9" stroke="#e4c064" strokeWidth="2" strokeLinecap="round" />
      <path d="M37 13L44 9" stroke="#e4c064" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SignalBackdrop() {
  const stripClass = "absolute inset-x-0 overflow-hidden border-y border-background/80";

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src={signalImage}
        alt=""
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-background/45" />

      <div className={`${stripClass} top-[8%] h-[11%] opacity-70`}>
        <Image src={signalImage} alt="" fill loading="eager" sizes="100vw" className="scale-110 object-cover object-top" />
      </div>
      <div className={`${stripClass} top-[27%] h-[15%] opacity-80`}>
        <Image src={signalImage} alt="" fill loading="eager" sizes="100vw" className="scale-125 object-cover object-center" />
      </div>
      <div className={`${stripClass} bottom-[14%] h-[13%] opacity-65`}>
        <Image src={signalImage} alt="" fill loading="eager" sizes="100vw" className="scale-110 object-cover object-bottom" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,17,16,0.94)_0%,rgba(15,17,16,0.72)_46%,rgba(15,17,16,0.36)_100%)]" />
      <div className="absolute inset-x-0 top-[22%] h-3 bg-background" />
      <div className="absolute inset-x-0 top-[45%] h-4 bg-background" />
      <div className="absolute inset-x-0 bottom-[9%] h-3 bg-background" />

      <div className="absolute left-4 top-3 font-mono text-[11px] text-subtext0 opacity-60 sm:left-7">
        build 02 / signal 14 / frame 00
      </div>
      <div className="absolute right-5 top-[22%] hidden font-mono text-[11px] text-subtext0 opacity-60 md:block">
        capture / product / platform / delivery
      </div>
    </div>
  );
}
