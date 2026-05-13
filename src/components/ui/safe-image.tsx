"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

export function SafeImage({ src, alt, className, fallbackSrc, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    // If the src starts with /uploads, it's a legacy local path that won't work on Vercel
    if (typeof src === "string" && src.startsWith("/uploads")) {
      setError(true);
    } else {
      setImgSrc(src);
      setError(false);
    }
  }, [src]);

  if (error || !imgSrc) {
    return (
      <div className={cn("flex items-center justify-center bg-secondary text-muted-foreground w-full h-full", className)}>
        <ImageIcon className="opacity-20" size={props.fill ? 48 : 24} />
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
