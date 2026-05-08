import { db } from "@/lib/db";
import HeroSettingsClient from "./HeroSettingsClient";

export const dynamic = "force-dynamic";


export default async function HeroSettingsPage() {
  const hero = await db.hero.findFirst();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Hero Settings</h1>
        <p className="text-muted-foreground">Update your hero section and showcase your best self to the world.</p>
      </div>
      <HeroSettingsClient 
        key={hero?.id || "new-hero"} 
        initialData={hero} 
      />
    </div>
  );
}
