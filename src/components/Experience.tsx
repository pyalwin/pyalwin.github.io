"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experience = [
  {
    company: "Ottimate",
    role: "Senior Software Engineer — Integrations Architect",
    period: "May 2022 – Present",
    location: "Bangalore, India",
    description: "Enterprise AP automation — ERP integration infrastructure, customer-facing technical engagements, repeatable connector patterns.",
    tech: ["QuickBooks", "Sage Intacct", "Microsoft Dynamics", "NetSuite"],
  },
  {
    company: "Idealoom Technologies",
    role: "Founding Engineer & Engineering Lead",
    period: "2016 – 2022",
    location: "Bangalore, India",
    description: "Fintech SaaS platform — product architecture, API design, payment provider integrations, banking APIs, compliance systems.",
    tech: ["Python", "API Design", "Payments", "SaaS Architecture"],
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Software Engineer",
    period: "2013 – 2016",
    location: "Bangalore, India",
    description: "BFSI vertical, enterprise IT services, client-facing delivery.",
    tech: ["Enterprise IT", "BFSI", "Software Delivery"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-surface0">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Professional <span className="text-blue">Journey</span></h2>
          <div className="w-20 h-1.5 bg-blue rounded-full mb-6 mx-auto" />
          <p className="text-subtext1 max-w-2xl mx-auto leading-relaxed">
            12+ years of experience in enterprise infrastructure and fintech architecture.
          </p>
        </div>

        <div className="space-y-12">
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative pl-8 sm:pl-12 pb-12 last:pb-0"
            >
              {/* Timeline Line */}
              {i !== experience.length - 1 && (
                <div className="absolute left-[11px] sm:left-[15px] top-8 w-px h-full bg-gradient-to-b from-blue/50 to-transparent" />
              )}
              
              {/* Timeline Dot */}
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-background border-2 border-blue flex items-center justify-center z-10 shadow-[0_0_15px_rgba(137,180,250,0.3)]">
                <div className="w-2 h-2 rounded-full bg-blue" />
              </div>

              <div className="bg-background/40 border border-surface1 p-6 sm:p-8 rounded-2xl hover:border-blue/30 transition-all group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-blue transition-colors">{exp.company}</h3>
                  <div className="flex items-center gap-2 text-sm text-subtext1 bg-surface1 px-3 py-1 rounded-full whitespace-nowrap">
                    <Calendar size={14} />
                    {exp.period}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-peach mb-4 font-medium">
                  <Briefcase size={16} />
                  {exp.role}
                </div>

                <div className="flex items-center gap-2 text-sm text-subtext0 mb-6">
                  <MapPin size={14} />
                  {exp.location}
                </div>

                <p className="text-subtext1 mb-6 leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tag, j) => (
                    <span key={j} className="px-3 py-1 bg-surface1/50 text-subtext1 text-xs rounded-full border border-surface1 group-hover:border-blue/20 transition-all">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
