"use client";
import React, { useState, useEffect } from "react";
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

import SendToEmail from "./EmailShare";

export default function ShareButton({ description, header, userName, uuid }) {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const [emailAddress, setEmailAddress] = useState("");

  function openExternalShareModal() {
    const modal = document.getElementById("share_external_modal");
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
    if (modal) {
      modal.close();
    }

    const InstagramMessage = `Hello, I would like to share this following itinerary with you. \n\n Trip: ${header} \n\n Posted By: ${userName} \n\n Post Description: ${description}\n\n Link: http://localhost:3000/post/${uuid} \n\n Please feel free to interact and let me know what you think by clicking the link above!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(InstagramMessage).then(
        function () {
          alert(
            "Itinerary details copied to clipboard. You can now paste it in Instagram Direct. Make sure that no popups are blocked."
          );
          window.open("https://instagram.com/direct/inbox/", "_blank");
        },
        function (err) {
          console.error("Could not copy text: ", err);
          alert(
            "Failed to copy itinerary details to clipboard. Please copy it manually."
          );
        }
      );
    } else {
      alert(
        "Clipboard functionality not supported or blocked. Please copy the message manually."
      );
    }
  }

  function openShareWithSnapchat() {
    const modal = document.getElementById("share_modal");
    modal.close();

    const SnapchatMessage = `Hello, I would like to share this following itinerary with you. \n\n Trip: ${header} \n\n Posted By: ${userName} \n\n Post Description: ${description}\n\n Link: http://localhost:3000/post/${uuid} \n\n Please feel free to interact and let me know what you think by clicking the link above!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(SnapchatMessage).then(
        function () {
          alert(
            "Itinerary details copied to clipboard. You can now paste it in Instagram Direct. Make sure that no popups are blocked."
          );
          window.open("https://web.snapchat.com/", "_blank");
        },
        function (err) {
          console.error("Could not copy text: ", err);
          alert(
            "Failed to copy itinerary details to clipboard. Please copy it manually."
          );
        }
      );
    } else {
      alert(
        "Clipboard functionality not supported or blocked. Please copy the message manually."
      );
    }
  }

  function openShareWithWhatsApp() {
    const modal = document.getElementById("share_modal");
    modal.close();

    const WhatsAppMessage = `Hello, I would like to share this following itinerary with you. \n\n Trip: ${header} \n\n Posted By: ${userName} \n\n Post Description: ${description}\n\n Link: http://localhost:3000/post/${uuid} \n\n Please feel free to interact and let me know what you think by clicking the link above!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(WhatsAppMessage).then(
        function () {
          alert(
            "Itinerary details copied to clipboard. You can now paste it in Instagram Direct. Make sure that no popups are blocked."
          );
          window.open("https://web.whatsapp.com/", "_blank");
        },
        function (err) {
          console.error("Could not copy text: ", err);
          alert(
            "Failed to copy itinerary details to clipboard. Please copy it manually."
          );
        }
      );
    } else {
      alert(
        "Clipboard functionality not supported or blocked. Please copy the message manually."
      );
    }
  }

  return (
    <div>
      <div className="tooltip" data-tip="Share">
        <button
          id="sharefromsquare-button"
          className="btn rounded-full"
          onClick={openExternalShareModal}
        >
          <FontAwesomeIcon
            icon={faShareFromSquare}
            style={{ width: "20px", height: "20px" }}
            className="text-white" // change this in the future to app theme
          />
        </button>
      </div>
      <dialog id="share_external_modal" className="modal">
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
              id="instagram"
              className="btn rounded-full ml-2"
              onClick={openShareWithInstagram}
            >
              <FontAwesomeIcon icon={faInstagram} className="mr-1" />
              Instagram
            </button>
            <button
              id="snapchat"
              className="btn rounded-full ml-2"
              onClick={openShareWithSnapchat}
            >
              <FontAwesomeIcon icon={faSnapchat} className="mr-1" />
              Snapchat
            </button>
            <button
              id="whatsapp"
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
              onClick={() =>
                SendToEmail({
                  emailAddress,
                  description,
                  header,
                  userName,
                  uuid,
                })
              }
            >
              Send to Email
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
