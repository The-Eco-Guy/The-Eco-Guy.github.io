import Image from "next/image";
import type { ProjectProof as ProjectProofData } from "@/lib/data";

function HoneypotDiagram() {
  return <div className="system-diagram honeypot-diagram" role="img" aria-label="Honeypot request flow from API through session lock, extraction, three agents, database, and response">
    <div className="diagram-row"><span>POST /message</span><i>-&gt;</i><span>API auth</span><i>-&gt;</i><span>session lock</span></div>
    <div className="diagram-branch"><b>structured extraction</b><span>regex + typed fields</span></div>
    <div className="agent-row"><span>ANALYST</span><i>-&gt;</i><span>STRATEGIST</span><i>-&gt;</i><span>OPERATOR</span></div>
    <div className="diagram-row output"><span>PostgreSQL</span><i>&lt;-&gt;</i><span>JSON response</span></div>
  </div>;
}

function FormulaDiagram() {
  return <div className="system-diagram formula-diagram" role="img" aria-label="Formula Manipal ROS2 control loop from perception through localization, planning, controller, and actuation">
    <div className="control-loop"><span>PERCEPTION</span><i>-&gt;</i><span>LOCALIZATION</span><i>-&gt;</i><span>PLANNING</span><i>-&gt;</i><span>MPC / STANLEY</span><i>-&gt;</i><span>ACTUATION</span></div>
    <div className="feedback-line"><b>EUFS vehicle state</b><span>feedback / timing / cross-track error</span></div>
  </div>;
}

export function ProjectProof({ proof, compact = false }: { proof: ProjectProofData; compact?: boolean }) {
  if (proof.type === "website") return <figure className={`project-proof website-proof ${compact ? "compact" : ""}`}>
    <div className="proof-stage"><iframe loading="lazy" src={proof.src} title={proof.title} sandbox="allow-scripts allow-same-origin allow-popups allow-forms" /></div>
    <figcaption>{proof.caption}</figcaption>
  </figure>;

  if (proof.type === "videos") return <figure className={`project-proof video-proof ${compact ? "compact" : ""}`}>
    <div className="proof-stage video-grid">{proof.items.map(item => <div className="video-item" key={item.src}><iframe loading="lazy" src={item.src} title={item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /><a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.title}</a></div>)}</div>
    <figcaption>{proof.caption}</figcaption>
  </figure>;

  return <figure className={`project-proof ${compact ? "compact" : ""}`}>
    <div className={`proof-stage ${proof.type === "image" && proof.src.includes("ekalavya") ? "proof-contain" : ""}`}>
      {proof.type === "image" ? <Image src={proof.src} alt={proof.alt} fill unoptimized sizes={compact ? "(max-width: 800px) 100vw, 44vw" : "(max-width: 800px) 100vw, 70vw"} /> : proof.variant === "honeypot" ? <HoneypotDiagram /> : <FormulaDiagram />}
    </div>
    <figcaption>{proof.caption}</figcaption>
  </figure>;
}
