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
    description: "I got tired of AI that confidently cites clauses that don't exist. AgreedPro reads legal contracts and pins every answer to the exact paragraph it came from — no hallucinated references.",
    tech: ["Python", "LangChain", "FAISS", "RAG"],
    icon: <Database className="text-sky" size={22} />,
    github: "github.com/pyalwin",
    category: "Data",
    status: "legal review",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "AgreedPro",
      rows: [
        { label: "why I built it", value: "Every AI contract tool I tried would confidently cite a clause that either didn't exist or meant something different in context. For legal work, that's a liability issue, not a UX issue." },
        { label: "the core mechanism", value: "Paragraph ID injection — every chunk gets a deterministic ID before indexing, and the model is required to cite it in its answer. A rule-based mapping layer traces that ID back to the exact source location in the document. No hallucinated references, because the reference is structurally enforced." },
        { label: "retrieval", value: "FAISS vector search for candidate retrieval, structured re-ranking to surface precedent clauses over just semantically similar ones, and query expansion to handle how lawyers ask questions differently to how contracts are written." },
        { label: "architecture", value: "Multi-tenant with RBAC (admin / analyst / viewer roles), full audit logging, and configurable compliance playbooks per client so different teams can encode their own review criteria." },
        { label: "stack", value: "Python · LangChain · FAISS · RAG" },
        { label: "status", value: "Active development — in conversations with legal teams about early pilots." },
      ],
    },
  },
  {
    title: "Ottimate Knowledge Bot",
    description: "The answer to 'where is that documented?' was always 'somewhere in Notion, or maybe JIRA, or ask someone.' I built a Slack bot so you can just ask — and it tells you where it got the answer.",
    tech: ["Claude API", "Slack SDK", "Python", "Multi-Agent", "Pinecone"],
    icon: <MessageSquare className="text-sky" size={22} />,
    category: "Tools",
    status: "internal tooling @ Ottimate",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "Ottimate Knowledge Bot",
      rows: [
        { label: "why I built it", value: "The answer to 'where is that documented?' was always 'somewhere in Notion, or maybe JIRA, or ask someone.' New engineers burned hours on questions a senior would answer in 30 seconds. I wanted that 30-second answer available at any hour." },
        { label: "how it works", value: "Multi-agent system built on Claude Code infrastructure. Separate agents handle each source — Notion, JIRA, codebase, and Clickhouse analytics. A coordinator agent synthesises the results and every answer includes source citations so you can verify and dig deeper." },
        { label: "the tricky part", value: "Deciding what's authoritative when sources conflict — Notion might say one thing, the code does another. We built a recency + source-priority model to handle that, with the codebase winning for anything implementation-related." },
        { label: "stack", value: "Claude API · Slack SDK · Python · Multi-Agent · Pinecone" },
        { label: "status", value: "Running in production at Ottimate." },
      ],
    },
  },
  {
    title: "Agentic Coding Bot",
    description: "A support ticket would come in, an engineer would context-switch, spend an hour diagnosing, fix three lines, open a PR. I wanted to see how much of that loop an agent could own. Turns out — most of it.",
    tech: ["Claude SDK", "MCP", "Docker", "Agents", "GitHub API"],
    icon: <Workflow className="text-peach" size={22} />,
    category: "Automation",
    status: "🏆 innovation award @ Ottimate",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "Agentic Coding Bot",
      rows: [
        { label: "why I built it", value: "A class of support tickets always followed the same pattern — customer reports odd behaviour, engineer reads the ticket, reads the code, figures out a one-line fix, opens a PR. I got annoyed enough to automate it." },
        { label: "how it works", value: "Claude Code agent reads the incoming ticket, navigates the relevant code, diagnoses the root cause, writes a targeted fix, and opens a PR with a proper description. Each run is containerised via Docker so it can't affect anything outside its scope. MCP integrations give it access to internal tools — no hardcoding." },
        { label: "what surprised me", value: "It makes smaller fixes than most engineers would. No scope creep, no refactoring things that weren't broken. Just the minimum change that solves the problem — which is exactly what you want in a support fix." },
        { label: "recognition", value: "Won Ottimate's internal innovation award." },
        { label: "stack", value: "Claude SDK · MCP · Docker · GitHub API" },
      ],
    },
  },
  {
    title: "EIA Review Tool",
    description: "Environmental Impact Assessments run to hundreds of pages. Reviewers spend weeks on them. I'm building something that reads the whole document, knows which sections are high-stakes, and routes the hard parts to the best model.",
    tech: ["Python", "Claude API", "Token Routing", "RAG"],
    icon: <Database className="text-green" size={22} />,
    category: "Data",
    status: "regulatory compliance",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=900&q=80",
    detail: {
      title: "EIA Review Tool",
      rows: [
        { label: "why I built it", value: "Someone showed me what manual EIA review looks like — a consultant with a highlighter going through 900 pages, section by section, for weeks. Most of it is boilerplate. A small part is high-stakes. I wanted to build something that knows the difference." },
        { label: "how it works", value: "Deterministic section ID mapping — every extracted fact references a specific location so nothing gets mis-attributed. Structured markdown ingestion preserves the document hierarchy rather than flattening it. Then token routing: routine boilerplate sections go to a cost-optimised model, sections flagged as regulatory-critical go to a frontier model." },
        { label: "the hard part", value: "EIA sections reference each other constantly — an impact in section 4 depends on a baseline from section 2 and mitigation measures buried in an appendix. Cross-reference resolution across that span is what I'm focused on now." },
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
              Applied work across document intelligence, developer tooling, automation, and product-minded engineering.{" "}
              <span className="text-sky">Click <span className="font-bold">explain</span> on any card to dig in.</span>
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
                      className="ml-auto flex items-center gap-1.5 rounded-md border border-sky/40 bg-sky/5 px-3 py-1 text-xs text-sky transition hover:border-sky hover:bg-sky/10"
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
