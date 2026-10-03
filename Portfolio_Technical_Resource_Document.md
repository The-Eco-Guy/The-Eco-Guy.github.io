# Portfolio Content & Technical Project Resource Document
**Engineer:** Muhir Kapoor  
**Profiles & Links:**  
* **GitHub:** [https://github.com/The-Eco-Guy](https://github.com/The-Eco-Guy)  
* **LinkedIn:** [https://linkedin.com/in/muhir-kapoor](https://linkedin.com/in/muhir-kapoor)  
* **Email:** [kapoormuhir@gmail.com](mailto:kapoormuhir@gmail.com)  
* **Location:** Manipal, Karnataka, India  

---

## 1. Bio & Headline Snippets (For Website Hero / About)

### Quick One-Liner
> Full-Stack & Systems Engineer building high-throughput web platforms, autonomous vehicle control stacks, and extreme-environment aerospace architectures.

### Short Bio (Hero Section)
> Computer Science undergraduate at Manipal Institute of Technology (CGPA: 8.36/10.0). Driverless Software Engineer at Formula Manipal, Top-15 national finalist out of 20,000+ teams at the HCL GUVI AI Impact Summit, and 2x global 1st-place winner in the International Space Elevator Consortium Academic Challenge ($2,000 NSS Prize). Experienced in building resilient systems under strict latency, compute, and physical constraints.

### Core Technical Pillars
1. **Full-Stack & Distributed Web Systems:** FastAPI, Django, React 18, TypeScript, PostgreSQL (ACID, Row-Level Locks), SQLAlchemy, Alembic, Docker, Azure App Service.
2. **Autonomous Systems & Robotics:** ROS2 Humble, C++, Python, Model Predictive Control (MPC), Stanley Tracking, Graph SLAM, OpenCV, AprilTags, Kinematic State Estimation.
3. **Data Products & Predictive ML:** XGBoost, Uber H3 Hexagonal Spatial Index, DBSCAN, Getis-Ord Gi*, Scikit-learn, SARIMAX, Pandas.
4. **Extreme-Environment & Orbital Systems:** Earth-Moon L5 Orbital Mechanics, Space Elevator Tether Dynamics, Closed-Loop ECLSS Mass Balancing, Autonomous Planetary Defense Infrastructure.

---

## 2. Featured Software & Web Engineering Projects

### Project 1: Ekalavya Sovereign Management Platform
* **Role:** Full-Stack Lead & Product Architect  
* **Domain:** Enterprise GovTech / Multi-Role Workflow Automation  
* **GitHub:** [https://github.com/The-Eco-Guy/eklavya-platform](https://github.com/The-Eco-Guy/eklavya-platform)  
* **Live Deployed Application:** [https://eklavya-mota.azurewebsites.net/](https://eklavya-mota.azurewebsites.net/)  
* **Stack:** FastAPI (Python), React 18, TypeScript, Tailwind CSS, PostgreSQL, SQLAlchemy, Alembic, Docker, Azure App Service, OpenCV, PyMuPDF  

#### Problem & Scope
Built for the Ministry of Tribal Affairs (SIH problem statement SIH26239) to digitize and automate the multi-tier scholarship verification lifecycle across three distinct stakeholder tiers: Student Applicants, Educational Institute Verifiers, and Ministry Officers.

#### Engineering Architecture & Mechanics
* **4-Tier Cascading Document Extraction Pipeline:** To avoid exploding cloud compute costs while eliminating manual review bottlenecks, designed a multi-tier fallback cascade:
  1. *Tier 1 (Regex Interceptor):* Executes deterministic regex pattern-matching on native digital PDF text streams (near-zero latency and zero token cost).
  2. *Tier 2 (OCR Engine):* If digital text is missing (scanned document), falls back to optical character recognition.
  3. *Tier 3 (Local Vision Language Model):* If documents are degraded, skewed, or unaligned, escalates to a local VLM for layout-aware contextual extraction.
  4. *Tier 4 (Human-in-the-Loop):* Only routes the document to an officer's review queue if automated confidence metrics fall below threshold, filtering out over 80% of manual verification overhead.
* **Document Forensics & Tampering Analysis:** Engineered an automated PDF inspection pipeline using OpenCV and PyMuPDF that parses internal metadata trees, flags conflicting edit timestamps, and detects pixel-level compression artifacts and raster anomalies in under 2 seconds per document.
* **State Machine & Concurrency Control:** Enforced strict multi-role state transitions (`DRAFT` $\rightarrow$ `SUBMITTED` $\rightarrow$ `INSTITUTE_VERIFIED` $\rightarrow$ `MINISTRY_APPROVED`) using PostgreSQL relational constraints, foreign keys, and row-level locking (`SELECT ... FOR UPDATE`) to prevent race conditions during simultaneous officer approvals.
* **Frontend Stepper & UX Optimization:** Designed a 6-stage progressive disclosure form in React 18 with client-side validation across 30+ parameters to eliminate form fatigue, paired with an offline-first state cache and multi-language string dictionary across 22 regional Indian languages.
* **DevOps & Cloud Deployment:** Packaged the entire full-stack system into a multi-stage Docker container deployed directly to Azure App Service with automated health check probes.

---

### Project 2: Agentic AI Honeypot Engine
* **Role:** Backend & Distributed Systems Architect  
* **Accolade:** Top 15 Nationally out of 20,000+ teams (HCL GUVI AI Impact Summit, New Delhi, Feb 2026)  
* **GitHub:** [https://github.com/The-Eco-Guy/honey_we_trapped_the_scammers_microsoft_ai_unlocked](https://github.com/The-Eco-Guy/honey_we_trapped_the_scammers_microsoft_ai_unlocked)  
* **Stack:** Python (strict `mypy`), FastAPI, Asyncio, PostgreSQL, Azure OpenAI, Google Gemini, Groq, Pre-compiled Regex, Render  

#### Problem & Scope
Autonomous threat-intelligence system engineered to ingest incoming scam messages over chat streams, engage fraudsters with persistent realistic personas, and automatically extract structured financial forensic evidence (bank accounts, UPI IDs, phone numbers, phishing URLs) for legal and enforcement use.

#### Engineering Architecture & Mechanics
* **Decoupled Multi-Agent State Machine:** Architected a 3-agent pipeline operating under deterministic state control:
  1. *Analyst Agent:* Classifies incoming scam vectors, evaluates urgency cues, and extracts threat categories.
  2. *Strategist Agent:* Determines conversational tactics, delay loops, and baiting responses.
  3. *Operator Agent:* Synthesizes and delivers stateful, multilingual conversational replies using context-aware f-string prompt templates.
* **Pre-Compiled Regex Interceptor (<0.5ms vs 2,000ms LLM):** Solved a critical hackathon latency bottleneck where prompting an LLM to generate conversation and JSON extraction simultaneously caused 2–3s delays and hallucinated formatting. Decoupled extraction entirely into an in-memory pre-compiled regex pipeline that intercepts messages before LLM invocation, dropping extraction latency by 99.9% with zero token cost.
* **Thread-Safe Session Concurrency:** Implemented an in-memory, thread-safe `asyncio.Lock` session registry keyed by conversation ID, guaranteeing that concurrent incoming webhook requests from multiple scammers never suffer race conditions or state collisions.
* **Self-Healing Multi-Provider Fallback:** Designed a 3-tier fallback chain dynamically routing requests across Azure OpenAI, Google Gemini, and Groq to maintain 24/7 uptime through vendor rate limits and partial outages.
* **Persistence & Type Safety:** Backed all session trajectories and forensic evidence into PostgreSQL with strict `mypy` static typing and Pydantic validation models across all API endpoints.

---

### Project 3: Urban Spatial Intelligence & Decision Platform
* **Role:** Data Product Engineer  
* **Accolade:** 1st Place — Gridlock Bangalore Hackathon 2  
* **GitHub:** [https://github.com/The-Eco-Guy/Bangalore_IllegalParkingSpots_GrdilockHackathon2](https://github.com/The-Eco-Guy/Bangalore_IllegalParkingSpots_GrdilockHackathon2)  
* **Stack:** Python, XGBoost, DBSCAN, Uber H3 Hexagonal Spatial Index, Getis-Ord Gi*, Streamlit, Pandas, NumPy  

#### Problem & Scope
City-scale spatial analytics and predictive decision engine analyzing over 290,000 historical traffic and parking violation records across Bangalore, replacing passive patrol logs with proactive, data-driven police patrol dispatching.

#### Engineering Architecture & Mechanics
* **Uber H3 Hexagonal Spatial Indexing:** Rather than using raw GPS coordinates or standard rectangular grids (which distort surface area and have unequal neighbor distances), indexed the entire city into Uber H3 hierarchical hexagonal cells, ensuring uniform area and equidistant neighbor transitions.
* **Spatial Clustering & Statistical Hotspot Analysis:** Implemented DBSCAN density-based spatial clustering to group high-density violation pockets, and evaluated Getis-Ord Gi* statistics to isolate statistically significant spatial and temporal hot/cold spots across municipal zones.
* **Predictive ML Modeling:** Trained an XGBoost regression model (RMSE: 3.76) and classification model (AUC-ROC: 97.2%) on temporal and spatial feature matrices to forecast future violation surge zones.
* **Operational Dispatch Dashboard:** Deployed an interactive Streamlit application allowing traffic police commanders to inspect real-time predicted violation clusters and optimize physical patrol unit deployment routes.

---

### Project 4: Olist E-Commerce Retention & Payment Funnel Engine
* **Role:** Product Data & Backend Analytics Engineer  
* **GitHub:** [https://github.com/The-Eco-Guy/Olist-E-Commerce-Strategic-Analysis-Forecasting-2016-2018-](https://github.com/The-Eco-Guy/Olist-E-Commerce-Strategic-Analysis-Forecasting-2016-2018-)  
* **Stack:** Python, PostgreSQL, SQL, Pandas, Scikit-learn, SARIMAX, Seaborn  

#### Problem & Scope
End-to-end commercial analytics platform modeling customer churn, multi-method payment conversion drop-offs, and logistics SLA bottlenecks across 100,000+ real commercial order records.

#### Engineering Architecture & Mechanics
* **Multi-Method Checkout Funnel Modeling:** Structured analytical PostgreSQL queries to trace transaction completion and drop-off patterns across credit cards, bank slips (boleto), and installment vouchers.
* **Customer Lifetime & Repurchase Prediction:** Engineered an RFM (Recency, Frequency, Monetary) segmentation model, training scikit-learn classifiers on customer cohorts to predict repeat purchase behavior with a 24% accuracy lift over baseline heuristics.
* **Time-Series Forecasting:** Built a seasonal SARIMAX time-series model incorporating exogenous order indicators to forecast monthly transaction volumes for operational warehouse capacity and fulfillment planning.
* **Logistics SLA Bottleneck Correlation:** Evaluated non-linear correlations between delivery transit duration, carrier delays, and review scores, identifying critical freight SLA thresholds impacting customer satisfaction.

---

## 3. Autonomous Robotics & Embedded Systems Experience

### Autonomous Driving Software Engineer — Formula Manipal
* **Organization:** Formula Manipal (Formula Student Autonomous Electric Racing Team)  
* **Timeline:** Sep 2025 – Present  
* **Location:** Udupi, Karnataka, India  
* **Stack:** C++, Python, ROS2 Humble, EUFS Simulator, Linux/POSIX, Model Predictive Control (MPC), Stanley Controller, Graph SLAM  

#### Technical Implementation & Accomplishments
* **Trajectory Tracking & Control Optimization:** Designed, tuned, and benchmarked Model Predictive Control (MPC) and PID Stanley path-tracking controllers in the EUFS simulator. Achieved a **20% to 38% reduction in lap times** over baseline controllers through kinematic state estimation and multi-objective cost function tuning (minimizing cross-track error, heading error, and actuator slew rate).
* **ROS2 Autonomous Perception & Planning Pipeline:** Architected a modular ROS2 Humble software pipeline integrating Graph SLAM and local trajectory generation modules, achieving 100% collision-free autonomous path navigation under strict embedded compute and timing constraints.
* **Telemetry & IPC Optimization:** Optimized inter-process communication (IPC) and data serialization between perception nodes and actuator command pipelines to guarantee zero packet loss across high-frequency control loops.

---

### 1st Place Winner — MAHE Mobility Challenge (Robotics Track)
* **Organizers:** Centre of Excellence in Autonomous Mobility (CEAM), MIT Bengaluru & ARTPARK / Indian Institute of Science (IISc)  
* **Timeline:** April 17–19, 2026  
* **Award:** 1st Place (₹50,000 Cash Prize)  
* **Team:** Krishna Gera, Muhir Kapoor, Kevin Dsouza (Mentored by Automind Dynamics & Dr. Sravani Vemulapalli)  
* **Stack:** ROS2, OpenCV, AprilTag Vision, Closed-Loop PID Control, Python, C++  

#### Engineering Under Pressure
* **48-Hour Autonomous Maze Navigation:** Engineered an autonomous robotic system from scratch to navigate unknown maze environments using real-time AprilTag fiducial marker recognition and monocular computer vision.
* **Iterative Loop Tuning:** Diagnosed and resolved low-level sensor timing desyncs, camera driver dropouts, and closed-loop motor controller deadbands under continuous live judging pressure, iterating through hardware and algorithmic failures to deliver a robust, competition-winning platform.

---

## 4. Space Systems & Extreme-Environment Engineering

### International Space Elevator Academic Challenge (2026) — 1st Place Globally
* **Organizers:** International Space Elevator Consortium (ISEC) & National Space Society (NSS)  
* **Award:** 1st Place Globally (University Category)  
* **Paper / System:** *Enabled AI-Infrastructure for Persistent Planetary Defense via Space Elevators*  
* **Presentation Link:** [https://lnkd.in/g94iEu9B](https://lnkd.in/g94iEu9B)  

#### System Architecture & Calculations
* **Paradigm Shift in Planetary Protection:** Replaced episodic, chemical rocket-based "launch-on-warning" planetary defense architectures with a persistent, logistics-driven "release-on-tasking" infrastructure enabled by a 100,000 km space elevator.
* **Mass Economics to GEO:** Capitalized on tether dynamics to slash the cost of orbital payload deployment to Geostationary Orbit (GEO) from **$15,000/kg down to $220/kg**, making swarm-based planetary defense economically viable over high-stakes monolithic interceptors.
* **Millisecond AI Tether Control Layer:** Engineered an AI control layer modeling tether vibration harmonics, Coriolis forces, and climber traffic scheduling with millisecond precision to maintain structural safety during high-throughput ascents.
* **Apex Anchor Tiered Edge Computing:** Placed edge-computing sensor swarms at the space elevator Apex Anchor and Earth-Moon Lagrange points to detect previously invisible "out-of-the-sun" asteroid trajectories, eliminating multi-hour orbital blind spots with sub-second autonomous threat classification.

---

### International Space Elevator Academic Challenge (2025) — 1st Place Globally
* **Organizers:** International Space Elevator Consortium (ISEC) & National Space Society (NSS)  
* **Award:** 1st Place Globally (Solo Entry under "Team Celestial", University Category — $2,000 Cash Prize)  
* **Paper / System:** *Space Settlement Design at Earth-Moon L5 Point & Mass Driver Expansion*  
* **Publication / Official Results Link:** [https://lnkd.in/eucHbvYB](https://lnkd.in/eucHbvYB)  

#### Engineering & Physics Modeling
* **Earth-Moon L5 Orbital Habitation Architecture:** Sited a permanent orbital settlement at the stable Earth-Moon L5 libration point. Calculated structural rotation parameters to induce **1g artificial gravity** without causing vestibular Coriolis sickness, synthesizing geometric structural principles from O'Neill Cylinders and Kalpana One.
* **Radiation Shielding Mass Balance:** Modeled structural mass budgets comparing lunar regolith jackets against deep-water shielding layers to mitigate Galactic Cosmic Radiation (GCR) and Solar Particle Events (SPE).
* **Mass Driver + Tether Logistics:** Proposed an innovative logistics architecture utilizing lunar-surface electromagnetic mass drivers in coordination with orbital tether nodes for high-speed material transfer beyond GEO.

---

### International Mars Base Challenge (2025) — Global 3rd Place
* **Organizer:** Space Robotics Society (SPROS), BITS Goa  
* **Award:** 3rd Place Globally (Solo Entry out of 240+ international university teams)  
* **System:** *Comprehensive Scalable Mars Habitat Mission Concept (2040–2060)*  

#### Systems Engineering & Life-Support Mechanics
* **Scalable Habitat Architecture:** Designed a modular, self-sustaining surface habitat engineered to support an initial crew of 4–8 astronauts by 2040 and scale to 50 permanent inhabitants by 2060.
* **Closed-Loop ECLSS Mass Balancing:** Modeled closed-loop life-support mass balances including Sabatier reactor carbon dioxide reduction, water electrolysis, greywater recovery loops, and emergency nitrogen buffers.
* **Thermal & ISRU Power Budgets:** Calculated diurnal thermal management systems to survive nighttime temperature drops (-125°C), incorporating in-situ resource utilization (ISRU) for water extraction and subterranean regolith shielding for radiation mitigation.

---

### International Space Settlement Design Competitions (ISSDC, 2022–2023)
* **30th Annual ISSDC World Finals (Kennedy Space Center / NASA / Boeing / NSS, Jul 2023):** Operations & Infrastructure Engineer for a lunar surface settlement on the lunar far side. Designed lunar dust mitigation systems, power generation and microgrid distribution, food production loops, and heavy vehicular transit infrastructure.
* **19th Annual Asian Regional SSDC (Jan 2023):** Head of Department (HOD) of Operations & Infrastructure. Managed a team of 12 engineers designing orbital docking systems, power, life-support air management, and communication architectures for a lunar orbital settlement.
* **6th Annual Indian National SSDC (Winner, Nov 2022):** Engineered Whipple micrometeorite shielding, multi-layer radiation barriers, orbital station-keeping specs, and Maintenance, Repair & Overhaul (MRO) facilities for docked orbital tugs.
* **High School Space Club Leadership:** Head of Space Club; created and ran a structured technical training curriculum on aerospace subsystems, mentoring 20+ junior members through national and international podium finishes.

---

## 5. Hackathon & Competitive Honors Matrix

| Year | Competition / Challenge | Organizer | Scope / Scale | Achievement & Award |
| :--- | :--- | :--- | :--- | :--- |
| **2026** | **International Space Elevator Challenge** | ISEC / National Space Society | Global University Challenge | **1st Place Globally** (Planetary Defense) |
| **2026** | **MAHE Mobility Challenge (Robotics)** | ARTPARK / IISc & CEAM | 48-Hour Autonomous Robotics | **1st Place** (₹50,000 Prize) |
| **2026** | **HCL GUVI AI Impact Hackathon** | HCL GUVI, New Delhi | 15,000–20,000+ Teams | **Top 15 Nationally** (Agentic Honeypot) |
| **2025** | **International Space Elevator Challenge** | ISEC / National Space Society | Global University Challenge | **1st Place Globally** ($2,000 NSS Prize) |
| **2025** | **International Mars Base Challenge** | Space Robotics Society (SPROS) | 240+ International Teams | **Global 3rd Place** (Solo Entry) |
| **2024** | **Smart India Hackathon (SIH 2024)** | Ministry of Tribal Affairs (MoTA) | National Flagship Hackathon | **National Project Lead** (Ekalavya) |
| **2024** | **Gridlock Bangalore Hackathon 2** | City Mobility Challenge | Urban Spatial Data Challenge | **1st Place Winner** (Spatial Platform) |
| **2024** | **Hult Hackathon MAHE** | Hult Prize Foundation | Social & Urban Infrastructure | **2nd Place Winner** (Affordable Housing) |
| **2023** | **30th Annual World Finals ISSDC** | Kennedy Space Center / NASA / Boeing | World Finals (Global Qualifiers) | **World Runner-up** (Operations Lead) |
| **2023** | **19th Asian Regional SSDC** | Asian Regional SSDC | Continental Competition | **Asian Runner-up** (HOD Operations) |
| **2022** | **6th Indian National SSDC** | Indian Regional SSDC | National Competition | **National 1st Place Winner** |
