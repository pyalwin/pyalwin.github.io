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
    url: "https://dev.to/pyalwin/beyond-rag-building-graph-aware-retrieval-for-contract-reasoning-3o05",
    description:
      "EngramDB architecture, two-stage hybrid retrieval combining vector search with graph traversal over document structure, and CUAD benchmark results — 92.8% vs 68.2% recall.",
    tags: ["RAG", "GraphRAG", "Retrieval", "Benchmarks"],
    color: "text-green",
    detail: {
      title: "Beyond RAG: Graph-Aware Retrieval",
      rows: [
        { label: "what made me write it", value: "I kept hitting the same failure mode — RAG would find something semantically similar but miss the actual answer because it lived in a cross-referenced section. I wanted to write down why that happens and what actually fixes it." },
        { label: "the core argument", value: "Documents aren't bags of text. They have structure — headings, defined terms, clauses that reference other clauses. If your retrieval layer ignores that structure, it misses the answers that depend on following it. Vector search alone can't do that." },
        { label: "what I built", value: "EngramDB — a retrieval engine that runs vector search first, then uses graph traversal over document structure (section hierarchy, defined terms, cross-references) to resolve full context. Tested on 35 CUAD contracts, 183 multi-hop questions." },
        { label: "the numbers", value: "92.8% recall with hybrid retrieval vs 68.2% with vector-only. +34 percentage points on cross-reference queries specifically — the exact failure mode I was trying to fix." },
        { label: "published", value: "dev.to · Mar 2026" },
      ],
      link: "https://dev.to/pyalwin/beyond-rag-building-graph-aware-retrieval-for-contract-reasoning-3o05",
    },
  },
  {
    title: "Stop Chatting with Claude Code. Start Building on It.",
    platform: "Medium",
    date: "Apr 2026",
    url: "https://medium.com/@arun_venkat/stop-chatting-with-claude-code-start-building-on-it-8b9a8e5c5732",
    description:
      "Claude Code as an orchestration engine, not a chat interface. Multi-agent pipeline patterns, subprocess composition, and why the CLI is actually the infrastructure.",
    tags: ["Claude Code", "Agents", "Engineering"],
    color: "text-sky",
    detail: {
      title: "Stop Chatting with Claude Code",
      rows: [
        { label: "what made me write it", value: "I spent a year using Claude Code mostly as a chat window. Then a project forced me to use it differently — spawning it as a subprocess, piping output to other tools — and I realised I'd been leaving most of it on the table." },
        { label: "the argument", value: "Claude Code is a programmable runtime, not a chatbot. You can spawn sub-agents with scoped permissions, compose their output with other processes, and build multi-step pipelines where Claude handles one stage of many. The CLI is the API." },
        { label: "what it covers", value: "Concrete patterns: spawning Claude Code as a subprocess with --print for structured output, building pipelines where each agent has a single task, session persistence across pipeline stages, and how to think about tool access as a design decision rather than a config option." },
        { label: "published", value: "Medium · Apr 2026" },
      ],
      link: "https://medium.com/@arun_venkat/stop-chatting-with-claude-code-start-building-on-it-8b9a8e5c5732",
    },
  },
  {
    title: "Claude Code CLI — The Interface That's Actually the Infrastructure",
    platform: "Medium",
    date: "Apr 2026",
    url: "https://medium.com/@arun_venkat/build-on-the-cli-why-the-simplest-interface-is-the-most-powerful-be8753ad9a43",
    description:
      "The CLI as composable infrastructure, scoped permissions as design decisions, and how the tool boundary is the architectural boundary.",
    tags: ["Claude Code", "CLI", "Architecture"],
    color: "text-sky",
    detail: {
      title: "Claude Code CLI as Infrastructure",
      rows: [
        { label: "what made me write it", value: "While building a multi-agent pipeline I realised I was making architectural decisions through CLI flags — which tools each agent could access, what files it could write, what was completely off limits. That's not configuration. That's system design." },
        { label: "the argument", value: "The CLI is the trust boundary. When you decide what tools Claude Code can access for a given task, you're defining what the agent is allowed to do — which is an infrastructure decision, not a preference. The tool boundary is the architectural boundary." },
        { label: "practical implications", value: "Different agents in a pipeline can have entirely different tool access. An agent that reviews code doesn't need write access. An agent writing to disk doesn't need network access. This isn't limiting — it's how you build agents you can actually trust to run." },
        { label: "published", value: "Medium · Apr 2026" },
      ],
      link: "https://medium.com/@arun_venkat/build-on-the-cli-why-the-simplest-interface-is-the-most-powerful-be8753ad9a43",
    },
  },
  {
    title: "CLAUDE.md — The File Claude Reads Before You Speak",
    platform: "Medium",
    date: "Apr 2026",
    url: "https://medium.com/@arun_venkat/claude-md-the-file-claude-reads-before-you-speak-1bbea5ccb59a",
    description:
      "Behavioral instructions, agent configuration through markdown, and how CLAUDE.md is effectively the system prompt you control as an engineer.",
    tags: ["Claude Code", "Agent Config", "Prompting"],
    color: "text-sky",
    detail: {
      title: "CLAUDE.md — Before You Speak",
      rows: [
        { label: "what made me write it", value: "I watched someone get frustrated because Claude kept doing something they didn't want. They'd correct it, it would do it again next session. The fix was a two-line addition to CLAUDE.md — a file they didn't know existed." },
        { label: "the point", value: "CLAUDE.md is read before every session, before anything you type. It's not a settings file — it's where you engineer the agent's default behaviour. Whatever you put in there shapes how Claude interprets every instruction that follows." },
        { label: "how it layers", value: "Global CLAUDE.md for preferences that apply everywhere. Project-level for codebase context and conventions. Directory-level for specific subsystems. The most specific file wins, so you can override globally without touching per-project config." },
        { label: "what belongs in it", value: "Things you'd tell a new team member on day one — how the codebase is structured, what conventions matter, what to never do. Encoding that into CLAUDE.md means every session starts informed instead of blank." },
        { label: "published", value: "Medium · Apr 2026" },
      ],
      link: "https://medium.com/@arun_venkat/claude-md-the-file-claude-reads-before-you-speak-1bbea5ccb59a",
    },
  },
  {
    title: "Beyond Simple Prompts: Architecting an AI Agent",
    platform: "dev.to",
    date: "Dec 2025",
    url: "https://dev.to/pyalwin/beyond-simple-prompts-architecting-an-ai-agent-1i8c",
    description:
      "AgreedPro contract review agent deep-dive — paragraph anchoring, token-based diffing for Word tracked changes, and why determinism matters more than cleverness in production AI.",
    tags: ["Agents", "RAG", "Production AI"],
    color: "text-green",
    detail: {
      title: "Architecting an AI Agent",
      rows: [
        { label: "what made me write it", value: "I'd shipped AgreedPro to a few early users and the feedback wasn't about the quality of the answers — it was about trust. They wanted to know how it got there. That pushed me to think harder about what makes an AI agent something people will actually rely on." },
        { label: "the main thing I was trying to say", value: "Getting an agent to produce good outputs is the easier half. The harder half is building something so that when it's wrong, you know it's wrong. That requires determinism — tracing every output back to a source, not hoping the model got it right. A well-prompted model that hallucinates confidently is worse than a simpler system with verifiable outputs." },
        { label: "paragraph anchoring", value: "Every chunk in AgreedPro gets a deterministic source ID injected before it hits the vector index. The model is required to cite that ID in its answer. A rule-based mapping layer traces the ID back to the exact paragraph in the original document. There's no separate 'hallucination detection' step — the citation is structurally enforced, so it either exists or it doesn't." },
        { label: "token-based Word diffing", value: "Legal review happens on Word documents with tracked changes. Most approaches flatten .docx to text and lose the change history. I built a token-level differ that preserves insertions, deletions, and move operations from the XML layer — so the agent sees 'proposed clause 4.2 replaces accepted clause 4.1' rather than just the final text." },
        { label: "the lesson I'd carry forward", value: "I'd build explainability first on the next project, not bolt it on after. Once users expect to see a source, you can't take that away. And building for it from day one changes how you architect retrieval, chunking, and context assembly." },
        { label: "published", value: "dev.to · Dec 2025" },
      ],
      link: "https://dev.to/pyalwin/beyond-simple-prompts-architecting-an-ai-agent-1i8c",
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
              Articles on building production AI systems — RAG pipelines, agents, Claude Code, and the engineering decisions behind them.{" "}
              <span className="text-peach">Click <span className="font-bold">explain</span> on any article to see what it's actually about.</span>
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
                        className="ml-auto flex items-center gap-1.5 rounded-md border border-peach/40 bg-peach/5 px-3 py-1 text-xs text-peach transition hover:border-peach hover:bg-peach/10"
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
