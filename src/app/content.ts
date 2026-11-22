export const profiles = {
  github: "https://github.com/pyalwin",
  repositories: "https://github.com/pyalwin?tab=repositories",
  linkedin: "https://www.linkedin.com/in/arun-venkataramanan/",
  email: "mailto:arun.tgode@gmail.com",
  youtube: "https://www.youtube.com/@nomysterytech",
  medium: "https://medium.com/@arun_venkat",
  dev: "https://dev.to/pyalwin",
};

export const projects = [
  {
    id: "atlas",
    title: "Atlas",
    category: "Code review",
    description:
      "A local repository explorer for reviewing changes in context. Start with a feature, trace it to the source, and see what a pull request touches.",
    detail:
      "Atlas indexes a checkout into a map of features, files, and symbols. Each relationship points back to the source so reviewers can check it themselves.",
    stack: "TypeScript · Python · MCP",
    source: "https://github.com/pyalwin/atlas",
  },
  {
    id: "codemesh",
    title: "Codemesh",
    category: "Context for coding agents",
    description:
      "A codebase map that agents can query instead of searching the same files every session.",
    detail:
      "Tree-sitter extracts symbols and relationships into a local graph. Agents explore it through MCP and can write useful findings back for future sessions.",
    stack: "TypeScript · Tree-sitter · SQLite",
    source: "https://github.com/pyalwin/codemesh",
  },
  {
    id: "engramdb",
    title: "EngramDB",
    category: "Document retrieval",
    description:
      "A retrieval engine that follows a contract’s definitions and cross-references to find evidence spread across sections.",
    detail:
      "Vector search finds a starting section. A graph walk pulls in linked evidence. On 183 multi-hop questions across 35 CUAD contracts, hybrid recall was 92.8% versus 68.2% for vector search alone.",
    stack: "Python · DuckDB · Graph retrieval",
    source: "https://github.com/pyalwin/engramdb",
  },
] as const;

export const otherProjects = [
  {
    title: "WorkGraph",
    description: "A local workspace that links tickets, docs, meetings, and chat into workstreams.",
    url: "https://github.com/pyalwin/workgraph",
  },
  {
    title: "Bifrost",
    description: "A desktop interface for Claude Code with streaming sessions, tool approvals, and diffs.",
    url: "https://github.com/pyalwin/bifrost",
  },
  {
    title: "Cortex",
    description: "An experiment in extracting structured data from documents with cross-references.",
    url: "https://github.com/pyalwin/cortex",
  },
  {
    title: "Frameforge",
    description: "An MCP server that generates interface mockups before implementation.",
    url: "https://github.com/pyalwin/frameforge",
  },
];

export const experience = [
  {
    company: "Harvey",
    role: "Software Engineer",
    period: "Present",
    description: "Building software for legal professionals.",
  },
  {
    company: "Ottimate",
    role: "Senior Software Engineer, Integrations Architect",
    period: "Previous role",
    description:
      "Designed the Unified Integration Protocol for connecting external ERP systems. Built internal agent tooling, including a Slack knowledge assistant and a coding agent for support tickets.",
  },
  {
    company: "Idealoom Technologies",
    role: "Founding Engineer and Engineering Lead",
    period: "2016–2022",
    description:
      "Built a fintech SaaS from the ground up, spanning payments, banking APIs, compliance workflows, and engineering hiring.",
  },
  {
    company: "Tata Consultancy Services",
    role: "Software Engineer",
    period: "2013–2016",
    description: "Worked on enterprise software for banking clients.",
  },
];

export const writing = [
  {
    title: "What makes Claude dumb even with more tools?",
    description: "Why I gave specialist agents fewer tools and let a router decide when to call them.",
    platform: "Medium",
    url: "https://ai.plainenglish.io/specialist-agents-why-one-ai-cant-do-everything-ac3f730a2840",
  },
  {
    title: "Beyond RAG: Building Graph-Aware Retrieval for Contract Reasoning",
    description: "What breaks when a contract answer lives across several sections.",
    platform: "DEV",
    url: "https://dev.to/pyalwin/beyond-rag-building-graph-aware-retrieval-for-contract-reasoning-3o05",
  },
  {
    title: "Stop Chatting with Claude Code. Start Building on It.",
    description: "Using the CLI as a building block for multi-agent workflows.",
    platform: "Medium",
    url: "https://ai.plainenglish.io/stop-chatting-with-claude-code-start-building-on-it-8b9a8e5c5732",
  },
  {
    title: "Claude Code CLI: The Interface That’s Actually the Infrastructure",
    description: "How tool access and scoped permissions shape an agent’s role.",
    platform: "Medium",
    url: "https://medium.com/@arun_venkat/build-on-the-cli-why-the-simplest-interface-is-the-most-powerful-be8753ad9a43",
  },
  {
    title: "CLAUDE.md: The File Claude Reads Before You Speak",
    description: "How to give agents the project context and conventions they need.",
    platform: "Medium",
    url: "https://ai.plainenglish.io/claude-md-the-file-claude-reads-before-you-speak-1bbea5ccb59a",
  },
  {
    title: "Beyond Simple Prompts: Architecting an AI Agent",
    description: "Using paragraph anchors and tracked changes to make contract review traceable.",
    platform: "DEV",
    url: "https://dev.to/pyalwin/beyond-simple-prompts-architecting-an-ai-agent-1i8c",
  },
];
