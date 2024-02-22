"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faShareFromSquare,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import {
  faSnapchat,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

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

  function openShareWithInstagram() {
    const modal = document.getElementById("share_modal");
    modal.close();
    // open instagram share
    window.open("https://instagram.com/direct/inbox/", "_blank");
  }

  function openShareWithSnapchat() {
    const modal = document.getElementById("share_modal");
    modal.close();
    // open instagram share
    window.open("https://web.snapchat.com/", "_blank");
  }

  function openShareWithWhatsApp() {
    const modal = document.getElementById("share_modal");
    modal.close();
    // open instagram share
    window.open("https://web.whatsapp.com/", "_blank");
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
              <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
              Email
            </button>
            <button
              className="btn rounded-full ml-2"
              onClick={openShareWithInstagram}
            >
              <FontAwesomeIcon icon={faInstagram} className="mr-1" />
              Instagram
            </button>
            <button
              className="btn rounded-full ml-2"
              onClick={openShareWithSnapchat}
            >
              <FontAwesomeIcon icon={faSnapchat} className="mr-1" />
              Snapchat
            </button>
            <button
              className="btn rounded-full ml-2"
              onClick={openShareWithWhatsApp}
            >
              <FontAwesomeIcon icon={faWhatsapp} className="mr-1" />
              WhatsApp
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
