"use client";

import React, { useState, useEffect, useRef, useCallback, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronRight,
  Pause,
  Play,
  Sparkles,
  ArrowUpRight,
  Circle,
  Terminal as TerminalIcon,
  Clock,
} from "lucide-react";
import DetailPanel, { type DetailItem } from "./DetailPanel";

// ─── Explain Context ───────────────────────────────────────
const ExplainContext = createContext<(item: DetailItem) => void>(() => {});

const signalImage =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80";

// ─── Data ──────────────────────────────────────────────────

const experienceData = [
  {
    company: "Ottimate",
    role: "Senior Software Engineer — Integrations Architect",
    period: "May 2022 – Present",
    description:
      "Multi-tenant ERP integration platform — broad connector coverage, repeatable patterns that cut new integration from weeks to days. Also shipped: an AI code reviewer in CI/CD, an autonomous agent for support tickets, and a company-wide Slack bot that answers questions across Notion, JIRA, code, and analytics.",
    tech: ["ERP Integrations", "Multi-tenant Platform", "Python", "Claude API"],
  },
  {
    company: "Idealoom Technologies",
    role: "Founding Engineer & Engineering Lead",
    period: "2016 – 2022",
    description:
      "Built a fintech SaaS from scratch. Payments, banking APIs, compliance — the stuff that can't be wrong. Wore every hat from API design to hiring to talking to banks about why our integration broke at 2 AM.",
    tech: ["Python", "API Design", "Payments", "SaaS Architecture"],
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Software Engineer",
    period: "2013 – 2016",
    description:
      "Where I learned to ship. Enterprise IT for banking clients — big systems, big teams, lots of process. Taught me how large orgs actually work.",
    tech: ["Enterprise IT", "BFSI", "Software Delivery"],
  },
];

const projectsData: Array<{
  title: string;
  description: string;
  tech: string[];
  category: string;
  github?: string;
  detail: DetailItem;
}> = [
  {
    title: "AgreedPro",
    description:
      "Reads legal contracts so humans don't have to. RAG-based, paragraph-level references, no hallucinated citations — the kind of AI that shows its work.",
    tech: ["Python", "LangChain", "FAISS", "RAG"],
    category: "Data",
    github: "github.com/pyalwin",
    detail: {
      title: "AgreedPro",
      rows: [
        { label: "why I built it", value: "Every AI contract tool I tried would confidently cite a clause that either didn't exist or meant something different in context. For legal work, that's a liability issue, not a UX issue." },
        { label: "the core mechanism", value: "Paragraph ID injection — every chunk gets a deterministic ID before indexing, and the model is required to cite it in its answer. A rule-based mapping layer traces that ID back to the exact source location. No hallucinated references, because the reference is structurally enforced." },
        { label: "retrieval", value: "FAISS vector search for candidate retrieval, structured re-ranking to surface precedent clauses over just semantically similar ones, and query expansion to handle how lawyers ask questions differently to how contracts are written." },
        { label: "architecture", value: "Multi-tenant with RBAC (admin / analyst / viewer roles), full audit logging, and configurable compliance playbooks per client so different teams can encode their own review criteria." },
        { label: "status", value: "Active development — in conversations with legal teams about early pilots." },
      ],
    },
  },
  {
    title: "Ottimate Knowledge Bot",
    description:
      "Company-wide multi-agent Slack bot backed by Claude. Answers questions with cited sources across Notion docs, JIRA, codebase, and Clickhouse analytics — any engineer or PM can query internal knowledge without hunting through tabs.",
    tech: ["Claude API", "Slack SDK", "Python", "Multi-Agent", "Pinecone"],
    category: "Tools",
    detail: {
      title: "Ottimate Knowledge Bot",
      rows: [
        { label: "why I built it", value: "The answer to 'where is that documented?' was always 'somewhere in Notion, or maybe JIRA, or ask someone.' New engineers burned hours on questions a senior would answer in 30 seconds. I wanted that 30-second answer available at any hour." },
        { label: "how it works", value: "Multi-agent system. Separate agents handle each source — Notion, JIRA, codebase, and Clickhouse analytics. A coordinator agent synthesises the results and every answer includes source citations so you can verify and dig deeper." },
        { label: "the tricky part", value: "Deciding what's authoritative when sources conflict — Notion might say one thing, the code does another. We built a recency + source-priority model to handle that, with the codebase winning for anything implementation-related." },
        { label: "status", value: "Running in production at Ottimate." },
      ],
    },
  },
  {
    title: "Agentic Coding Bot",
    description:
      "Autonomous Claude Code agent that handles customer support tickets end-to-end — triages issues, writes code, creates PRs. Containerised execution with MCP integrations.",
    tech: ["Claude SDK", "MCP", "Docker", "Agents", "GitHub API"],
    category: "Automation",
    detail: {
      title: "Agentic Coding Bot",
      rows: [
        { label: "why I built it", value: "A class of support tickets always followed the same pattern — customer reports odd behaviour, engineer reads the ticket, reads the code, figures out a one-line fix, opens a PR. I got annoyed enough to automate it." },
        { label: "how it works", value: "Claude Code agent reads the incoming ticket, navigates the relevant code, diagnoses the root cause, writes a targeted fix, and opens a PR with a proper description. Each run is containerised via Docker so it can't affect anything outside its scope. MCP integrations give it access to internal tools — no hardcoding." },
        { label: "what surprised me", value: "It makes smaller fixes than most engineers would. No scope creep, no refactoring things that weren't broken. Just the minimum change that solves the problem — which is exactly what you want in a support fix." },
      ],
    },
  },
  {
    title: "EIA Review Tool",
    description:
      "Processes 1,000+ page regulatory documents with deterministic section ID mapping. Routes sections to appropriate model tiers by complexity and regulatory criticality — cost/accuracy balance at scale.",
    tech: ["Python", "Claude API", "Token Routing", "RAG"],
    category: "Data",
    detail: {
      title: "EIA Review Tool",
      rows: [
        { label: "why I built it", value: "Someone showed me what manual EIA review looks like — a consultant with a highlighter going through 900 pages, section by section, for weeks. Most of it is boilerplate. A small part is high-stakes. I wanted to build something that knows the difference." },
        { label: "how it works", value: "Deterministic section ID mapping — every extracted fact references a specific location so nothing gets mis-attributed. Structured markdown ingestion preserves the document hierarchy rather than flattening it. Token routing: routine boilerplate sections go to a cost-optimised model, sections flagged as regulatory-critical go to a frontier model." },
        { label: "the hard part", value: "EIA sections reference each other constantly — an impact in section 4 depends on a baseline from section 2 and mitigation measures buried in an appendix. Cross-reference resolution across that span is what I'm focused on now." },
        { label: "status", value: "In development." },
      ],
    },
  },
];

const openSourceData: Array<{
  title: string;
  description: string;
  tech: string[];
  github: string;
  detail: DetailItem;
}> = [
  {
    title: "Bifrost",
    description:
      "A desktop tool I built because I got tired of switching terminals. WebSocket streaming, approval flows, and a UI that stays out of your way.",
    tech: ["Electron", "React", "TypeScript", "WebSockets"],
    github: "github.com/pyalwin/bifrost",
    detail: {
      title: "Bifrost",
      rows: [
        { label: "why I built it", value: "I was using Claude Code every day and the raw CLI was getting painful — streaming output flying past, tool calls I couldn't pause, diffs I had to mentally reconstruct. I wanted a proper UI that stayed out of my way but gave me control when I needed it." },
        { label: "what it does", value: "WebSocket streaming renders Claude's output in real time as it arrives. HITL tool approval flows — every tool call surfaces as an approve/reject before it executes. Live diff viewer shows exactly what will change in each file. Session management across multiple runs so you can jump back into earlier conversations." },
        { label: "distribution", value: "Ships via Homebrew — one command install, runs as a native macOS app." },
        { label: "stack", value: "Electron · React · TypeScript · WebSockets" },
      ],
      link: "https://github.com/pyalwin/bifrost",
    },
  },
  {
    title: "Codemesh",
    description:
      "Code knowledge graph for AI coding agents. Indexes with Tree-sitter, exposes an MCP server, and lets agents write back what they learn — 44% cheaper, 57% faster exploration.",
    tech: ["TypeScript", "MCP", "Tree-sitter", "SQLite"],
    github: "github.com/pyalwin/codemesh",
    detail: {
      title: "Codemesh",
      rows: [
        { label: "why I built it", value: "I was watching Claude Code explore a codebase and it was doing the same grep-read-grep loop every session. It had already figured out the auth layer yesterday — it just couldn't remember. That felt like a solvable problem." },
        { label: "how it works", value: "Tree-sitter parses the codebase into a structural graph — files, symbols, imports, call chains, all queryable. Agents hit the graph before reaching for Grep or Read. After reading a file, they write back a summary via codemesh_enrich. Next session, that context is already loaded." },
        { label: "storage", value: "SQLite with FTS5 for zero-dependency local operation. The StorageBackend interface is swappable — Memgraph or Neo4j adapters can replace it without touching the tool layer." },
        { label: "benchmarks", value: "Tested across 6 real codebases. Average answer quality 8.6/10 vs baseline 7.3/10. Up to 80% cost reduction on discovery-heavy tasks. 102 tests passing." },
        { label: "two modes", value: "MCP Server for structured tool calls via Claude Code, or CLI mode via Bash for zero overhead — measurably cheaper and faster." },
      ],
      link: "https://github.com/pyalwin/codemesh",
    },
  },
  {
    title: "Cortex",
    description:
      "Extracts structured data from messy documents using graph techniques. When one model isn't enough, route to the right one. Built for the documents nobody wants to read.",
    tech: ["Multi-Agent", "GraphRAG", "LangGraph", "Python"],
    github: "github.com/pyalwin/cortex",
    detail: {
      title: "Cortex",
      rows: [
        { label: "why I built it", value: "Flat extraction falls apart when a field depends on context from three other sections. Most pipelines ignore that and get it wrong. I wanted something that actually models how the document is structured." },
        { label: "how it works", value: "GraphRAG builds a context graph over the document — entities, relationships, cross-references across sections. A cost-optimised baseline model (langextract) handles routine fields. When it hits ambiguous or cross-referenced entities, LangGraph routes to a frontier model for disambiguation." },
        { label: "cost optimisation", value: "Token routing achieves 60%+ cost reduction per document compared to running everything through a frontier model — without sacrificing accuracy on the hard cases." },
        { label: "observability", value: "HITL confidence scoring on every extraction. Low-confidence outputs surface for human review, and that feedback tightens the routing thresholds over time." },
      ],
      link: "https://github.com/pyalwin/cortex",
    },
  },
  {
    title: "EngramDB",
    description:
      "Schema-aware hybrid retrieval engine — 92.8% recall vs 68.2% vector-only on CUAD contracts. Combines vector search with graph traversal over document structure.",
    tech: ["Python", "DuckDB", "GraphRAG", "Vector Search"],
    github: "github.com/pyalwin/engramdb",
    detail: {
      title: "EngramDB",
      rows: [
        { label: "why I built it", value: "Testing RAG on legal contracts kept hitting the same failure — cross-reference questions would fail because vector search finds semantically similar text, not structurally referenced text. Those aren't the same thing." },
        { label: "how it works", value: "Two-stage hybrid retrieval. Vector search (FAISS) narrows the candidate set first. Then graph traversal takes over — following the document's own section hierarchy, defined term links, and explicit cross-references to pull in the complete context the answer depends on." },
        { label: "storage layer", value: "DuckDB for zero-dependency local operation. Keeps the whole retrieval pipeline in-process without needing a separate vector database or graph server." },
        { label: "benchmarks", value: "92.8% recall (hybrid) vs 68.2% (vector-only) on 35 CUAD contracts. +34 percentage points on cross-reference queries specifically. 183 multi-hop questions." },
      ],
      link: "https://github.com/pyalwin/engramdb",
    },
  },
  {
    title: "Frameforge",
    description:
      "MCP server that generates UI mockup PNGs via Gemini image API. Published on npm — plugs into Claude Code as a stdio tool.",
    tech: ["TypeScript", "MCP", "Gemini API", "npm"],
    github: "github.com/pyalwin/frameforge",
    detail: {
      title: "Frameforge",
      rows: [
        { label: "why I built it", value: "The UI design loop with an AI agent is slow — describe what you want, agent writes code, you run it, realise it looks wrong, describe the change. I wanted to short-circuit that by letting the agent show a rough mockup before anyone writes a line of code." },
        { label: "how it works", value: "Exposes a single MCP tool — generate_ui_mockup. The agent describes a layout in natural language, Frameforge calls Gemini's image generation API, and returns a PNG the agent can reference in context. Visual alignment before implementation." },
        { label: "protocol", value: "Runs as a stdio MCP server — the standard transport for Claude Code tool integrations. No separate process to manage, no network setup." },
        { label: "to install", value: "Published on npm. One config line in your Claude Code MCP settings and it's available as a native tool." },
      ],
      link: "https://github.com/pyalwin/frameforge",
    },
  },
];

const writingData: Array<{
  title: string;
  summary: string;
  platform: string;
  date: string;
  url: string;
  detail: DetailItem;
}> = [
  {
    title: "Beyond RAG: Building Graph-Aware Retrieval for Contract Reasoning",
    summary: "Why vector search alone fails on legal contracts, and how graph traversal over document structure fixes it.",
    platform: "dev.to",
    date: "Mar 2026",
    url: "https://dev.to/pyalwin/beyond-rag-building-graph-aware-retrieval-for-contract-reasoning-3o05",
    detail: {
      title: "Beyond RAG: Graph-Aware Retrieval",
      rows: [
        { label: "what made me write it", value: "I kept hitting the same failure mode — RAG would find something semantically similar but miss the actual answer because it lived in a cross-referenced section. I wanted to write down why that happens and what actually fixes it." },
        { label: "the core argument", value: "Documents aren't bags of text. They have structure — headings, defined terms, clauses that reference other clauses. If your retrieval layer ignores that structure, it misses the answers that depend on following it. Vector search alone can't do that." },
        { label: "what I built", value: "EngramDB — a retrieval engine that runs vector search first, then uses graph traversal over document structure to resolve full context. Tested on 35 CUAD contracts, 183 multi-hop questions." },
        { label: "the numbers", value: "92.8% recall with hybrid retrieval vs 68.2% with vector-only. +34 percentage points on cross-reference queries specifically." },
      ],
      link: "https://dev.to/pyalwin/beyond-rag-building-graph-aware-retrieval-for-contract-reasoning-3o05",
    },
  },
  {
    title: "Stop Chatting with Claude Code. Start Building on It.",
    summary: "Claude Code as a programmable runtime — multi-agent pipelines, subprocess composition, and why the CLI is the API.",
    platform: "Medium",
    date: "Apr 2026",
    url: "https://medium.com/@arun_venkat/stop-chatting-with-claude-code-start-building-on-it-8b9a8e5c5732",
    detail: {
      title: "Stop Chatting with Claude Code",
      rows: [
        { label: "what made me write it", value: "I spent a year using Claude Code mostly as a chat window. Then a project forced me to use it differently — spawning it as a subprocess, piping output to other tools — and I realised I'd been leaving most of it on the table." },
        { label: "the argument", value: "Claude Code is a programmable runtime, not a chatbot. You can spawn sub-agents with scoped permissions, compose their output with other processes, and build multi-step pipelines where Claude handles one stage of many. The CLI is the API." },
        { label: "what it covers", value: "Concrete patterns: spawning Claude Code as a subprocess with --print for structured output, building pipelines where each agent has a single task, session persistence across pipeline stages, and how to think about tool access as a design decision." },
      ],
      link: "https://medium.com/@arun_venkat/stop-chatting-with-claude-code-start-building-on-it-8b9a8e5c5732",
    },
  },
  {
    title: "Claude Code CLI — The Interface That's Actually the Infrastructure",
    summary: "How CLI flags become architectural decisions — scoped permissions, tool boundaries, and why the simplest interface is the most powerful.",
    platform: "Medium",
    date: "Apr 2026",
    url: "https://medium.com/@arun_venkat/build-on-the-cli-why-the-simplest-interface-is-the-most-powerful-be8753ad9a43",
    detail: {
      title: "Claude Code CLI as Infrastructure",
      rows: [
        { label: "what made me write it", value: "While building a multi-agent pipeline I realised I was making architectural decisions through CLI flags — which tools each agent could access, what files it could write, what was completely off limits. That's not configuration. That's system design." },
        { label: "the argument", value: "The CLI is the trust boundary. When you decide what tools Claude Code can access for a given task, you're defining what the agent is allowed to do — which is an infrastructure decision, not a preference. The tool boundary is the architectural boundary." },
        { label: "practical implications", value: "Different agents in a pipeline can have entirely different tool access. An agent that reviews code doesn't need write access. An agent writing to disk doesn't need network access. This isn't limiting — it's how you build agents you can actually trust to run." },
      ],
      link: "https://medium.com/@arun_venkat/build-on-the-cli-why-the-simplest-interface-is-the-most-powerful-be8753ad9a43",
    },
  },
  {
    title: "CLAUDE.md — The File Claude Reads Before You Speak",
    summary: "The file that shapes every session before you type a word — how to encode agent behaviour, conventions, and context that shouldn't need repeating.",
    platform: "Medium",
    date: "Apr 2026",
    url: "https://medium.com/@arun_venkat/claude-md-the-file-claude-reads-before-you-speak-1bbea5ccb59a",
    detail: {
      title: "CLAUDE.md — Before You Speak",
      rows: [
        { label: "what made me write it", value: "I watched someone get frustrated because Claude kept doing something they didn't want. They'd correct it, it would do it again next session. The fix was a two-line addition to CLAUDE.md — a file they didn't know existed." },
        { label: "the point", value: "CLAUDE.md is read before every session, before anything you type. It's not a settings file — it's where you engineer the agent's default behaviour. Whatever you put in there shapes how Claude interprets every instruction that follows." },
        { label: "how it layers", value: "Global CLAUDE.md for preferences that apply everywhere. Project-level for codebase context and conventions. Directory-level for specific subsystems. The most specific file wins, so you can override globally without touching per-project config." },
      ],
      link: "https://medium.com/@arun_venkat/claude-md-the-file-claude-reads-before-you-speak-1bbea5ccb59a",
    },
  },
  {
    title: "Beyond Simple Prompts: Architecting an AI Agent",
    summary: "AgreedPro deep-dive — paragraph anchoring, token-based Word diffing, and why determinism matters more than cleverness in production AI.",
    platform: "dev.to",
    date: "Dec 2025",
    url: "https://dev.to/pyalwin/beyond-simple-prompts-architecting-an-ai-agent-1i8c",
    detail: {
      title: "Architecting an AI Agent",
      rows: [
        { label: "what made me write it", value: "I'd shipped AgreedPro to early users and the feedback wasn't about answer quality — it was about trust. They wanted to know how it got there. That pushed me to think harder about what makes an AI agent something people will actually rely on." },
        { label: "the main argument", value: "Getting an agent to produce good outputs is the easier half. The harder half is building something so that when it's wrong, you know it's wrong. That requires determinism — tracing every output back to a source, not hoping the model got it right." },
        { label: "paragraph anchoring", value: "Every chunk in AgreedPro gets a deterministic source ID injected before it hits the vector index. The model is required to cite that ID in its answer. A rule-based mapping layer traces the ID back to the exact paragraph. The citation is structurally enforced — it either exists or it doesn't." },
        { label: "token-based Word diffing", value: "Legal review happens on Word documents with tracked changes. I built a token-level differ that preserves insertions, deletions, and move operations from the XML layer — so the agent sees 'proposed clause 4.2 replaces accepted clause 4.1' rather than just the final text." },
      ],
      link: "https://dev.to/pyalwin/beyond-simple-prompts-architecting-an-ai-agent-1i8c",
    },
  },
];

const contactLinks = [
  {
    label: "Email",
    value: "arun.tgode@gmail.com",
    href: "mailto:arun.tgode@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "in/arun-venkataramanan",
    href: "https://linkedin.com/in/arun-venkataramanan",
  },
  {
    label: "GitHub",
    value: "github.com/pyalwin",
    href: "https://github.com/pyalwin",
  },
  { label: "Location", value: "Bangalore / Chennai, India" },
];

// ─── Types ─────────────────────────────────────────────────

interface Message {
  id: string;
  type: "command" | "response" | "error" | "divider";
  command?: string;
  content?: React.ReactNode;
  shouldType?: boolean;
}

// ─── TypeWriter ────────────────────────────────────────────

function TypeWriter({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const completeFired = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    completeFired.current = false;
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index >= text.length) {
      if (!completeFired.current) {
        completeFired.current = true;
        const t = setTimeout(() => onCompleteRef.current?.(), 150);
        return () => clearTimeout(t);
      }
      return;
    }

    const speed = 60 + Math.random() * 80;
    const timer = setTimeout(() => setIndex((p) => p + 1), speed);
    return () => clearTimeout(timer);
  }, [index, text.length]);

  return (
    <>
      <span>{text.slice(0, index)}</span>
      {index < text.length && (
        <span className="cursor-blink ml-px text-sky">&#x2588;</span>
      )}
    </>
  );
}

// ─── ToolBlock ─────────────────────────────────────────────

function ToolBlock({
  label,
  count,
  children,
}: {
  label: string;
  count?: number;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="my-1">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="group flex items-center gap-2 text-xs text-subtext1 transition hover:text-sky"
      >
        <ChevronRight
          size={12}
          className={`transition-transform ${expanded ? "rotate-90" : ""}`}
        />
        <span className="text-sky">Read</span>
        <span>{label}</span>
        {count != null && (
          <span className="text-subtext0">({count} entries)</span>
        )}
      </button>

      {expanded && (
        <div className="ml-1.5 mt-2 space-y-4 border-l-2 border-surface2 pl-4">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Response Renderers ────────────────────────────────────

function WhoamiResponse() {
  return (
    <div className="space-y-3 pl-1">
      <div>
        <p className="text-lg font-bold text-text">Arun Venkataramanan</p>
        <p className="text-sm text-subtext1">
          Engineer who ships &middot; Bangalore / Chennai
        </p>
      </div>
      <p className="max-w-xl text-sm leading-6 text-subtext1">
        I've been writing software for 12+ years. Started in enterprise IT,
        spent six years building a fintech SaaS from zero, and now I build
        product and platform systems at{" "}
        <span className="font-bold text-peach">Ottimate</span>.
      </p>
      <p className="max-w-xl text-sm leading-6 text-subtext1">
        I like problems where the business logic is messy and the happy path
        is a lie. I reach for AI when it actually helps — not because it's
        on the roadmap.
      </p>
      <p className="max-w-xl text-sm leading-6 text-subtext1">
        Off-hours I build my own tools (Bifrost, Agentic Coding Bot) mostly to avoid
        the ones that annoy me.
      </p>
    </div>
  );
}

function ExperienceResponse() {
  return (
    <ToolBlock label="experience.json" count={experienceData.length}>
      {experienceData.map((exp, i) => (
        <div
          key={exp.company}
          className="stream-line pb-1"
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-bold text-text">{exp.company}</span>
            <span className="text-xs text-subtext0">{exp.period}</span>
          </div>
          <p className="mt-0.5 text-xs text-peach">{exp.role}</p>
          <p className="mt-1 text-xs leading-5 text-subtext1">
            {exp.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="rounded border border-line px-1.5 py-0.5 text-[11px] text-subtext0"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </ToolBlock>
  );
}

function ProjectsResponse() {
  const onExplain = useContext(ExplainContext);
  return (
    <ToolBlock label="selected_projects.py" count={projectsData.length}>
      {projectsData.map((proj, i) => (
        <div
          key={proj.title}
          className="stream-line pb-1"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-bold text-text">{proj.title}</span>
            <span className="text-xs text-subtext0">[{proj.category}]</span>
          </div>
          <p className="mt-0.5 text-xs leading-5 text-subtext1">
            {proj.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {proj.tech.map((t) => (
              <span
                key={t}
                className="rounded border border-line px-1.5 py-0.5 text-[11px] text-subtext0"
              >
                {t}
              </span>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => onExplain(proj.detail)}
                className="flex items-center gap-1 text-xs text-sky transition hover:text-sky/80"
              >
                <Sparkles size={11} />
                /explain
              </button>
              {proj.github && (
                <a
                  href={`https://${proj.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-subtext0 transition hover:text-sky"
                >
                  source <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </ToolBlock>
  );
}

function OpenSourceResponse() {
  const onExplain = useContext(ExplainContext);
  return (
    <ToolBlock label="open_source.sh" count={openSourceData.length}>
      {openSourceData.map((repo, i) => (
        <div
          key={repo.title}
          className="stream-line pb-1"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-bold text-text">{repo.title}</span>
            <span className="text-xs text-subtext0">[open source]</span>
          </div>
          <p className="mt-0.5 text-xs leading-5 text-subtext1">
            {repo.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {repo.tech.map((t) => (
              <span
                key={t}
                className="rounded border border-line px-1.5 py-0.5 text-[11px] text-subtext0"
              >
                {t}
              </span>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => onExplain(repo.detail)}
                className="flex items-center gap-1 text-xs text-green transition hover:text-green/80"
              >
                <Sparkles size={11} />
                /explain
              </button>
              <a
                href={`https://${repo.github}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-subtext0 transition hover:text-green"
              >
                source <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      ))}
    </ToolBlock>
  );
}

function WritingResponse() {
  const onExplain = useContext(ExplainContext);
  return (
    <ToolBlock label="writing.md" count={writingData.length}>
      {writingData.map((article, i) => (
        <div
          key={article.title}
          className="stream-line pb-1"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <p className="text-xs font-bold text-text">{article.title}</p>
          <p className="mt-0.5 text-xs leading-5 text-subtext1">{article.summary}</p>
          <div className="mt-1 flex items-center gap-3">
            <button
              type="button"
              onClick={() => onExplain(article.detail)}
              className="flex items-center gap-1 text-xs text-peach transition hover:text-peach/80"
            >
              <Sparkles size={11} />
              /explain
            </button>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs text-subtext0 transition hover:text-peach"
            >
              read <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      ))}
    </ToolBlock>
  );
}

function ContactResponse() {
  return (
    <div className="space-y-2 pl-1">
      {contactLinks.map((link) => (
        <div key={link.label} className="flex items-baseline gap-4 text-sm">
          <span className="w-20 shrink-0 text-right text-subtext0">
            {link.label}
          </span>
          {link.href ? (
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-text transition hover:text-sky hover:underline"
            >
              {link.value}
            </a>
          ) : (
            <span className="text-text">{link.value}</span>
          )}
        </div>
      ))}
      <p className="mt-2 text-xs text-subtext0">
        Easiest way to reach me is email. I actually read it.
      </p>
    </div>
  );
}

function HelpResponse() {
  const cmds = [
    { name: "whoami", desc: "who I am, short version" },
    { name: "experience", desc: "places I've worked and what I did there" },
    { name: "projects", desc: "stuff I've built (work and nights/weekends)" },
    { name: "opensource", desc: "public repos and OSS contributions" },
    { name: "writing", desc: "articles on RAG, agents, and Claude Code" },
    { name: "contact", desc: "how to actually reach me" },
    { name: "skills", desc: "tools I reach for" },
    { name: "help / ?", desc: "this menu" },
    { name: "clear", desc: "wipe the screen" },
    { name: "resume", desc: "let the tour run again" },
  ];

  return (
    <div className="space-y-1 pl-1">
      <p className="mb-2 text-sm text-sky">Available commands</p>
      {cmds.map((c) => (
        <div key={c.name} className="flex gap-4 text-sm">
          <span className="w-28 shrink-0 font-bold text-yellow">{c.name}</span>
          <span className="text-subtext1">{c.desc}</span>
        </div>
      ))}
    </div>
  );
}

function SkillsResponse() {
  const groups = [
    {
      label: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "SQL"],
    },
    {
      label: "Frameworks",
      items: ["React", "Next.js", "FastAPI", "LangChain"],
    },
    {
      label: "Platforms",
      items: ["AWS", "Docker", "PostgreSQL", "Redis"],
    },
    {
      label: "AI / ML",
      items: ["RAG", "Agents", "LangGraph", "Claude SDK"],
    },
    {
      label: "Tools",
      items: ["Git", "Linux", "Electron", "WebSockets"],
    },
  ];

  return (
    <div className="space-y-2 pl-1">
      {groups.map((g) => (
        <div key={g.label} className="flex gap-4 text-sm">
          <span className="w-24 shrink-0 text-right text-subtext0">
            {g.label}
          </span>
          <span className="text-subtext1">{g.items.join(" · ")}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Command Registry ──────────────────────────────────────

const commandRegistry: Record<
  string,
  { render: () => React.ReactNode }
> = {
  whoami: { render: () => <WhoamiResponse /> },
  about: { render: () => <WhoamiResponse /> },
  experience: { render: () => <ExperienceResponse /> },
  projects: { render: () => <ProjectsResponse /> },
  opensource: { render: () => <OpenSourceResponse /> },
  writing: { render: () => <WritingResponse /> },
  contact: { render: () => <ContactResponse /> },
  help: { render: () => <HelpResponse /> },
  "?": { render: () => <HelpResponse /> },
  skills: { render: () => <SkillsResponse /> },
};

function resolveCommand(raw: string): string {
  const base = raw.trim().toLowerCase().split(/\s+/)[0];
  const aliases: Record<string, string> = {
    about: "whoami",
    exp: "experience",
    work: "experience",
    proj: "projects",
    oss: "opensource",
    articles: "writing",
    blog: "writing",
    links: "contact",
  };
  return aliases[base] || base;
}

// ─── Auto-run Sequence ─────────────────────────────────────

const autoSequence = [
  { command: "whoami", key: "whoami" },
  { command: "experience --timeline", key: "experience" },
  { command: "projects --list", key: "projects" },
  { command: "opensource --repos", key: "opensource" },
  { command: "writing --articles", key: "writing" },
  { command: "contact --channels", key: "contact" },
];

// ─── Hero Banner ──────────────────────────────────────────

function HeroBanner({ isAutoRunning }: { isAutoRunning: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mb-6 min-h-[140px] overflow-hidden rounded-lg border border-line bg-panel"
    >
      {/* Signal backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={signalImage}
          alt=""
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-background/40" />

        <div className="absolute inset-x-0 top-[8%] h-[11%] overflow-hidden border-y border-background/80 opacity-70">
          <Image src={signalImage} alt="" fill loading="eager" sizes="100vw" className="scale-110 object-cover object-top" />
        </div>
        <div className="absolute inset-x-0 top-[27%] h-[15%] overflow-hidden border-y border-background/80 opacity-80">
          <Image src={signalImage} alt="" fill loading="eager" sizes="100vw" className="scale-125 object-cover object-center" />
        </div>
        <div className="absolute inset-x-0 bottom-[14%] h-[13%] overflow-hidden border-y border-background/80 opacity-65">
          <Image src={signalImage} alt="" fill loading="eager" sizes="100vw" className="scale-110 object-cover object-bottom" />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,17,16,0.94)_0%,rgba(15,17,16,0.72)_46%,rgba(15,17,16,0.36)_100%)]" />
        <div className="absolute inset-x-0 top-[22%] h-3 bg-background" />
        <div className="absolute inset-x-0 top-[45%] h-4 bg-background" />
        <div className="absolute inset-x-0 bottom-[9%] h-3 bg-background" />
      </div>

      {/* Content */}
      <div className="relative grid min-h-[140px] gap-3 p-4 md:grid-cols-[1fr_auto] md:items-end">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-subtext1">
          <span className="rounded-md border border-line bg-background/75 px-2 py-1 backdrop-blur">
            Bangalore / Chennai, India
          </span>
        </div>

        <div className="max-w-4xl md:col-start-1">
          <p className="mb-1 text-xs text-sky">
            builds things / ships them / keeps them running
          </p>
          <h1 className="mb-1 max-w-3xl font-mono text-2xl font-bold leading-tight text-text sm:text-3xl">
            Arun Venkataramanan
          </h1>
          <p className="hidden max-w-2xl text-sm leading-6 text-subtext1 md:block">
            12+ years writing software. I like the messy problems — the ones
            with weird edge cases, unhappy paths, and real users on the other end.
          </p>
        </div>

        <div className="md:col-start-2 md:row-span-2 md:row-start-1">
          <div className="rounded-md border border-line bg-background/70 p-2.5 backdrop-blur">
            <div className="flex items-center gap-2 text-xs">
              <Sparkles size={14} className="text-sky" />
              <span className="font-bold text-sky">arun-portfolio</span>
              <span className="text-subtext0">v2.0</span>
            </div>
            <p className="mt-1.5 text-xs text-subtext0">
              {isAutoRunning
                ? "running through the intro · Esc to take over"
                : "your turn — type something or ? for help"}
            </p>
          </div>
        </div>
      </div>

    </motion.div>
  );
}

// ─── Quirky Facts ─────────────────────────────────────────

const quirkyFacts = [
  {
    fact: "Python — which I write daily — is named after Monty Python, not the snake. Guido van Rossum was reading comedy scripts while building it.",
    source: "Python docs FAQ",
    tag: "python",
    rel: "primary language",
  },
  {
    fact: "JavaScript — powering every React app I build — was created in just 10 days by Brendan Eich. The \"Java\" in the name was pure marketing.",
    source: "Brendan Eich, 2005 interview",
    tag: "javascript",
    rel: "frontend stack",
  },
  {
    fact: "Bangalore became India's tech hub partly because Texas Instruments' equipment arrived by bullock cart in 1982. The city I work from started there.",
    source: "The Scalers",
    tag: "bangalore",
    rel: "home base",
  },
  {
    fact: "Bangalore was the first city in Asia to get electric street lights, in 1905 — 80 years before its tech boom. Innovation runs deep here.",
    source: "Karnataka state archives",
    tag: "bangalore",
    rel: "home base",
  },
  {
    fact: "Git — the tool I commit with every day — was built by Linus Torvalds in about two weeks after a licensing dispute. Now it runs the world's code.",
    source: "Linus Torvalds, 2007 talk",
    tag: "git",
    rel: "daily tool",
  },
  {
    fact: "RAG — retrieval-augmented generation, which powers AgreedPro — was first formalized by Facebook AI in 2020. It's now the backbone of production AI systems.",
    source: "Lewis et al., 2020",
    tag: "RAG",
    rel: "AgreedPro",
  },
  {
    fact: "Docker containers — which I use for Agentic Coding Bot's sandboxed execution — share the host OS kernel. That's why they're seconds, not minutes, to spin up.",
    source: "Docker documentation",
    tag: "docker",
    rel: "Agentic Coding Bot",
  },
  {
    fact: "Rubber duck debugging is a real technique. Explaining code to a duck often solves the bug — I've done this more times than I'll admit.",
    source: "The Pragmatic Programmer, 1999",
    tag: "debugging",
    rel: "daily practice",
  },
  {
    fact: "FAISS — the vector store behind AgreedPro — was built by Facebook AI Research and can search billions of vectors in milliseconds.",
    source: "Facebook AI Research",
    tag: "FAISS",
    rel: "AgreedPro",
  },
  {
    fact: "Electron — which powers Bifrost — runs Slack, VS Code, Discord, and Figma. Love it or hate it, it won the desktop app war.",
    source: "GitHub/Electron project",
    tag: "electron",
    rel: "Bifrost",
  },
  {
    fact: "WebSockets — key to Bifrost's streaming — maintain a persistent connection. No polling, no overhead. Just a pipe that stays open.",
    source: "RFC 6455",
    tag: "websockets",
    rel: "Bifrost",
  },
  {
    fact: "India's AP automation market — the space Ottimate operates in — is expected to grow 12%+ annually through 2028. Still a lot of invoices to digitize.",
    source: "Mordor Intelligence",
    tag: "AP automation",
    rel: "Ottimate",
  },
  {
    fact: "Bangalore once had over 1,000 lakes. Today, only about 80 remain. It's still called the \"Garden City\" — I can confirm the gardens are real.",
    source: "Karnataka Urban Development",
    tag: "bangalore",
    rel: "home base",
  },
  {
    fact: "Next.js — the framework this portfolio runs on — was created by Vercel in 2016. It now powers some of the most-trafficked sites on the web.",
    source: "Vercel",
    tag: "next.js",
    rel: "this site",
  },
];

function QuirkyFacts() {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * quirkyFacts.length),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quirkyFacts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = quirkyFacts[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mx-auto mt-6 max-w-2xl"
    >
      <div className="rounded-xl border border-line bg-surface0/40 px-7 py-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-yellow">
            <Sparkles size={15} />
            <span className="font-bold">while (idle)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-sky/30 bg-sky/10 px-2 py-1 text-xs text-sky">
              {current.rel}
            </span>
            <span className="rounded-md border border-line bg-background px-2 py-1 text-xs text-subtext0">
              {current.tag}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="min-h-[80px]"
          >
            <p className="mb-3 text-base leading-7 text-subtext1">
              {current.fact}
            </p>
            <p className="text-xs text-subtext0">
              &mdash; {current.source}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex items-center gap-1.5 border-t border-line pt-4">
          {quirkyFacts.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-5 bg-yellow"
                  : "w-1.5 bg-surface2 hover:bg-overlay0"
              }`}
              aria-label={`Fact ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Message Block ─────────────────────────────────────────

function MessageBlock({
  message,
  onTypingDone,
}: {
  message: Message;
  onTypingDone?: (id: string) => void;
}) {
  switch (message.type) {
    case "command":
      return (
        <div className="flex items-start gap-2 py-1">
          <span className="shrink-0 select-none text-green">&gt;</span>
          <span className="text-text">
            {message.shouldType ? (
              <TypeWriter
                text={message.command!}
                onComplete={() => onTypingDone?.(message.id)}
              />
            ) : (
              message.command
            )}
          </span>
        </div>
      );

    case "response":
      return (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 mt-1 pl-4"
        >
          {message.content}
        </motion.div>
      );

    case "error":
      return (
        <div className="mb-4 mt-1 pl-4 text-sm text-red">
          {message.content}
        </div>
      );

    case "divider":
      return (
        <div className="my-4 flex items-center gap-3 text-xs text-subtext0">
          <div className="h-px flex-1 bg-line" />
          <span>{message.content}</span>
          <div className="h-px flex-1 bg-line" />
        </div>
      );
  }
}

// ─── Main Component ────────────────────────────────────────

export default function CLISession() {
  const [selected, setSelected] = useState<DetailItem | null>(null);
  const [currentPair, setCurrentPair] = useState<{
    commandMsg: Message;
    responseMsg: Message | null;
  } | null>(null);
  const [input, setInput] = useState("");
  const [isAutoRunning, setIsAutoRunning] = useState(true);
  const [autoStep, setAutoStep] = useState(0);
  const [autoPhase, setAutoPhase] = useState<
    "idle" | "typing" | "responded"
  >("idle");
  const [isComplete, setIsComplete] = useState(false);
  const [commandCount, setCommandCount] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── auto-run: start typing when idle ──

  useEffect(() => {
    if (!isAutoRunning || autoPhase !== "idle") return;
    if (autoStep >= autoSequence.length) {
      setCurrentPair(null);
      setIsAutoRunning(false);
      setIsComplete(true);
      return;
    }

    const delay = autoStep === 0 ? 1800 : 1400;
    const timer = setTimeout(() => {
      const cmd = autoSequence[autoStep];
      setCurrentPair({
        commandMsg: {
          id: `auto-cmd-${autoStep}`,
          type: "command",
          command: cmd.command,
          shouldType: true,
        },
        responseMsg: null,
      });
      setAutoPhase("typing");
      setCommandCount((c) => c + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isAutoRunning, autoPhase, autoStep]);

  // ── auto-run: typing done callback ──

  const handleTypingDone = useCallback(
    (_id: string) => {
      if (autoPhase !== "typing") return;

      const timer = setTimeout(() => {
        const cmd = autoSequence[autoStep];
        const handler = commandRegistry[cmd.key];
        if (handler) {
          setCurrentPair((prev) =>
            prev
              ? {
                  ...prev,
                  responseMsg: {
                    id: `auto-resp-${autoStep}`,
                    type: "response",
                    content: handler.render(),
                  },
                }
              : null,
          );
        }
        setAutoPhase("responded");
      }, 700);

      return () => clearTimeout(timer);
    },
    [autoPhase, autoStep],
  );

  // ── auto-run: advance after response shown ──

  useEffect(() => {
    if (autoPhase !== "responded") return;

    const timer = setTimeout(() => {
      setAutoStep((s) => s + 1);
      setAutoPhase("idle");
    }, 4500);

    return () => clearTimeout(timer);
  }, [autoPhase]);

  // ── manual command handler ──

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const raw = input.trim();
      if (!raw) return;

      setInput("");

      // Special commands
      if (raw.toLowerCase() === "clear") {
        setCurrentPair(null);
        return;
      }

      if (
        raw.toLowerCase() === "resume" ||
        raw.toLowerCase() === "play"
      ) {
        if (!isComplete && !isAutoRunning) {
          setIsAutoRunning(true);
          setAutoPhase("idle");
        }
        return;
      }

      const cmdMsg: Message = {
        id: `manual-${Date.now()}`,
        type: "command",
        command: raw,
        shouldType: false,
      };
      setCommandCount((c) => c + 1);

      // Resolve and execute
      const resolved = resolveCommand(raw);
      const handler = commandRegistry[resolved];

      if (handler) {
        setCurrentPair({
          commandMsg: cmdMsg,
          responseMsg: {
            id: `resp-${Date.now()}`,
            type: "response",
            content: handler.render(),
          },
        });
      } else {
        setCurrentPair({
          commandMsg: cmdMsg,
          responseMsg: {
            id: `err-${Date.now()}`,
            type: "error",
            content: (
              <span>
                don't know that one: <span className="text-text">{raw}</span>. try{" "}
                <span className="font-bold text-yellow">?</span> to see what works.
              </span>
            ),
          },
        });
      }
    },
    [input, isComplete, isAutoRunning],
  );

  // ── keyboard shortcuts ──

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";

      if (e.key === "Escape") {
        e.preventDefault();
        if (selected) {
          setSelected(null);
        } else if (isAutoRunning) {
          setIsAutoRunning(false);
          setTimeout(() => inputRef.current?.focus(), 100);
        }
      }

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAutoRunning, selected]);

  // ── focus input when auto-run stops ──

  useEffect(() => {
    if (!isAutoRunning) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isAutoRunning]);

  const inputDisabled = isAutoRunning && autoPhase !== "idle";

  // ── header time ──
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  // ── active file label ──
  const activeFile = (() => {
    if (!currentPair?.commandMsg?.command) return "home.md";
    const resolved = resolveCommand(currentPair.commandMsg.command);
    const fileMap: Record<string, string> = {
      whoami: "profile.md",
      experience: "experience.json",
      projects: "selected_projects.py",
      opensource: "open_source.sh",
      writing: "writing.md",
      contact: "contact.sh",
      help: "help.txt",
      skills: "skills.yml",
    };
    return fileMap[resolved] || "home.md";
  })();

  return (
    <ExplainContext.Provider value={setSelected}>
    <div className="fixed inset-0 flex flex-col bg-background font-mono text-sm text-text">
      {/* ── Header bar ── */}
      <header className="z-50 flex h-9 shrink-0 items-center gap-2 overflow-x-auto border-b border-line bg-panel px-3 text-[11px] text-subtext1 no-scrollbar sm:px-4">
        <div className="flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-surface0 px-2 py-1 font-bold text-text">
          <TerminalIcon size={13} className="text-sky" />
          <span>arun_os</span>
        </div>

        <div className="flex min-w-[140px] shrink-0 items-center gap-1.5 text-subtext0 sm:min-w-[200px]">
          <span>~/arun/</span>
          <span className="truncate font-bold text-sky">{activeFile}</span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {[
            { label: "whoami", key: "whoami" },
            { label: "experience", key: "experience" },
            { label: "projects", key: "projects" },
            { label: "opensource", key: "opensource" },
            { label: "writing", key: "writing" },
            { label: "contact", key: "contact" },
          ].map((nav) => (
            <button
              key={nav.key}
              type="button"
              onClick={() => {
                if (isAutoRunning) setIsAutoRunning(false);
                setCommandCount((c) => c + 1);
                const handler = commandRegistry[nav.key];
                setCurrentPair({
                  commandMsg: {
                    id: `nav-${Date.now()}`,
                    type: "command",
                    command: nav.key,
                    shouldType: false,
                  },
                  responseMsg: handler
                    ? {
                        id: `resp-${Date.now()}`,
                        type: "response",
                        content: handler.render(),
                      }
                    : null,
                });
              }}
              className="shrink-0 rounded-md border border-transparent px-2 py-1 text-subtext1 transition hover:border-line hover:bg-surface0 hover:text-text"
            >
              {nav.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              if (isAutoRunning) setIsAutoRunning(false);
              else if (!isComplete) {
                setIsAutoRunning(true);
                setAutoPhase("idle");
              }
            }}
            className={`flex items-center gap-1.5 rounded-md border px-2 py-1 transition ${
              isAutoRunning
                ? "border-sky bg-sky text-background"
                : "border-line bg-surface0 text-subtext1 hover:border-sky hover:text-sky"
            }`}
          >
            {isAutoRunning ? (
              <Pause size={11} />
            ) : (
              <Play size={11} />
            )}
            <span className="hidden sm:inline">
              {isAutoRunning ? "auto:on" : isComplete ? "done" : "paused"}
            </span>
          </button>
          <div className="hidden items-center gap-1.5 rounded-md border border-line bg-surface0 px-2 py-1 text-text sm:flex">
            <Clock size={12} className="text-green" />
            <span>{time}</span>
          </div>
        </div>
      </header>

      {/* ── Hero banner (floating) ── */}
      <div className="shrink-0 px-4 pt-3 pb-1 sm:px-8 lg:px-12">
        <HeroBanner isAutoRunning={isAutoRunning} />
      </div>

      {/* ── Message area (current command only) ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
      >
        <div className="px-4 py-4 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            {currentPair && (
              <motion.div
                key={currentPair.commandMsg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <MessageBlock
                  message={currentPair.commandMsg}
                  onTypingDone={handleTypingDone}
                />
                {currentPair.responseMsg && (
                  <MessageBlock
                    message={currentPair.responseMsg}
                    onTypingDone={handleTypingDone}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show quirky facts when complete and idle */}
          {isComplete && !currentPair && <QuirkyFacts />}

          <div ref={endRef} className="h-4" />
        </div>
      </div>

      {/* ── Input bar ── */}
      <div className="shrink-0 border-t border-line bg-panel">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-8 lg:px-12">
          <span className="shrink-0 select-none text-green">&gt;</span>
          <form onSubmit={handleSubmit} className="flex min-w-0 flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={inputDisabled}
              className="min-w-0 flex-1 border-none bg-transparent p-0 text-text caret-sky outline-none placeholder:text-subtext0/60 disabled:opacity-40"
              placeholder={
                isAutoRunning
                  ? "running the tour... Esc to take over"
                  : "type something — ? if you're lost"
              }
              autoComplete="off"
              spellCheck={false}
            />
          </form>
          {!isAutoRunning && !isComplete && (
            <span className="cursor-blink text-sky">&#x2588;</span>
          )}
          {isAutoRunning && !isComplete ? (
            <button
              type="button"
              onClick={() => setIsAutoRunning(false)}
              className="flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-surface0 px-2.5 py-1.5 text-xs text-subtext1 transition hover:border-sky hover:text-sky"
            >
              <Pause size={12} />
              <span className="hidden sm:inline">pause</span>
            </button>
          ) : !isComplete ? (
            <button
              type="button"
              onClick={() => {
                setIsAutoRunning(true);
                setAutoPhase("idle");
              }}
              className="flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-surface0 px-2.5 py-1.5 text-xs text-subtext1 transition hover:border-sky hover:text-sky"
            >
              <Play size={12} />
              <span className="hidden sm:inline">resume</span>
            </button>
          ) : null}
        </div>
      </div>

      {/* ── Status bar ── */}
      <div className="shrink-0 border-t border-line bg-background">
        <div className="flex items-center gap-4 px-4 py-1.5 text-xs text-subtext0 sm:px-8 lg:px-12">
          <span className="flex items-center gap-1.5">
            <Circle
              size={7}
              fill={
                isAutoRunning
                  ? "var(--green)"
                  : isComplete
                    ? "var(--sky)"
                    : "var(--yellow)"
              }
              stroke="none"
            />
            <span>
              {isAutoRunning
                ? "auto"
                : isComplete
                  ? "ready"
                  : "paused"}
            </span>
          </span>
          <span>{commandCount} commands</span>
          {isComplete ? (
            <span className="text-sky">
              that's the tour &middot; poke around or type ? to see the rest
            </span>
          ) : (
            <span className="hidden sm:inline">
              / to focus &middot; Esc to{" "}
              {isAutoRunning ? "pause" : "toggle"}
            </span>
          )}
          <span className="ml-auto text-subtext1">
            arun-portfolio
          </span>
        </div>
      </div>
    </div>
    <DetailPanel item={selected} onClose={() => setSelected(null)} />
    </ExplainContext.Provider>
  );
}
