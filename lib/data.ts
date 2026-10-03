export type ProjectSlug = "ai-honeypot" | "ekalavya" | "space-systems";

export type Metric = { value: string; label: string; context: string; source: string };
export type ProjectProof =
  | { type: "image"; src: string; alt: string; caption: string; sourceUrl?: string }
  | { type: "diagram"; variant: "honeypot" | "formula"; caption: string; sourceUrl?: string }
  | { type: "website"; src: string; title: string; caption: string; sourceUrl: string }
  | { type: "videos"; caption: string; items: { src: string; title: string; sourceUrl: string }[] };

export type Project = {
  slug: ProjectSlug;
  index: string;
  title: string;
  shortTitle: string;
  summary: string;
  role: string;
  priority: "primary" | "supporting" | "research";
  period: string;
  metrics: Metric[];
  stack: string[];
  challenge: string;
  contributions: string[];
  decisions: string[];
  outcomes: string[];
  limitations: string[];
  proof?: ProjectProof;
  sourceNote: string;
  claimSources: Record<string, string>;
  repo?: string;
  live?: string;
};

export type Experience = { period: string; organization: string; role: string; kind: string; summary: string; link?: string };
export type Recognition = { year: string; result: string; name: string; detail: string; image: string; alt: string; fit?: "cover" | "contain" };

export const projects: Project[] = [
  {
    slug: "ai-honeypot",
    index: "01",
    shortTitle: "AI Honeypot",
    title: "Agentic AI Honeypot Engine",
    role: "Backend & Distributed Systems Architect",
    priority: "primary",
    period: "2026",
    summary: "An autonomous threat-intelligence platform deployed as a stateful FastAPI service, utilizing a deterministic 3-agent LLM pipeline, adversarial victim persona simulation, sub-millisecond regex pre-filtering, and a 3-tier provider fallback chain to engage financial scammers and harvest actionable forensic evidence.",
    metrics: [
      { value: "99.9% Faster", label: "extraction latency", context: "<0.5ms pre-compiled regex vs 2–3s model invocation", source: "Public repository (src/extractor.py)" },
      { value: "3-Tier Chain", label: "failover resilience", context: "Azure OpenAI → Google Gemini → Groq automated probing", source: "Public repository (src/llm.py)" },
      { value: "Top 15", label: "national finalist", context: "HCL GUVI India AI Impact Buildathon (20,000+ teams)", source: "Official summit records" },
    ],
    stack: ["Python", "FastAPI", "Asyncio", "PostgreSQL", "SQLAlchemy", "Pydantic", "Azure OpenAI", "Google Gemini", "Groq", "Docker"],
    challenge: "Financial fraudsters target millions of Indian citizens daily via SMS and chat channels (UPI fraud, fake KYC alerts, parcel scams). Traditional defensive systems rely on blocking sender numbers, which attackers trivially rotate. The goal was to build an autonomous honeypot that engages scammers in realistic multi-turn roleplay, prolongs interaction, and extracts actionable forensic artifacts (bank accounts, UPI IDs, phone numbers, phishing links) without exposing its artificial nature.",
    contributions: [
      "Architected a deterministic 3-agent orchestration state machine (src/orchestrator.py) in pure Python control flow with zero LLM calls in the orchestrator, ensuring auditable, predictable turn-by-turn state transitions.",
      "Built the Analyst Agent (src/agents/analyst.py) to evaluate incoming threats across 15 scam classifications and 5 interaction stages, scan for prompt injection / jailbreak attempts, and trigger early-exit logic for benign contacts.",
      "Engineered the Strategist Agent (src/agents/strategist.py) featuring a library of 10 tactical maneuvers (delay, reverse verification, simulated payment failure, feigned confusion, authority validation, partial compliance, etc.) with dynamic safeguards: anti-repetition rules, max 2 payment failure tactics per session, and denial-triggered field deprioritization.",
      "Designed the Operator Agent (src/agents/operator.py) with a dual-layer persona architecture (inner CBI intelligence strategist + outer civilian victim persona), enforcing banned-word cover protection, first-turn brevity (<50 words), and cycling stylistic openings.",
      "Built the hybrid extraction engine: an in-memory pre-compiled regex interceptor running in <0.5ms across 30+ Indian UPI suffixes, bank accounts near financial keywords, IFSC codes, and defanged URLs, paired with contextual LLM extraction for case IDs, employee IDs, and denial detection.",
      "Implemented concurrency-safe turn serialization via per-session in-memory asyncio.Lock registries, deterministic SHA-256 persona selection from a pool of 10+ detailed Indian victim identities, and a 3-tier resilient LLM fallback chain (Azure OpenAI → Google Gemini with 4 model fallbacks and role-caching → Groq).",
    ],
    decisions: [
      "Decoupled extraction entirely from response generation: running regex extraction in-memory before model calls dropped extraction latency by 99.9%, eliminated token costs on structured entities, and prevented malformed JSON hallucinations.",
      "Avoided autonomous agent frameworks in favor of explicit Python control flow, ensuring that turn sequencing, timeouts, and state updates remain deterministic, thread-safe, and debuggable.",
      "Enforced single-worker uvicorn deployment (--workers 1) to keep session-level asyncio.Lock registries in shared process memory, preventing race conditions on rapid multi-message bursts without requiring external distributed lock infrastructure.",
    ],
    outcomes: [
      "Achieved sub-millisecond extraction latency for all structured financial identifiers; maintained strict static typing (strict mypy) and Pydantic validation across all API boundaries.",
      "Demonstrated seamless resilience during live provider stress testing through automated model probing and session-lifetime model caching across the Azure → Gemini → Groq fallback hierarchy.",
      "Ranked Top 15 nationally out of 20,000+ teams at the HCL GUVI AI Impact Summit at Bharat Mandapam, New Delhi (February 2026).",
    ],
    limitations: [
      "Built as a competition prototype evaluated during the HCL GUVI AI Impact Buildathon national finals; production deployment would require sovereign hosting and statutory CERT-In integration.",
      "Per-session asyncio locks are process-local; horizontal scaling across multiple nodes would require distributed synchronization (e.g. Redis locks).",
      "External LLM generation latency remains governed by upstream model provider performance, so fallbacks improve availability rather than guarantee sub-second end-to-end response times.",
    ],
    proof: { type: "image", src: "/media/agentic_ai.jpg", alt: "Muhir Kapoor and team standing in front of international flags at Bharat Mandapam for the HCL GUVI AI Impact Summit national finals", caption: "Team photograph at the HCL GUVI India AI Impact Buildathon national finals, Bharat Mandapam, New Delhi — February 2026.", sourceUrl: "https://github.com/The-Eco-Guy/honey_we_trapped_the_scammers_microsoft_ai_unlocked" },
    sourceNote: "Architecture and runtime behavior are sourced directly from the project repository; competition placement is verified from the summit records.",
    claimSources: { architecture: "Public GitHub repository", award: "Portfolio_Technical_Resource_Document.md", benchmark: "Portfolio_Technical_Resource_Document.md" },
    repo: "https://github.com/The-Eco-Guy/honey_we_trapped_the_scammers_microsoft_ai_unlocked",
  },
  {
    slug: "ekalavya",
    index: "02",
    shortTitle: "Project Ekalavya",
    title: "Project Ekalavya: AI-Enabled Scholarship & Fellowship Platform",
    role: "Full-Stack Lead & Product Architect",
    priority: "primary",
    period: "2024 - 2026",
    summary: "One unified platform for applicants, universities, and the Ministry of Tribal Affairs (MoTA, SIH26239), replacing manual scrutiny with a 4-tier document extraction cascade, deterministic JSON rules engine, Gazette phonetic name matching, and 21-day institutional SLA auto-escalation.",
    metrics: [
      { value: "82% Faster", label: "scrutiny overhead", context: "55 min manual review cut to 10 min exception handling", source: "Ekalavya SIH presentation (Slide 5)" },
      { value: "<1 Sec", label: "cohort attestation", context: "Nodal officer verifies entire student cohort via cryptographically signed CSV", source: "Ekalavya SIH presentation (Slide 4)" },
      { value: "Zero Leakage", label: "PFMS idempotency", context: "Pre-flight ABPS verification & SHA-256 audit ledger", source: "Ekalavya SIH presentation (Slide 5)" },
    ],
    stack: ["FastAPI", "Python", "React", "TypeScript", "PostgreSQL", "PaddleOCR", "PP-Structure", "Qwen2.5-VL", "PyMuPDF", "Celery", "Redis", "Docker"],
    challenge: "Rajya Sabha records showed 825 scholarship grievances in 2025–26, while verification delays caused over half of foreign NOS awardees to miss university admission intake dates and NFST scholars to face up to 1-year instalment waits. Manual scrutiny took 55 minutes per application, universities stalled verifications without accountability, and indigenous students were routinely disqualified over minor certificate transliteration variances across revenue offices.",
    contributions: [
      "Designed the Scheme-as-Config Engine: scheme rules, forms, and checks run as declarative JSON settings drafted from official notification PDFs, enabling new scheme additions and mid-cycle rule amendments with zero code changes.",
      "Engineered the 4-Tier Document Extraction Cascade: Tier 1 extracts digital text via PyMuPDF with regex templates; Tier 2 runs OpenCV preprocessing and PaddleOCR / PP-Structure table parsing for marksheets; Tier 3 routes unresolved fields to Qwen2.5-VL-7B (4-bit AWQ on private vLLM GPU); Tier 4 provides side-by-side cropped document verification for officers.",
      "Built the Gazette & Phonetic Name Matching Engine: normalizes strings through IndicXlit transliteration (Aksharantar) and Double Metaphone + Levenshtein distance against the official 30-tribe Central ST Gazette and alias lists, ensuring spelling variants (e.g. Marandi/Marandy, Santal/Santhal) are never unlawfully rejected.",
      "Implemented the University Verification Pipeline: enables university Nodal Officers to attest an entire student cohort in under one second using a single cryptographically signed CSV roster, backed by a 21-day background SLA timer that auto-escalates inactive universities to the Ministry.",
      "Built the 5-Year Fellowship Post-Selection Milestone Tracker: tracks ~3,800 scholars instalment-by-instalment from enrolment to award closure, automating Month 22 Three-Member Committee alerts, Month 25 JRF-to-SRF stipend elevation (₹37,000 to ₹42,000/mo), pre-flight NPCI ABPS Aadhaar-seeding checks, and PFMS ISO 20022 pain.001 XML payment batches.",
    ],
    decisions: [
      "Separated AI extraction from decision authority ('Rules decide. AI never does'): AI reads documents and drafts rules, but deterministic JSON rules evaluate pass/fail criteria, and only human officers execute approvals, rejections, or overrides.",
      "Enforced sovereign data boundaries: all OCR, document parsing, and vision AI run on self-hosted infrastructure on Government cloud, ensuring zero applicant PII leaks to commercial external APIs, with full DPDP Act 2023 consent and CERT-In 180-day logging compliance.",
      "Applied the Transactional Outbox pattern and an append-only SHA-256 hash-chained audit ledger, logging every view, export, and officer override with a mandatory statutory reason to deliver 100% CAG audit traceability.",
    ],
    outcomes: [
      "Demonstrated an 82% reduction in officer review overhead (55 minutes down to 10 minutes per application) by surfacing only flagged exceptions alongside cropped document evidence.",
      "Eliminated university attestation bottlenecks through single-roster CSV reconciliation, recovering up to 12 overseas NOS seats annually from missed admissions.",
      "Delivered a low-bandwidth, offline-first Progressive Web App (PWA) with client-side WebP compression (5 MB to ~300 KB) and 22 Indian language translations via BHASHINI, returning initial eligibility pre-checks in under 2 minutes even over 2G.",
    ],
    limitations: [
      "Developed as a Smart India Hackathon working prototype for SIH problem statement SIH26239; it is not an official Government of India production portal.",
      "While the PWA supports 22 languages via BHASHINI, certified regional translation vetting by statutory language boards remains pending for production release.",
    ],
    proof: {
      type: "website",
      src: "https://eklavya-mota.azurewebsites.net/",
      title: "Project Ekalavya live prototype portal",
      caption: "Live interactive prototype portal for Project Ekalavya (Team Aura-Mind, SIH26239).",
      sourceUrl: "https://eklavya-mota.azurewebsites.net/",
    },
    sourceNote: "System architecture, performance targets, and problem context are sourced directly from the official Project Ekalavya SIH presentation (photos_certificates/Ekalavya_SIH_Final_v7.pdf) and the eklavya-platform repository.",
    claimSources: { architecture: "Ekalavya_SIH_Final_v7.pdf", interface: "Live prototype", rules_engine: "app/services/rules_engine.py", document_forensics: "app/services/document_forensics.py", tests: "tests/ directory" },
    live: "https://eklavya-mota.azurewebsites.net/",
  },
  {
    slug: "space-systems",
    index: "03",
    shortTitle: "Team Celestial (IMBC)",
    title: "Team Celestial: IMBC Mars Base & Space Systems",
    role: "Solo Systems Architect — Team Celestial",
    priority: "research",
    period: "2025 - 2026",
    summary: "Comprehensive extreme-environment systems engineering covering the International Mars Base Challenge (IMBC 2025 Global 3rd Place) for a 50-person scalable Martian surface habitat, and back-to-back global 1st place wins at the International Space Elevator Challenge (ISEC 2025 & 2026).",
    metrics: [
      { value: "Global 3rd", label: "240+ university teams", context: "Solo entry out of 240+ international university teams (SPROS / BITS Goa)", source: "SPROS IMBC Certificate" },
      { value: "98% Recovery", label: "closed-loop ECLSS", context: "Sabatier CO2 reduction & greywater reclamation loop", source: "Team Celestial Mission Architecture" },
      { value: "2x Global 1st", label: "space elevator", context: "Persistent planetary defense & L5 orbital logistics ($2,000 NSS Prize)", source: "ISEC Certificate" },
    ],
    stack: ["ECLSS Life Support", "Sabatier Reactor", "ISRU", "Orbital Mechanics", "Tether Dynamics", "Thermal Management", "Radiation Shielding", "Mass Balancing"],
    challenge: "Deep-space surface habitation on Mars and persistent orbital infrastructure require closed-loop life support, extreme thermal management (-125°C diurnal drops), and multi-ton radiation mass balancing without relying on continuous Earth resupply.",
    contributions: [
      "Engineered the Scalable Mars Habitat Mission Concept (IMBC 2025) for Team Celestial: a modular surface base designed for an initial crew of 4–8 in 2040 and scaling to 50 permanent inhabitants by 2060, placing 3rd globally out of 240+ international teams.",
      "Modeled closed-loop Environmental Control and Life Support Systems (ECLSS): Sabatier reactor CO2 reduction, water electrolysis, greywater reclamation loops, and emergency nitrogen buffer architectures.",
      "Designed thermal and In-Situ Resource Utilization (ISRU) power budgets: diurnal thermal storage surviving -125°C Martian nights, subterranean regolith radiation shielding, and automated subsurface water ice extraction.",
      "Architected the Space Elevator Persistent Planetary Defense system (ISEC 2026 1st Place): shifting from episodic chemical rocket 'launch-on-warning' to persistent 'release-on-tasking' via orbital tether logistics, deploying sensor swarms at the Apex Anchor and Lagrange points.",
      "Modeled the Earth-Moon L5 orbital habitat (ISEC 2025 1st Place): calculating structural rotation for 1g artificial gravity without Coriolis vestibular sickness, comparing lunar regolith vs water shielding mass balances.",
    ],
    decisions: [
      "Prioritized closed-loop mechanical ECLSS over open-loop resupply, mathematically balancing daily water, oxygen, and metabolic loops to achieve 98% consumables recovery.",
      "Used in-situ subterranean regolith placement rather than launching heavy radiation shielding from Earth, reducing launch payload mass by orders of magnitude.",
      "Tied tether climb dynamics, vibration harmonics, and Coriolis compensation into a unified predictive model for stable high-throughput orbital logistics.",
    ],
    outcomes: [
      "Won 3rd Place Globally at the International Mars Base Challenge (IMBC 2025) as a solo designer competing against 240+ international teams.",
      "Won First Place Globally in the International Space Elevator Challenge (ISEC) university category in both 2025 and 2026 ($2,000 National Space Society prize).",
      "Delivered full mathematical mission architectures, closed-loop life support budgets, and published academic defense presentations.",
    ],
    limitations: [
      "These represent competitive mission design architectures, mathematical physics modeling, and systems engineering proposals, not constructed flight hardware.",
      "Biological loop closure rates and ISRU excavation yields remain theoretical models subject to future ground-truth robotic validation.",
    ],
    proof: { type: "videos", caption: "Submitted ISEC presentation videos for the 2025 and 2026 research studies.", items: [
      { src: "https://www.youtube-nocookie.com/embed/3GCDDyIPPyM", title: "ISEC 2026 — Space Elevator-Enabled Infrastructure for Persistent Planetary Defense and Orbital Systems", sourceUrl: "https://youtu.be/3GCDDyIPPyM" },
      { src: "https://www.youtube-nocookie.com/embed/xcGijZnxn4E", title: "ISEC 2025 — Team Celestial MIT Manipal university challenge presentation", sourceUrl: "https://youtu.be/xcGijZnxn4E" },
    ] },
    sourceNote: "Research concepts are described as modeled research proposals presented to the International Space Elevator Consortium and SPROS.",
    claimSources: { award: "Supplied ISEC and IMBC certificates", research: "Portfolio_Technical_Resource_Document.md" },
    live: "https://youtu.be/3GCDDyIPPyM",
  },
];

export const experiences: Experience[] = [
  { period: "Sep 2025 - present", organization: "Formula Manipal", role: "Driverless Software Engineer", kind: "Autonomous Racing Team", summary: "Control, planning, and ROS2 integration for the driverless autonomous racing vehicle in the EUFS simulator.", link: "https://formulamanipal.com/" },
  { period: "2024 - present", organization: "Manipal Institute of Technology", role: "B.Tech, Computer Science & Engineering", kind: "Education", summary: "CGPA 8.36 / 10.0. Core coursework in distributed systems, algorithms, database engineering, and networks." },
  { period: "2022 - 2023", organization: "Space Settlement Design Competitions", role: "Head of Space Club", kind: "Student Leadership", summary: "Led infrastructure and life-support subsystem engineering across national, Asian regional, and world-final teams, and mentored a team of 20 juniors." },
];

export const recognition: Recognition[] = [
  { year: "2026", result: "Top 15", name: "HCL GUVI AI Impact Summit", detail: "Agentic AI Honeypot (out of 20,000+ teams)", image: "/media/ai-impact-finalist.jpg", alt: "HCL GUVI India AI Impact Buildathon finalist certificate", fit: "contain" },
  { year: "2026", result: "1st place", name: "MAHE Mobility Challenge", detail: "Autonomous robotics track (₹50,000 prize)", image: "/media/mahe-mobility-winner.jpg", alt: "VroomVroom team receiving the MAHE Mobility Challenge winner award" },
  { year: "2026", result: "1st place", name: "ISEC Academic Challenge", detail: "Global University Category (Planetary Defense)", image: "/media/isec-2026-first-place.jpg", alt: "ISEC 2026 first-place certificate", fit: "contain" },
  { year: "2025", result: "Global 3rd", name: "International Mars Base Challenge", detail: "Team Celestial solo entry out of 240+ international teams", image: "/media/imbc-instagram.jpg", alt: "Space Robotics Society Instagram announcement: Mars Base Challenge 2025 rankings with Team Celestial in 3rd place", fit: "contain" },
  { year: "2023", result: "World runner-up", name: "ISSDC World Finals", detail: "Kennedy Space Center (Operations & Infrastructure)", image: "/media/canva.png", alt: "Team Vulture Aviation featured at NASA Kennedy Space Center for the ISSDC World Finals" },
];
