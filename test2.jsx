"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [driversLicense, setDriversLicense] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailSpecials, setEmailSpecials] = useState(true); // Checked by default
  const [error, setError] = useState("");
  const [currentSection, setCurrentSection] = useState(1);
  const [unlockedSections, setUnlockedSections] = useState([1]);

  const router = useRouter();

  const unlockSection = (sectionNumber) => {
    if (!unlockedSections.includes(sectionNumber)) {
      setUnlockedSections([...unlockedSections, sectionNumber]);
    }
    setCurrentSection(sectionNumber);
    setError("");
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setError("You must accept the Terms & Conditions.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          termsAccepted,
          emailSpecials,
          streetAddress1: street1,
          streetAddress2: street2,
          city,
          state,
          zipCode,
          countryOfResidence,
          primaryPhoneNumber: primaryPhone,
          driversLicenseNumber: driversLicense,
          birthDate,
          expirationDate,
          issuingState: state,
        }),
      });

      if (res.ok) {
        const { message } = await res.json();
        console.log(message);
        router.push("/success");
      } else {
        const { message } = await res.json();
        setError(message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(
        "An error occurred while creating your account. Please try again."
      );
    }
  };

  return (
    <div className="bg-lightGray min-h-screen flex justify-center max-w-7xl">
      <div className="bg-coolWhite shadow-md rounded-lg p-8 w-full max-w-full">
        <div className="text-center my-6">
          <h1 className="text-primary text-3xl font-bold">
            Enroll in the NIC Adventure Center
          </h1>
          <p className="text-neutral mb-6">
            Join the adventure! Fill out the form below to start your journey.
          </p>
        </div>
        <form className="space-y-6">
          {/* My Profile Section */}
          <div
            className={`collapse collapse-arrow border ${
              currentSection === 1 ? "collapse-open" : ""
            }`}
          >
            <div
              className="collapse-title text-lg font-medium cursor-pointer"
              onClick={() =>
                unlockedSections.includes(1) && setCurrentSection(1)
              }
            >
              My Profile
            </div>
            <div className="collapse-content space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Confirm Email"
                className="input input-bordered w-full"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-2 top-2 text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="input input-bordered w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-2 top-2 text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="flex justify-start mt-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => unlockSection(2)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div
            className={`collapse collapse-arrow border ${
              currentSection === 4 ? "collapse-open" : ""
            }`}
          >
            <div
              className="collapse-title text-lg font-medium cursor-pointer"
              onClick={() =>
                unlockedSections.includes(4) && setCurrentSection(4)
              }
            >
              Preferences
            </div>
            <div className="collapse-content space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={emailSpecials}
                  onChange={(e) => setEmailSpecials(e.target.checked)}
                />
                <span className="ml-2 text-sm">
                  Sign up for NIC Adventure Center Email Specials. By checking
                  this box, you agree to receive tailored emails. You can
                  unsubscribe at any time. Please read our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-blue-500 underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
                <span className="ml-2 text-sm">
                  I have read and accept the{" "}
                  <Link href="/terms" className="text-blue-500 underline">
                    Terms & Conditions
                  </Link>
                  .
                </span>
              </div>

              <div className="flex justify-start mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleFinalSubmit}
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </form>

        {error && (
          <div className="text-red-500 text-sm text-center mt-4">{error}</div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
