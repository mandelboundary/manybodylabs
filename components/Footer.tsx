import React from "react";
import { Terminal, Code2, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          </div>
          <span className="text-slate-300 font-semibold tracking-tight text-sm">
            ManyBody Labs
          </span>
          <span>&copy; 2026 &bull; manybodylabs.com</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/mandelboundary"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <Code2 className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href="#dispatch"
            className="hover:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <span>Substack Dispatch</span>
          </a>
          <a
            href="#capabilities"
            className="hover:text-slate-300 transition-colors"
          >
            Architecture
          </a>
        </div>
      </div>
    </footer>
  );
}
