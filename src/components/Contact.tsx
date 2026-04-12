"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";

const links = [
  {
    label: "Email",
    value: "arun.tgode@gmail.com",
    href: "mailto:arun.tgode@gmail.com",
    icon: <Mail size={20} />,
  },
  {
    label: "LinkedIn",
    value: "in/arun-venkataramanan",
    href: "https://linkedin.com/in/arun-venkataramanan",
    icon: <Linkedin size={20} />,
  },
  {
    label: "GitHub",
    value: "github.com/pyalwin",
    href: "https://github.com/pyalwin",
    icon: <Github size={20} />,
  },
];

export default function Contact() {
  const scrollToTop = () => {
    document.querySelector("[data-main-scroll]")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="min-h-full bg-background px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg border border-line bg-panel p-5 sm:p-7"
        >
          <p className="mb-2 text-sm text-sky">contact.sh</p>
          <h1 className="mb-5 text-3xl font-bold sm:text-4xl">Let&apos;s Connect</h1>
          <p className="mb-8 max-w-2xl text-lg leading-8 text-subtext1">
            Open to senior engineering conversations around product engineering, platform work, automation, applied AI, and technical delivery.
          </p>

          <div className="space-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-lg border border-line bg-surface0 p-4 text-text transition hover:border-sky hover:bg-surface1"
              >
                <span className="rounded-md border border-line bg-panel p-3 text-sky transition group-hover:border-sky">{link.icon}</span>
                <span className="min-w-0">
                  <span className="block text-xs text-subtext0">{link.label}</span>
                  <span className="block truncate text-base font-bold">{link.value}</span>
                </span>
                <ArrowUpRight size={18} className="ml-auto text-subtext0 transition group-hover:text-sky" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="grid gap-5"
        >
          <div className="relative min-h-[270px] overflow-hidden rounded-lg border border-line bg-surface0">
            <Image
              src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=80"
              alt="City skyline at dusk"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,17,16,0.18),rgba(15,17,16,0.88))]" />
            <div className="relative flex h-full min-h-[270px] flex-col justify-end p-5">
              <div className="mb-4 flex items-center gap-3 text-peach">
                <MapPin size={22} />
                <span className="font-bold">Bangalore, India</span>
              </div>
              <p className="max-w-md leading-7 text-subtext1">
                Open to remote roles and international relocation conversations.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-panel p-5">
            <div className="mb-5 flex items-center gap-3">
              <Send size={20} className="text-green" />
              <h2 className="text-xl font-bold">Fast path</h2>
            </div>
            <div className="space-y-3 text-subtext1">
              <p className="text-sm leading-6 text-subtext0">
                Best topics: product architecture, platform reliability, workflow automation, applied AI, and engineering leadership.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm text-subtext0">
            <p>&copy; {new Date().getFullYear()} Arun Venkataramanan. Built with Next.js and Framer Motion.</p>
            <button
              type="button"
              onClick={scrollToTop}
              className="shrink-0 rounded-md border border-line bg-surface0 p-3 text-subtext1 transition hover:border-sky hover:text-sky"
              aria-label="Scroll to top"
            >
              <ArrowUpRight size={22} className="-rotate-45" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
