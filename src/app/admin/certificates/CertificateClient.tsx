"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Certificate } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Plus, Edit, Award } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  initialData: Certificate[];
}

export default function CertificateClient({ initialData }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    year: "",
    image: "",
    credentialUrl: "",
  });

  const onOpenAdd = () => {
    setEditingId(null);
    setFormData({ title: "", issuer: "", year: "", image: "", credentialUrl: "" });
    setIsOpen(true);
  };

  const onOpenEdit = (cert: Certificate) => {
    setEditingId(cert.id);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      year: cert.year,
      image: cert.image || "",
      credentialUrl: cert.credentialUrl || "",
    });
    setIsOpen(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId ? `/api/certificates/${editingId}` : "/api/certificates";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success(editingId ? "Certificate updated" : "Certificate added");
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
      const res = await fetch(`/api/certificates/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Certificate deleted");
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
        <h2 className="text-xl font-bold font-heading">Manage Certificates</h2>
        <Button onClick={onOpenAdd} className="rounded-xl">
          <Plus className="mr-2 h-4 w-4" /> Add Certificate
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl bg-background/95 backdrop-blur-xl border-white/10 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">
              {editingId ? "Edit Certificate" : "Add New Certificate"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 col-span-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Certificate Image</label>
                <ImageUpload 
                  value={formData.image} 
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  onRemove={() => setFormData({ ...formData, image: "" })}
                />
              </div>
              <div className="space-y-1 col-span-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Certificate Title</label>
                <Input placeholder="e.g. Meta Frontend Developer" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">Issuer</label>
                <Input placeholder="e.g. Coursera" value={formData.issuer} onChange={(e) => setFormData({...formData, issuer: e.target.value})} required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase">Year</label>
                <Input placeholder="e.g. 2023" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} required />
              </div>
              <div className="space-y-1 col-span-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Credential URL</label>
                <Input placeholder="https://..." value={formData.credentialUrl} onChange={(e) => setFormData({...formData, credentialUrl: e.target.value})} />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-bold">
              {loading ? "Saving..." : editingId ? "Update Certificate" : "Create Certificate"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead>Certificate</TableHead>
              <TableHead>Issuer</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.map((cert, index) => (
              <TableRow key={cert.id} className="group">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {cert.image ? (
                      <div className="relative w-12 h-12 rounded overflow-hidden">
                        <Image src={cert.image} alt={cert.title} fill className="object-cover" sizes="48px" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center"><Award size={20} /></div>
                    )}
                    <span className="font-bold">{cert.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium">{cert.issuer}</TableCell>
                <TableCell className="text-sm">{cert.year}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onOpenEdit(cert)}>
                      <Edit className="h-4 w-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(cert.id)}>
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
