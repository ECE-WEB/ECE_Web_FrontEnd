/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ChatInterface = ({setIsCommunityVisible,setLogoAnim}) => {
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null);
  const chatInputRef = useRef(null); // Reference to ChatInput
  const buttonRef = useRef(null); // Reference to "Go Down" button
  const [chatInputHeight, setChatInputHeight] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false); // Track user interaction
  const [showSearchBar, setShowSearchBar] = useState(false); // Toggle search bar
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  let debounceTimeout = null;

  // Simulate new messages
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
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Detect changes in the ChatInput height
  useEffect(() => {
    if (chatInputRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === chatInputRef.current) {
            const height = chatInputRef.current.offsetHeight;
            setChatInputHeight(height);
            if (buttonRef.current) {
              buttonRef.current.style.bottom = `${height + 10}px`;
            }
          }
        }
      });
      resizeObserver.observe(chatInputRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  const handleScroll = () => {
    if (chatBodyRef.current) {
      clearTimeout(debounceTimeout); // Clear previous debounce
      debounceTimeout = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } = chatBodyRef.current;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 20; // Wider threshold
        setIsAtBottom(atBottom);

        if (!atBottom) {
          setShowBtn(true);
          setIsUserScrolling(true); // User is actively scrolling away
        } else {
          setShowBtn(false);
          setIsUserScrolling(false); // User has returned to the bottom
        }
      }, 100);
    }
  };

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
      setIsAtBottom(true);
      setShowBtn(false);
      setIsUserScrolling(false); // Disable user scrolling flag
    }
  };

  useEffect(() => {
    if (isAtBottom && chatBodyRef.current && !isUserScrolling) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    console.log("Searching for:", searchQuery); // Debug log for search functionality
  };

  return (
    <>
      <Container fluid
        style={{
          width:"100%",
          display: "flex",
          flexDirection: "column",
          height: "100vh", // Full viewport height
          overflow: "hidden", // Prevent layout overflow
          padding:"0px"
        }}
      >
        {/* Sticky Top Header */}
        <Row
          style={{
            backgroundColor: "rgb(255, 214, 138)",
            padding: "10px",
            position: "sticky", // Ensure top bar stays visible
            top: 0,
            zIndex: 1020,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Close Button */}
          <Col xs={2} sm={2} style={{ textAlign: "left" }}>
            <Button
              variant="light"
              onClick={()=>{setIsCommunityVisible(false);setTimeout(()=>setLogoAnim(true),100)}}
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <CloseIcon style={{ fontSize: "24px" }} />
            </Button>
          </Col>

          {/* Community Text and Search Bar */}
          <Col xs={8} sm={8} style={{ textAlign: "center" }}>
            {showSearchBar ? (
              <Form.Control
                type="text"
                placeholder="Search in Community..."
                value={searchQuery}
                onChange={handleSearch}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                  maxWidth: "300px",
                  margin: "0 auto",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              />
            ) : (
              <span
                style={{
                  fontSize: "18px",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Community
              </span>
            )}
          </Col>

          {/* Search Icon */}
          <Col xs={2} sm={2} style={{ textAlign: "right" }}>
            <Button
              variant="light"
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "white",
              }}
              onClick={() => setShowSearchBar((prev) => !prev)}
            >
              <SearchIcon style={{ fontSize: "24px" }} />
            </Button>
          </Col>
        </Row>

        {/* Chat Body */}
        <Row
          ref={chatBodyRef}
          onScroll={handleScroll}
          style={{
            flex: "1",// Flexible height, taking remaining space
            overflowY: "auto", // Scrollable
          }}
        >
          <Col style={{ padding: 0 }}>
            <ChatBody
              chatBodyRef={chatBodyRef}
              chatMessages={messages}
              isAtBottom={isAtBottom}
            />
          </Col>
        </Row>

        {/* Chat Input */}
        <Row
          ref={chatInputRef}
          style={{
            flexShrink: 0, // Prevent shrinking
            padding: "0px",
            margin: "0px",
            backgroundColor: "#f7f7f7",
            position: "relative",
          }}
        >
          <Col style={{ padding: "0px", margin: "0px" }}>
            <ChatInput setMessages={setMessages} messages={messages} />
          </Col>
        </Row>
        <div>
        {!isAtBottom && showBtn && (
          <Button
            ref={buttonRef} // Reference to the button for dynamic updates
            onClick={scrollToBottom}
            style={{
              position: "fixed",
              bottom: `${chatInputHeight + 10}px`,
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
           <FontAwesomeIcon icon={faAnglesDown} />
          </Button>
        )}
      </div>
      </Container>
      
    </>
  );
};

export default ChatInterface;
