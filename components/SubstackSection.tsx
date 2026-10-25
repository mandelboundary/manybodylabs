"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, ArrowRight, Webhook, ShieldCheck, Code, Zap } from "lucide-react";

export default function SubstackSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"subscribe" | "webhook">("subscribe");
  const [simulatedPayload, setSimulatedPayload] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("Subscribed to ManyBody Labs Dispatch & Substack stream.");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const triggerTestWebhook = async () => {
    setStatus("loading");
    try {
      const testPayload = {
        event: "subscriber.created",
        timestamp: new Date().toISOString(),
        publication: "manybodylabs.substack.com",
        data: {
          subscriber_id: "sub_" + Math.random().toString(36).substring(2, 9),
          email: "reader@" + (email ? email.split("@")[1] || "example.com" : "domain.com"),
          tier: "free",
          source: "api_webhook_v1",
        },
      };

      const res = await fetch("/api/webhooks/substack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-substack-signature": "sha256=test_signature_valid",
        },
        body: JSON.stringify(testPayload),
      });

      const resData = await res.json();
      setSimulatedPayload(JSON.stringify({ request: testPayload, response: resData }, null, 2));
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="dispatch" className="relative py-24 bg-slate-950 border-t border-slate-900 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
              <Webhook className="w-3.5 h-3.5" />
              <span>Event-Driven Architecture &amp; Substack Integration</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Substack Dispatch &amp; Webhook Pipeline
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl text-base">
              Synchronizing long-form technical dispatches with automated CRM webhooks, subscriber event streaming, and lead reconciliation.
            </p>
          </div>

          {/* Toggle View */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab("subscribe")}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === "subscribe"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Newsletter Dispatch
            </button>
            <button
              onClick={() => setActiveTab("webhook")}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === "webhook"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Live Webhook API</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Subscribe Form */}
        {activeTab === "subscribe" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-2xl p-8 md:p-12">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Quarterly System Monographs
              </span>
              <h3 className="text-2xl font-bold text-white mt-2 mb-4">
                The ManyBody Technical Dispatch
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Deep dives into non-linear dynamics in distributed software, deterministic AI agent guardrails, sub-5ms reverse proxies in Go and Rust, and resilient enterprise CRM pipelines. Zero marketing fluff. Pure engineering mechanics.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@domain.com"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shrink-0 shadow-lg shadow-blue-500/20 disabled:opacity-50"
                >
                  <span>{status === "loading" ? "Subscribing..." : "Join Dispatch"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {status === "success" && (
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>{message}</span>
                </div>
              )}
              {status === "error" && (
                <div className="mt-4 text-xs text-rose-400">{message}</div>
              )}
            </div>

            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-4">
                Recent Dispatches
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="group">
                  <a
                    href="https://substack.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all"
                  >
                    <span className="text-xs text-blue-400 font-mono">Vol. 04</span>
                    <h5 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                      The Autonomy-Execution Gap: Why WAFs Fail with Agent Tools
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Deterministic interceptors vs. stochastic prompt injection.
                    </p>
                  </a>
                </li>
                <li className="group">
                  <a
                    href="https://substack.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all"
                  >
                    <span className="text-xs text-purple-400 font-mono">Vol. 03</span>
                    <h5 className="font-medium text-white group-hover:text-purple-400 transition-colors">
                      From Chaos Theory to Production: The Mandelbrot Boundary
                    </h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Attractor stability and bounding system divergence under load.
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          /* Tab 2: Live Webhook API Showcase */
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    POST
                  </span>
                  <code className="text-sm font-mono text-slate-300">
                    https://manybodylabs.com/api/webhooks/substack
                  </code>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Processes inbound Substack and Stripe webhooks with cryptographic SHA-256 HMAC signature verification.
                </p>
              </div>

              <button
                onClick={triggerTestWebhook}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white rounded-lg transition-colors border border-slate-700"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulate Inbound Webhook</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Pipeline Flow Specifications</span>
                </h5>
                <ul className="space-y-3 text-xs text-slate-300 font-mono">
                  <li className="p-3 bg-slate-950 rounded border border-slate-800/80">
                    1. <span className="text-blue-400">Header Inspection</span>: Reads `x-substack-signature` and verifies digest against `SUBSTACK_WEBHOOK_SECRET`.
                  </li>
                  <li className="p-3 bg-slate-950 rounded border border-slate-800/80">
                    2. <span className="text-purple-400">Payload Normalization</span>: Sanitizes email, parses subscriber tier, and extracts UTM attribution parameters.
                  </li>
                  <li className="p-3 bg-slate-950 rounded border border-slate-800/80">
                    3. <span className="text-emerald-400">Downstream Propagation</span>: Dispatches to GoHighLevel / Salesforce Lead API without blocking the response.
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Execution Trace</span>
                </h5>
                <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto h-48 leading-relaxed">
                  {simulatedPayload || `// Click "Simulate Inbound Webhook" above to execute\n// live test payload against /api/webhooks/substack\n\n{\n  "status": "ready",\n  "endpoint": "/api/webhooks/substack",\n  "verified": true,\n  "supported_events": [\n    "subscriber.created",\n    "subscriber.unsubscribed",\n    "post.published"\n  ]\n}`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
