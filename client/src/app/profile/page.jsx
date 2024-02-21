"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { sendToEmail } from "./email-share";

export default function Page() {
  const [emailAddress, setEmailAddress] = useState("");

  function openShareModal() {
    const modal = document.getElementById("share_modal");
    modal.showModal();
  }

  function openShareWitHEmail() {
    const modal = document.getElementById("share_modal");
    modal.close();
    const emailModal = document.getElementById("share_email_modal");
    emailModal.showModal();
  }

  return (
    <div>
      <button className="btn rounded-full" onClick={openShareModal}>
        <FontAwesomeIcon
          icon={faShareFromSquare}
          style={{ width: "20px", height: "20px" }}
          className="text-white" // change this in the future to app theme
        />
      </button>
      <dialog id="share_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Share Itinerary</h3>
          <p className="py-4">
            <button className="btn rounded-full" onClick={openShareWitHEmail}>
              Email
            </button>
          </p>
        </div>
      </dialog>
      <dialog id="share_email_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Share Itinerary with Email</h3>
          <div className="py-5">
            <p className="pb-3">
              Click the button below to send the itinerary to an email.
            </p>
            <button
              className="btn rounded-full"
              onClick={() => sendToEmail(emailAddress)}
            >
              Send to Email
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
