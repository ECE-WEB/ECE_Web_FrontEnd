import React, { useState, useRef, useEffect } from "react";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { Container, Row, Col } from "react-bootstrap";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Add new messages every 1 second (demo purpose)
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          username: `User${prevMessages.length + 1}`,
          role: ["Student", "Faculty", "Alumni"][(prevMessages.length + 1) % 3],
          avatar: `https://ui-avatars.com/api/?name=User${prevMessages.length + 1}`,
          message: `This is message ${prevMessages.length + 1}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Debounced scroll tracking
  let scrollTimeout = null;
  const handleScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (chatBodyRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatBodyRef.current;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 20;
        setIsAtBottom((prev) => (prev !== atBottom ? atBottom : prev));
      }
    }, 100);
  };

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
      setIsAtBottom(true);
    }
  };

  return (
    <Container
      fluid
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid #ddd",
      }}
    >
      {/* Sticky Top Header */}
      <Row
        style={{
          backgroundColor: "#4A90E2",
          padding: "10px",
          position: "sticky",
          top: 0,
          zIndex: 1020,
        }}
      >
        <Col>
          <h5 style={{ color: "#fff", textAlign: "center", fontWeight: "600", margin: "0" }}>
            Community
          </h5>
        </Col>
      </Row>

      {/* Chat Body */}
      <Row style={{ flex: 1 }}>
        <Col style={{ padding: 0 }}>
          <ChatBody
            chatBodyRef={chatBodyRef}
            chatMessages={messages}
            handleScroll={handleScroll}
            scrollToBottom={scrollToBottom}
            isAtBottom={isAtBottom}
          />
        </Col>
      </Row>

      {/* Sticky Chat Input */}
      <Row
        style={{
          backgroundColor: "#f7f7f7",
          padding: "10px 15px",
          position: "sticky",
          bottom: 0,
          zIndex: 1020,
          boxShadow: "0 -2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <Col>
          <ChatInput setMessages={setMessages} messages={messages} />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatInterface;
