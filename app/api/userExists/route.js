import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Parse the incoming request
    const { email } = await req.json();

    // Check if a user with the given email exists
    const user = await User.findOne({ email }).select("_id");
    console.log("User exists: ", Boolean(user)); // Debug log

    // Return a response indicating whether the user exists
    return NextResponse.json({ user: Boolean(user) }); // Explicitly return true/false
  } catch (error) {
    console.error("Error in userExists:", error);
    return NextResponse.json(
      {
        message:
          "An error occurred checking if the user exists. Please try again.",
      },
      { status: 500 }
    );
  }
}
