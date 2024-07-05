import React, { useState } from "react";
import Modal from "react-modal";
import ReactPlayer from "react-player";

const VideoModal = ({ isOpen, onClose }) => {
  const crossIcon = require("../../Assets/cross_icon.png");
  const videoUrl = require("../../Assets/asin_guide.mp4");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "none", // Remove border
          borderRadius: "20px", // Add border-radius
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow
          maxWidth: "1000%", // Set maximum width
          maxHeight: "100%", // Set maximum height
          overflow: "hidden", // Hide overflow
          backgroundColor: "#f0f0f0", // Background color
          padding: "0", // Remove padding
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      contentLabel="Guide Video"
    >
      <div className="cursor-pointer">
        <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
        <img
          className="absolute top-0 right-4 m-4 p-2 hover:transform hover:scale-110 w-[30px] h-[30px] rounded-full bg-gray-200 bg-opacity-75"
          src={crossIcon}
          onClick={onClose}
        />
      </div>
    </Modal>
  );
};
export default VideoModal;
