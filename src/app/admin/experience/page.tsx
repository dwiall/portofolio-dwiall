import { db } from "@/lib/db";
import ExperienceClient from "./ExperienceClient";

export default async function ExperiencePage() {
  const experiences = await db.experience.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Experience Management</h1>
        <p className="text-muted-foreground">Manage your professional experience and job history.</p>
      </div>
      <ExperienceClient initialData={experiences} />
    </div>
  );
}
