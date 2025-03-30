import React, { useState, useRef, useEffect } from "react";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { Container, Row, Col } from "react-bootstrap";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Add new messages every 5 seconds for testing
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

  let scrollTimeout = null;

const handleScroll = () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  scrollTimeout = setTimeout(() => {
    if (chatBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatBodyRef.current;

      // Use a stable threshold to prevent frequent toggling
      const atBottom = scrollTop + clientHeight >= scrollHeight - 20;

      // Update state only if it changes
      setIsAtBottom((prevState) => {
        if (prevState !== atBottom) {
          return atBottom;
        }
        return prevState;
      });
    }
  }, 100); // Debounced delay
};


  const scrollToBottom = () => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
    setIsAtBottom(true);
  };

  return (
    <Container fluid style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Sticky Top */}
      <Row style={{ backgroundColor: "#4A90E2", padding: "10px", position: "sticky", top: 0, zIndex: 1020 }}>
        <Col>
          <h4 style={{ color: "#fff", textAlign: "center" }}>Sticky Top Row</h4>
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

      {/* Sticky Input */}
      <Row style={{ backgroundColor: "#f7f7f7", padding: "10px", position: "sticky", bottom: 0, zIndex: 1020 }}>
        <Col>
          <ChatInput setMessages = {setMessages} messages={messages} />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatInterface;