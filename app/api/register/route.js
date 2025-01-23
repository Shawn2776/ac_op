import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const encryptionKey = process.env.ENCRYPTION_KEY; // Must be 32 bytes
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(encryptionKey),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

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
      addrState,
      zipCode,
      primaryPhoneNumber, // Correct mapping for phone
      driversLicenseNumber, // Correct mapping for driver's license
      birthDate,
      expirationDate,
      emailSpecials, // Correct mapping for email specials
      dlState, // Correct mapping for issuing state
      termsAccepted, // Explicitly map termsAccepted
    } = await req.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Encrypt the DL number
    const encryptedDL = encrypt(driversLicenseNumber);

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

    const termsAcceptedDate = new Date();

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      streetAddress1,
      streetAddress2,
      city,
      addrState,
      zipCode,
      primaryPhoneNumber,
      driversLicenseNumber: encryptedDL,
      birthDate,
      expirationDate,
      dlState,
      termsAccepted,
      termsAcceptedDate,
      emailSpecials,
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
