"use client"
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function EmailVerificationButton({ icon, header, context }) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [verificationStep, setVerificationStep] = useState("email");
  const [verificationCode, setVerificationCode] = useState("");
  const [serverVerificationCode, setServerVerificationCode] = useState("");
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);

  useEffect(() => {
    if (user?.sub) {
      checkVerificationStatus();
    }
  }, [user?.sub]);

  const checkVerificationStatus = async () => {
    try {
      const url = `/api/admin/${user?.sub}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to check verification status.");
      }
      const data = await response.json();
      setIsAlreadyVerified(data.isVerified);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const openPopup = () => {
    setIsOpen(true);
    if (user?.sub) {
      checkVerificationStatus();
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
    setVerificationStep("email");
    setVerificationCode("");
    setServerVerificationCode("");
  };

  const handleSendVerificationEmail = async () => {
    try {
      const email = user?.email;
      let url = "/api/vertification/verify/";
      url = url + email;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json(); 
        setServerVerificationCode(data.verificationCode);
        alert("Verification email sent to: " + user?.email);
        setVerificationStep("code");
      } else {
        throw new Error("Failed to fetch verification code");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const checkVerificationCode = () => {
    if (verificationCode === serverVerificationCode) {
      handleVerifyCode();
    } else {
      alert("Verification code is incorrect.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const url = `/api/users/verification/${user?.sub}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isVerified: true })
      });

      if (!response.ok) {
        throw new Error("Failed to verify code. Please try again later.");
      }
      alert("Verification code is correct! Your email is now verified.");
      closeDialog();
    } catch (error) {
      alert("Error verifying code: " + error.message);
    }
  };

  return (
    <div className="mb-4">
      <div className="block border p-2 rounded-lg shadow hover:bg-gray-600 transition duration-150 ease-in-out cursor-pointer" onClick={openPopup}>
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon icon={icon} style={{ width: "50px", height: "50px" }} />
          <div>
            <h2 className="text-xl font-medium mb-1">{header}</h2>
            <h1 className="text-l font-medium">{context}</h1>
          </div>
        </div>
      </div>

      {isOpen && (
        <dialog open className="modal" style={{ overflow: "auto" }}>
          <div className="modal-box" style={{ width: "80vw", maxWidth: "550px", height: "auto", maxHeight: "80vh" }}>
            <button type="button" onClick={closeDialog} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
            {isAlreadyVerified ? (
              <div>
                <h3 className="text-lg font-medium mb-4">Your email is already verified.</h3>
              </div>
            ) : verificationStep === "email" ? (
              <>
                <h3 className="text-lg font-medium mb-4">Verify Your Email Address</h3>
                <p>Your email: {user?.email}</p>
                <div className="mt-4">
                  <button type="button" className="btn btn-primary" onClick={handleSendVerificationEmail}>Send Verification Email</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium mb-4">Enter Verification Code</h3>
                <input type="text" placeholder="6-digit code" maxLength="6" className="input input-bordered w-full max-w-xs" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                <div className="mt-4">
                  <button type="button" className="btn btn-primary" onClick={checkVerificationCode}>Verify Code</button>
                </div>
              </>
            )}
          </div>
        </dialog>
      )}
    </div>
  );
}
