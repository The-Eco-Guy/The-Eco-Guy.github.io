import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { AsciiSky } from "@/components/ascii-sky";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Muhir Kapoor — Full Stack Engineer", template: "%s — Muhir Kapoor" },
  description: "Muhir Kapoor is a full stack engineer building reliable software for complex systems.",
  openGraph: { title: "Muhir Kapoor — Full Stack Engineer", description: "Reliable software for complex systems.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <AsciiSky />
        {children}
      </body>
    </html>
  );
}
