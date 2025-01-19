import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();

    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: `Welcome, ${name}!` }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "An error occurred registering your account. Please try again.",
      },
      { status: 500 }
    );
  }
}
