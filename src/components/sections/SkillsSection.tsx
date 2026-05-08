"use client";

import { motion } from "framer-motion";
import { Skill } from "@prisma/client";
import Image from "next/image";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <section id="skills" className="py-24 px-6">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tighter">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold border-l-4 border-primary pl-4 uppercase tracking-widest">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skills
                  .filter(s => s.category === category)
                  .map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center gap-4 group transition-all hover:bg-primary/10 hover:border-primary/30 shadow-xl"
                      title={skill.name}
                    >
                      {skill.image ? (
                        <div className="relative w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-300">
                          <Image src={skill.image} alt={skill.name} fill className="object-contain" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                          {skill.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
