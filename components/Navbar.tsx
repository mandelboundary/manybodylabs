"use client";

import React, { useState } from "react";
import { Terminal, Cpu, ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 group-hover:border-blue-400 transition-colors">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-blue-500" />
          </div>
          <div>
            <span className="font-semibold text-slate-100 tracking-tight text-lg group-hover:text-blue-400 transition-colors">
              ManyBody Labs
            </span>
            <span className="text-xs text-slate-500 block font-mono -mt-1">
              systems &amp; workflows
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a
            href="#capabilities"
            className="hover:text-slate-100 transition-colors"
          >
            Capabilities
          </a>
          <a
            href="#case-studies"
            className="hover:text-slate-100 transition-colors"
          >
            Proof of Work
          </a>
          <a href="#dispatch" className="hover:text-slate-100 transition-colors flex items-center gap-1.5">
            <span>Substack Dispatch</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live
            </span>
          </a>
          <a
            href="#webhooks"
            className="hover:text-slate-100 transition-colors flex items-center gap-1"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Webhooks</span>
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-200 rounded-lg transition-all shadow-sm"
          >
            <span>Initiate Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-6 py-4 flex flex-col gap-4 text-sm text-slate-300">
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white"
          >
            Capabilities
          </a>
          <a
            href="#case-studies"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white"
          >
            Proof of Work
          </a>
          <a
            href="#dispatch"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white"
          >
            Substack Dispatch
          </a>
          <a
            href="#webhooks"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white"
          >
            Webhooks &amp; APIs
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-900 bg-white rounded-lg"
          >
            Initiate Project
          </a>
        </div>
      )}
    </header>
  );
}
