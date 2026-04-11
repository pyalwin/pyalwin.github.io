"use client";

import { motion } from "framer-motion";
import Terminal from "./Terminal";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-background relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mauve/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue/10 rounded-full blur-[120px] -z-10 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text mb-6">
          Arun <span className="text-mauve">Venkataramanan</span>
        </h1>
        <p className="text-xl sm:text-2xl text-subtext1 mb-4 font-light italic">
          Integrator by Day, AI Architect by Night
        </p>
        <p className="text-lg text-subtext0 max-w-2xl mx-auto leading-relaxed">
          Senior Software Engineer specializing in connecting enterprise ERP systems with generative AI intelligence. 12+ years of building at the intersection of architecture and automation.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="w-full"
      >
        <Terminal />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12"
      >
        <div className="flex flex-col items-center gap-2 text-subtext1">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-mauve to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
