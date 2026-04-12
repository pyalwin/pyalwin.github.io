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
        { label: "what made me write it", value: "I kept hitting the same failure mode — RAG would find something semantically similar to the question but miss the actual answer because it lived in a cross-referenced section. I wanted to write down what I figured out about why that happens and how to fix it." },
        { label: "the core argument", value: "Documents aren't bags of text. They have structure — headings, defined terms, clauses that reference other clauses. If your retrieval layer ignores that structure, it's going to miss the answers that depend on it. Vector search alone can't follow a cross-reference." },
        { label: "what I built to test it", value: "EngramDB — a retrieval engine that combines vector search with graph traversal over document structure. Tested it on real contracts. The improvement on cross-reference questions was big enough that I wrote the piece to explain why." },
        { label: "published", value: "dev.to · Mar 2026" },
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
        { label: "what made me write it", value: "I kept seeing people use Claude Code the way they'd use a chat window — type a question, read the answer, type the next question. That's fine, but it misses what makes it actually powerful." },
        { label: "the point", value: "Claude Code is a runtime, not a chat interface. You can spawn it as a subprocess, pipe structured output to other tools, build pipelines where different agents handle different parts of a task. The thing people are chatting with is actually programmable infrastructure." },
        { label: "what I wanted people to take away", value: "If you're treating it like a chatbot, you're leaving most of it on the table. Think of it more like a smart subprocess you can compose with other tools." },
        { label: "published", value: "Medium · Apr 2026" },
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
        { label: "what made me write it", value: "I was building a multi-agent pipeline and realised I was making architectural decisions through CLI flags — which tools each agent could access, what it could write, what was off limits. That's not configuration, that's system design." },
        { label: "the argument", value: "When you decide what tools Claude Code can use, you're defining a trust boundary. The CLI isn't just a way to run the tool — it's where you express what the tool is allowed to do. That's an infrastructure decision." },
        { label: "why it matters", value: "If you think about it this way, you stop worrying about Claude Code 'going off script' and start designing agents that can only do what they should do. The CLI is how you express that." },
        { label: "published", value: "Medium · Apr 2026" },
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
        { label: "what made me write it", value: "I watched someone get frustrated because Claude kept doing something they didn't want. They'd correct it, it would do it again next session. The fix was in CLAUDE.md and they didn't know that file existed." },
        { label: "the point", value: "CLAUDE.md is the file Claude reads before it reads anything you type. Whatever you put in there shapes how it interprets every instruction that follows. It's not a settings file — it's where you engineer the agent's default behaviour." },
        { label: "what I cover in the piece", value: "How to layer CLAUDE.md files across global, project, and directory scope. Using it to encode domain context so agents start informed instead of blank. Why the stuff you'd tell a new colleague on day one belongs in there." },
        { label: "published", value: "Medium · Apr 2026" },
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
        { label: "what made me write it", value: "I'd shipped AgreedPro to a few early users and the feedback wasn't about the quality of the answers — it was about trust. They wanted to know how it got there. That pushed me to think harder about what makes an AI agent something people will actually rely on." },
        { label: "the main thing I was trying to say", value: "Getting an agent to produce good outputs is the easier half. The harder half is building something so that when it's wrong, you know it's wrong. That requires determinism — tracing every output back to a source, not hoping the model got it right." },
        { label: "what I cover", value: "Paragraph anchoring in AgreedPro — how injecting source IDs into the context makes every answer verifiable. Token-based diffing to track Word document changes without losing structure. Why I'd build explainability first on any future project, not add it later." },
        { label: "published", value: "dev.to · Dec 2025" },
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
