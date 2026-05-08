"use client";

import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { X, Upload, Loader2 } from "lucide-react";
import { Button } from "./button";

interface ImageUploadProps {
  onChange: (url: string) => void;
  onRemove: () => void;
  value: string;
}

export function ImageUpload({ onChange, onRemove, value }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      toast.error("File size must be less than 4MB");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      onChange(data.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("An error occurred during upload");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  if (value) {
    return (
      <div className="relative w-full h-[200px] rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
        <Image fill src={value} alt="Upload" className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button type="button" variant="destructive" size="icon" onClick={onRemove} className="rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <label className="flex flex-col items-center justify-center w-full h-[200px] border-2 border-dashed border-white/20 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group">
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <span className="text-sm font-bold text-muted-foreground">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold">Click to upload</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">PNG, JPG or WebP (MAX 4MB)</p>
            </div>
          </div>
        )}
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>
    </div>
  );
}
