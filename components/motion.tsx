"use client";

import { motion } from "framer-motion";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={`reveal ${className}`.trim()} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0 }} transition={{ duration: .35, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

const systemMap = [
  "+-----------+     +-----------+",
  "| INTERFACE | --> |    API    |",
  "+-----------+     +-----+-----+",
  "                        |",
  "                 +------v-----+",
  "                 |   STATE    |",
  "                 +------+-----+",
  "                        |",
  "+-----------+     +------v-----+",
  "| TELEMETRY | <-- |  OUTCOME   |",
  "+-----------+     +------------+",
].join("\n");

export function SystemVisual() {
  return <div className="system-visual" aria-hidden>
    <div className="system-visual-head"><span>ENGINEERING SYSTEM</span><span>MK / 01</span></div>
    <pre>{systemMap}</pre>
    <div className="system-visual-foot"><span>TYPED BOUNDARIES</span><span>MEASURED RESULTS</span></div>
  </div>;
}
