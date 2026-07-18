import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Om Pathania — Computer Science & Software Engineering",
  description:
    "Portfolio of Om Pathania — Computer Science undergraduate building Python, open-source, and AI-driven software. FOSSEE intern at IIT Bombay.",
  keywords: [
    "Om Pathania",
    "Computer Science",
    "Software Engineer",
    "Python",
    "Open Source",
    "FOSSEE",
    "Portfolio",
  ],
  authors: [{ name: "Om Pathania" }],
  openGraph: {
    title: "Om Pathania — Computer Science & Software Engineering",
    description:
      "Computer Science undergraduate building Python, open-source, and AI-driven software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
