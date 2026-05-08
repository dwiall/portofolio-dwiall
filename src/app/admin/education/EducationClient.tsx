"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Education } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Plus, Edit, GraduationCap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  initialData: Education[];
}

export default function EducationClient({ initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const onOpenAdd = () => {
    setEditingId(null);
    setFormData({ school: "", degree: "", field: "", startDate: "", endDate: "", description: "" });
    setIsOpen(true);
  };

  const onOpenEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData({
      school: edu.school,
      degree: edu.degree,
      field: edu.field || "",
      startDate: edu.startDate,
      endDate: edu.endDate || "",
      description: edu.description || "",
    });
    setIsOpen(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId ? `/api/education/${editingId}` : "/api/education";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success(editingId ? "Education updated" : "Education added");
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
      const res = await fetch(`/api/education/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Education deleted");
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
          <h2 className="text-xl font-bold font-heading">Manage Education</h2>
          <Button onClick={onOpenAdd} className="rounded-xl">
            <Plus className="mr-2 h-4 w-4" /> Add Education
          </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl bg-background/95 backdrop-blur-xl border-white/10 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">
              {editingId ? "Edit Education" : "Add New Education"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 col-span-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">School / University</label>
                <Input placeholder="e.g. Stanford University" value={formData.school} onChange={(e) => setFormData({...formData, school: e.target.value})} required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">Degree</label>
                <Input placeholder="e.g. Bachelor's" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">Field of Study</label>
                <Input placeholder="e.g. Computer Science" value={formData.field} onChange={(e) => setFormData({...formData, field: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">Start Date</label>
                <Input placeholder="e.g. 2018" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">End Date (or 'Present')</label>
                <Input placeholder="e.g. 2022" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
              </div>
              <div className="space-y-1 col-span-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Description (Optional)</label>
                <Input placeholder="Key achievements..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-bold">
              {loading ? "Saving..." : editingId ? "Update Education" : "Create Education"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead>School</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.map((edu, index) => (
              <TableRow key={edu.id} className="group">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-bold flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" /> {edu.school}
                </TableCell>
                <TableCell className="text-sm font-medium">{edu.degree} in {edu.field}</TableCell>
                <TableCell className="text-sm">{edu.startDate} - {edu.endDate || "Present"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1 ">
                    <Button variant="ghost" size="icon" onClick={() => onOpenEdit(edu)}>
                      <Edit className="h-4 w-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(edu.id)}>
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
