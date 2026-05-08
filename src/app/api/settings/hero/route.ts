import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const hero = await db.hero.findFirst();
    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const body = await req.json();
    const { name, role, description, image, cv } = body;

    // Basic validation
    if (!name || !role || !description) {
      return NextResponse.json({ error: "Name, Role, and Description are required" }, { status: 400 });
    }

    const existingHero = await db.hero.findFirst();

    let hero;
    if (existingHero) {
      hero = await db.hero.update({
        where: { id: existingHero.id },
        data: {
          name,
          role,
          description,
          image: image || null,
          cv: cv || null,
        },
      });
    } else {
      hero = await db.hero.create({
        data: {
          name,
          role,
          description,
          image: image || null,
          cv: cv || null,
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/admin/settings/hero");
    
    return NextResponse.json({ 
      success: true, 
      message: "Settings saved successfully",
      data: hero 
    });
  } catch (error: any) {
    console.error("HERO_UPDATE_ERROR", error);
    return NextResponse.json({ 
      error: "Failed to save settings", 
      details: error.message 
    }, { status: 500 });
  }
}
