import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    // Parse request body
    const {
      firstName,
      lastName,
      email,
      password,
      streetAddress1, // Correct mapping for address fields
      streetAddress2,
      city,
      state,
      zipCode,
      countryOfResidence,
      primaryPhoneNumber, // Correct mapping for phone
      driversLicenseNumber, // Correct mapping for driver's license
      birthDate,
      expirationDate,
      issuingState, // Correct mapping for issuing state
      termsAccepted, // Explicitly map termsAccepted
    } = await req.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to MongoDB
    await connectMongoDB();

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email already exists." },
        { status: 400 }
      );
    }

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      streetAddress1,
      streetAddress2,
      city,
      state,
      zipCode,
      countryOfResidence,
      primaryPhoneNumber,
      driversLicenseNumber,
      birthDate,
      expirationDate,
      issuingState,
      termsAccepted,
    });

    return NextResponse.json(
      { message: `Welcome, ${newUser.firstName}!` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      {
        message:
          "An error occurred registering your account. Please try again.",
      },
      { status: 500 }
    );
  }
}
