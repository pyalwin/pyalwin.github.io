"use client";

import type React from "react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Database, Github, MessageSquare, Sparkles, Workflow } from "lucide-react";
import DetailPanel, { type DetailItem } from "./DetailPanel";

type ProjectCategory = "All" | "Data" | "Automation" | "Tools";

const projects: Array<{
  title: string;
  description: string;
  tech: string[];
  icon: React.ReactNode;
  github?: string;
  category: Exclude<ProjectCategory, "All">;
  status: string;
  image: string;
  detail: DetailItem;
}> = [
  {
    title: "AgreedPro",
    description: "Contract analysis platform with retrieval, deterministic paragraph references, and evidence-first review flows.",
    tech: ["Python", "LangChain", "FAISS", "RAG"],
    icon: <Database className="text-sky" size={22} />,
    github: "github.com/pyalwin",
    category: "Data",
    status: "legal review",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "AgreedPro",
      rows: [
        { label: "what", value: "Legal contract analysis RAG platform with deterministic paragraph-level sourcing." },
        { label: "problem", value: "Contracts are dense and liability-critical. Generic AI hallucinates clause references — that's a non-starter for enterprise use." },
        { label: "approach", value: "Paragraph ID injection maps every LLM output to a source location in the document. Semantic search with FAISS, structured re-ranking, and query expansion. Rule-based LLM-to-paragraph-ID mapping eliminates hallucinated citations entirely." },
        { label: "architecture", value: "Multi-tenant with RBAC (admin / analyst / viewer), audit logging, and configurable compliance playbooks per client." },
        { label: "stack", value: "Python · LangChain · FAISS · RAG" },
        { label: "status", value: "Active development — in legal review for enterprise pilots." },
      ],
    },
  },
  {
    title: "Ottimate Knowledge Bot",
    description: "Company-wide multi-agent Slack bot backed by Claude that answers questions with cited sources across Notion docs, JIRA, codebase, and Clickhouse analytics. Built on Claude Code infrastructure — any engineer or PM can query internal knowledge without hunting through tabs.",
    tech: ["Claude API", "Slack SDK", "Python", "Multi-Agent", "Pinecone"],
    icon: <MessageSquare className="text-sky" size={22} />,
    category: "Tools",
    status: "internal tooling @ Ottimate",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "Ottimate Knowledge Bot",
      rows: [
        { label: "what", value: "Company-wide Slack bot that answers internal questions with cited sources." },
        { label: "problem", value: "Engineers and PMs spend significant time hunting through Notion, JIRA, Slack threads, and dashboards for answers that already exist somewhere in the company." },
        { label: "approach", value: "Multi-agent system built on Claude Code infrastructure. Agents fan out across Notion docs, JIRA tickets, the codebase, and Clickhouse analytics. Every answer includes source citations so you can verify and dig deeper." },
        { label: "impact", value: "Any employee can query internal knowledge from Slack without switching tabs. Onboarding time for new engineers reduced — the bot answers 'how does X work' questions at any hour." },
        { label: "stack", value: "Claude API · Slack SDK · Python · Multi-Agent · Pinecone" },
        { label: "status", value: "Production @ Ottimate." },
      ],
    },
  },
  {
    title: "Agentic Coding Bot",
    description: "Autonomous Claude Code agent that handles customer support tickets end-to-end — triages issues, writes code, creates PRs. Won Ottimate's internal innovation award. Runs containerised execution with MCP integrations and model comparison across providers.",
    tech: ["Claude SDK", "MCP", "Docker", "Agents", "GitHub API"],
    icon: <Workflow className="text-peach" size={22} />,
    category: "Automation",
    status: "🏆 innovation award @ Ottimate",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "Agentic Coding Bot",
      rows: [
        { label: "what", value: "Autonomous agent that handles customer support tickets end-to-end — no human in the loop until PR review." },
        { label: "problem", value: "Support tickets with code-level root causes required an engineer to triage, reproduce, diagnose, fix, and open a PR. Slow loop, expensive interruption." },
        { label: "approach", value: "Claude Code agent triages incoming tickets, diagnoses the root cause by reading relevant code, writes a fix, and opens a PR with a description. Containerized execution isolates each run. MCP integrations give the agent access to internal tools." },
        { label: "impact", value: "Won Ottimate's internal innovation award. Handles a class of tickets autonomously, freeing engineers from context-switching." },
        { label: "stack", value: "Claude SDK · MCP · Docker · GitHub API" },
        { label: "status", value: "Active @ Ottimate." },
      ],
    },
  },
  {
    title: "EIA Review Tool",
    description: "Processes 1,000+ page Environmental Impact Assessment documents with deterministic section ID mapping and structured markdown ingestion. Routes document sections to appropriate model tiers based on complexity and regulatory criticality — balancing cost and accuracy at scale.",
    tech: ["Python", "Claude API", "Token Routing", "RAG"],
    icon: <Database className="text-green" size={22} />,
    category: "Data",
    status: "regulatory compliance",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "EIA Review Tool",
      rows: [
        { label: "what", value: "AI-assisted review system for Environmental Impact Assessment documents — often 1,000+ pages." },
        { label: "problem", value: "EIA documents are enormous, dense, and regulatory-critical. Manual review is slow and expensive. Standard RAG loses context across sections that reference each other across hundreds of pages." },
        { label: "approach", value: "Deterministic section ID mapping ensures every extraction references a specific location. Structured markdown ingestion preserves document hierarchy. Token routing selects model tiers by section complexity and regulatory criticality — cheaper models handle boilerplate, frontier models handle high-stakes sections." },
        { label: "impact", value: "Significant cost reduction on per-document processing without sacrificing accuracy on critical clauses." },
        { label: "stack", value: "Python · Claude API · Token Routing · RAG" },
        { label: "status", value: "In development." },
      ],
    },
  },
];

const filters: ProjectCategory[] = ["All", "Data", "Tools", "Automation"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const [selected, setSelected] = useState<DetailItem | null>(null);

  const visibleProjects = useMemo(
    () => projects.filter((project) => activeFilter === "All" || project.category === activeFilter),
    [activeFilter],
  );

  return (
    <section id="projects" className="min-h-full bg-background px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 grid gap-4 rounded-lg border border-line bg-panel p-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-2 text-sm text-sky">selected_projects.py</p>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Selected Projects</h1>
            <p className="max-w-2xl leading-7 text-subtext1">
              Applied work across document intelligence, developer tooling, automation, and product-minded engineering.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-md border px-3 py-2 text-sm transition ${
                  activeFilter === filter
                    ? "border-sky bg-background text-sky"
                    : "border-line bg-surface0 text-subtext1 hover:border-surface2 hover:text-text"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <motion.article
              layout
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.28 }}
              className="group overflow-hidden rounded-lg border border-line bg-surface0 transition hover:border-sky/70 hover:bg-surface1"
            >
              <div className="grid min-h-full md:grid-cols-[210px_1fr]">
                <div className="relative min-h-[180px] overflow-hidden border-b border-line md:border-b-0 md:border-r">
                  <Image
                    src={project.image}
                    alt={`${project.title} project visual`}
                    fill
                    sizes="(min-width: 1024px) 210px, 100vw"
                    className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-300 group-hover:scale-105 group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,17,16,0.1),rgba(15,17,16,0.82))]" />
                  <div className="relative flex h-full min-h-[180px] flex-col justify-between p-4">
                    <div className="w-fit rounded-md border border-line bg-background/80 p-2 backdrop-blur">{project.icon}</div>
                    <p className="text-xs text-subtext1">{project.status}</p>
                  </div>
                </div>

                <div className="flex min-h-full flex-col p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 text-xs text-green">{project.category}</p>
                      <h2 className="text-2xl font-bold transition group-hover:text-sky">{project.title}</h2>
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={`https://${project.github}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md border border-line p-2 text-subtext1 transition hover:border-sky hover:text-sky"
                          aria-label={`Open ${project.title} on GitHub`}
                        >
                          <Github size={18} />
                        </a>
                      )}
                      <a
                        href={`https://${project.github ?? "github.com/pyalwin"}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-line p-2 text-subtext1 transition hover:border-sky hover:text-sky"
                        aria-label={`Open ${project.title} reference`}
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    </div>
                  </div>

                  <p className="mb-5 leading-7 text-subtext1">{project.description}</p>

                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    {project.tech.map((tag) => (
                      <span key={tag} className="rounded-md border border-line bg-panel px-3 py-1 text-xs text-subtext1">
                        {tag}
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={() => setSelected(project.detail)}
                      className="ml-auto flex items-center gap-1.5 rounded-md border border-line bg-panel px-3 py-1 text-xs text-subtext0 transition hover:border-sky hover:text-sky"
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
