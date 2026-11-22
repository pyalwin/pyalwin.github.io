import { Braces, Database, Github, Linkedin, Mail, Network, Play } from "lucide-react";
import RetrievalDemo from "@/components/RetrievalDemo";
import { experience, otherProjects, profiles, projects, writing } from "./content";

const projectIcons = { atlas: Network, codemesh: Braces, engramdb: Database };

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header" id="top">
        <div className="wrap header-inner">
          <a className="monogram" href="#top" aria-label="Arun Venkataramanan, home">AV</a>
          <nav aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#writing">Writing</a>
            <a className="nav-contact" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="wrap hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-role"><span aria-hidden="true" /> Software engineer at Harvey</p>
            <h1 id="hero-title"><span>Arun</span> <span>Venkataramanan<span className="name-period" aria-hidden="true">.</span></span></h1>
            <p className="hero-intro">
              I build backend platforms and developer tools.
              Lately, I’ve been working on how AI agents find context and how people review the code they change.
            </p>
            <div className="hero-links">
              <a className="button-primary" href="#work">Explore my work</a>
              <a className="link-icon" href={profiles.github}><Github size={17} aria-hidden="true" /> GitHub</a>
            </div>
          </div>
          <RetrievalDemo />
        </section>

        <section className="wrap section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title">Selected work</h2>
            <a className="text-link" href={profiles.repositories}>All repositories</a>
          </div>
          <div className="project-grid">
            {projects.map((project) => {
              const Icon = projectIcons[project.id];
              return (
                <article className="project-card" key={project.id} id={project.id}>
                  <div className="project-top">
                    <span className="project-icon"><Icon size={22} aria-hidden="true" /></span>
                    <span className="eyebrow">{project.category}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-detail">{project.detail}</p>
                  <div className="project-bottom">
                    <span className="project-stack">{project.stack}</span>
                    <a className="link-icon" href={project.source} aria-label={`View ${project.title} on GitHub`}>
                      <Github size={16} aria-hidden="true" /> Source
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <details className="more-projects">
            <summary>More projects</summary>
            <ul>
              {otherProjects.map((project) => (
                <li key={project.title}>
                  <a className="text-link" href={project.url}>{project.title}</a>
                  <p>{project.description}</p>
                </li>
              ))}
            </ul>
          </details>
        </section>

        <section className="wrap section split-section" id="experience" aria-labelledby="experience-title">
          <h2 id="experience-title">Experience</h2>
          <ol className="experience-list">
            {experience.map((item) => (
              <li key={item.company}>
                <div className="experience-heading">
                  <h3>{item.company}</h3>
                  <span className="eyebrow">{item.period}</span>
                </div>
                <p className="experience-role">{item.role}</p>
                <p className="experience-description">{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="wrap section split-section writing-section" id="writing" aria-labelledby="writing-title">
          <div className="writing-heading">
            <h2 id="writing-title">Writing &amp; videos</h2>
            <div className="writing-profiles">
              <a className="text-link" href={profiles.medium}>Medium</a>
              <a className="text-link" href={profiles.dev}>DEV</a>
            </div>
          </div>
          <div>
            <a className="video-feature" href={profiles.youtube}>
              <span className="video-icon"><Play size={18} aria-hidden="true" /></span>
              <div>
                <span className="eyebrow">YouTube series</span>
                <h3>The Agentic Age</h3>
                <p>Plain-English explainers on how AI agents use tools, handle context, and decide what to do next.</p>
              </div>
            </a>
            <ul className="writing-list">
              {writing.map((article) => (
                <li key={article.url}>
                  <a href={article.url}>
                    <div>
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                    </div>
                    <span className="eyebrow">{article.platform}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="wrap contact-inner">
            <div>
              <h2 id="contact-title">Let’s talk.</h2>
              <p>I’m based in Bengaluru, India.</p>
            </div>
            <div className="contact-links">
              <a className="link-icon" href={profiles.email}><Mail size={18} aria-hidden="true" /> Email</a>
              <a className="link-icon" href={profiles.linkedin}><Linkedin size={18} aria-hidden="true" /> LinkedIn</a>
              <a className="link-icon" href={profiles.github}><Github size={18} aria-hidden="true" /> GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <span>Arun Venkataramanan</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  );
}
