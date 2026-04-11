"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Database, Cpu, Layout, Workflow } from "lucide-react";

const projects = [
  {
    title: "AgreedPro",
    description: "Advanced RAG platform for legal contract analysis with deterministic Paragraph ID injection to eliminate hallucinations.",
    tech: ["Python", "LangChain", "FAISS", "RAG"],
    icon: <Database className="text-mauve" size={24} />,
    github: "github.com/pyalwin",
  },
  {
    title: "Document Intelligence",
    description: "Multi-agent extraction platform using GraphRAG and multi-tier LLM routing for complex entity disambiguation.",
    tech: ["Multi-Agent", "GraphRAG", "LangGraph", "Python"],
    icon: <Cpu className="text-blue" size={24} />,
  },
  {
    title: "Bifrost",
    description: "Desktop AI Agent interface (Electron) wrapping Claude Code with WebSocket streaming and HITL tool approval flows.",
    tech: ["Electron", "React", "TypeScript", "WebSockets"],
    icon: <Layout className="text-sky" size={24} />,
    github: "github.com/pyalwin/bifrost",
  },
  {
    title: "Otticode",
    description: "Award-winning autonomous coding agent with multi-model debate architecture and MCP server integration.",
    tech: ["Claude SDK", "MCP", "Docker", "Agents"],
    icon: <Workflow className="text-peach" size={24} />,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Independent <span className="text-mauve">AI Projects</span></h2>
          <div className="w-20 h-1.5 bg-mauve rounded-full mb-6" />
          <p className="text-subtext1 max-w-2xl leading-relaxed">
            Personal engineering experiments in multi-agent orchestration, GraphRAG, and developer tooling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-surface0 border border-surface1 p-8 rounded-2xl hover:border-mauve/50 transition-colors group relative"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-surface1 rounded-xl">
                  {project.icon}
                </div>
                <div className="flex gap-4">
                  {project.github && (
                    <a href={`https://${project.github}`} target="_blank" className="text-subtext1 hover:text-mauve transition-colors">
                      <Github size={20} />
                    </a>
                  )}
                  <a href="#" className="text-subtext1 hover:text-mauve transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-mauve transition-colors">{project.title}</h3>
              <p className="text-subtext1 mb-6 leading-relaxed min-h-[80px]">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag, j) => (
                  <span key={j} className="px-3 py-1 bg-surface1 text-text text-xs rounded-full border border-surface2">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
