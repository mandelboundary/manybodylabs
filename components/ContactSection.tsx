"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Mail, MapPin, MessageSquare, Terminal } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectScope: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setResponseMsg(data.message || "Consultation request dispatched.");
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Submission failed.");
      }
    } catch {
      setStatus("error");
      setResponseMsg("Network communication error.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
                Initiate Engagement
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
                Let's Architect Your Infrastructure.
              </h2>
              <p className="mt-4 text-slate-400 text-base leading-relaxed">
                Whether you need a custom agent proxy, event-driven CRM webhook pipelines, or scalable Next.js platforms, ManyBody Labs takes projects from architectural design to production deployment.
              </p>

              <div className="mt-8 space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-mono">DIRECT INQUIRIES</span>
                    <a
                      href="mailto:tushar.pareek001@gmail.com"
                      className="text-white hover:text-blue-400 font-mono transition-colors"
                    >
                      contact@manybodylabs.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-mono">HEADQUARTERS</span>
                    <span className="text-white font-mono">Jamshedpur &bull; Global Remote</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs font-mono text-slate-400">
              <span className="text-blue-400 font-semibold block mb-1">Response SLA:</span>
              Technical discovery reviews are scheduled within 24 business hours.
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800/80 rounded-2xl p-8 md:p-10">
            {status === "success" ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Inquiry Dispatched</h3>
                <p className="text-sm text-slate-400 max-w-md">{responseMsg}</p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", company: "", projectScope: "" });
                  }}
                  className="mt-6 px-4 py-2 text-xs font-mono bg-slate-800 text-white rounded-lg hover:bg-slate-700"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                    Project Scope &amp; Architecture Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.projectScope}
                    onChange={(e) =>
                      setFormData({ ...formData, projectScope: e.target.value })
                    }
                    placeholder="Describe your technical bottlenecks (e.g. AI tool guardrail proxy, Salesforce webhook integration, Next.js web application architecture)..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "loading" ? "Transmitting..." : "Submit Inquiry"}</span>
                </button>

                {status === "error" && (
                  <p className="text-xs text-rose-400 text-center">{responseMsg}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
