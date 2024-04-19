import React from "react";

const VideoComponent = () => {
  return (
    <div>
      <div
        style={{
          marginTop: "3rem",
          textAlign: "center",
          marginBottom: "5rem",
        }}
      >
        {/* <h2 className="text-xl mb-5">
          Navigate your way through BluMap by using the tutorial below
        </h2>
        <div className="video-container">
          <iframe
            width="850"
            height="500"
            src="https://www.youtube.com/embed/K4TOrB7at0Y"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div
        style={{
          marginTop: "3rem",
          textAlign: "center",
          marginBottom: "5rem",
        }}
      > */}
        <h2 className="text-xl mb-5">How to make your own personalized trip</h2>
        <div className="video-container">
          <iframe
            width="850"
            height="500"
            src="https://www.youtube.com/embed/EHy3rkIO7fs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div
        style={{
          marginTop: "3rem",
          textAlign: "center",
          marginBottom: "5rem",
        }}
      >
        <h2 className="text-xl mb-5">How to interact with friends on BluMap</h2>
        <div className="video-container">
          <iframe
            width="850"
            height="500"
            src="https://www.youtube.com/embed/_XImtSy52jc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
