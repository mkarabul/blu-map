"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  function openShareModal() {
    const modal = document.getElementById("share_modal");
    modal.showModal();
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
            <button className="btn rounded-full">Share with Email</button>
          </p>
        </div>
      </dialog>
    </div>
  );
}
