import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CertificatesGrid } from "@/components/sections/CertificatesGrid";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AllCertificatesPage() {
  const heroData = await db.hero.findFirst();
  const certificates = await db.certificate.findMany({
    orderBy: { year: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={heroData?.name} image={heroData?.image} />
      <main className="flex-grow pt-32 pb-20">
        <div className="container px-4 md:px-6 mx-auto mb-12">
          <Link href="/">
            <Button variant="ghost" className="mb-8 hover:bg-primary/10 hover:text-primary transition-all">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter">
              My <span className="text-primary">Certificates</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A collection of certifications and recognition I have earned throughout my professional journey.
            </p>
          </div>
        </div>
        
        <CertificatesGrid certificates={certificates} />
      </main>
      <Footer name={heroData?.name} image={heroData?.image} />
    </div>
  );
}
