import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  // Personal Information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  termsAccepted: { type: Boolean, required: true },

  // Address Information
  streetAddress1: { type: String, required: true },
  streetAddress2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },

  // Contact Information
  primaryPhoneNumber: { type: String, required: true },

  // Driver's License Information
  driversLicenseNumber: { type: String, required: true },
  birthDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  issuingState: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
