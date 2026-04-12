"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Cpu, Database, Github, Layout, Network, Package, Sparkles } from "lucide-react";
import DetailPanel, { type DetailItem } from "./DetailPanel";

const repos: Array<{
  title: string;
  description: string;
  tech: string[];
  icon: React.ReactNode;
  github: string;
  stars: number | null;
  status: string;
  image: string;
  detail: DetailItem;
}> = [
  {
    title: "Bifrost",
    description:
      "Desktop developer tool with WebSocket streaming, approval flows, and a clean interface for command-heavy work. Built because switching terminals got old.",
    tech: ["Electron", "React", "TypeScript", "WebSockets"],
    icon: <Layout className="text-yellow" size={22} />,
    github: "github.com/pyalwin/bifrost",
    stars: null,
    status: "desktop tooling",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "Bifrost",
      rows: [
        { label: "why I built it", value: "I was using Claude Code every day and the raw CLI was getting painful — streaming output flying past, tool calls I couldn't pause, diffs I had to mentally reconstruct. I wanted a proper UI that stayed out of my way but gave me control when I needed it." },
        { label: "what it does", value: "WebSocket streaming renders Claude's output in real time as it arrives. HITL tool approval flows — every tool call surfaces as an approve/reject before it executes, so you stay in control. Live diff viewer shows exactly what will change in each file. Session management and discovery across multiple runs so you can jump back into earlier conversations." },
        { label: "distribution", value: "Ships via Homebrew — one command install, runs as a native macOS app." },
        { label: "stack", value: "Electron · React · TypeScript · WebSockets" },
        { label: "status", value: "Open source, actively used." },
      ],
      link: "https://github.com/pyalwin/bifrost",
    },
  },
  {
    title: "Codemesh",
    description:
      "I noticed AI agents spending most of their tokens just figuring out where things are in a codebase. Codemesh gives agents a persistent knowledge graph so they stop rediscovering the same things every session.",
    tech: ["TypeScript", "MCP", "Tree-sitter", "SQLite"],
    icon: <Network className="text-peach" size={22} />,
    github: "github.com/pyalwin/codemesh",
    stars: null,
    status: "AI agent tooling",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "Codemesh",
      rows: [
        { label: "why I built it", value: "I was watching Claude Code explore a codebase and it was doing the same grep-read-grep loop every session. It had already figured out the auth layer yesterday — it just couldn't remember. That felt like a solvable problem." },
        { label: "how it works", value: "Tree-sitter parses the codebase into a structural graph — files, symbols, imports, call chains, all queryable. Agents hit the graph before reaching for Grep or Read. After reading a file, they write back a summary via codemesh_enrich. Next session, that context is already loaded." },
        { label: "storage", value: "SQLite with FTS5 for zero-dependency local operation. The StorageBackend interface is swappable — Memgraph or Neo4j adapters can replace it without touching the tool layer." },
        { label: "benchmarks", value: "Tested across 6 real codebases including VS Code, Excalidraw, and Swift Compiler. Average answer quality 8.6/10 vs baseline 7.3/10. Up to 80% cost reduction on discovery-heavy tasks. 102 tests passing." },
        { label: "two modes", value: "MCP Server for structured tool calls via Claude Code (best with Opus), or CLI mode via Bash for zero overhead (best with Sonnet — measurably cheaper and faster)." },
        { label: "stack", value: "TypeScript · MCP · Tree-sitter · SQLite + FTS5" },
      ],
      link: "https://github.com/pyalwin/codemesh",
    },
  },
  {
    title: "Cortex",
    description:
      "Real documents are messy — entities that reference other entities across sections, tables that only make sense with surrounding context. Cortex is my attempt to extract from them without losing that structure.",
    tech: ["Multi-Agent", "GraphRAG", "LangGraph", "Python"],
    icon: <Cpu className="text-green" size={22} />,
    github: "github.com/pyalwin/cortex",
    stars: null,
    status: "document workflows",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "Cortex",
      rows: [
        { label: "why I built it", value: "Flat extraction falls apart when a field depends on context from three other sections. Most pipelines ignore that and get it wrong. I wanted something that actually models how the document is structured." },
        { label: "how it works", value: "GraphRAG builds a context graph over the document — entities, relationships, cross-references across sections. A cost-optimised baseline model (langextract) handles routine fields. When it hits ambiguous or cross-referenced entities, LangGraph routes to a frontier model for disambiguation. Result: accurate extraction without spending frontier tokens on every field." },
        { label: "cost optimisation", value: "Token routing achieves 60%+ cost reduction per document compared to running everything through a frontier model — without sacrificing accuracy on the hard cases." },
        { label: "observability", value: "HITL confidence scoring on every extraction. Low-confidence outputs surface for human review, and that feedback tightens the routing thresholds over time." },
        { label: "stack", value: "Multi-Agent · GraphRAG · LangGraph · Python" },
        { label: "status", value: "Open source, actively being built." },
      ],
      link: "https://github.com/pyalwin/cortex",
    },
  },
  {
    title: "EngramDB",
    description:
      "Vector search doesn't know that 'the obligations in clause 4.2' refers to something three pages earlier. EngramDB does — it follows the document's own structure to answer questions the way a human reader would.",
    tech: ["Python", "DuckDB", "GraphRAG", "Vector Search"],
    icon: <Database className="text-sky" size={22} />,
    github: "github.com/pyalwin/engramdb",
    stars: null,
    status: "retrieval engine",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "EngramDB",
      rows: [
        { label: "why I built it", value: "Testing RAG on legal contracts kept hitting the same failure — cross-reference questions would fail because vector search finds semantically similar text, not structurally referenced text. Those aren't the same thing." },
        { label: "how it works", value: "Two-stage hybrid retrieval. Vector search (FAISS) narrows the candidate set first. Then graph traversal takes over — following the document's own section hierarchy, defined term links, and explicit cross-references to pull in the complete context the answer depends on. The graph is derived from the document structure itself." },
        { label: "storage layer", value: "DuckDB for zero-dependency local operation. Keeps the whole retrieval pipeline in-process without needing a separate vector database or graph server." },
        { label: "benchmarks", value: "92.8% recall (hybrid) vs 68.2% (vector-only) on 35 CUAD contracts. +34 percentage points on cross-reference queries specifically. Benchmarked across 183 multi-hop questions." },
        { label: "stack", value: "Python · DuckDB · GraphRAG · Vector Search" },
        { label: "status", value: "Open source." },
      ],
      link: "https://github.com/pyalwin/engramdb",
    },
  },
  {
    title: "Frameforge",
    description:
      "I wanted the agent to just show me what it was thinking about a UI, instead of me having to run the code to find out. Frameforge adds image generation as an MCP tool — describe a layout, get a mockup, iterate.",
    tech: ["TypeScript", "MCP", "Gemini API", "npm"],
    icon: <Package className="text-peach" size={22} />,
    github: "github.com/pyalwin/frameforge",
    stars: null,
    status: "published on npm",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "Frameforge",
      rows: [
        { label: "why I built it", value: "The UI design loop with an AI agent is slow — describe what you want, agent writes code, you run it, realise it looks wrong, describe the change. I wanted to short-circuit that by letting the agent show a rough mockup before anyone writes a line of code." },
        { label: "how it works", value: "Exposes a single MCP tool — generate_ui_mockup. The agent (or you) describes a layout in natural language, Frameforge calls Gemini's image generation API, and returns a PNG the agent can reference in context. Visual alignment before implementation." },
        { label: "protocol", value: "Runs as a stdio MCP server — the standard transport for Claude Code tool integrations. No separate process to manage, no network setup." },
        { label: "to install", value: "Published on npm. One config line in your Claude Code MCP settings and it's available as a native tool." },
        { label: "stack", value: "TypeScript · MCP Protocol · Gemini Image API · npm" },
        { label: "status", value: "Published on npm, open source." },
      ],
      link: "https://github.com/pyalwin/frameforge",
    },
  },
];

export default function OpenSource() {
  const [selected, setSelected] = useState<DetailItem | null>(null);

  return (
    <section id="opensource" className="min-h-full bg-background px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 grid gap-4 rounded-lg border border-line bg-panel p-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-2 text-sm text-green">open_source.sh</p>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Open Source</h1>
            <p className="max-w-2xl leading-7 text-subtext1">
              Public repos and side projects I ship in the open. Source on GitHub.{" "}
              <span className="text-green">Click <span className="font-bold">explain</span> on any card to dig in.</span>
            </p>
          </div>

          <a
            href="https://github.com/pyalwin"
            target="_blank"
            rel="noreferrer"
            className="flex w-fit items-center gap-2 rounded-md border border-line bg-surface0 px-4 py-2 text-sm text-subtext1 transition hover:border-green hover:text-green"
          >
            <Github size={16} />
            <span>github.com/pyalwin</span>
          </a>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {repos.map((repo, index) => (
            <motion.article
              layout
              key={repo.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.28 }}
              className="group overflow-hidden rounded-lg border border-line bg-surface0 transition hover:border-green/70 hover:bg-surface1"
            >
              <div className="grid min-h-full md:grid-cols-[210px_1fr]">
                <div className="relative min-h-[180px] overflow-hidden border-b border-line md:border-b-0 md:border-r">
                  <Image
                    src={repo.image}
                    alt={`${repo.title} project visual`}
                    fill
                    sizes="(min-width: 1024px) 210px, 100vw"
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-300 group-hover:scale-105 group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,17,16,0.1),rgba(15,17,16,0.82))]" />
                  <div className="relative flex h-full min-h-[180px] flex-col justify-between p-4">
                    <div className="w-fit rounded-md border border-line bg-background/80 p-2 backdrop-blur">
                      {repo.icon}
                    </div>
                    <p className="text-xs text-subtext1">{repo.status}</p>
                  </div>
                </div>

                <div className="flex min-h-full flex-col p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 text-xs text-green">open source</p>
                      <h2 className="text-2xl font-bold transition group-hover:text-green">
                        {repo.title}
                      </h2>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`https://${repo.github}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-line p-2 text-subtext1 transition hover:border-green hover:text-green"
                        aria-label={`Open ${repo.title} on GitHub`}
                      >
                        <Github size={18} />
                      </a>
                      <a
                        href={`https://${repo.github}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-line p-2 text-subtext1 transition hover:border-green hover:text-green"
                        aria-label={`Open ${repo.title}`}
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    </div>
                  </div>

                  <p className="mb-5 leading-7 text-subtext1">{repo.description}</p>

                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    {repo.tech.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-line bg-panel px-3 py-1 text-xs text-subtext1"
                      >
                        {tag}
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={() => setSelected(repo.detail)}
                      className="ml-auto flex items-center gap-1.5 rounded-md border border-green/40 bg-green/5 px-3 py-1 text-xs text-green transition hover:border-green hover:bg-green/10"
                    >
                      <Sparkles size={11} />
                      explain
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <DetailPanel item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
