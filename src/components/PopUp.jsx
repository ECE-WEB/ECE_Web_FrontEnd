/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const PopupWithBlur = ({message,onSave,onDiscard}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSave = () => {
    onSave();
    
    setIsOpen(false);
  };

  const handleDiscard = () => {
    onDiscard();
   
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(5px)", // Blurred background
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1070,
          }}
        >
          <div
            style={{
              width: "80%",
              maxWidth: "400px",
              maxHeight: "400px",
              backgroundColor: " #fff4e0", // #d6ffe7
              padding: "1rem",
              borderRadius: "10px",
              alignContent: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#333" }}>
              {message}
            </p>
            <div>
              <button
                onClick={handleSave}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#fda129",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "0.5rem",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={handleDiscard}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#c0392b",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupWithBlur;