"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { SafeImage } from "@/components/ui/safe-image";
import Typewriter from "typewriter-effect";


interface HeroProps {
  heroData: {
    name: string;
    role: string;
    description: string;
    image?: string | null;
    cv?: string | null;
  };
}

export function Hero({ heroData }: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden px-6">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-medium text-primary tracking-wide">
                Hello, I&apos;m
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter text-foreground leading-tight">
                {heroData.name}
              </h1>
              <div className="text-2xl md:text-4xl font-semibold text-muted-foreground">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-primary">
                  <Typewriter
                    options={{
                      strings: ["Frontend Developer", "Backend Developer", "Web Developer"],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 50,
                    }}
                  />
                </span>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              {heroData.description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              {heroData.cv && (
                <Button size="lg" className="bg-white hover:bg-white/90 text-primary font-bold rounded-full px-8 shadow-xl transition-all hover:scale-105 border border-white/20">
                  <a href={heroData.cv} target="_blank" rel="noreferrer">
                    Download CV
                  </a>
                </Button>
              )}
              <Button size="lg" variant="outline" className="rounded-full px-8 glass border-primary/50 hover:bg-primary/10 transition-all hover:scale-105">
                <Link href="https://www.linkedin.com/in/adam-8107ba307/">Let&apos;s Connect LinkedIn</Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-6 pt-4">
              <Link href="https://github.com/dwiall" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                <FaGithub className="h-6 w-6" />
              </Link>
              <Link href="https://www.linkedin.com/in/adam-8107ba307/" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                <FaLinkedin className="h-6 w-6" />
              </Link>
              <Link href="mailto:adam.visionary@gmail.com" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                <FaEnvelope className="h-6 w-6" />
              </Link>
              <Link href="https://wa.me/6285640600585" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                <FaWhatsapp className="h-6 w-6" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-accent/20 animate-reverse-spin" />
              
              {/* Image Container */}
              <div className="absolute inset-8 rounded-full overflow-hidden glass border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                {heroData.image ? (
                    <SafeImage 
                      src={heroData.image} 
                      alt={heroData.name} 
                      fill 
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground">No Image</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
