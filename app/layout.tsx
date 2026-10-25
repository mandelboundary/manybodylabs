import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ManyBody Labs | Systems Engineering & Autonomous Workflows Studio",
  description:
    "Deterministic systems for probabilistic AI workflows. We build high-throughput API gateways, autonomous agent guardrails, and enterprise CRM webhook pipelines.",
  keywords: [
    "Systems Engineering",
    "Autonomous Agent Guardrails",
    "API Gateway",
    "Salesforce Integration",
    "GoHighLevel Webhooks",
    "Next.js Development",
    "Deterministic AI",
  ],
  authors: [{ name: "Tushar Pareek", url: "https://manybodylabs.com" }],
  openGraph: {
    title: "ManyBody Labs | Systems Engineering & Autonomous Workflows Studio",
    description:
      "Deterministic systems for probabilistic AI workflows. High-throughput API proxies and resilient enterprise CRM pipelines.",
    url: "https://manybodylabs.com",
    siteName: "ManyBody Labs",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
