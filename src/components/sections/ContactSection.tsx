"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export function ContactSection() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden px-6">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tighter">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's talk about it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-heading">Contact Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fill out the form and I will get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Email</p>
                  <p className="text-muted-foreground">adam.visionary15@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Phone</p>
                  <p className="text-muted-foreground">+62 856 4060 0585</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">Location</p>
                  <p className="text-muted-foreground">Kab.Tegal, Jawa Tengah, Indonesia</p>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Follow Me</p>
              <div className="flex gap-4">
                <a href="https://github.com/adamdev15" className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <FaGithub size={18} />
                </a>
                <a href="https://www.linkedin.com/in/adam-8107ba307/" className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <FaLinkedin size={18} />
                </a>
                <a href="https://www.instagram.com/_adam.dev/" className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl shadow-black/20"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="John Doe" className="bg-secondary/50 border-white/5 h-12 rounded-xl focus:bg-background transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input placeholder="john@example.com" className="bg-secondary/50 border-white/5 h-12 rounded-xl focus:bg-background transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Project Inquiry" className="bg-secondary/50 border-white/5 h-12 rounded-xl focus:bg-background transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea 
                  placeholder="Tell me about your project..." 
                  className="bg-secondary/50 border-white/5 min-h-[150px] rounded-xl focus:bg-background transition-all"
                />
              </div>
              <Button size="lg" className="w-full h-12 rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
                <Send size={18} className="mr-2" /> Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
