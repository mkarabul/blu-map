import React from "react";
import Footer from "./components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow font-serif" style={{ overflowY: "auto" }}>
        <div className="container py-5 px-8 max-w-full flex flex-wrap md:flex-nowrap justify-center mx-auto gap-16 content-center items-center">
          {/* Left Section */}
          <div className="left text-4xl flex flex-col justify-center">
            <h1 className="text-6xl mt-6">
              Plan Your Next Daily <br /> Trip In A Few Steps
            </h1>

            <div className="flex items-center mt-16">
              <FontAwesomeIcon
                icon={faLocationDot}
                style={{ width: "50px", height: "50px" }}
                className="text-white"
              />
              <div className="ml-4">
                <p className="text-2xl font-bold">Choose Destination</p>
                <p className="text-xl">
                  Choose the date and the destination you want to make a trip
                  to.
                </p>
              </div>
            </div>

            <div className="flex items-center mt-16">
              <FontAwesomeIcon
                icon={faPersonHiking}
                style={{ width: "50px", height: "50px" }}
                className="text-white"
              />
              <div className="ml-4">
                <p className="text-2xl font-bold">Choose Activities</p>
                <p className="text-xl">
                  Choose activities you want to do or places you want to visit
                  and when.
                </p>
              </div>
            </div>

            <div className="flex items-center mt-16">
              <FontAwesomeIcon
                icon={faCar}
                style={{ width: "50px", height: "50px" }}
                className="text-white"
              />
              <div className="ml-4">
                <p className="text-2xl font-bold">Get a Complete Trip</p>
                <p className="text-xl">
                  Get a complete trip timeline as well as options and
                  recommendations to optimize or design the trip.
                </p>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div
            className="right text-4xl justify-center"
            style={{ minWidth: "300px" }}
          >
            <img
              src="/landing_page_trip.png"
              alt="Sample Trip"
              style={{
                width: "300px",
                height: "350px",
                borderRadius: "25px",
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
