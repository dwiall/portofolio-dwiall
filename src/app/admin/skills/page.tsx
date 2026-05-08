import { db } from "@/lib/db";
import SkillClient from "./SkillClient";

export default async function SkillsPage() {
  const skills = await db.skill.findMany({
    orderBy: { category: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Skills Management</h1>
        <p className="text-muted-foreground">Showcase your technical and soft skills to potential employers.</p>
      </div>
      
      <SkillClient initialData={skills} />
    </div>
  );
}
