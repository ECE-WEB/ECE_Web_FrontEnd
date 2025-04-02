/* eslint-disable no-unused-vars */
import React, { useState, useEffect,useRef } from "react";
import Picker from "emoji-picker-react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import KeyboardIcon from "@mui/icons-material/Keyboard";

const images = import.meta.glob("../../../public/emojis/*.{png,svg}");

const ChatInput = ({ setMessages, messages }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [buttonColor, setButtonColor] = useState("#990404");
    const [fileButtonColor, setFileButtonColor] = useState("#990404");
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [currentEmoji, setCurrentEmoji] = useState("../../../public/emojis/reshot-icon-slightly-smiling-face.svg"); // To handle changing emojis
    const [opacity, setOpacity] = useState(1);
    const textAreaRef = useRef(null); // Ref to control the textarea directly

    const emojiList = Object.keys(images).map((key) => key);

    // Handle dynamic emoji transitions
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

    // Handle sending a message
    const handleSend = () => {
        if (message.trim() || file) {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: prevMessages.length + 1,
                    username: `You`,
                    role: "Student",
                    avatar: `https://ui-avatars.com/api/?name=User${prevMessages.length + 1}`,
                    message: message, // Replace newlines with <br>
                    timestamp: new Date().toLocaleTimeString(),
                    sent: true,
                },
            ]); // Save message to chat
            setMessage(""); // Clear input
            setFile(null); // Clear file
            resetTextArea(); // Reset textarea size
        }
    };
    const adjustHeight = (element) => {
        element.style.height = "20px"; // Reset height to minimum
        element.style.height = `${element.scrollHeight}px`; // Adjust to content height
    };

    // Reset the textarea height
    const resetTextArea = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "20px"; // Reset to default height
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
        <Container fluid style={{ padding: "0rem", backgroundColor: " #fff4e0", borderRadius: "8px", width: "100%", maxWidth: "500px" }}>
            <Row>
                <Col xs={2} sm={2} md={2} lg={2} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0px" }}>

                    <button
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                        style={{
                            alignItems:"flex-end",
                            border: "none",
                            backgroundColor: "transparent",
                            padding: "0rem 0rem",
                            paddingLeft:"1rem",
                            margin: "0.35rem 0.0rem",
                            height: "3rem",
                        }}
                    >
                        {showEmojiPicker ? (
              <KeyboardIcon style={{ fontSize: "36px", color: "#990404" }} />
            ) : (
                        <img src={currentEmoji} style={{
                            maxWidth: "35px",
                            maxHeight: "35px",
                            opacity: opacity, // Dynamic opacity state for fade-in/out
                            transition: "opacity 0.5s ease-in-out", // Smooth transition for fade effect
                        }} />)}
                    </button>
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
                        ref={textAreaRef} // Attach ref to the textarea
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            adjustHeight(e.target);
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
                        onMouseEnter={(e) => setFileButtonColor("#ff4040")} // Hover color
                        onMouseLeave={(e) => setFileButtonColor("#990404")} // Default color 
                        onTouchStart={(e) =>{e.preventDefault(); setFileButtonColor("#ff4040")}} // Hover color
                        onTouchEnd={(e) =>  setFileButtonColor("#990404")} // Default color
                        onClick={(e) => {
                            setFileButtonColor("#cc0404") // Fallback for click
                            setTimeout(() => {
                                setFileButtonColor("#990404") // Reset after click
                            }, 200);
                          }}
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
                            <AttachFileIcon 
                            id="attachIcon"
                            style={{ color:fileButtonColor,padding: "0", }}
                            />
                        </label>
                    </IconButton></Col>
                <Col xs={2} sm={2} md={2} lg={2}
                style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0rem 0.4rem" }}>
                <Button
                   onMouseEnter={(e) => setButtonColor("#ff4040")} // Hover color
                   onMouseLeave={(e) => setButtonColor("#990404")} // Default color 
                   onTouchStart={(e) =>{e.preventDefault(); setButtonColor("#ff4040")}} // Hover color
                   onTouchEnd={(e) =>  setButtonColor("#990404")} // Default color
                   onClick={(e) => {
                    handleSend()
                    setButtonColor("#cc0404") // Fallback for click
                    setTimeout(() => {
                        setButtonColor("#990404") // Reset after click
                    }, 200);
                  }}
                    style={{
                        color: "white",
                        backgroundColor: buttonColor,
                        border: "none",
                        height: "2rem",
                        margin: "0.85rem 0.9rem",
                        marginLeft: "0rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "8px",
                        transition: "background-color 0.2s ease",
                    }}
                >
                 <SendIcon
                onMouseEnter={(e) => setButtonColor("#ff4040")} // Hover color
                onMouseLeave={(e) => setButtonColor("#990404")} // Default color 
                onTouchStart={(e) =>{e.preventDefault(); setButtonColor("#ff4040")}} // Hover color
                onTouchEnd={(e) =>  setButtonColor("#990404")} // Default color
                style={{
                    backgroundColor: buttonColor,
                    transition: "background-color 0.2s ease",}} 
                 
                 />
                </Button></Col>
            </Row>
            {showEmojiPicker && (
        <Row style={{ margin: "0rem", padding: "0rem",width:"100%" }}>
          <Col
            xs={12}
            style={{
                height: "30%",
                
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "0.5rem",
              width: "100%",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <Picker searchDisabled   style={{height:"100%",width:"100%"}} onEmojiClick={onEmojiClick} />
          </Col>
        </Row>
      )}
        </Container>
    );
};

export default ChatInput;
