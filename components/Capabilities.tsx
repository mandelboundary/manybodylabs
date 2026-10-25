import React from "react";
import { ShieldAlert, Cpu, Network, ArrowRight, Layers, FileCode2, Lock } from "lucide-react";

export default function Capabilities() {
  const services = [
    {
      id: "01",
      icon: ShieldAlert,
      title: "Autonomous Agent Guardrails & Runtime Proxies",
      subtitle: "Deterministic security middleware for probabilistic tool calls.",
      description:
        "We build reverse proxies in Go and Rust that intercept LLM tool-calling APIs (OpenAI, Anthropic, open-source models). Our engines enforce regex boundaries, inspect numerical transaction thresholds, and halt indirect prompt injections before database mutations execute.",
      tags: ["Go", "Rust", "API Gateway", "MCP Protocol", "JSON-RPC"],
    },
    {
      id: "02",
      icon: Network,
      title: "Resilient CRM Webhooks & Data Pipelines",
      subtitle: "Closing the gap between lead capture, subscription events, and delivery.",
      description:
        "Custom event-driven integrations linking Substack, GoHighLevel, HubSpot, and Salesforce. We build idempotent webhook ingestors with HMAC signature verification, automatic queue retries, and real-time CRM stage transitions.",
      tags: ["GoHighLevel", "Salesforce API", "Substack Webhooks", "PostgreSQL", "Kafka/Redis"],
    },
    {
      id: "03",
      icon: Cpu,
      title: "High-Performance Full-Stack Web Applications",
      subtitle: "SEO-optimized, server-rendered Next.js and TypeScript platforms.",
      description:
        "Modern web applications with dynamic routing, structured JSON-LD metadata, and optimized backend endpoints. Built for lightning-fast First Contentful Paint (FCP) and scalable API microservice integration.",
      tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Docker", "Edge Functions"],
    },
  ];

  return (
    <section id="capabilities" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
            Core Engineering Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
            Systems Built for Bounded Stability.
          </h2>
          <p className="mt-4 text-slate-400 text-base leading-relaxed">
            Inspired by complex many-body dynamics, our architectures prevent non-linear cascades and software divergence under heavy operational pressure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-sm text-slate-600 font-bold">
                      {s.id}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mb-4">
                    {s.subtitle}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {s.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/60">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
