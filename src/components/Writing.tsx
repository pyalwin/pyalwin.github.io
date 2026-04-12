"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, FileText, Sparkles } from "lucide-react";
import DetailPanel, { type DetailItem } from "./DetailPanel";

const articles: Array<{
  title: string;
  platform: string;
  date: string;
  url: string;
  description: string;
  tags: string[];
  color: string;
  detail: DetailItem;
}> = [
  {
    title: "Beyond RAG: Building Graph-Aware Retrieval for Contract Reasoning",
    platform: "dev.to",
    date: "Mar 2026",
    url: "https://dev.to/pyalwin",
    description:
      "EngramDB architecture, two-stage hybrid retrieval combining vector search with graph traversal over document structure, and CUAD benchmark results — 92.8% vs 68.2% recall.",
    tags: ["RAG", "GraphRAG", "Retrieval", "Benchmarks"],
    color: "text-green",
    detail: {
      title: "Beyond RAG: Graph-Aware Retrieval",
      rows: [
        { label: "thesis", value: "Vector search alone isn't enough for legal contracts. Documents have structure — section hierarchies, defined terms, cross-references — and retrieval that ignores that structure misses the most important connections." },
        { label: "core idea", value: "Two-stage hybrid retrieval: vector search narrows to candidates, then graph traversal follows the document's own structure to resolve full context. The graph is built from the document itself, not imposed on top of it." },
        { label: "evidence", value: "92.8% recall (hybrid) vs 68.2% (vector-only) on 35 CUAD contracts. +34 percentage points on cross-reference queries. Benchmarked across 183 multi-hop questions." },
        { label: "takeaway", value: "If your documents have internal structure — and most real documents do — your retrieval layer should understand and use that structure. EngramDB is the implementation of this idea." },
        { label: "platform", value: "dev.to · Mar 2026" },
      ],
      link: "https://dev.to/pyalwin",
    },
  },
  {
    title: "Stop Chatting with Claude Code. Start Building on It.",
    platform: "Medium",
    date: "Apr 2026",
    url: "https://medium.com/@arun_venkat",
    description:
      "Claude Code as an orchestration engine, not a chat interface. Multi-agent pipeline patterns, subprocess composition, and why the CLI is actually the infrastructure.",
    tags: ["Claude Code", "Agents", "Engineering"],
    color: "text-sky",
    detail: {
      title: "Stop Chatting with Claude Code",
      rows: [
        { label: "thesis", value: "Most people treat Claude Code as a smarter terminal assistant. It's actually a programmable orchestration engine — and treating it like a chat interface leaves most of its power unused." },
        { label: "core idea", value: "Claude Code is composable. You can spawn sub-agents, pipe output between processes, and build multi-step pipelines where Claude is just one node in a larger system. The CLI surface is the API." },
        { label: "patterns", value: "Multi-agent pipelines where each agent has a scoped task. Subprocess composition for parallelism. Output structured as JSON so downstream tools can consume it. Session persistence across pipeline stages." },
        { label: "takeaway", value: "If you're typing into Claude Code and reading responses, you're using 10% of what it can do. The rest is programmable." },
        { label: "platform", value: "Medium · Apr 2026" },
      ],
      link: "https://medium.com/@arun_venkat",
    },
  },
  {
    title: "Claude Code CLI — The Interface That's Actually the Infrastructure",
    platform: "Medium",
    date: "Apr 2026",
    url: "https://medium.com/@arun_venkat",
    description:
      "The CLI as composable infrastructure, scoped permissions as design decisions, and how the tool boundary is the architectural boundary.",
    tags: ["Claude Code", "CLI", "Architecture"],
    color: "text-sky",
    detail: {
      title: "Claude Code CLI as Infrastructure",
      rows: [
        { label: "thesis", value: "The CLI isn't a convenience wrapper. It's the infrastructure layer — the boundary where permissions are scoped, where tool access is controlled, and where composition happens." },
        { label: "core idea", value: "Every decision you make about what tools Claude Code can access is an architectural decision. Scoped permissions are system design. The tool boundary is the trust boundary." },
        { label: "implications", value: "You can run Claude Code with exactly the permissions it needs for a task — no more. Different agents in a pipeline can have different tool access. This isn't a limitation, it's how you build safe autonomous systems." },
        { label: "takeaway", value: "Think of Claude Code's CLI flags and config as your infrastructure spec, not just command options." },
        { label: "platform", value: "Medium · Apr 2026" },
      ],
      link: "https://medium.com/@arun_venkat",
    },
  },
  {
    title: "CLAUDE.md — The File Claude Reads Before You Speak",
    platform: "Medium",
    date: "Apr 2026",
    url: "https://medium.com/@arun_venkat",
    description:
      "Behavioral instructions, agent configuration through markdown, and how CLAUDE.md is effectively the system prompt you control as an engineer.",
    tags: ["Claude Code", "Agent Config", "Prompting"],
    color: "text-sky",
    detail: {
      title: "CLAUDE.md — Before You Speak",
      rows: [
        { label: "thesis", value: "CLAUDE.md is your system prompt. It's read before every session, shapes how Claude interprets every instruction, and is the primary lever for engineering Claude's behavior at a project level." },
        { label: "core idea", value: "Behavioral configuration through markdown — not just 'remember this', but 'always do X when Y', 'never Z', 'assume this about the codebase'. It's instruction engineering, and it compounds over time." },
        { label: "patterns", value: "Layered CLAUDE.md files (global, project, directory). Agent-specific behavioral constraints. Encoding domain context so agents start informed. Using CLAUDE.md to enforce team-wide coding standards." },
        { label: "takeaway", value: "If you're not writing CLAUDE.md with the same care as your architecture docs, you're leaving consistency and reliability on the table." },
        { label: "platform", value: "Medium · Apr 2026" },
      ],
      link: "https://medium.com/@arun_venkat",
    },
  },
  {
    title: "Beyond Simple Prompts: Architecting an AI Agent",
    platform: "dev.to",
    date: "Dec 2025",
    url: "https://dev.to/pyalwin",
    description:
      "AgreedPro contract review agent deep-dive — paragraph anchoring, token-based diffing for Word tracked changes, and why determinism matters more than cleverness in production AI.",
    tags: ["Agents", "RAG", "Production AI"],
    color: "text-green",
    detail: {
      title: "Architecting an AI Agent",
      rows: [
        { label: "thesis", value: "Production AI agents need determinism more than intelligence. The clever parts are less important than the guardrails that prevent the agent from confidently being wrong." },
        { label: "core idea", value: "AgreedPro deep-dive: paragraph anchoring maps every AI output to a source location so you can verify it. Token-based diffing tracks changes to Word documents without losing structure. These aren't optimizations — they're the features that make the system safe to ship." },
        { label: "key insight", value: "The hard part of building AI agents isn't getting them to produce good outputs — it's knowing when they've produced bad ones. Deterministic audit trails are how you build that confidence." },
        { label: "lessons", value: "Build explainability first, not last. Hallucination prevention through structure (paragraph IDs) is more reliable than post-hoc detection. Users trust AI that shows its work." },
        { label: "platform", value: "dev.to · Dec 2025" },
      ],
      link: "https://dev.to/pyalwin",
    },
  },
];

const platformLinks = [
  { label: "Medium", url: "https://medium.com/@arun_venkat", hint: "Claude Code series" },
  { label: "dev.to", url: "https://dev.to/pyalwin", hint: "RAG & agents deep-dives" },
];

export default function Writing() {
  const [selected, setSelected] = useState<DetailItem | null>(null);

  return (
    <section id="writing" className="min-h-full bg-background px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 grid gap-4 rounded-lg border border-line bg-panel p-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-2 text-sm text-peach">writing.md</p>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Writing</h1>
            <p className="max-w-2xl leading-7 text-subtext1">
              Articles on building production AI systems — RAG pipelines, agents, Claude Code, and the engineering decisions behind them.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {platformLinks.map((p) => (
              <a
                key={p.label}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-md border border-line bg-surface0 px-4 py-2 text-sm text-subtext1 transition hover:border-peach hover:text-peach"
              >
                <span className="font-bold">{p.label}</span>
                <span className="text-xs text-subtext0">{p.hint}</span>
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.28 }}
              className="group rounded-lg border border-line bg-surface0 p-5 transition hover:border-peach/60 hover:bg-surface1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {article.platform === "dev.to" ? (
                      <FileText size={18} className="text-green" />
                    ) : (
                      <BookOpen size={18} className="text-sky" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-subtext0">
                      <span className={`font-bold ${article.color}`}>{article.platform}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                    </div>
                    <h2 className="mb-2 font-bold leading-snug transition group-hover:text-peach">
                      {article.title}
                    </h2>
                    <p className="text-sm leading-6 text-subtext1">{article.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-line bg-panel px-2 py-0.5 text-xs text-subtext0"
                        >
                          {tag}
                        </span>
                      ))}
                      <button
                        type="button"
                        onClick={() => setSelected(article.detail)}
                        className="ml-auto flex items-center gap-1.5 rounded-md border border-line bg-panel px-3 py-1 text-xs text-subtext0 transition hover:border-peach hover:text-peach"
                      >
                        <Sparkles size={11} />
                        explain
                      </button>
                    </div>
                  </div>
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-md border border-line p-2 text-subtext1 transition hover:border-peach hover:text-peach"
                  aria-label={`Read ${article.title}`}
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <DetailPanel item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
