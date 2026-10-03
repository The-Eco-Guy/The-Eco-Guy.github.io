# Recruiter-First Portfolio: Product Specification and TDD Guide

## 1. Product goal

The site must establish Muhir Kapoor as a backend and full-stack engineer who builds reliable software for complex systems. A software recruiter should understand the positioning, education, current Formula Manipal role, and strongest evidence within the first screen and first project section.

Primary conversion: open a software case study, inspect the evidence, then use email, GitHub, or LinkedIn.

## 2. Information architecture

### Homepage

1. Hero: “Reliable software for complex systems,” MIT Manipal education, Formula Manipal context, work and email actions.
2. Credibility strip: education, current driverless role, HCL finalist placement, and graduation date.
3. Primary work: Agentic AI Honeypot, then Ekalavya Scholarship Platform.
4. Supporting work: Formula Manipal Driverless, then concise data projects.
5. Core skills: backend systems, full-stack workflows, and reliable software, each tied to tools and demonstrated work.
6. Experience, followed by a visually separate education section.
7. Awards and recognition: competition results, event media, and Space Systems as supporting modeled research.
8. Direct contact panel.

### Case studies

Every `/work/[slug]` route follows the same recruiter-readable sequence:

1. Overview and status
2. Problem
3. Architecture and proof
4. Individual contribution
5. Engineering decisions
6. Evidence and results
7. Limitations
8. Tools, source note, and links

## 3. Content rules

- Ekalavya is always described as an SIH prototype, never an official government service.
- Ekalavya has no repository link until the current `404` is corrected.
- Formula Manipal performance is always labeled as a simulator result against team baselines.
- Space Systems is always labeled modeled research. The supplied Mars-base PDF is not evidence for ISEC 2025 or 2026.
- Personal contribution, team output, prototypes, simulator results, and modeled research are explicitly distinguished.
- Each metric has a short label, contextual wording, and a named source.
- The Bangalore traffic project provides separate repository and deployed-application actions.
- No project may display unrelated event photography, certificates, or a sprite from another project.

## 4. Approved proof and sprite mapping

| Project | Decorative sprite | Approved proof |
| --- | --- | --- |
| AI Honeypot | `/sprites/honeypot-defense-v2.webp` | Original team photograph supplied by Muhir; never a certificate or generated substitute |
| Ekalavya | `/sprites/ekalavya-workflow-v2.webp` | Cropped live-product capture, excluding demo identities and credentials |
| Formula Manipal | `/sprites/formula-car-v2.webp` | Embedded official Formula Manipal website with direct-link fallback |
| Space Systems | `/sprites/orbital-station-v2.webp` | Embedded ISEC 2025 and 2026 presentation videos |

Recognition photography and certificates belong only in the combined “Research + recognition” section.

## 5. Visual and interaction specification

- Deep navy and off-white provide the base; blue and restrained cyan communicate emphasis and state.
- Body copy uses a legible sans-serif. Monospace is limited to labels, evidence, and ASCII elements.
- There is no dashboard-style page grid. Fine pixel dithering appears only as texture inside the illustrated atmosphere.
- One continuous, document-height pixel-art night sky spans every homepage section without resetting or creating visible bands.
- Five hand-composed mountain ranges establish a readable distant, far, middle, near, and foreground landscape across the document.
- Three restrained haze regions and four sparse ridge-only dither regions add depth without creating a page-wide dotted grid.
- Mountain pixels describe irregular ridgelines rather than becoming large rectangular decoration; quiet sky remains visible around interface sections.
- The seeded star field is dominated by hard-edged 1-2px blue-white points, supported by manually placed clusters, compact crosses, and four focal stars.
- A varied subset of existing stars and crosses twinkles with staggered stepped opacity. Four deterministic ASCII shooting-star paths move slowly one at a time at long intervals, remain behind all content, use shorter trails on mobile, and disappear entirely under reduced-motion preferences.
- Sparse pixel clouds drift slowly in opposing directions and become static under reduced-motion preferences.
- Mobile reduces star density, and `prefers-reduced-motion` leaves every star static.
- The hero retains the approved presentation photograph and keeps the headline region visually calm.
- Project media uses consistent framing and restrained color balancing so photography, interface evidence, and the embedded team site carry comparable visual weight.
- Core skills render as an editorial evidence index, experience renders as substantial cards, education remains separate but compact, and recognition does not repeat the same awards in a second timeline.
- GitHub, LinkedIn, and email logos appear only in the footer; social controls are not repeated in the hero or contact panel.
- Primary projects retain the vertical editorial sequence so evidence and outcomes remain readable. Core Skills may use compact horizontal technology groups.
- Technical technology marks use recognizable monochrome SVG forms and inherit the site palette rather than vendor colors.
- Mobile navigation stays on one row with 44px targets.
- Focus states, semantic headings, meaningful alt text, and sufficient contrast are mandatory.

## 6. Automated acceptance tests

The UI audit must fail when any of the following is false:

- The homepage returns successfully and retired case-study routes return `404`.
- Each route has exactly one `h1`, a descriptive title, and no horizontal overflow at 390px or 1440px.
- The homepage contains exactly two feature project cards and one compact supporting card.
- The Core Skills section contains twelve labeled monochrome vector technology marks, and Bangalore Gridlock exposes one live-application link.
- Each project uses only its approved proof media.
- The Ekalavya page and homepage contain no repository action.
- All four recognition records render with the approved media.
- At least 190 deterministic tiny pixel stars, five composed clusters, five mountain ranges, three haze regions, four ridge-texture regions, and 10-18 distinctive cross stars render.
- The sky element spans the full document height, has `pointer-events: none`, and contains no canvas particle system.
- Star twinkle, cross-star twinkle, and cloud drift are active with normal motion and disabled under reduced-motion preferences.
- Ekalavya includes a prototype disclaimer, Formula includes simulator scope, and Space Systems includes modeled-research scope.
- The sticky header does not obscure in-page anchors.
- The unfocused skip link remains visually hidden and becomes available on keyboard focus.
- All reveal content is visible under reduced motion.

## 7. Verification loop

For each iteration:

1. Add or refine an acceptance condition before changing presentation.
2. Run `npm run typecheck` and `npm run lint`.
3. Run `npm run test:ui` against the current site.
4. Inspect desktop and mobile screenshots for hierarchy, legibility, clipping, image relevance, and excess decoration.
5. Make the smallest cohesive correction and repeat.
6. Finish with `npm run build` and run the UI audit against the production server.

## 8. Definition of done

The redesign is ready when all automated checks pass, all claims remain traceable to the technical document or public repository, production builds successfully, and the desktop/mobile screenshots present a calm, credible recruiter narrative with no irrelevant media or ambiguous claims.
