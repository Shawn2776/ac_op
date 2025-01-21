"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [emailInUse, setEmailInUse] = useState(false); // Modal state
  const [currentSection, setCurrentSection] = useState(1); // Tracks current section
  const [unlockedSections, setUnlockedSections] = useState([1]); // Tracks unlocked sections

  const router = useRouter();

  const handleEmailCheck = async () => {
    if (!email || !confirmEmail || email !== confirmEmail) {
      setError("Please enter matching email addresses.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();
      if (user) {
        setEmailInUse(true); // Trigger modal
        return;
      }

      // Unlock next section and move forward
      unlockSection(2);
    } catch (error) {
      console.error("Error during email check:", error);
    }
  };

  const handleContactDetailsValidation = () => {
    if (!name) {
      setError("Please provide your full name.");
      return;
    }

    unlockSection(3);
  };

  const unlockSection = (sectionNumber) => {
    if (!unlockedSections.includes(sectionNumber)) {
      setUnlockedSections([...unlockedSections, sectionNumber]);
    }
    setCurrentSection(sectionNumber);
    setError(""); // Clear error messages
  };

  const handleModalClose = () => {
    setEmailInUse(false); // Close modal
    setEmail(""); // Clear email fields
    setConfirmEmail("");
  };

  const handleSignInRedirect = () => {
    // Redirect to sign-in page with email prefilled
    router.push(`/signIn?email=${encodeURIComponent(email)}`);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log("Registration successful!");
    // Add registration API call here
  };

  return (
    <div className="bg-lightGray min-h-screen flex justify-center items-center">
      <div className="bg-coolWhite shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-primary text-3xl font-bold mb-6">
          Enroll in the NIC Adventure Center
        </h1>
        <p className="text-neutral mb-6">
          Join the adventure! Fill out the form below to start your journey.
        </p>

        <form className="space-y-4">
          {/* My Profile Section */}
          <div
            className={`collapse collapse-arrow bg-lightGray rounded-box ${
              currentSection === 1 ? "collapse-open" : ""
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              disabled={!unlockedSections.includes(1)}
            />
            <div
              className="collapse-title text-xl font-medium cursor-pointer"
              onClick={() =>
                unlockedSections.includes(1) && setCurrentSection(1)
              }
            >
              My Profile
            </div>
            <div className="collapse-content space-y-4">
              <div>
                <label className="block text-neutral font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-neutral font-medium mb-1">
                  Confirm Email
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Confirm Email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end w-full">
                <button
                  type="button"
                  className="btn btn-accent mt-4"
                  onClick={handleEmailCheck}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div
            className={`collapse collapse-arrow bg-lightGray rounded-box ${
              currentSection === 2 ? "collapse-open" : ""
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              disabled={!unlockedSections.includes(2)}
            />
            <div
              className="collapse-title text-xl font-medium cursor-pointer"
              onClick={() =>
                unlockedSections.includes(2) && setCurrentSection(2)
              }
            >
              Contact Details
            </div>
            <div className="collapse-content space-y-4">
              <label className="block text-neutral font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-accent mt-4"
                onClick={handleContactDetailsValidation}
              >
                Continue
              </button>
            </div>
          </div>

          {/* Driver's License Details Section */}
          <div
            className={`collapse collapse-arrow bg-lightGray rounded-box ${
              currentSection === 3 ? "collapse-open" : ""
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              disabled={!unlockedSections.includes(3)}
            />
            <div
              className="collapse-title text-xl font-medium cursor-pointer"
              onClick={() =>
                unlockedSections.includes(3) && setCurrentSection(3)
              }
            >
              Driver&apos;s License Details
            </div>
            <div className="collapse-content space-y-4">
              <p>Driver&apos;s license details go here...</p>
              <button
                type="submit"
                className="btn btn-primary mt-4 w-full"
                onClick={handleFinalSubmit}
              >
                Create Account
              </button>
            </div>
          </div>
        </form>

        {/* Modal for Email Already In Use */}
        {emailInUse && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-error">
                Email Already In Use
              </h3>
              <p className="py-4">
                We’ve found an existing NIC Adventure Center account with the
                same email address as you provided. Please sign into your
                account or try again with a different email address.
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
