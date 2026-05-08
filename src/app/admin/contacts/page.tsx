import { db } from "@/lib/db";
import ContactClient from "./ContactClient";

export default async function ContactsPage() {
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Messages</h1>
        <p className="text-muted-foreground">Messages from your visitors</p>
      </div>
      <ContactClient initialData={messages} />
    </div>
  );
}
