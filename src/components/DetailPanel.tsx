"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

export interface DetailRow {
  label: string;
  value: string;
}

export interface DetailItem {
  title: string;
  rows: DetailRow[];
  link?: string;
}

interface DetailPanelProps {
  item: DetailItem | null;
  onClose: () => void;
}

export default function DetailPanel({ item, onClose }: DetailPanelProps) {
  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-4 top-1/2 z-50 w-full max-w-xl -translate-y-1/2 rounded-lg border border-sky/40 bg-panel font-mono shadow-[0_32px_80px_rgba(0,0,0,0.6)] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-xs text-subtext1">
              <div className="flex items-center gap-2">
                <span className="text-green">$</span>
                <span>
                  explain{" "}
                  <span className="text-sky">"{item.title}"</span>
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded p-1 text-subtext0 transition hover:bg-surface1 hover:text-red"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            {/* body */}
            <div className="space-y-3 p-5 text-sm">
              {item.rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-3">
                  <span className="shrink-0 text-right text-xs text-subtext0">{row.label}</span>
                  <span className="leading-6 text-text">{row.value}</span>
                </div>
              ))}

              {item.link && (
                <div className="grid grid-cols-[7rem_1fr] gap-3 pt-1">
                  <span className="shrink-0 text-right text-xs text-subtext0">link</span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sky transition hover:underline"
                  >
                    {item.link.replace("https://", "")}
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              )}
            </div>

            {/* footer */}
            <div className="border-t border-line px-5 py-2 text-[11px] text-subtext0">
              press <span className="text-yellow">ESC</span> or click outside to close
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
