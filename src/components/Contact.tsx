"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="py-24 px-6 bg-background border-t border-surface1 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-mauve/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Let&apos;s <span className="text-mauve">Connect</span></h2>
          <p className="text-subtext1 mb-10 leading-relaxed text-lg">
            I&apos;m always open to discussing enterprise architecture, generative AI, or potential collaborations.
          </p>

          <div className="space-y-6">
            <a href="mailto:arun.tgode@gmail.com" className="flex items-center gap-4 text-text hover:text-mauve transition-colors group">
              <div className="p-3 bg-surface0 rounded-lg group-hover:bg-mauve/10 transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-subtext0 uppercase tracking-widest">Email</p>
                <p className="text-lg">arun.tgode@gmail.com</p>
              </div>
              <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
            </a>

            <a href="https://linkedin.com/in/arun-venkataramanan" target="_blank" className="flex items-center gap-4 text-text hover:text-mauve transition-colors group">
              <div className="p-3 bg-surface0 rounded-lg group-hover:bg-mauve/10 transition-colors">
                <Linkedin size={20} />
              </div>
              <div>
                <p className="text-xs text-subtext0 uppercase tracking-widest">LinkedIn</p>
                <p className="text-lg">in/arun-venkataramanan</p>
              </div>
              <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
            </a>

            <a href="https://github.com/pyalwin" target="_blank" className="flex items-center gap-4 text-text hover:text-mauve transition-colors group">
              <div className="p-3 bg-surface0 rounded-lg group-hover:bg-mauve/10 transition-colors">
                <Github size={20} />
              </div>
              <div>
                <p className="text-xs text-subtext0 uppercase tracking-widest">GitHub</p>
                <p className="text-lg">github.com/pyalwin</p>
              </div>
              <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="bg-surface0 p-8 rounded-3xl border border-surface1">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-peach" />
              Location
            </h3>
            <p className="text-subtext1 text-lg mb-8">
              Based in <span className="text-text font-medium text-xl">Bangalore, India</span>
              <br />
              <span className="text-sm italic">Open to remote & international relocation roles.</span>
            </p>
            
            <div className="flex items-center gap-4 text-subtext1">
              <Phone size={18} className="text-peach" />
              <span>+91 8454 866083</span>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-between">
            <p className="text-subtext0 text-sm italic font-mono">
              &copy; {new Date().getFullYear()} Arun Venkataramanan. Built with Next.js & Framer Motion.
            </p>
            <button 
              onClick={scrollToTop}
              className="p-4 bg-surface0 rounded-full border border-surface1 hover:border-mauve hover:text-mauve transition-all group"
            >
              <ArrowUpRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
