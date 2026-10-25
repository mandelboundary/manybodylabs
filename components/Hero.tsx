"use client";

import React from "react";
import ManyBodyCanvas from "./ManyBodyCanvas";
import { ArrowUpRight, ShieldCheck, Zap, Database, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Interactive Background Canvas */}
      <ManyBodyCanvas />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md mb-8 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300">
            manybodylabs.com &bull; Systems &amp; Workflows Studio
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl">
          Deterministic Systems for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
            Probabilistic Workflows.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          ManyBody Labs builds high-throughput API gateways, autonomous AI agent guardrails, and mission-critical CRM pipelines that stay bounded under chaotic loads.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#contact"
            className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-200 text-slate-950 font-semibold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>Initiate Project Consultation</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#case-studies"
            className="w-full sm:w-auto px-7 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-semibold text-sm rounded-xl border border-slate-800 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>View Architecture Case Studies</span>
          </a>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-16 w-full grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl pt-8 border-t border-slate-800/60 text-left">
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>PROXY LATENCY</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">&lt; 5 ms</div>
            <div className="text-xs text-slate-400 mt-1">Zero-tax edge inspection</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>AGENT INTERCEPT</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-1">Deterministic bounds checks</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span>CRM RECONCILIATION</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">Event-Driven</div>
            <div className="text-xs text-slate-400 mt-1">Substack &bull; GHL &bull; SFDX</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>STACK</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">Next.js 15</div>
            <div className="text-xs text-slate-400 mt-1">TypeScript &bull; Go &bull; Python</div>
          </div>
        </div>
      </div>
    </section>
  );
}
