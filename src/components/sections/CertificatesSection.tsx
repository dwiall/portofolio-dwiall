"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Certificate } from "@prisma/client";
import Image from "next/image";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { useRef } from "react";
import { useState } from "react";
import { ImageModal } from "@/components/ui/image-modal";
import { Button } from "@/components/ui/button";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="certificates" className="py-24 bg-secondary/30 relative overflow-hidden px-6">
      <ImageModal 
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.src || ""}
        alt={selectedImage?.alt || ""}
      />
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tighter">
              <span className="text-primary">Certificates</span> & Awards
            </h2>
            <p className="text-muted-foreground text-lg">
              Recognition of my professional continuous learning and skills verification.
            </p>
          </motion.div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-primary/20 hover:bg-primary/10 transition-all"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-primary/20 hover:bg-primary/10 transition-all"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[300px] md:min-w-[450px] snap-center glass p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row gap-6 hover:border-primary/50 transition-all group shadow-xl"
            >
              <div 
                className="relative w-full sm:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-primary/5 flex items-center justify-center cursor-zoom-in group/img"
                onClick={() => cert.image && setSelectedImage({ src: cert.image, alt: cert.title })}
              >
                {cert.image ? (
                  <SafeImage src={cert.image} alt={cert.title} fill className="object-cover group-hover/img:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 128px" />
                ) : (
                  <Award size={48} className="text-primary/40" />
                )}
              </div>
              
              <div className="flex-grow space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">{cert.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{cert.issuer}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    Issued in {cert.year}
                  </span>
                  {cert.credentialUrl && (
                    <Link 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      className="text-primary flex items-center gap-1 text-sm font-bold hover:underline"
                    >
                      Verify <ExternalLink size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex justify-center mt-12"
        >
          <Link href="/certificates">
            <Button 
              variant="outline" 
              className="rounded-full px-8 py-6 border-primary/30 hover:bg-primary/10 transition-all group"
            >
              View More Certificates <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
