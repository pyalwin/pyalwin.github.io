export const profiles = {
  github: "https://github.com/pyalwin",
  repositories: "https://github.com/pyalwin?tab=repositories",
  linkedin: "https://www.linkedin.com/in/arun-venkataramanan/",
  email: "mailto:arun.tgode@gmail.com",
  youtube: "https://www.youtube.com/@nomysterytech",
  medium: "https://medium.com/@arun_venkat",
};

export const projects = [
  {
    title: "Atlas",
    description: "Local repository maps for navigating code and reviewing changes.",
    stack: "TypeScript · Python",
    source: "https://github.com/pyalwin/atlas",
  },
  {
    title: "Codemesh",
    description: "A queryable code graph that coding agents can use across sessions.",
    stack: "TypeScript · Tree-sitter",
    source: "https://github.com/pyalwin/codemesh",
  },
  {
    title: "Bifrost",
    description: "A desktop interface for Claude Code with live diffs and tool approvals.",
    stack: "Electron · TypeScript",
    source: "https://github.com/pyalwin/bifrost",
  },
];

export const experience = [
  {
    company: "Harvey",
    role: "Software Engineer, Infrastructure",
    period: "Current",
  },
  {
    company: "Ottimate",
    role: "Senior Software Engineer, Integrations Architect",
    description:
      "Designed the Unified Integration Protocol for connecting external ERP systems and built internal developer tooling.",
  },
  {
    company: "Idealoom Technologies",
    role: "Founding Engineer and Engineering Lead",
    period: "2016–2022",
    description: "Built a fintech SaaS spanning payments, banking APIs, and compliance workflows.",
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
    title: "Claude Code CLI: The Interface That’s Actually the Infrastructure",
    description: "How tool access and scoped permissions shape an agent’s role.",
    platform: "Medium",
    url: "https://medium.com/@arun_venkat/build-on-the-cli-why-the-simplest-interface-is-the-most-powerful-be8753ad9a43",
  },
  {
    title: "What makes Claude dumb even with more tools?",
    description: "How a router and a few scoped specialists split up the work.",
    platform: "Medium",
    url: "https://ai.plainenglish.io/specialist-agents-why-one-ai-cant-do-everything-ac3f730a2840",
  },
  {
    title: "CLAUDE.md: The File Claude Reads Before You Speak",
    description: "Giving agents the project context and conventions they need.",
    platform: "Medium",
    url: "https://ai.plainenglish.io/claude-md-the-file-claude-reads-before-you-speak-1bbea5ccb59a",
  },
  {
    title: "The Agentic Age",
    description: "Plain-English videos on how AI agents use tools and context.",
    platform: "YouTube",
    url: profiles.youtube,
  },
];
