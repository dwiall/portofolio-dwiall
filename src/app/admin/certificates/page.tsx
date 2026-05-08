import { db } from "@/lib/db";
import CertificateClient from "./CertificateClient";

export default async function CertificatesPage() {
  const certificates = await db.certificate.findMany({
    orderBy: { year: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Certificates Management</h1>
        <p className="text-muted-foreground">Showcase your certificates and credentials to potential employers.</p>
      </div>
      <CertificateClient initialData={certificates} />
    </div>
  );
}
