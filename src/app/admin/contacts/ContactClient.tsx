"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContactMessage } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Mail, User, Clock } from "lucide-react";
import { format } from "date-fns";

interface Props {
  initialData: ContactMessage[];
}

export default function ContactClient({ initialData }: Props) {
  const router = useRouter();

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Message deleted");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <Card className="glass-card border-white/5 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData.map((msg, index) => (
            <TableRow key={msg.id} className="group">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold flex items-center gap-1"><User size={12} /> {msg.name}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Mail size={12} /> {msg.email}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">{msg.subject}</TableCell>
              <TableCell className="max-w-xs truncate" title={msg.message}>
                {msg.message}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} /> {format(new Date(msg.createdAt), "dd MMM yyyy, HH:mm")}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onDelete(msg.id)} className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {initialData.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                No messages found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
