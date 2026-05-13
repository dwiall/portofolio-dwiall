"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Project } from "@prisma/client";
import Image from "next/image";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useState } from "react";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const hasMore = projects.length > visibleCount;

  const showMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <section id="projects" className="py-24 bg-secondary/30 px-6">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 max-w-xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tighter">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground">
              A selection of my recent works across various technologies.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/projects">
              <Button variant="outline" className="rounded-full group">
                View All Page <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, visibleCount).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 6) * 0.1 }}
              className="group bg-background rounded-3xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all shadow-xl shadow-black/5"
            >
              <div className="relative h-42 w-full overflow-hidden">
                {project.image ? (
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  {project.githubUrl && (
                    <Link href={project.githubUrl} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors">
                      <FaGithub size={20} />
                    </Link>
                  )}
                  {project.demoUrl && (
                    <Link href={project.demoUrl} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors">
                      <ExternalLink size={20} />
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-secondary rounded">
                    Frontend
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-secondary rounded">
                    Design
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex justify-center mt-12"
          >
            <Button 
              onClick={showMore}
              variant="outline" 
              className="rounded-full px-8 py-6 border-primary/30 hover:bg-primary/10 transition-all group"
            >
              View More Projects <ArrowRight className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
