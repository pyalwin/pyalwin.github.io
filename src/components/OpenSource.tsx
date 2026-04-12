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
        { label: "what", value: "Production-grade Electron desktop app wrapping Claude Code CLI with a proper UI." },
        { label: "problem", value: "Claude Code's CLI output is powerful but hard to work with raw — streaming JSON, tool calls, diffs all in the terminal. No approval flow, no session management, no diff viewer." },
        { label: "approach", value: "WebSocket streaming renders Claude's output in real time. HITL tool approval flows let you review and accept/reject each action before it runs. Live diff viewer shows exactly what will change. Session management and discovery across multiple runs." },
        { label: "distribution", value: "Distributed via Homebrew. Install with a single brew command, runs as a native macOS app." },
        { label: "stack", value: "Electron · React · TypeScript · WebSockets" },
        { label: "status", value: "Open source, actively maintained." },
      ],
      link: "https://github.com/pyalwin/bifrost",
    },
  },
  {
    title: "Codemesh",
    description:
      "Code knowledge graph for AI coding agents. Indexes codebases with Tree-sitter, exposes an MCP server, and lets agents write back what they learn — cutting cost by 44% and speeding up exploration by 57%.",
    tech: ["TypeScript", "MCP", "Tree-sitter", "SQLite"],
    icon: <Network className="text-peach" size={22} />,
    github: "github.com/pyalwin/codemesh",
    stars: null,
    status: "AI agent tooling",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "Codemesh",
      rows: [
        { label: "what", value: "Persistent, queryable code knowledge graph for AI coding agents. Agents read from it and write back what they learn." },
        { label: "problem", value: "AI agents waste 40–80% of their tokens on codebase discovery — grepping files, reading irrelevant code, rebuilding context they already built last session." },
        { label: "approach", value: "Tree-sitter parses your codebase into a structural graph (files, symbols, imports, call chains). Agents query the graph before reading code. After reading, they write back summaries via codemesh_enrich — so the next session starts informed." },
        { label: "benchmarks", value: "Benchmarked on 6 real codebases (Alamofire, Excalidraw, VS Code, Swift Compiler, pydantic). Avg quality 8.6/10 vs baseline 7.3/10. Cost savings up to 80% on pydantic-validators tasks." },
        { label: "modes", value: "MCP Server (structured tool calls, best with Opus) or CLI Mode (zero overhead, best with Sonnet — 55% cheaper, 61% faster than baseline)." },
        { label: "stack", value: "TypeScript · MCP · Tree-sitter · SQLite + FTS5" },
        { label: "status", value: "Open source. 102 tests passing." },
      ],
      link: "https://github.com/pyalwin/codemesh",
    },
  },
  {
    title: "Cortex",
    description:
      "Document extraction platform using graph techniques and tiered model routing for complex entity disambiguation.",
    tech: ["Multi-Agent", "GraphRAG", "LangGraph", "Python"],
    icon: <Cpu className="text-green" size={22} />,
    github: "github.com/pyalwin/cortex",
    stars: null,
    status: "document workflows",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "Cortex",
      rows: [
        { label: "what", value: "Multi-agent document extraction platform using graph techniques and tiered model routing." },
        { label: "problem", value: "Messy real-world documents — invoices, contracts, reports — have entities that reference each other across sections. Flat extraction misses relationships. Single-model pipelines either overspend or underperform." },
        { label: "approach", value: "GraphRAG builds a context graph modeling entity relationships across document sections. Cost-optimized baseline model (langextract) handles routine extraction. Frontier LLMs step in for complex entity disambiguation and cross-reference resolution. 60%+ cost-per-document optimization through intelligent token routing." },
        { label: "observability", value: "HITL confidence scoring with evaluation pipelines. Continuous model improvement loop through human-in-the-loop feedback." },
        { label: "stack", value: "Multi-Agent · GraphRAG · LangGraph · Python" },
        { label: "status", value: "Open source, active development." },
      ],
      link: "https://github.com/pyalwin/cortex",
    },
  },
  {
    title: "EngramDB",
    description:
      "Schema-aware hybrid retrieval engine combining vector search with graph traversal over document structure. 92.8% recall vs 68.2% vector-only on 35 CUAD contracts — +34pp on cross-reference queries across 183 multi-hop questions.",
    tech: ["Python", "DuckDB", "GraphRAG", "Vector Search"],
    icon: <Database className="text-sky" size={22} />,
    github: "github.com/pyalwin/engramdb",
    stars: null,
    status: "retrieval engine",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "EngramDB",
      rows: [
        { label: "what", value: "Schema-aware hybrid retrieval engine for document-native structure — sections, defined terms, cross-references." },
        { label: "problem", value: "Vector search alone loses document structure. A clause that references 'Section 12.3(b)' means nothing if the retriever doesn't know what 12.3(b) says. Standard RAG misses 30%+ of cross-reference queries on legal contracts." },
        { label: "approach", value: "Two-stage retrieval: vector search narrows the candidate set, then graph traversal follows the document's own structure (section hierarchy, defined term links, cross-references) to resolve full context." },
        { label: "benchmarks", value: "92.8% recall (hybrid) vs 68.2% (vector-only) on 35 CUAD contracts. +34 percentage points on cross-reference queries. Benchmarked across 183 multi-hop questions." },
        { label: "stack", value: "Python · DuckDB · GraphRAG · Vector Search" },
        { label: "status", value: "Open source." },
      ],
      link: "https://github.com/pyalwin/engramdb",
    },
  },
  {
    title: "Frameforge",
    description:
      "MCP server that generates UI mockup PNGs via Google Gemini's image generation API. Published on npm — plugs into Claude Code as a stdio tool so agents can render UI ideas without leaving the terminal.",
    tech: ["TypeScript", "MCP", "Gemini API", "npm"],
    icon: <Package className="text-peach" size={22} />,
    github: "github.com/pyalwin/frameforge",
    stars: null,
    status: "published on npm",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "Frameforge",
      rows: [
        { label: "what", value: "MCP server that generates UI mockup PNGs via Google Gemini's image generation API." },
        { label: "problem", value: "When designing UI with an AI agent, you have to describe what you want, get code, run it, screenshot it, and iterate. There's no way for the agent to just show you what it's thinking." },
        { label: "approach", value: "Exposes a single MCP tool: generate_ui_mockup. The agent describes a UI, Frameforge calls Gemini's image API, and returns a PNG the agent can reference or the user can inspect — without leaving Claude Code." },
        { label: "distribution", value: "Published on npm. Add to Claude Code with a single config line. Runs as a stdio MCP server." },
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
              Public repos and side projects I ship in the open. Source on GitHub.
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
                      className="ml-auto flex items-center gap-1.5 rounded-md border border-line bg-panel px-3 py-1 text-xs text-subtext0 transition hover:border-green hover:text-green"
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
