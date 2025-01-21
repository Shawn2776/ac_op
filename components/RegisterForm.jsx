"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  const [error, setError] = useState("");
  const [emailInUse, setEmailInUse] = useState(false);
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

  const handleProfileValidation = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !confirmEmail ||
      email !== confirmEmail ||
      !password ||
      password !== confirmPassword
    ) {
      setError(
        "Please complete all fields and ensure emails and passwords match."
      );
      return;
    }

    try {
      const res = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await res.json();
      if (user) {
        setEmailInUse(true);
        return;
      }

      unlockSection(2);
    } catch (error) {
      console.error("Error during email check:", error);
    }
  };

  const handleContactValidation = () => {
    if (!street1 || !city || !state || !zipCode || !primaryPhone) {
      setError("Please complete all required fields.");
      return;
    }
    unlockSection(3);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (
      !driversLicense ||
      !birthDate ||
      !state ||
      !expirationDate ||
      !street1 ||
      !city ||
      !zipCode ||
      !primaryPhone ||
      !countryOfResidence ||
      !termsAccepted
    ) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          termsAccepted,
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
        router.push("/success"); // Redirect on success
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

  const handleModalClose = () => {
    setEmailInUse(false);
    setEmail("");
    setConfirmEmail("");
  };

  const handleSignInRedirect = () => {
    router.push(`/signIn?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="bg-lightGray min-h-screen flex justify-center max-w-7xl">
      <div className="bg-coolWhite shadow-md rounded-lg p-8 w-full max-w-full">
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
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div className="flex justify-start mt-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleProfileValidation}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div
            className={`collapse collapse-arrow border ${
              currentSection === 2 ? "collapse-open" : ""
            }`}
          >
            <div
              className="collapse-title text-lg font-medium cursor-pointer"
              onClick={() =>
                unlockedSections.includes(2) && setCurrentSection(2)
              }
            >
              Contact Details
            </div>
            <div className="collapse-content space-y-4">
              <input
                type="text"
                placeholder="Street Address 1"
                className="input input-bordered w-full"
                value={street1}
                onChange={(e) => setStreet1(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Street Address 2 (Optional)"
                className="input input-bordered w-full"
                value={street2}
                onChange={(e) => setStreet2(e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="input input-bordered w-full"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  className="input input-bordered w-full"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="input input-bordered w-full"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Primary Phone Number"
                  className="input input-bordered w-full"
                  value={primaryPhone}
                  onChange={(e) => setPrimaryPhone(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-start mt-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleContactValidation}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Driver's License Section */}
          <div
            className={`collapse collapse-arrow border ${
              currentSection === 3 ? "collapse-open" : ""
            }`}
          >
            <div
              className="collapse-title text-lg font-medium cursor-pointer"
              onClick={() =>
                unlockedSections.includes(3) && setCurrentSection(3)
              }
            >
              Driver&apos;s License Details
            </div>
            <div className="collapse-content space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Birthdate
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Issuing State
                </label>
                <select
                  className="select select-bordered w-full"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select your state
                  </option>
                  {[
                    "Alabama",
                    "Alaska",
                    "Arizona",
                    "Arkansas",
                    "California",
                    "Colorado",
                    "Connecticut",
                    "Delaware",
                    "Florida",
                    "Georgia",
                    "Hawaii",
                    "Idaho",
                    "Illinois",
                    "Indiana",
                    "Iowa",
                    "Kansas",
                    "Kentucky",
                    "Louisiana",
                    "Maine",
                    "Maryland",
                    "Massachusetts",
                    "Michigan",
                    "Minnesota",
                    "Mississippi",
                    "Missouri",
                    "Montana",
                    "Nebraska",
                    "Nevada",
                    "New Hampshire",
                    "New Jersey",
                    "New Mexico",
                    "New York",
                    "North Carolina",
                    "North Dakota",
                    "Ohio",
                    "Oklahoma",
                    "Oregon",
                    "Pennsylvania",
                    "Rhode Island",
                    "South Carolina",
                    "South Dakota",
                    "Tennessee",
                    "Texas",
                    "Utah",
                    "Vermont",
                    "Virginia",
                    "Washington",
                    "West Virginia",
                    "Wisconsin",
                    "Wyoming",
                  ].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Driver's License Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your driver's license number"
                  className="input input-bordered w-full"
                  value={driversLicense}
                  onChange={(e) => setDriversLicense(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiration Date
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country of Residence
                </label>
                <select
                  className="select select-bordered w-full"
                  value={countryOfResidence}
                  onChange={(e) => setCountryOfResidence(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                </select>
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
                  I accept the{" "}
                  <Link href="/terms" className="text-blue-500 underline">
                    Terms and Conditions
                  </Link>
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

        {/* Modal */}
        {emailInUse && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-error">
                Email Already In Use
              </h3>
              <p className="py-4">
                We’ve found an existing account with the same email address.
              </p>
              <div className="modal-action">
                <button
                  className="btn btn-secondary"
                  onClick={handleModalClose}
                >
                  Back to Enroll
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSignInRedirect}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm text-center mt-4">{error}</div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
