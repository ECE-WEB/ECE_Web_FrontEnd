/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Picker from "emoji-picker-react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

const images = import.meta.glob("../../../public/emojis/*.{png,svg}");

const ChatInput = ({ setMessages, messages }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    // const [messages, setMessages] = useState([]); 
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [currentEmoji, setCurrentEmoji] = useState("../../../public/emojis/reshot-icon-slightly-smiling-face.svg"); // To handle changing emojis
    const [opacity, setOpacity] = useState(1);
    
    const emojiList = Object.keys(images).map((key) => key);
    useEffect(() => {
        const interval = setInterval(() => {
            setOpacity(0);
            setTimeout(() => {
                setCurrentEmoji((prevEmoji) => {
                    const currentIndex = emojiList.indexOf(prevEmoji);
                    const nextIndex = (currentIndex + 1) % emojiList.length;
                    return emojiList[nextIndex];
                });
                setOpacity(1);
            }, 500);
        }, 3500);
        return () => clearInterval(interval);
    }, []);
    const handleSend = () => {
        if (message.trim() || file) {
            console.log("Message Sent:", message);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                  id: prevMessages.length + 1,
                  username: `You`,
                  role: "Student",
                  avatar: `https://ui-avatars.com/api/?name=User${prevMessages.length + 1}`,
                  message: message,
                  timestamp: new Date().toLocaleTimeString(),
                  sent:true,
                },
              ]);// Save message to chat
            // setMessages([...messages, { text: message, file }]);
            // setMessage(""); // Clear input
            // setFile(null); // Clear file
        }
    };
    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
        console.log("File Uploaded:", event.target.files[0]);
    };
    const onEmojiClick = (emojiObject) => {
        if (emojiObject && emojiObject.emoji) {
            setMessage((prev) => prev + emojiObject.emoji);
        } else {
            console.error("Invalid emoji object received!");
        }
    };
    return (
        <Container style={{ padding: "0.4rem", backgroundColor: "#f8f9fa", borderRadius: "8px", width: "100%", maxWidth: "500px" }}>
            <Row>
                <Col xs={2} sm={2} md={2} lg={2} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0px" }}>

                    <button
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                        style={{
                            border: "none",
                            backgroundColor: "transparent",
                            padding: "0rem 0rem",
                            margin: "0.35rem 0.0rem",
                            height: "3rem",
                        }}
                    >
                        <img src={currentEmoji} style={{
                            maxWidth: "38px",
                            maxHeight: "38px",
                            opacity: opacity, // Dynamic opacity state for fade-in/out
                            transition: "opacity 0.5s ease-in-out", // Smooth transition for fade effect
                        }} />
                    </button>
                    {showEmojiPicker && (
                        <div style={{ position: "absolute", bottom: "40px", zIndex: 10 }}>
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </Col>
                <Col
                    xs={7} sm={7} md={7} lg={7}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        border: "none",
                        padding: "0px",
                    }}
                >
                    <Form.Control
                        as="textarea"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            e.target.style.height = "20px"; // Reset height
                            e.target.style.height = `${(e.target.scrollHeight)}px`; // Apply dynamic height while respecting minHeight
                        }}
                        style={{
                            margin: "0.7rem 0.0rem",
                            width: "95%",
                            backgroundColor: "#ffffff",
                            borderRadius: "10px",
                            border: "none", // Make it borderless
                            boxShadow: "none",
                            height: "20px", // Remove focus outline// Define minimum height explicitly
                            maxHeight: "150px", // Define maximum height for multiline
                            overflowY: "auto", // Add scrollbar for large content
                            resize: "none", // Prevent user resizing
                        }}
                    />
                </Col>
                <Col xs={1} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0rem" }}>
                    <IconButton title="Attach File or Image"
                        style={{
                            padding: "0rem 0.5rem",
                            margin: "0.45rem 0rem",
                            height: "3rem",
                        }} >
                        <label style={{ cursor: "pointer", marginBottom: "0" }}>
                            <input
                                type="file"
                                onChange={(e) => console.log("File Uploaded:", e.target.files[0])}
                                style={{ display: "none" }}
                            />
                            <AttachFileIcon color="primary" style={{ padding: "0", }} />
                        </label>
                    </IconButton></Col>
                <Col xs={2} sm={2} md={2} lg={2} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0rem 0.4rem" }}><Button
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
                </Button></Col>
            </Row>
        </Container>
    );
};

export default ChatInput;