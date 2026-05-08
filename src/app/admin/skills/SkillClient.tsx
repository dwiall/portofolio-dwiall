"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Skill } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Plus, Edit, ImageIcon } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  initialData: Skill[];
}

export default function SkillClient({ initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
  });

  const onOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: "", category: "", image: "" });
    setIsOpen(true);
  };

  const onOpenEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      image: skill.image || "",
    });
    setIsOpen(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId ? `/api/skills/${editingId}` : "/api/skills";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success(editingId ? "Skill updated" : "Skill added");
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Skill deleted");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card border-white overflow-hidden p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-heading">Manage Skills</h2>
        <Button onClick={onOpenAdd} className="rounded-xl">
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md bg-background/95 backdrop-blur-xl border-white/10 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">
              {editingId ? "Edit Skill" : "Add New Skill"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Skill Icon/Image</label>
              <ImageUpload 
                value={formData.image} 
                onChange={(url) => setFormData({...formData, image: url})} 
                onRemove={() => setFormData({...formData, image: ""})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground uppercase">Skill Name</label>
              <Input placeholder="e.g. React" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground uppercase">Category</label>
              <Input placeholder="e.g. Frontend" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-bold">
              {loading ? "Saving..." : editingId ? "Update Skill" : "Create Skill"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.map((skill, index) => (
              <TableRow key={skill.id} className="group">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {skill.image ? (
                    <div className="relative w-8 h-8">
                      <Image src={skill.image} alt={skill.name} fill className="object-contain" sizes="32px" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"><ImageIcon size={16} /></div>
                  )}
                </TableCell>
                <TableCell className="font-bold">{skill.name}</TableCell>
                <TableCell>
                  <span className="text-xs font-bold px-3 py-1 bg-secondary rounded-full uppercase tracking-tighter">
                    {skill.category}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onOpenEdit(skill)}>
                      <Edit className="h-4 w-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(skill.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
