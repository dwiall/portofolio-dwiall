import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Check if any user already exists to prevent open registration
    const existingUser = await db.user.findFirst();
    if (existingUser) {
      return NextResponse.json({ error: "Admin already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, user: { email: user.email } });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
export async function GET() {
  return NextResponse.json({
    message: "This is a setup endpoint. Please send a POST request with 'name', 'email', and 'password' to create the initial admin user.",
    method_required: "POST",
    example_body: {
      name: "Admin",
      email: "admin@example.com",
      password: "securepassword123"
    }
  });
}
