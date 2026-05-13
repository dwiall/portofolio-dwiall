"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
}

export function ImageModal({ isOpen, onClose, imageSrc, alt }: ImageModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-zoom-out"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-5xl w-full max-h-full aspect-auto rounded-xl overflow-hidden shadow-2xl z-10"
          >
            <div className="relative w-full h-full min-h-[300px] md:min-h-[500px]">
              <Image
                src={imageSrc}
                alt={alt}
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all z-20"
            >
              <X size={24} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
