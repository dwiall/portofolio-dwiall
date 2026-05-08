"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { Experience, Education } from "@prisma/client";

interface ExperienceSectionProps {
  experiences: Experience[];
  education: Education[];
}

export function ExperienceSection({ experiences, education }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-white/5 px-6">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tighter">
            Journey & <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A timeline of my professional growth and educational background.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
          {/* Vertical Divider for Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden lg:block -translate-x-1/2" />

          {/* Left Column: Education */}
          <div className="space-y-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold font-heading">Education</h3>
            </div>

            <div className="space-y-8 relative pl-8 border-l border-primary/20">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary z-10" />
                  
                  <div className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                          <Calendar size={12} /> {edu.startDate} - {edu.endDate || "Present"}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{edu.degree}</h4>
                        <p className="text-muted-foreground font-medium">{edu.school}</p>
                      </div>
                      {edu.description && (
                        <p className="text-sm text-muted-foreground/80 leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {education.length === 0 && (
                <p className="text-muted-foreground italic">No education data yet.</p>
              )}
            </div>
          </div>

          {/* Right Column: Experience */}
          <div className="space-y-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold font-heading">Experience</h3>
            </div>

            <div className="space-y-8 relative pl-8 border-l border-primary/20">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 " />
                  
                  <div className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                          <Calendar size={12} /> {exp.startDate} - {exp.endDate || "Present"}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{exp.position}</h4>
                        <p className="text-muted-foreground font-medium">{exp.company}</p>
                      </div>
                      <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {experiences.length === 0 && (
                <p className="text-muted-foreground italic">No experience data yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
