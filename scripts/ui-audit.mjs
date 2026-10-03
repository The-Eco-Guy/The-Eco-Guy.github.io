import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.BASE_URL ?? "http://localhost:3005";
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const output = path.resolve("artifacts/ui-audit");
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ executablePath: chrome, headless: true });
const failures = [];
const deprecatedCopy = [
  "TRANSMISSION", "SYSTEMS ONLINE", "PROOF IN THE TELEMETRY", "HAVE A HARD PROBLEM", "$220/KG", "100K KM", "20K+", "GLOBAL #1",
  "FLAGSHIP SYSTEMS", "HIGH-THROUGHPUT BACKEND ARCHITECTURES", "DRIVERLESS CONTROL ARCHITECTURE EVALUATED", "15 M/S", "DYNAMIC LIMIT",
  "ENGINEERING FOCUS", "CORE CAPABILITIES", "THREE DISCIPLINES THAT RECUR", "ENGINEERING EXPERIENCE", "CURRENT TECHNICAL WORK", "OPERATIONS & INFRASTRUCTURE LEAD",
];

for (const viewport of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  page.on("console", message => { if (message.type() === "error") failures.push(`${viewport.name}: console error: ${message.text()}`); });
  page.on("pageerror", error => failures.push(`${viewport.name}: page error: ${error.message}`));

  const response = await page.goto(baseURL, { waitUntil: "load", timeout: 60_000 });
  await page.waitForTimeout(400);
  if (!response?.ok()) failures.push(`${viewport.name}: homepage returned ${response?.status()}`);

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < pageHeight; y += 400) {
    await page.evaluate(position => window.scrollTo(0, position), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(output, `${viewport.name}-home.png`), fullPage: true });

  const sectionShots = viewport.name === "desktop"
    ? [["hero", ".hero"], ["work", "#work"], ["capabilities", "#capabilities"], ["experience", "#experience"], ["education", "#education"], ["recognition", "#recognition"], ["contact", "#contact"]]
    : [["hero", ".hero"], ["first-project", ".project-card"], ["experience", "#experience"], ["education", "#education"], ["recognition", "#recognition"], ["contact", "#contact"]];
  for (const [name, selector] of sectionShots) await page.locator(selector).first().screenshot({ path: path.join(output, `${viewport.name}-${name}.png`) });

  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    h1: document.querySelectorAll("h1").length,
    title: document.title,
    bodyText: document.body.innerText,
    featureCards: document.querySelectorAll(".project-card.feature").length,
    compactCards: document.querySelectorAll(".project-card.compact").length,
    recognitionImages: document.querySelectorAll(".recognition-media img").length,
    hasPixelSky: !!document.querySelector(".pixel-sky"),
    pixelSkyHeight: document.querySelector(".pixel-sky")?.getBoundingClientRect().height ?? 0,
    documentHeight: document.documentElement.scrollHeight,
    tinyStars: document.querySelectorAll(".pixel-star-layer .pixel-1, .pixel-star-layer .pixel-2").length,
    crossStars: document.querySelectorAll(".pixel-cross-layer span").length,
    starClusters: document.querySelectorAll(".pixel-cluster-layer .star-cluster").length,
    mountainRanges: document.querySelectorAll(".pixel-atmosphere .mountain-layer").length,
    hazeRegions: document.querySelectorAll(".pixel-atmosphere .sky-haze").length,
    ditherRegions: document.querySelectorAll(".pixel-atmosphere .ridge-dither").length,
    canvasCount: document.querySelectorAll(".ascii-sky canvas").length,
    skipLinkWidth: document.querySelector(".skip")?.getBoundingClientRect().width ?? 0,
    hasHeroPortraitTag: !!document.querySelector(".hero-portrait-tag"),
    hasSignalBar: !!document.querySelector(".signal-bar"),
    eklRepoLinks: [...document.querySelectorAll('a[href*="ekalavya"], a[href*="eklavya"]')].filter(link => link.textContent.toLowerCase().includes("repository") || link.textContent.toLowerCase().includes("source code")).length,
    footerSocials: document.querySelectorAll("footer .social-icons a").length,
    nonFooterSocials: document.querySelectorAll("main .social-icons, header .social-icons").length,
    techMarks: document.querySelectorAll(".skill-logos .tech-mark svg").length,
    gridlockLiveLinks: document.querySelectorAll('a[href="https://bangalore-illegal-parking-spots-grdilockhackathon2bm.streamlit.app/"]').length,
  }));

  if (metrics.scrollWidth > metrics.clientWidth + 1) failures.push(`${viewport.name}: horizontal overflow ${metrics.scrollWidth}px > ${metrics.clientWidth}px`);
  if (metrics.h1 !== 1) failures.push(`${viewport.name}: expected one h1, found ${metrics.h1}`);
  if (!metrics.title.includes("Muhir Kapoor")) failures.push(`${viewport.name}: title missing name`);
  if (metrics.featureCards !== 2 || metrics.compactCards !== 1) failures.push(`${viewport.name}: expected two feature cards and one compact card`);
  if (metrics.recognitionImages < 4) failures.push(`${viewport.name}: expected at least four recognition images, found ${metrics.recognitionImages}`);
  if (!metrics.hasPixelSky || metrics.pixelSkyHeight < metrics.documentHeight - 2) failures.push(`${viewport.name}: pixel sky does not span the complete document`);
  if (metrics.tinyStars < 190) failures.push(`${viewport.name}: expected a field dominated by tiny stars, found ${metrics.tinyStars}`);
  if (metrics.crossStars < 10 || metrics.crossStars > 18) failures.push(`${viewport.name}: expected a restrained hierarchy of cross stars, found ${metrics.crossStars}`);
  if (metrics.starClusters < 5) failures.push(`${viewport.name}: composed star clusters are missing`);
  if (metrics.mountainRanges !== 5 || metrics.hazeRegions < 3 || metrics.ditherRegions < 4) failures.push(`${viewport.name}: layered landscape is missing mountain, haze, or ridge texture layers`);
  if (metrics.canvasCount !== 0) failures.push(`${viewport.name}: obsolete canvas particle field remains`);
  if (metrics.skipLinkWidth > 2) failures.push(`${viewport.name}: unfocused skip link is visible (${metrics.skipLinkWidth}px wide)`);
  if (metrics.hasHeroPortraitTag) failures.push(`${viewport.name}: hero portrait tag (2) should be removed`);
  if (metrics.hasSignalBar) failures.push(`${viewport.name}: signal bar (3) should be removed`);
  if (metrics.eklRepoLinks !== 0) failures.push(`${viewport.name}: broken Ekalavya repository action is present`);
  if (metrics.footerSocials !== 3 || metrics.nonFooterSocials !== 0) failures.push(`${viewport.name}: social logos should appear only in the footer`);
  if (metrics.techMarks !== 12) failures.push(`${viewport.name}: expected 12 monochrome technical skill marks, found ${metrics.techMarks}`);
  if (metrics.gridlockLiveLinks !== 1) failures.push(`${viewport.name}: Bangalore Gridlock live application link is missing or duplicated`);
  for (const phrase of deprecatedCopy) if (metrics.bodyText.toUpperCase().includes(phrase)) failures.push(`${viewport.name}: deprecated brand copy remains: ${phrase}`);

  const cardSprites = await page.locator(".project-sprite, .case-sprite").count();
  if (cardSprites !== 0) failures.push(`${viewport.name}: sprites are still present on page (${cardSprites})`);

  if (!(await page.locator(".hero-name").isVisible())) failures.push(`${viewport.name}: hero identity is not visible`);
  if (await page.locator(".trajectory-list article").count() !== 2) failures.push(`${viewport.name}: experience entries missing`);
  if (await page.locator("#education .education-grid").count() !== 1) failures.push(`${viewport.name}: education is not separated from experience`);
  if (viewport.name === "mobile" && !(await page.locator("header nav").isVisible())) failures.push("mobile: primary navigation is hidden");
  const minNavHeight = await page.locator("header nav a").first().evaluate(node => node.getBoundingClientRect().height);
  if (viewport.name === "mobile" && minNavHeight < 44) failures.push(`mobile: navigation target is ${minNavHeight}px high`);

  await page.locator("header nav a").first().click();
  await page.waitForFunction(() => location.hash === "#work");
  await page.waitForTimeout(300);
  const anchor = await page.evaluate(() => ({ top: document.querySelector("#work").getBoundingClientRect().top, header: document.querySelector("header").getBoundingClientRect().bottom }));
  if (anchor.top < anchor.header - 1) failures.push(`${viewport.name}: sticky header obscures work anchor`);
  await context.close();
}

const motionPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await motionPage.goto(baseURL, { waitUntil: "load", timeout: 60_000 });
const motionState = await motionPage.evaluate(() => ({
  pixelSky: !!document.querySelector(".pixel-sky"),
  pointerEvents: getComputedStyle(document.querySelector(".ascii-sky")).pointerEvents,
  twinkleAnimation: getComputedStyle(document.querySelector(".pixel-twinkle")).animationName,
  shootingStars: document.querySelectorAll(".shooting-star").length,
  cloudAnimation: getComputedStyle(document.querySelector(".pixel-cloud")).animationName,
  crossTwinkle: getComputedStyle(document.querySelector(".pixel-cross-layer span:nth-child(3n)")).animationName,
}));
if (!motionState.pixelSky) failures.push("pixel sky element not found");
if (motionState.pointerEvents !== "none") failures.push("star field can intercept pointer input");
if (motionState.twinkleAnimation !== "pixelTwinkle") failures.push("subtle pixel twinkle animation is not active");
if (motionState.shootingStars !== 4) failures.push(`expected four infrequent shooting-star paths, found ${motionState.shootingStars}`);
if (motionState.cloudAnimation !== "cloudDriftRight") failures.push(`cloud drift animation is not active (${motionState.cloudAnimation})`);
if (motionState.crossTwinkle !== "crossTwinkle") failures.push(`cross-star twinkle animation is not active (${motionState.crossTwinkle})`);
await motionPage.close();

const reducedContext = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: "reduce",
});
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(baseURL, { waitUntil: "load", timeout: 60_000 });
const reducedAnimation = await reducedPage.locator(".pixel-twinkle").first().evaluate(node => getComputedStyle(node).animationName);
if (reducedAnimation !== "none") failures.push(`reduced motion: star twinkle is still active (${reducedAnimation})`);
const reducedShootingStars = await reducedPage.locator(".shooting-star-layer").evaluate(node => getComputedStyle(node).display);
if (reducedShootingStars !== "none") failures.push(`reduced motion: shooting stars remain visible (${reducedShootingStars})`);
const reducedCloudAnimation = await reducedPage.locator(".pixel-cloud").first().evaluate(node => getComputedStyle(node).animationName);
if (reducedCloudAnimation !== "none") failures.push(`reduced motion: cloud drift is still active (${reducedCloudAnimation})`);
await reducedContext.close();

const noCaseStudySlugs = ["ai-honeypot", "ekalavya", "space-systems", "formula-manipal"];
for (const slug of noCaseStudySlugs) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const response = await page.goto(`${baseURL}/work/${slug}`, { waitUntil: "load", timeout: 30_000 });
  if (response?.status() !== 404 && response?.ok()) {
    failures.push(`${slug}: case study route exists (${response?.status()}) but all case studies should be removed`);
  }
  await page.close();
}

const auditPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await auditPage.goto(baseURL, { waitUntil: "load", timeout: 60_000 });
const auditResults = await auditPage.evaluate(() => {
  const headerText = document.querySelector("header")?.innerText || "";
  const caseLinks = [...document.querySelectorAll('a[href*="/work/"]')].map(a => a.href);
  const caseStudyText = [...document.querySelectorAll("*")].filter(el => el.children.length === 0 && el.textContent.toLowerCase().includes("case study")).length;
  const eyebrowText = document.querySelector(".hero .eyebrow")?.textContent?.trim() || "";
  const skyZIndex = getComputedStyle(document.querySelector(".ascii-sky")).zIndex;
  const mainZIndex = getComputedStyle(document.querySelector("#main")).zIndex;
  const portraitTag = document.querySelector(".hero-portrait-tag");
  const signalBar = document.querySelector(".signal-bar");
  const hasCapGroundedText = document.body.innerText.includes("Capabilities grounded in the systems");
  const capabilityRows = document.querySelectorAll(".capability-grid article").length;
  const duplicateAwardRows = document.querySelectorAll(".award-row").length;
  const contactBg = getComputedStyle(document.querySelector("#contact")).backgroundImage;
  return { headerText, caseLinks, caseStudyText, eyebrowText, skyZIndex, mainZIndex, portraitTag: !!portraitTag, signalBar: !!signalBar, hasCapGroundedText, capabilityRows, duplicateAwardRows, contactBg };
});

if (auditResults.headerText.includes("MIT MANIPAL / 2028")) failures.push("header: still contains MIT MANIPAL / 2028");
if (auditResults.caseLinks.length > 0) failures.push(`homepage: contains case study links: ${auditResults.caseLinks.join(", ")}`);
if (auditResults.caseStudyText > 0) failures.push(`homepage: contains case study text in ${auditResults.caseStudyText} elements`);
if (auditResults.eyebrowText !== "FULL STACK ENGINEER") failures.push(`homepage: expected eyebrow 'FULL STACK ENGINEER', got '${auditResults.eyebrowText}'`);
if (Number(auditResults.skyZIndex) >= Number(auditResults.mainZIndex)) failures.push(`stars are in front of content: sky zIndex (${auditResults.skyZIndex}) >= main zIndex (${auditResults.mainZIndex})`);
if (auditResults.portraitTag) failures.push("hero portrait tag (2) is still present");
if (auditResults.signalBar) failures.push("signal bar (3) is still present");
if (auditResults.hasCapGroundedText) failures.push("capabilities section still contains 'Capabilities grounded in the systems...' text");
if (auditResults.capabilityRows !== 3) failures.push(`capabilities: expected three editorial rows, found ${auditResults.capabilityRows}`);
if (auditResults.duplicateAwardRows !== 0) failures.push(`recognition: duplicated award rows remain (${auditResults.duplicateAwardRows})`);
if (auditResults.contactBg !== "none") failures.push(`contact: isolated CSS glow remains (${auditResults.contactBg})`);
await auditPage.close();

await browser.close();
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`UI audit passed. Screenshots: ${output}`);
