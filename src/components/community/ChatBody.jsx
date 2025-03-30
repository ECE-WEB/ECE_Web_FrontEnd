/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Avatar } from "@mui/material";
const messages = [
    { id: 1, username: "Alice", role: "Student", avatar: "https://ui-avatars.com/api/?name=Alice", message: "Hey everyone! Excited to be here!", timestamp: "10:30 AM" },
    { id: 2, username: "Kalavakuntla Raj Tharun Kumar Reddy", role: "Faculty", message: "Welcome, Alice! Glad to have you onboard.", timestamp: "10:32 AM" },
    { id: 3, username: "Charlie", role: "Alumni", avatar: "https://ui-avatars.com/api/?name=Charlie", message: "Looking forward to the discussions today!", timestamp: "10:35 AM" },
    { id: 4, username: "Divya Teja", role: "Student", avatar: "https://ui-avatars.com/api/?name=You", message: "This is a sent message styled differently!", timestamp: "10:40 AM", sent: true },
    { id: 5, username: "Ethan", role: "Faculty", avatar: "https://ui-avatars.com/api/?name=Ethan", message: "This is a great platform for knowledge sharing!", timestamp: "10:45 AM" },
    { id: 6, username: "Fiona", role: "Alumni", avatar: "https://ui-avatars.com/api/?name=Fiona", message: "Alumni events are the best! Let’s organize one soon.", timestamp: "10:50 AM" },
    { id: 7, username: "George", role: "Student", message: "Looking forward to connecting with all of you!", timestamp: "10:55 AM" },
    { id: 8, username: "Hannah", role: "Faculty", message: "Always here to help the students grow.", timestamp: "11:00 AM" },
];

const defaultAvatar = "https://via.placeholder.com/40?text=U"; // Default avatar with placeholder text

const ChatBody = ({ chatBodyRef,chatMessages, handleScroll, scrollToBottom, isAtBottom }) => {
  
  useEffect(() => {
    console.log(isAtBottom);
    if (isAtBottom && chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages, isAtBottom]);  
  const roleColors = {
        Student: "#4FC3F7", // Blue
        Faculty: "#9B59B6", // #2ECC71
        Alumni: "#FFC107", // Gold
    };
    const roleBgColors = {
        Student: "rgba(79, 195, 247, 0.1)", // Light blue
        Faculty: "rgba(155, 89, 182, 0.1)", // Light green
        Alumni: "rgba(255, 193, 7, 0.1)",   // Light gold
    };
    return (
      <div
      ref={chatBodyRef}
      onScroll={handleScroll}
      style={{
        position: "relative",
        height: "79vh", // Full height of the container
        overflowY: "auto", // Enable scrolling for ChatBody
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Container
        fluid
        sx={{
          padding: { xs: 0, sm: 0, md: 0, lg: 2 },
        }}
      >
        {chatMessages.map((msg) => (
          <Row
            key={msg.id}
            style={{
              marginBottom: "25px",
              display: "flex",
              justifyContent: msg.sent ? "flex-end" : "flex-start",
            }}
          >
            {/* Sent Messages */}
            {msg.sent ? (
              <Col xs="auto">
                <div
                  style={{
                    backgroundColor: "#E6FFE6",
                    marginLeft:"3.5rem",
                    padding: "15px",
                    borderRadius: "15px",
                    maxWidth: "100%",
                    color: "#004D40",
                    border: "0px solid #004D40",
                    boxShadow: "0 2px 10px rgba(0, 77, 64, 0.3)",
                    textAlign: "left",
                    fontSize: "clamp(0.75rem, 2vw, 0.8rem)", // Dynamically adjusts
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <strong
                      style={{
                        fontSize: "clamp(0.84rem, 2vw,0.89rem)", // Scales based on viewport
                        color: "#333",
                      }}
                    >
                      {msg.username}
                    </strong>
                    <span
                      style={{
                        marginLeft: "10px",
                        padding: "4px 8px",
                        borderRadius: "50px",
                        backgroundColor: "#004D40",
                        fontSize: "clamp(0.65rem, 1.5vw, 0.7rem)", // Scales based on screen
                        color: "#fff",
                      }}
                    >
                      {"You"}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(0.7rem, 1.5vw, 0.75rem)",
                        color: `#004D40`,
                        marginLeft: "auto",
                      }}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontSize: "clamp(0.8rem, 1.7vw, 0.85rem)",
                      color: "#555",
                      textAlign: "left",
                    }}
                  >
                    {msg.message}
                  </p>
                </div>
              </Col>
            ) : (
              <>
                <Col xs={12} style={{ display: "flex", gap: "10px" }}>
                  {/* Avatar */}
                  <Avatar
                    alt={msg.username}
                    sx={{
                      width: {
                        xs: 30,
                        sm: 35,
                        md: 40,
                      },
                      height: {
                        xs: 30,
                        sm: 35,
                        md: 40,
                      },
                      marginTop: "5px",
                      border: `0.14rem solid ${roleColors[msg.role] || "#ccc"}`,
                      fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                      color: `${roleColors[msg.role] || "#ccc"}`,
                      bgcolor: ` ${roleBgColors[msg.role] || "#ccc"}`,
                    }}
                  >
                    {msg.username[0]}
                  </Avatar>
                  {/* Message Card */}
                  <div
                    style={{
                      backgroundColor: ` ${roleBgColors[msg.role] || "#ccc"}`,
                      padding: "10px 15px",
                      borderRadius: "15px",
                      border: `0px solid ${roleColors[msg.role] || "#ccc"}`,
                      boxShadow: `0 2px 10px ${roleColors[msg.role] || "rgba(0,0,0,0.1)"}`,
                      fontSize: "clamp(0.75rem, 2vw, 0.8rem)",
                      maxWidth: "80%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <strong
                        style={{
                          fontSize: "clamp(0.84rem, 2vw, 0.89rem)",
                          color: "#333",
                        }}
                      >
                        {msg.username}
                      </strong>
                      <span
                        style={{
                          marginLeft: "10px",
                          padding: "4px 8px",
                          borderRadius: "50px",
                          backgroundColor: roleColors[msg.role],
                          fontSize: "clamp(0.65rem, 1.5vw, 0.7rem)",
                          color: "#fff",
                        }}
                      >
                        {msg.role}
                      </span>
                      <span
                        style={{
                          fontSize: "clamp(0.7rem, 1.5vw, 0.75rem)",
                          color: `${roleColors[msg.role] || "#ccc"}`,
                          marginLeft: "auto",
                        }}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "10px 0 0",
                        fontSize: "clamp(0.8rem, 1.7vw, 0.85rem)",
                        color: "#555",
                        textAlign: "left",
                      }}
                    >
                      {msg.message}
                    </p>
                  </div>
                </Col>
              </>
            )}
          </Row>
        ))}
      </Container>
      
      {!isAtBottom && (
        <Button
          onClick={scrollToBottom}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1070,
            backgroundColor: "#4A90E2",
            border: "none",
            color: "#ffffff",
            padding: "10px 15px",
            borderRadius: "50px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Go Down
        </Button>
      )}
    </div>
    );
};

export default ChatBody;