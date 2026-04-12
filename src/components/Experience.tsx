"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Calendar, MapPin, ServerCog } from "lucide-react";

const experience = [
  {
    company: "Ottimate",
    role: "Senior Software Engineer — Integrations Architect",
    period: "May 2022 - Present",
    location: "Bangalore, India",
    description: "Architecting multi-tenant integration infrastructure across a broad set of ERP connectors. Built repeatable connector patterns that cut new ERP integration from weeks to days. Led customer-facing technical engagements — scoping, solution design, production debugging. Built an AI code reviewer in CI/CD via GitHub Actions, an autonomous Claude Code agent for support ticket handling and PR creation, and a company-wide multi-agent Slack bot answering questions across Notion, JIRA, code, and analytics.",
    tech: ["ERP Integrations", "Multi-tenant Platform", "Python", "Claude API", "GitHub Actions"],
    signal: "integrations architect",
  },
  {
    company: "Idealoom Technologies",
    role: "Founding Engineer & Engineering Lead",
    period: "2016 - 2022",
    location: "Bangalore, India",
    description: "Fintech SaaS platform, product architecture, API design, payment provider integrations, banking APIs, and compliance systems.",
    tech: ["Python", "API Design", "Payments", "SaaS Architecture"],
    signal: "product architecture",
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Software Engineer",
    period: "2013 - 2016",
    location: "Bangalore, India",
    description: "BFSI vertical, enterprise IT services, client-facing delivery.",
    tech: ["Enterprise IT", "BFSI", "Software Delivery"],
    signal: "enterprise delivery",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="min-h-full bg-background px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 grid gap-4 rounded-lg border border-line bg-panel p-5 md:grid-cols-[1fr_260px]">
          <div>
            <p className="mb-2 text-sm text-sky">experience.json</p>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Professional Journey</h1>
            <p className="max-w-2xl leading-7 text-subtext1">
              12+ years across product engineering, platform architecture, fintech systems, and applied automation.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-background/45 p-4">
            <div className="mb-3 flex items-center gap-2 text-green">
              <ServerCog size={18} />
              <span className="font-bold">Current focus</span>
            </div>
            <p className="text-sm leading-6 text-subtext1">
              Integration infrastructure at scale — multi-tenant ERP platform, repeatable connector patterns, and production GenAI systems shipping in enterprise environments.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {experience.map((exp, index) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ x: 4 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className="group grid gap-5 rounded-lg border border-line bg-surface0 p-5 transition hover:border-sky/70 hover:bg-surface1 md:grid-cols-[190px_1fr]"
            >
              <div className="border-b border-line pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-5">
                <div className="mb-3 flex items-center gap-2 text-sm text-green">
                  <Calendar size={15} />
                  {exp.period}
                </div>
                <p className="text-xs text-subtext0">{exp.signal}</p>
              </div>

              <div>
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold transition group-hover:text-sky">{exp.company}</h2>
                    <div className="mt-2 flex items-center gap-2 text-sm text-peach">
                      <Briefcase size={15} />
                      <span>{exp.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-subtext0">
                    <MapPin size={14} />
                    {exp.location}
                  </div>
                </div>

                <p className="mb-5 max-w-3xl leading-7 text-subtext1">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tag) => (
                    <span key={tag} className="rounded-md border border-line bg-panel px-3 py-1 text-xs text-subtext1">
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto hidden items-center gap-1 text-xs text-sky opacity-0 transition group-hover:opacity-100 sm:flex">
                    inspect role <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
