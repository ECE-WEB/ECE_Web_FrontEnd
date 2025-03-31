/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Avatar } from "@mui/material";

const ChatBody = ({ chatBodyRef, chatMessages, handleScroll, scrollToBottom, isAtBottom }) => {
  useEffect(() => {
    if (isAtBottom && chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages, isAtBottom]);

  const roleColors = {
    Student: "#4FC3F7",  // blue
    Faculty: "#9B59B6",  // purple
    Alumni: "#FFC107",   // yellow
  };

  const roleBgColors = {
    Student: "#E0F7FA",  // light blue
    Faculty: "#F3E5F5",  // light purple
    Alumni: "#FFF8E1",   // light yellow
  };

  return (
    <div
      ref={chatBodyRef}
      onScroll={handleScroll}
      style={{
        position: "relative",
        height: "79vh",
        overflowY: "auto",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Container fluid>
        {chatMessages.map((msg) => {
          const isSent = msg.sent;
          const roleColor = roleColors[msg.role] || "#999";
          const bgColor = roleBgColors[msg.role] || "#eee";

          return (
            <Row
              key={msg.id}
              className="mb-4"
              style={{
                justifyContent: isSent ? "flex-end" : "flex-start",
                paddingLeft: isSent ? 0 : "5px",
                paddingRight: isSent ? "5px" : 0,
              }}
            >
              {!isSent && (
                <Col xs="auto" className="pe-1">
                  <Avatar
                    sx={{
                      bgcolor: "#ffffff",
                      color: roleColor,
                      border: `3px solid ${roleColor}`,
                      width: 36,
                      height: 36,
                      fontSize: "0.8rem",
                    }}
                  >
                    {msg.username?.charAt(0)}
                  </Avatar>
                </Col>
              )}

              <Col xs="auto" style={{ maxWidth: "85%" }}>
                <div
                  style={{
                    backgroundColor: isSent ? "#f2f2f2" : bgColor,
                    borderRadius: "16px",
                    boxShadow: `0 4px 10px ${isSent ? "rgba(0,0,0,0.1)" : roleColor}`,
                    padding: "15px",
                    minWidth: "220px",
                    maxWidth: "100%",
                  }}
                >
                  {/* Header (Username, Role Badge, Time) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "6px",
                    }}
                  >
                    <strong
                      style={{
                        fontSize: "0.9rem",
                        color: "#333",
                        flexShrink: 0,
                      }}
                    >
                      {msg.username}
                    </strong>
                    <span
                      style={{
                        backgroundColor: roleColor,
                        color: "#fff",
                        borderRadius: "12px",
                        padding: "2px 8px",
                        fontSize: "0.65rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isSent ? "You" : msg.role}
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "0.7rem",
                        color: roleColor,
                      }}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Message Content */}
                  <div style={{ fontSize: "0.85rem", color: "#444" }}>
                    {msg.message}
                  </div>
                </div>
              </Col>
            </Row>
          );
        })}
      </Container>

      {!isAtBottom && (
        <button
          onClick={scrollToBottom}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1070,
            backgroundColor: "#4A90E2",
            border: "none",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            fontSize: "0.85rem",
          }}
        >
          Go Down
        </button>
      )}
    </div>
  );
};

export default ChatBody;
