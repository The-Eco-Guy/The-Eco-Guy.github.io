import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import type { Project } from "@/lib/data";
import { Reveal } from "./motion";
import { ProjectProof } from "./project-proof";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark">
        <span>MK</span>
        <b>Muhir Kapoor</b>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#recognition">Awards</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div>
        <span className="eyebrow">MUHIR KAPOOR</span>
        <p>Full stack engineer / Manipal, India</p>
      </div>
      <SocialIcons />
    </footer>
  );
}

export function ProjectCard({ project, variant = "feature" }: { project: Project; variant?: "feature" | "compact" }) {
  const primaryActionUrl = project.live || project.repo;

  return (
    <Reveal>
      <article className={`project-card ${variant} project-${project.slug}`}>
        <div className="card-proof">
          {project.proof ? (
            <ProjectProof proof={project.proof} compact />
          ) : (
            <div className="proof-fallback" aria-label="India AI Impact Summit, New Delhi">
              <span>HCL GUVI</span>
              <b>AI IMPACT SUMMIT</b>
              <small>NEW DELHI · 2026</small>
            </div>
          )}
        </div>
        <div className="project-copy">
          <h3>
            {primaryActionUrl ? (
              <a className="project-title-link" href={primaryActionUrl} target="_blank" rel="noreferrer">
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          <p className="project-summary">{project.summary}</p>
          <div className="mini-metrics">
            {project.metrics.map((metric) => (
              <div key={`${metric.value}-${metric.label}`} title={`${metric.context}. Source: ${metric.source}`}>
                <b>{metric.value}</b>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          <div className="project-stack" aria-label="Technologies">
            {project.stack.slice(0, variant === "feature" ? 5 : 4).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="project-actions">
            {project.repo && (
              <a className="button ghost" target="_blank" rel="noreferrer" href={project.repo}>
                Repository <ArrowUpRight size={16} />
              </a>
            )}
            {project.live && (
              <a className="button primary" target="_blank" rel="noreferrer" href={project.live}>
                {project.slug === "space-systems" ? "Watch presentation" : "Live prototype"} <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function SocialIcons() {
  return (
    <div className="social-icons">
      <a href="https://github.com/The-Eco-Guy" target="_blank" rel="noreferrer" aria-label="GitHub">
        <Github />
      </a>
      <a href="https://linkedin.com/in/muhir-kapoor" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <Linkedin />
      </a>
      <a href="mailto:kapoormuhir@gmail.com" aria-label="Email">
        <Mail />
      </a>
    </div>
  );
}
