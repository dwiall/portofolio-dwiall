"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Certificate } from "@prisma/client";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { useState } from "react";
import { ImageModal } from "@/components/ui/image-modal";

interface CertificatesGridProps {
  certificates: Certificate[];
}

export function CertificatesGrid({ certificates }: CertificatesGridProps) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <ImageModal 
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.src || ""}
        alt={selectedImage?.alt || ""}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 container px-4 md:px-6 mx-auto">
      {certificates.map((cert, index) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="glass p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row gap-6 hover:border-primary/50 transition-all group shadow-xl bg-secondary/5"
        >
          <div 
            className="relative w-full sm:w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-primary/5 flex items-center justify-center cursor-zoom-in group/img"
            onClick={() => cert.image && setSelectedImage({ src: cert.image, alt: cert.title })}
          >
            {cert.image ? (
              <SafeImage src={cert.image} alt={cert.title} fill className="object-cover group-hover/img:scale-110 transition-transform duration-500" sizes="112px" />
            ) : (
              <Award size={40} className="text-primary/40" />
            )}
          </div>
          
          <div className="flex-grow space-y-3">
            <div className="space-y-1">
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight">{cert.title}</h3>
              <p className="text-xs font-medium text-muted-foreground">{cert.issuer}</p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-full uppercase tracking-wider">
                {cert.year}
              </span>
              {cert.credentialUrl && (
                <Link 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  className="text-primary flex items-center gap-1 text-xs font-bold hover:underline"
                >
                  Verify <ExternalLink size={12} />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      ))}
      </div>
    </>
  );
}
