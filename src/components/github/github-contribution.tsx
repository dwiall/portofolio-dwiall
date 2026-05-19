"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { Star, GitFork, Activity, Award } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

export function GithubContribution() {
  const username = "dwiall";

  // Minimalist theme for the calendar
  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <section className="py-24 relative overflow-hidden px-6 bg-white/5">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
            <FaGithub size={18} />
            <span>Open Source</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tighter">
            GitHub <span className="text-primary">Contributions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Consistency in coding and continuous learning through open-source and personal projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card border-white/10 rounded-3xl p-5 shadow backdrop-blur-sm"
        >
          <div className="flex flex-col space-y-8">
            {/* / Link */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span>Actively developing and contributing daily</span>
              </div>
              <a 
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-primary hover:underline flex items-center gap-2 group"
              >
                View Full Profile
                <Activity size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* The Calendar */}
            <div className="w-full overflow-x-auto no-scrollbar pb-2">
              <div className="min-w-[800px] flex justify-center">
                <GitHubCalendar 
                  username={username}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={14}
                  theme={theme}
                  showWeekdayLabels
                />
              </div>
            </div>

            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
