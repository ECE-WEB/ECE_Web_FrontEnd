/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Picker from "emoji-picker-react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

// ✅ List of emoji image paths stored in `public/emojis`
const emojiList = [
  "/emojis/reshot-icon-slightly-smiling-face.svg",
  "/emojis/reshot-icon-face-with-raised-eyebrow.svg",
  "/emojis/reshot-icon-beaming-face-with-smiling-eyes.svg",
  "/emojis/reshot-icon-sleeping-face.svg",
  "/reshot-icon-smile.svg",
  "/emojis/reshot-icon-rolling-on-the-floor-laughing.svg",
];

const ChatInput = ({ setMessages, messages }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [currentEmoji, setCurrentEmoji] = useState(emojiList[0]);
  const [opacity, setOpacity] = useState(1);

  // ✅ Rotate emoji every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentEmoji((prev) => {
          const index = emojiList.indexOf(prev);
          return emojiList[(index + 1) % emojiList.length];
        });
        setOpacity(1);
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (message.trim() || file) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          username: "You",
          role: "Student",
          avatar: `https://ui-avatars.com/api/?name=User${prev.length + 1}`,
          message: message,
          timestamp: new Date().toLocaleTimeString(),
          sent: true,
        },
      ]);
      setMessage("");
      setFile(null);
    }
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    console.log("File Uploaded:", event.target.files[0]);
  };

  const onEmojiClick = (emojiObject) => {
    if (emojiObject && emojiObject.emoji) {
      setMessage((prev) => prev + emojiObject.emoji);
    }
  };

  return (
    <Container
      style={{
        padding: "0.4rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <Row>
        {/* Emoji Button */}
        <Col xs={2} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0px" }}>
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            style={{
              border: "none",
              backgroundColor: "transparent",
              padding: "0rem",
              margin: "0.35rem 0rem",
              height: "3rem",
            }}
          >
            <img
              src={currentEmoji}
              alt="emoji"
              style={{
                maxWidth: "38px",
                maxHeight: "38px",
                opacity: opacity,
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          </button>
          {showEmojiPicker && (
            <div style={{ position: "absolute", bottom: "40px", zIndex: 10 }}>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </Col>

        {/* Message Input */}
        <Col xs={7} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0px" }}>
          <Form.Control
            as="textarea"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              e.target.style.height = "20px";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            style={{
              margin: "0.7rem 0rem",
              width: "95%",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              border: "none",
              boxShadow: "none",
              height: "20px",
              maxHeight: "150px",
              overflowY: "auto",
              resize: "none",
            }}
          />
        </Col>

        {/* Attach File Button */}
        <Col xs={1} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0" }}>
          <IconButton title="Attach File or Image" style={{ padding: "0 0.5rem", margin: "0.45rem 0", height: "3rem" }}>
            <label style={{ cursor: "pointer", marginBottom: "0" }}>
              <input type="file" onChange={handleFileUpload} style={{ display: "none" }} />
              <AttachFileIcon color="primary" />
            </label>
          </IconButton>
        </Col>

        {/* Send Button */}
        <Col xs={2} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0rem 0.4rem" }}>
          <Button
            variant="primary"
            onClick={handleSend}
            style={{
              height: "2rem",
              margin: "0.85rem 0.9rem",
              marginLeft: "0rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <SendIcon />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatInput;
