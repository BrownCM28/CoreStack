import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CoreStack — Data Center & AI Infrastructure Jobs",
    template: "%s | CoreStack",
  },
  description:
    "The job board for data center construction, operations, and AI infrastructure professionals. Find your next role in the infrastructure powering the future.",
  keywords: [
    "data center jobs",
    "AI infrastructure jobs",
    "data center construction",
    "data center operations",
    "network engineering jobs",
    "hyperscale jobs",
    "colocation jobs",
  ],
  openGraph: {
    title: "CoreStack — Data Center & AI Infrastructure Jobs",
    description:
      "The job board for data center construction, operations, and AI infrastructure professionals.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable}`}
      style={
        {
          "--font-family-sans": `var(--font-inter), ui-sans-serif, system-ui, sans-serif`,
          "--font-family-mono": `var(--font-ibm-plex-mono), ui-monospace, monospace`,
        } as React.CSSProperties
      }
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
