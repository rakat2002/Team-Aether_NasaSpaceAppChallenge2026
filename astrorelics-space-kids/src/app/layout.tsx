import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abandoned But Not Forgotten | NASA Space Apps Challenge",
  description:
    "An interactive, animated space adventure for young astronauts aged 8-12 to explore humanity's brave robotic pioneers across the solar system using real NASA imagery.",
  keywords: [
    "NASA Space Apps",
    "Opportunity Rover",
    "Mars Exploration",
    "Spacecraft",
    "STEM for Kids",
    "Solar System",
    "Interactive Science"
  ],
  authors: [{ name: "NASA Space Apps Team" }],
};

export const viewport: Viewport = {
  themeColor: "#030614",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-space-void text-slate-100 min-h-screen antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
