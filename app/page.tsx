import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Braces, Cloud, Database, FileText, ShieldCheck, type LucideIcon } from "lucide-react";
import {
  siDocker,
  siFastapi,
  siOpenapiinitiative,
  siOpentelemetry,
  siPostgresql,
  siPydantic,
  siPytest,
  siPython,
  siReact,
  siRos,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { Footer, Header, ProjectCard } from "@/components/site";
import { Reveal } from "@/components/motion";
import { ProjectProof } from "@/components/project-proof";
import { experiences, projects, recognition } from "@/lib/data";

const primaryProjects = projects.filter(project => project.priority === "primary");
const experienceItems = experiences.filter(item => item.kind !== "Education");
const education = experiences.find(item => item.kind === "Education")!;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type TechSkill = { label: string; brand?: SimpleIcon; fallback?: LucideIcon };

const capabilities: Array<{
  icon: LucideIcon;
  code: string;
  title: string;
  text: string;
  skills: TechSkill[];
}> = [
  {
    icon: Database,
    code: "01",
    title: "Backend systems",
    text: "Typed Python APIs, explicit state, persistence, concurrency control, and failure-aware service boundaries.",
    skills: [
      { label: "Python", brand: siPython },
      { label: "FastAPI", brand: siFastapi },
      { label: "PostgreSQL", brand: siPostgresql },
      { label: "Pydantic", brand: siPydantic },
    ],
  },
  {
    icon: Braces,
    code: "02",
    title: "Full-stack workflows",
    text: "Role-specific React products that make multi-step operational processes clear, traceable, and usable.",
    skills: [
      { label: "React", brand: siReact },
      { label: "TypeScript", brand: siTypescript },
      { label: "REST APIs", brand: siOpenapiinitiative },
      { label: "Azure", fallback: Cloud },
    ],
  },
  {
    icon: ShieldCheck,
    code: "03",
    title: "Reliable software",
    text: "Deterministic orchestration, validation, fallback paths, and measured behavior for systems with real constraints.",
    skills: [
      { label: "Testing", brand: siPytest },
      { label: "Observability", brand: siOpentelemetry },
      { label: "ROS2", brand: siRos },
      { label: "Docker", brand: siDocker },
    ],
  },
];

const secondaryProjects = [
  {
    type: "DATA ENGINEERING",
    title: "Bangalore traffic prediction",
    text: "Spatial analysis of 290,000 traffic and parking records using H3, DBSCAN, and XGBoost.",
    href: "https://github.com/The-Eco-Guy/Bangalore_IllegalParkingSpots_GrdilockHackathon2",
    live: "https://bangalore-illegal-parking-spots-grdilockhackathon2bm.streamlit.app/",
  },
  {
    type: "PRODUCT ANALYTICS",
    title: "E-commerce retention analysis",
    text: "Customer segmentation, repurchase modeling, and time-series analysis across the Olist dataset.",
    href: "https://github.com/The-Eco-Guy/Olist-E-Commerce-Strategic-Analysis-Forecasting-2016-2018-",
    live: undefined,
  },
];

function TechMark({ skill }: { skill: TechSkill }) {
  const Fallback = skill.fallback;

  return (
    <span className="tech-mark" title={skill.label}>
      {skill.brand ? (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d={skill.brand.path} /></svg>
      ) : Fallback ? <Fallback aria-hidden="true" /> : null}
      <span>{skill.label}</span>
    </span>
  );
}

export default function Home() {
  return <>
    <Header />
    <main id="main">
      <section className="hero section-shell">
        <div className="hero-grid">
          <Reveal className="hero-copy">
            <p className="eyebrow">FULL STACK ENGINEER</p>
            <p className="hero-name">MUHIR KAPOOR <span>MIT MANIPAL · B.TECH CSE · 2028</span></p>
            <h1>Reliable software for <em>complex systems.</em></h1>
            <p className="lede">I’m a computer science undergraduate and Formula Manipal Driverless engineer building typed Python services, full-stack products, and dependable software for constrained systems.</p>
            <div className="hero-actions">
              <a className="button primary" href="#work">View selected work <ArrowDown size={17} /></a>
              <a className="button ghost" href="mailto:kapoormuhir@gmail.com">Email me <ArrowRight size={17} /></a>
            </div>
          </Reveal>
          <Reveal className="hero-art" delay={.12}>
            <div className="hero-portrait">
              <div className="hero-portrait-frame">
                <Image
                  src="/me.png"
                  alt="Muhir Kapoor presenting technical architecture"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 90vw, 420px"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="work" className="section-shell work-section">
        <Reveal><div className="section-heading section-heading-simple"><h2>Featured work.</h2></div></Reveal>
        <div className="primary-projects">{primaryProjects.map(project => <ProjectCard key={project.slug} project={project} variant="feature" />)}</div>

        <Reveal><div className="supporting-heading"><p className="eyebrow">AUTONOMOUS SYSTEMS</p></div></Reveal>
        <div className="supporting-project">
          <Reveal><article className="project-card compact project-formula-manipal">
            <div className="card-proof">
              <ProjectProof proof={{ type: "website", src: "https://formulamanipal.com/", title: "Formula Manipal official website", caption: "Formula Manipal official team website.", sourceUrl: "https://formulamanipal.com/" }} compact />
            </div>
            <div className="project-copy">
              <p className="eyebrow">AUTONOMOUS SYSTEMS</p>
              <h3><a className="project-title-link" href="https://formulamanipal.com/" target="_blank" rel="noreferrer">Formula Manipal Driverless</a></h3>
              <p className="project-summary">Control and planning work for an autonomous Formula Student car, developed and evaluated in a ROS2 simulation environment.</p>
              <div className="mini-metrics">
                <div title="Modular perception-to-actuation pipeline running at 100 Hz. Source: Technical resource document"><b>100 Hz</b><span>CONTROL LOOP</span></div>
                <div title="Trajectory tracking controller compared with Stanley steering in EUFS. Source: Technical resource document"><b>20–38%</b><span>LAP GAIN</span></div>
                <div title="Collision-free local path planning in the simulated Formula Student environment. Source: Technical resource document"><b>Collision-free</b><span>PATH PLANNING</span></div>
              </div>
              <div className="project-stack" aria-label="Technologies">
                <span>C++</span><span>Python</span><span>ROS2 Humble</span><span>MPC</span><span>Linux</span>
              </div>
              <div className="project-actions">
                <a aria-label="Visit Formula Manipal team website" className="text-link" target="_blank" rel="noreferrer" href="https://formulamanipal.com/">Team website <ArrowUpRight size={16} /></a>
              </div>
            </div>
          </article></Reveal>
        </div>

        <Reveal><div className="secondary-projects">{secondaryProjects.map(project => <article key={project.title}><span>{project.type}</span><h3>{project.title}</h3><p>{project.text}</p><div className="secondary-actions"><a target="_blank" rel="noreferrer" href={project.href}>View repository <ArrowUpRight size={15} /></a>{project.live && <a target="_blank" rel="noreferrer" href={project.live}>Live application <ArrowUpRight size={15} /></a>}</div></article>)}</div></Reveal>
      </section>

      <section id="capabilities" className="capabilities-section"><div className="section-shell">
        <Reveal><div className="section-heading section-heading-simple"><h2>Core skills.</h2></div></Reveal>
        <div className="capability-grid">{capabilities.map(({ icon: Icon, ...capability }, index) => <Reveal key={capability.code} delay={index * .05}><article><div className="cap-top"><Icon /><span>{capability.code}</span></div><h3>{capability.title}</h3><p>{capability.text}</p><div className="skill-logos" aria-label={`${capability.title} technologies`}>{capability.skills.map(skill => <TechMark skill={skill} key={skill.label} />)}</div></article></Reveal>)}</div>
      </div></section>

      <section id="experience" className="trajectory section-shell">
        <Reveal><div className="section-heading section-heading-simple"><h2>Experience.</h2></div></Reveal>
        <div className="trajectory-list">{experienceItems.map((experience, index) => <Reveal key={experience.organization} delay={index * .05}><article><span>0{index + 1}</span><p>{experience.period}</p><div><h3>{experience.link ? <a href={experience.link} target="_blank" rel="noreferrer" className="project-title-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>{experience.organization} <ArrowUpRight size={14} /></a> : experience.organization}</h3><strong>{experience.role}</strong><small>{experience.kind}</small></div><p>{experience.summary}</p></article></Reveal>)}</div>
      </section>

      <section id="education" className="education-section"><div className="section-shell"><Reveal><div className="education-grid"><div><p className="eyebrow">EDUCATION</p><h2>{education.organization}</h2></div><div><b>{education.role}</b><p>{education.summary}</p><span>{education.period}</span></div></div></Reveal></div></section>

      <section id="recognition" className="recognition-section section-shell">
        <Reveal><div className="section-heading"><div><p className="eyebrow">HONORS & AWARDS</p><h2>Awards & recognition.</h2></div><p>Verified competition results and the work<br />presented behind them.</p></div></Reveal>
        
        <div className="recognition-media achievements-scroll" tabIndex={0} role="region" aria-label="Achievements scrollable gallery">
          {recognition.map(item => (
            <figure key={`${item.year}-${item.name}-${item.result}`} className="achievement-card">
              <div className={item.fit === "contain" ? "contain" : ""}>
                <Image src={item.image} alt={item.alt} fill unoptimized sizes="(max-width: 900px) 300px, 340px" />
                <span className="achievement-badge">{item.result}</span>
              </div>
              <figcaption>
                <b>{item.name}</b>
                <span>{item.detail} · {item.year}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="recognition-footer-grid">
          <Reveal>
            <article className="research-callout victory-panel">
              <div className="victory-panel-inner">
                <p className="eyebrow">AEROSPACE RESEARCH & DEFENSE RECORDS</p>
                <h3>Aerospace Victories & Technical Records</h3>

                <div className="victory-sections">
                  <div className="victory-block">
                    <div className="victory-block-head">
                      <span className="victory-block-tag">ISEC</span>
                      <b>International Space Elevator Challenge</b>
                    </div>
                    <ul className="victory-list">
                      <li>
                        <span className="victory-year">2026</span>
                        <div className="victory-info">
                          <span className="victory-title">Planetary Defense & Orbital Systems</span>
                          <span className="victory-subtitle">Global 1st Place · Space Elevator Infrastructure & Defense</span>
                          <a
                            className="victory-link"
                            target="_blank"
                            rel="noreferrer"
                            href="https://youtu.be/3GCDDyIPPyM"
                          >
                            Watch 2026 Defense <ArrowUpRight size={13} />
                          </a>
                        </div>
                      </li>
                      <li>
                        <span className="victory-year">2025</span>
                        <div className="victory-info">
                          <span className="victory-title">Orbital Infrastructure & L5 Tether Dynamics</span>
                          <span className="victory-subtitle">Global 1st Place · University Challenge Defense</span>
                          <a
                            className="victory-link"
                            target="_blank"
                            rel="noreferrer"
                            href="https://youtu.be/xcGijZnxn4E"
                          >
                            Watch 2025 Defense <ArrowUpRight size={13} />
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="victory-block">
                    <div className="victory-block-head">
                      <span className="victory-block-tag">IMBC</span>
                      <b>International Mars Base Challenge</b>
                    </div>
                    <ul className="victory-list">
                      <li>
                        <span className="victory-year">2025</span>
                        <div className="victory-info">
                          <span className="victory-title">Team Celestial: Scalable 50-Person Martian Surface Habitat</span>
                          <span className="victory-subtitle">Global 3rd Place · Solo entry out of 240+ international university teams</span>
                          <a
                            className="victory-link victory-pdf-link"
                            target="_blank"
                            rel="noreferrer"
                            href={`${basePath}/teamcelestial.pdf`}
                          >
                            <FileText size={13} /> View Team Celestial PDF <ArrowUpRight size={13} />
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="contact"><div className="section-shell"><Reveal><p className="eyebrow">CONTACT</p><h2>Let’s build something dependable.</h2><p className="contact-lede">I’m interested in software engineering internships and collaborations involving backend, full-stack, or autonomous systems.</p><a className="contact-email" href="mailto:kapoormuhir@gmail.com">kapoormuhir@gmail.com <ArrowRight /></a></Reveal></div></section>
    </main>
    <Footer />
  </>;
}
