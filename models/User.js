import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Personal Information
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    termsAccepted: { type: Boolean, required: true },
    termsAcceptedDate: { type: Date, required: true }, // Date terms were accepted
    emailSpecials: { type: Boolean, default: true }, // Default to true for email specials

    // Address Information
    streetAddress1: { type: String, required: true },
    streetAddress2: { type: String },
    city: { type: String, required: true },
    addrState: { type: String, required: true },
    zipCode: { type: String, required: true },

    // Contact Information
    primaryPhoneNumber: { type: String, required: true },

    // Driver's License Information
    driversLicenseNumber: { type: String, required: true },
    birthDate: { type: Date, required: true },
    expirationDate: { type: Date, required: true },
    dlState: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
