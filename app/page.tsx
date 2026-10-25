import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import ProofOfWork from "@/components/ProofOfWork";
import SubstackSection from "@/components/SubstackSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Capabilities />
        <ProofOfWork />
        <SubstackSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
