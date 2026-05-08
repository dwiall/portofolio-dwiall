import { db } from "@/lib/db";
import EducationClient from "./EducationClient";

export default async function EducationAdminPage() {
  const education = await db.education.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Education Management</h1>
        <p className="text-muted-foreground">Manage your educational background and academic achievements.</p>
      </div>
      <EducationClient initialData={education} />
    </div>
  );
}
