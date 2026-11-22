import { BookOpen, FileText, FolderGit2, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { experience, profiles, projects, writing } from "./content";

const index = [
  { id: "top", label: "About", icon: BookOpen },
  { id: "experience", label: "Experience", icon: FileText },
  { id: "work", label: "Repos", icon: FolderGit2 },
  { id: "writing", label: "Writing", icon: FileText },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-bar">
        <a className="site-name" href="#top" aria-label="pyalwin.github.io home">
          <span className="site-mark"><Terminal size={17} aria-hidden="true" /></span>
          <span>pyalwin.github.io</span>
        </a>
        <a className="site-github" href={profiles.github}><Github size={17} aria-hidden="true" /> GitHub</a>
      </header>

      <div className="shell">
        <aside className="rail">
          <nav aria-label="Portfolio index">
            <p className="rail-title">Index</p>
            <ul>
              {index.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <Icon size={16} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main id="main" tabIndex={-1}>
          <section className="hero" aria-labelledby="hero-title">
            <div className="file-path"><BookOpen size={15} aria-hidden="true" /> README.md</div>
            <p className="hero-role">Infrastructure engineer</p>
            <h1 id="hero-title"><span>Arun</span> <span>Venkataramanan</span></h1>
            <p className="hero-intro">
              I work on the infrastructure team at <strong>Harvey</strong>. My work has spanned backend platforms,
              ERP integrations, and developer tools.
            </p>
          </section>

          <section className="section" id="experience" aria-labelledby="experience-title">
            <div className="section-header">
              <h2 id="experience-title"><FileText size={20} aria-hidden="true" /> Experience</h2>
            </div>
            <ol className="experience-list">
              {experience.map(({ company, role, period, description }) => (
                <li key={company}>
                  <span className="experience-period">{period}</span>
                  <div>
                    <h3>{company}</h3>
                    <p className="experience-role">{role}</p>
                    {description && <p className="experience-description">{description}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="section" id="work" aria-labelledby="work-title">
            <div className="section-header">
              <h2 id="work-title"><FolderGit2 size={20} aria-hidden="true" /> Selected repositories</h2>
              <a className="text-link" href={profiles.repositories}>All repositories</a>
            </div>
            <ul className="directory">
              {projects.map((project) => (
                <li key={project.title}>
                  <div>
                    <h3><a href={project.source}>{project.title}</a></h3>
                    <p>{project.description}</p>
                  </div>
                  <span className="directory-meta">{project.stack}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="section" id="writing" aria-labelledby="writing-title">
            <div className="section-header">
              <h2 id="writing-title"><FileText size={20} aria-hidden="true" /> Writing &amp; videos</h2>
              <a className="text-link" href={profiles.medium}>Medium profile</a>
            </div>
            <ul className="directory">
              {writing.map((item) => (
                <li key={item.url}>
                  <div>
                    <h3><a href={item.url}>{item.title}</a></h3>
                    <p>{item.description}</p>
                  </div>
                  <span className="directory-meta">{item.platform}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="section contact-section" id="contact" aria-labelledby="contact-title">
            <div className="section-header">
              <h2 id="contact-title"><Mail size={20} aria-hidden="true" /> Contact</h2>
            </div>
            <div className="contact-content">
              <p>Based in Bengaluru, India.</p>
              <ul className="contact-links">
                <li><a href={profiles.email}><Mail size={17} aria-hidden="true" /> Email</a></li>
                <li><a href={profiles.linkedin}><Linkedin size={17} aria-hidden="true" /> LinkedIn</a></li>
                <li><a href={profiles.github}><Github size={17} aria-hidden="true" /> GitHub</a></li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
