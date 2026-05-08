"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hero } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, User, Briefcase, FileText, ImageIcon } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import Image from "next/image";

interface Props {
  initialData: Hero | null;
}

export default function HeroSettingsClient({ initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    role: initialData?.role || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    cv: initialData?.cv || "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/settings/hero", {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      
      const result = await res.json();
      
      if (res.ok && result.success) {
        toast.success(result.message || "Hero settings updated successfully!");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update settings");
        if (result.details) console.error("Save Error Detail:", result.details);
      }
    } catch (error) {
      toast.error("An error occurred during save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Side */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="glass-card border-white shadow-xl">
          <CardHeader>
            <CardTitle className="font-heading text-xl flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Edit Hero Content
            </CardTitle>
            <CardDescription>Update your personal information shown on the landing page.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                    <User size={12} /> Full Name
                  </label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    placeholder="e.g. Adam"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                    <Briefcase size={12} /> Professional Role
                  </label>
                  <Input 
                    value={formData.role} 
                    onChange={(e) => setFormData({...formData, role: e.target.value})} 
                    placeholder="e.g. Fullstack Developer"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                  <FileText size={12} /> About / Description
                </label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  placeholder="Tell something about yourself..."
                  className="min-h-[120px] resize-none"
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                  <FileText size={12} /> CV Link (Optional)
                </label>
                <Input 
                  value={formData.cv || ""} 
                  onChange={(e) => setFormData({...formData, cv: e.target.value})} 
                  placeholder="https://..." 
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-bold">
                <Save className="mr-2 h-4 w-4" /> {loading ? "Updating..." : "Save All Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Preview Side */}
      <div className="space-y-6">
        <Card className="glass-card border-white/5 shadow-xl sticky top-24">
          <CardHeader>
            <CardTitle className="font-heading text-xl flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" /> Profile Photo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <ImageUpload 
                value={formData.image || ""} 
                onChange={(url) => setFormData({...formData, image: url})} 
                onRemove={() => setFormData({...formData, image: ""})}
              />
              <p className="text-[10px] text-muted-foreground text-center">
                Recommended: Square image (1:1), max 4MB.
              </p>
            </div>

            {/* Live Preview of the Image State */}
            <div className="pt-3 border-t border-white/5">
              <div className="flex justify-center">
                {formData.image ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary p-1">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image src={formData.image} alt="Preview" fill className="object-cover" sizes="128px" />
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-muted flex items-center justify-center text-muted-foreground text-xs text-center px-4">
                    No image uploaded
                  </div>
                )}
              </div>
              {formData.image && (
                <p className="text-[10px] text-center mt-2 text-emerald-500 font-mono truncate">
                  {formData.image}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
