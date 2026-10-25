import React from "react";
import { Terminal, Shield, Globe, ExternalLink, Code2 } from "lucide-react";

export default function ProofOfWork() {
  const projects = [
    {
      title: "AegisGate: Runtime Agent Firewall Proxy",
      category: "Security & AI Infrastructure",
      summary:
        "High-performance reverse proxy that intercepts autonomous agent tool calls (OpenAI/Anthropic spec). Validates parameter ranges, blocks unauthorized bash executions, and eliminates indirect prompt injections with <5ms overhead.",
      stack: ["Go", "Rust", "Docker", "JSON-RPC", "Regex Sandbox"],
      impact: "Deterministic execution boundaries with zero-tax latency overhead.",
    },
    {
      title: "Admissions Discovery & University Portal",
      category: "Full-Stack Web Engineering",
      summary:
        "Next.js App Router prototype built for student lead generation and program discovery. Implemented dynamic routing, automated JSON-LD schema markup, and responsive UI components connected to backend onboarding APIs.",
      stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "SEO Schema", "REST API"],
      impact: "Structured metadata architecture achieving high Lighthouse performance scores.",
    },
    {
      title: "Apex Invocable Action & Webhook Engine",
      category: "CRM & Systems Integration",
      summary:
        "Agentforce prototype managing lead qualification pipelines and consent compliance. Built custom Apex actions to sanitize inbound JSON payloads, validate fields, and execute transactional lead creation.",
      stack: ["Salesforce (SFDX)", "Apex", "Agentforce", "SOQL", "Webhooks"],
      impact: "Automated qualification workflow with human-in-the-loop fallback escalation.",
    },
  ];

  return (
    <section id="case-studies" className="py-24 bg-slate-900/40 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400">
              Selected Deployments &amp; Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              Architecture Built &amp; Documented.
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-xl">
              Real code, transparent system designs, and verified production patterns.
            </p>
          </div>

          <a
            href="https://github.com/mandelboundary"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700 transition-colors"
          >
            <Code2 className="w-4 h-4 text-purple-400" />
            <span>github.com/mandelboundary</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm"
            >
              <div>
                <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block mb-2">
                  {p.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {p.summary}
                </p>
              </div>

              <div>
                <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 mb-6 text-xs text-slate-300 font-mono">
                  <span className="text-emerald-400 font-semibold block mb-1">
                    System Outcome:
                  </span>
                  {p.impact}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-900">
                  {p.stack.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
