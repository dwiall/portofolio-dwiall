"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Plus, ExternalLink, Edit } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ImageUpload } from "@/components/ui/image-upload";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  initialData: Project[];
}

export default function ProjectClient({ initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    githubUrl: "",
    demoUrl: "",
  });

  const onOpenAdd = () => {
    setEditingId(null);
    setFormData({ title: "", slug: "", description: "", image: "", githubUrl: "", demoUrl: "" });
    setIsOpen(true);
  };

  const onOpenEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      image: project.image || "",
      githubUrl: project.githubUrl || "",
      demoUrl: project.demoUrl || "",
    });
    setIsOpen(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      
      if (res.ok) {
        toast.success(editingId ? "Project updated" : "Project added");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to save project");
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
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project deleted");
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
        <h2 className="text-xl font-bold font-heading">Manage Projects</h2>
        <Button onClick={onOpenAdd} className="rounded-xl">
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-white/10 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">
              {editingId ? "Edit Project" : "Add New Project"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-6 pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Image</label>
                <ImageUpload 
                  value={formData.image} 
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  onRemove={() => setFormData({ ...formData, image: "" })}
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Title</label>
                  <Input placeholder="Project Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Slug</label>
                  <Input placeholder="my-awesome-project" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Github</label>
                  <Input placeholder="https://github.com/..." value={formData.githubUrl} onChange={(e) => setFormData({...formData, githubUrl: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Demo</label>
                  <Input placeholder="https://demo.com/..." value={formData.demoUrl} onChange={(e) => setFormData({...formData, demoUrl: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground uppercase">Description</label>
              <Textarea 
                placeholder="Describe your project..." 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                required 
                className="min-h-[120px]"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-bold">
              {loading ? "Saving..." : editingId ? "Update Project" : "Create Project"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Links</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.map((project, index) => (
              <TableRow key={project.id} className="group">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {project.image ? (
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-white/5">
                      <Image src={project.image} alt={project.title} fill className="object-cover" sizes="64px" />
                    </div>
                  ) : (
                    <div className="w-16 h-10 rounded-lg bg-secondary flex items-center justify-center text-[10px]">No Image</div>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {project.title}
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{project.slug}</div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {project.githubUrl && <FaGithub className="h-4 w-4 text-muted-foreground" />}
                    {project.demoUrl && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onOpenEdit(project)}>
                      <Edit className="h-4 w-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(project.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {initialData.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
