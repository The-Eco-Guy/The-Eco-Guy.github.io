import type { CSSProperties } from "react";

type PixelStyle = CSSProperties & {
  "--star-opacity"?: number;
  "--twinkle-opacity"?: number;
  "--twinkle-delay"?: string;
  "--twinkle-duration"?: string;
};

type ShootingStarStyle = CSSProperties & {
  "--shoot-delay": string;
  "--shoot-duration": string;
  "--shoot-x": string;
  "--shoot-y": string;
};

type Star = {
  x: number;
  y: number;
  size: "pixel-1" | "pixel-2" | "pixel-3";
  opacity: number;
  twinkles: boolean;
  delay: number;
  duration: number;
};

type SkyBand = { from: number; to: number; count: number };

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const skyBands: SkyBand[] = [
  { from: 0.5, to: 12, count: 44 },
  { from: 12, to: 39, count: 145 },
  { from: 39, to: 61, count: 98 },
  { from: 61, to: 86, count: 118 },
  { from: 86, to: 99.5, count: 58 },
];

function makeStars(seed: number, layer: "far" | "near"): Star[] {
  const random = seededRandom(seed);
  const density = layer === "far" ? 0.72 : 0.28;
  const stars: Star[] = [];

  skyBands.forEach((band) => {
    const count = Math.round(band.count * density);
    for (let index = 0; index < count; index += 1) {
      const calmHeroCenter = band.from < 12 && random() < 0.72;
      const gutterStar = random() < (calmHeroCenter ? 0.78 : 0.42);
      const side = random() < 0.5 ? 0 : 1;
      const x = gutterStar
        ? side === 0
          ? 1.1 + random() * 15
          : 83.9 + random() * 15
        : 5 + random() * 90;
      const sizeRoll = random();
      const size = layer === "far"
        ? sizeRoll < 0.86 ? "pixel-1" : "pixel-2"
        : sizeRoll < 0.52 ? "pixel-1" : sizeRoll < 0.9 ? "pixel-2" : "pixel-3";
      const opacity = layer === "far"
        ? 0.28 + random() * 0.32
        : 0.52 + random() * 0.28;
      const starIndex = stars.length;

      stars.push({
        x,
        y: band.from + random() * (band.to - band.from),
        size,
        opacity,
        twinkles: starIndex % 5 === 0,
        delay: -(random() * 8),
        duration: 2.8 + random() * 3.2,
      });
    }
  });

  return stars;
}

const farStars = makeStars(0x4d554849, "far");
const nearStars = makeStars(0x524b4150, "near");

const crossStars = [
  { x: 94.2, y: 3.1, opacity: 0.65, focal: false },
  { x: 5.1, y: 10.2, opacity: 0.58, focal: false },
  { x: 90.4, y: 18.6, opacity: 0.72, focal: true },
  { x: 7.6, y: 25.4, opacity: 0.58, focal: false },
  { x: 71.2, y: 33.1, opacity: 0.68, focal: false },
  { x: 4.8, y: 41.8, opacity: 0.68, focal: true },
  { x: 94.1, y: 48.3, opacity: 0.62, focal: false },
  { x: 12.4, y: 57.2, opacity: 0.68, focal: false },
  { x: 88.8, y: 64.7, opacity: 0.78, focal: true },
  { x: 5.6, y: 72.4, opacity: 0.62, focal: false },
  { x: 77.1, y: 79.2, opacity: 0.68, focal: false },
  { x: 95.1, y: 86.5, opacity: 0.72, focal: false },
  { x: 10.8, y: 91.7, opacity: 0.72, focal: true },
  { x: 82.6, y: 96.1, opacity: 0.65, focal: false },
] as const;

const clusters = [
  { x: 85, y: 15.5, pattern: "a" },
  { x: 8, y: 29, pattern: "b" },
  { x: 73, y: 46, pattern: "c" },
  { x: 16, y: 67.5, pattern: "a" },
  { x: 87, y: 76, pattern: "b" },
  { x: 23, y: 88.5, pattern: "c" },
] as const;

const shootingStars = [
  { x: 92, y: 1.5, delay: "0.5s", duration: "10.0s", dx: "-600px", dy: "380px", direction: "shoot-left" },
  { x: 8, y: 2.0, delay: "5.5s", duration: "10.0s", dx: "600px", dy: "380px", direction: "shoot-right" },
  { x: 85, y: 35.0, delay: "3.0s", duration: "10.0s", dx: "-600px", dy: "380px", direction: "shoot-left" },
  { x: 10, y: 65.0, delay: "8.0s", duration: "10.0s", dx: "600px", dy: "380px", direction: "shoot-right" },
] as const;

type RidgePoint = readonly [x: number, y: number];

function interpolateRidge(points: readonly RidgePoint[], step = 10) {
  const samples: RidgePoint[] = [];

  for (let segment = 0; segment < points.length - 1; segment += 1) {
    const [fromX, fromY] = points[segment];
    const [toX, toY] = points[segment + 1];
    const distance = toX - fromX;
    const sampleCount = Math.max(1, Math.round(distance / step));

    for (let index = segment === 0 ? 0 : 1; index <= sampleCount; index += 1) {
      const progress = index / sampleCount;
      const x = Math.round((fromX + distance * progress) / 5) * 5;
      const y = Math.round((fromY + (toY - fromY) * progress) / 10) * 10;
      samples.push([x, y]);
    }
  }

  return samples;
}

function steppedArea(points: readonly RidgePoint[]) {
  const samples = interpolateRidge(points);
  const [firstX, firstY] = samples[0];
  const ridge = samples.slice(1).map(([x, y]) => `H${x}V${y}`).join("");
  return `M${firstX} ${firstY}${ridge}H1000V10000H0Z`;
}

function steppedBand(points: readonly RidgePoint[], depth: number) {
  const samples = interpolateRidge(points, 14);
  const [firstX, firstY] = samples[0];
  const ridge = samples.slice(1).map(([x, y]) => `H${x}V${y}`).join("");
  const reverse = [...samples].reverse().map(([x, y]) => `H${x}V${y + depth}`).join("");
  return `M${firstX} ${firstY}${ridge}${reverse}H${firstX}Z`;
}

const mountainRanges = [
  {
    name: "distant",
    points: [[0, 2640], [80, 2580], [155, 2440], [215, 2300], [270, 2400], [370, 1820], [455, 2240], [540, 2420], [610, 2340], [690, 2120], [760, 2310], [835, 2470], [915, 2570], [1000, 2640]] as const,
    dither: "ridge-dither-sparse",
    depth: 125,
  },
  {
    name: "far",
    points: [[0, 4440], [75, 4360], [145, 4140], [205, 3960], [265, 4100], [350, 3350], [425, 3710], [500, 3990], [575, 4140], [650, 4040], [740, 3750], [820, 4040], [895, 4270], [1000, 4440]] as const,
    dither: "ridge-dither",
    depth: 145,
  },
  {
    name: "mid",
    points: [[0, 6480], [80, 6330], [155, 6030], [225, 5760], [285, 5900], [350, 5200], [435, 4620], [510, 5080], [575, 5450], [650, 5660], [710, 5580], [790, 5240], [860, 5550], [925, 6010], [1000, 6480]] as const,
    dither: "ridge-dither-sparse",
    depth: 165,
  },
  {
    name: "near",
    points: [[0, 8250], [75, 8080], [145, 7810], [215, 7440], [275, 7580], [345, 6740], [430, 6030], [505, 6520], [575, 6990], [650, 7340], [715, 7240], [795, 6880], [865, 7310], [930, 7800], [1000, 8250]] as const,
    dither: "ridge-dither-sparse",
    depth: 180,
  },
  {
    name: "foreground",
    points: [[0, 9510], [85, 9320], [155, 9010], [225, 8680], [285, 8860], [350, 8270], [425, 7830], [495, 8240], [565, 8580], [640, 8860], [705, 8940], [790, 8610], [855, 8910], [925, 9260], [1000, 9510]] as const,
    dither: null,
    depth: 0,
  },
] as const;

const atmosphereBands = [
  {
    name: "a",
    points: [[0, 1280], [95, 1210], [180, 1250], [275, 1110], [365, 1160], [455, 990], [555, 1070], [650, 1010], [750, 1140], [845, 1060], [925, 1200], [1000, 1160]] as const,
    depth: 260,
  },
  {
    name: "b",
    points: [[0, 3570], [90, 3490], [185, 3540], [280, 3380], [375, 3460], [470, 3250], [565, 3340], [655, 3290], [745, 3450], [835, 3360], [920, 3500], [1000, 3430]] as const,
    depth: 290,
  },
  {
    name: "c",
    points: [[0, 6930], [95, 6840], [185, 6900], [275, 6740], [365, 6810], [455, 6580], [550, 6690], [645, 6620], [740, 6780], [830, 6700], [920, 6850], [1000, 6770]] as const,
    depth: 310,
  },
] as const;

function StarLayer({ stars, name }: { stars: Star[]; name: string }) {
  return (
    <div className={`pixel-star-layer ${name}`}>
      {stars.map((star, index) => {
        const style: PixelStyle = {
          left: `${star.x}%`,
          top: `${star.y}%`,
          "--star-opacity": star.opacity,
          "--twinkle-opacity": Math.min(star.opacity + 0.18, 1),
          "--twinkle-delay": `${star.delay.toFixed(2)}s`,
          "--twinkle-duration": `${star.duration.toFixed(2)}s`,
        };

        return <span className={`${star.size}${star.twinkles ? " pixel-twinkle" : ""}`} style={style} key={`${name}-${index}`} />;
      })}
    </div>
  );
}

function PixelAtmosphere() {
  return (
    <svg className="pixel-atmosphere" viewBox="0 0 1000 10000" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sky-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#020817" />
          <stop offset=".18" stopColor="#050a1c" />
          <stop offset=".36" stopColor="#09122b" />
          <stop offset=".56" stopColor="#081833" />
          <stop offset=".73" stopColor="#0a1831" />
          <stop offset="1" stopColor="#040b1c" />
        </linearGradient>
        <pattern id="ridge-dither" width="38" height="30" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" x="3" y="5" fill="#89ade2" />
          <rect width="1" height="1" x="24" y="18" fill="#5278b4" />
          <rect width="1" height="1" x="34" y="7" fill="#aac4e9" />
        </pattern>
        <pattern id="ridge-dither-sparse" width="56" height="44" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" x="7" y="8" fill="#759bd2" />
          <rect width="1" height="1" x="39" y="31" fill="#b5ccec" />
        </pattern>
      </defs>

      <rect width="1000" height="10000" fill="url(#sky-base)" />

      {/* Local atmospheric variation remains broad and quiet. */}
      {atmosphereBands.map((band) => (
        <path className={`sky-haze haze-${band.name}`} d={steppedBand(band.points, band.depth)} key={band.name} />
      ))}

      {/* Moving stepped cloud fragments across vertical sections */}
      <g className="pixel-cloud cloud-a cloud-top">
        <path d="M540 120H590V95H640V70H700V90H750V120H800V145H540Z" />
      </g>
      <g className="pixel-cloud cloud-b cloud-top">
        <path d="M70 90H120V65H170V40H230V60H280V90H330V115H70Z" />
      </g>
      <g className="pixel-cloud cloud-c cloud-top">
        <path d="M660 1380H705V1355H750V1330H805V1350H845V1380H895V1405H660Z" />
      </g>
      <g className="pixel-cloud cloud-d">
        <path d="M640 2860H685V2835H730V2810H785V2830H825V2860H870V2885H640Z" />
      </g>
      <g className="pixel-cloud cloud-a">
        <path d="M80 4420H130V4395H180V4370H240V4390H290V4420H340V4445H80Z" />
      </g>
      <g className="pixel-cloud cloud-b">
        <path d="M650 6100H695V6075H745V6045H795V6065H835V6095H885V6120H650Z" />
      </g>
      <g className="pixel-cloud cloud-c">
        <path d="M150 7820H195V7795H245V7765H295V7785H335V7815H380V7840H150Z" />
      </g>
      <g className="pixel-cloud cloud-d">
        <path d="M600 9180H645V9155H690V9130H745V9150H785V9180H830V9205H600Z" />
      </g>

      {/* A single vertical landscape: finely stepped, multi-peak ranges build depth. */}
      {mountainRanges.map((range) => (
        <g key={range.name}>
          <path className={`mountain-layer mountain-${range.name}`} d={steppedArea(range.points)} />
          {range.dither ? (
            <path
              className={`ridge-dither dither-${range.name}`}
              d={steppedBand(range.points, range.depth)}
              fill={`url(#${range.dither})`}
            />
          ) : null}
        </g>
      ))}
    </svg>
  );
}

export function AsciiSky() {
  return (
    <div className="ascii-sky pixel-sky" aria-hidden="true">
      <PixelAtmosphere />
      <StarLayer stars={farStars} name="stars-far" />
      <div className="pixel-cluster-layer">
        {clusters.map((cluster, index) => (
          <span className={`star-cluster cluster-${cluster.pattern}`} style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }} key={`cluster-${index}`} />
        ))}
      </div>
      <StarLayer stars={nearStars} name="stars-near" />
      <div className="pixel-cross-layer">
        {crossStars.map((star, index) => (
          <span className={star.focal ? "focal-star" : ""} style={{ left: `${star.x}%`, top: `${star.y}%`, opacity: star.opacity }} key={`cross-${index}`} />
        ))}
      </div>
      <div className="shooting-star-layer">
        {shootingStars.map((star, index) => {
          const style: ShootingStarStyle = {
            left: `${star.x}%`,
            top: `${star.y}%`,
            "--shoot-delay": star.delay,
            "--shoot-duration": star.duration,
            "--shoot-x": star.dx,
            "--shoot-y": star.dy,
          };

          return (
            <span className={`shooting-star ${star.direction}`} style={style} key={`shooting-${index}`}>
              <i className="shooting-streak" />
            </span>
          );
        })}
      </div>
    </div>
  );
}
