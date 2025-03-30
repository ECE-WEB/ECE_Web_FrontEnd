/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Avatar from "@mui/material/Avatar";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  InputGroup,
  Offcanvas,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faSearch,
  faEnvelope,
  faBell,
  faTimes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import SidePanel from "./SidePanel";
import ProfilePanel from "./ProfilePanel";
import PopUp from "./PopUp";

function MainContent({ brand, offcanvasVisible, setOffcanvasVisible, onChatToggle }) {
  const searchBreakpoint = 700;
  const mobileBreakpoint = 768;
  const drawerWidthExpanded = 240;
  const drawerWidthCollapsed = 60;

  const [navLinkStyle, setNavStyle] = useState({
    fontSize:
      window.innerWidth < 480
        ? "1.5rem"
        : window.innerWidth < 768
        ? "1.5rem"
        : "1.5rem",
  });
  const [iconSize, setIconSize] = useState("xl");
  const [notifications, setNotifications] = useState(5);
  const [messages, setMessages] = useState(3);
  const [profileOffcanvasVisible, setProfileOffcanvasVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isSaved, setIsSaved] = useState(-1);
  const [user, setUser] = useState({
    name: "Yekkaluru Divya Teja",
    email: "divyateja050@gmail.com",
    password: "",
    profilePic: "",
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileBreakpoint);
  const [showSearch, setShowSearch] = useState(window.innerWidth >= searchBreakpoint);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const LeftSwipeDistance = 100;
  const RightSwipeDistance = 40;

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = Number(touchStartX.current) - Number(touchEndX.current);
      if (Math.abs(swipeDistance) !== 0) {
        if (swipeDistance > 0 && Math.abs(swipeDistance) > RightSwipeDistance) {
          if (offcanvasVisible && !profileOffcanvasVisible) {
            setOffcanvasVisible(false);
          }
        } else if (swipeDistance < 0 && Math.abs(swipeDistance) > LeftSwipeDistance) {
          if (!offcanvasVisible && !profileOffcanvasVisible) {
            setOffcanvasVisible(true);
          }
        }
      }
      touchStartX.current = 0;
      touchEndX.current = 0;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [offcanvasVisible, profileOffcanvasVisible]);

  const handleProfileCanvas = () => {
    if (isEditable) {
      setIsSaved(false);
    } else {
      setProfileOffcanvasVisible(false);
    }
  };

  const toggleOffcanvas = () => {
    if (!profileOffcanvasVisible) setOffcanvasVisible(!offcanvasVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setNavStyle({
        fontSize:
          window.innerWidth < 480
            ? "1.5rem"
            : window.innerWidth < 768
            ? "1.5rem"
            : "1.5rem",
      });
      setIsMobile(window.innerWidth <= mobileBreakpoint);
      setShowSearch(window.innerWidth >= searchBreakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container fluid style={{ padding: "0rem 0rem" }}>
      <Navbar expand="md" style={{ padding: "0.5rem 0rem" }}>
        <Container fluid style={{ padding: "0rem 0rem" }}>
          <div className="d-flex align-items-center w-100">
            {/* Offcanvas Toggle Button */}
            <div
              className="position-relative"
              style={{
                alignContent: "center",
                width: "30px",
                height: "40px",
                display: window.innerWidth < mobileBreakpoint ? "block" : "none",
              }}
            >
              <Button
                variant="outline-Dark"
                aria-controls="offcanvas-navbar"
                onClick={toggleOffcanvas}
                style={{
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  padding: "0px",
                  marginRight: "8px",
                }}
              >
                {offcanvasVisible ? (
                  <FontAwesomeIcon icon={faTimes} size={iconSize} />
                ) : (
                  <Avatar
                    alt={user.name}
                    sx={{
                      alignItems: "center",
                      border: "1px solid #FF7A7A",
                      bgcolor: "#4D0000",
                    }}
                  >
                    {user.avatar}
                  </Avatar>
                )}
              </Button>
            </div>

            {/* Brand Section */}
            {!isMobile && (
              <div className="d-flex align-items-center ms-3">
                <Navbar.Brand style={navLinkStyle} href="#">
                  <FontAwesomeIcon icon={brand.icon} style={{ marginRight: "8px" }} />
                  &nbsp;
                  {brand.name}
                </Navbar.Brand>
              </div>
            )}

            {/* Search Bar */}
            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
              {showSearch && (
                <Form className="d-flex" style={{ maxWidth: "280px", width: "100%" }}>
                  <InputGroup
                    style={{
                      backgroundColor: "#ffffff",
                      border: "none",
                      borderRadius: "25px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      padding: "3px",
                      margin: "10px 0px",
                    }}
                  >
                    <FormControl
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      style={{
                        height: "1.8rem",
                        padding: "0.5rem 1rem",
                        border: "none",
                        borderRadius: "25px 0 0 25px",
                        boxShadow: "none",
                      }}
                    />
                    <Button
                      variant="primary"
                      style={{
                        height: "1.8rem",
                        lineHeight: "1.8rem",
                        padding: "0 15px",
                        borderRadius: "0 25px 25px 0",
                        backgroundColor: "#fda129",
                        border: "none",
                        color: "#ffffff",
                        fontSize: "1rem",
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </InputGroup>
                </Form>
              )}
            </div>

            {/* Notification Icons */}
            <div className="d-flex align-items-center">
              {/* Mail */}
              <div className="position-relative me-3">
                <FontAwesomeIcon icon={faEnvelope} size={iconSize} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: "0.7rem", transform: "translate(-50%, -40%)" }}>
                  {messages}
                </span>
              </div>

              {/* Bell */}
              <div className="position-relative me-3">
                <FontAwesomeIcon icon={faBell} size={iconSize} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.7rem", transform: "translate(-50%, -40%)" }}>
                  {notifications}
                </span>
              </div>

              {/* Chat/Online Users */}
              <div className="position-relative me-3" style={{ cursor: "pointer" }} onClick={onChatToggle}>
                <FontAwesomeIcon icon={faUsers} size={iconSize} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style={{ fontSize: "0.7rem", transform: "translate(-50%, -40%)" }}>
                  3
                </span>
              </div>
            </div>
          </div>

          {/* Side Offcanvas */}
          <Offcanvas
            id="offcanvas-navbar"
            show={offcanvasVisible}
            onHide={() => setOffcanvasVisible(false)}
            style={{
              zIndex: 1050,
              height: "100vh",
              width: `${drawerWidthExpanded - 15}px`,
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              padding: "0px",
            }}
          >
            <Offcanvas.Body>
              {isMobile && (
                <SidePanel
                  isHovered={true}
                  isSidebarExpanded={true}
                  drawerWidthExpanded={drawerWidthExpanded}
                  drawerWidthCollapsed={drawerWidthCollapsed}
                  setIsHovered={() => {}}
                  textVisible={true}
                  toggleSidebar={null}
                  setIsPanelVisible={null}
                  setProfileOffcanvasVisible={setProfileOffcanvasVisible}
                  setOffcanvasVisible={setOffcanvasVisible}
                />
              )}
            </Offcanvas.Body>
          </Offcanvas>

          {/* Profile Offcanvas */}
          <Offcanvas
            show={profileOffcanvasVisible}
            onHide={handleProfileCanvas}
            placement="start"
            style={{
              zIndex: 1060,
              height: "100vh",
              width: `${drawerWidthExpanded}px`,
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              padding: "0px",
            }}
          >
            <Offcanvas.Body>
              <ProfilePanel
                isEditable={isEditable}
                setIsEditable={setIsEditable}
                setProfileOffcanvasVisible={setProfileOffcanvasVisible}
                setOffcanvasVisible={setOffcanvasVisible}
                user={user}
                setUser={setUser}
              />
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>

      {/* Unsaved Changes PopUp */}
      {isEditable && !isSaved && (
        <PopUp
          message="Changes Not Saved! Are you sure you want to close?"
          onSave={() => {
            setIsSaved(true);
            setProfileOffcanvasVisible(false);
          }}
          onDiscard={() => {
            setIsEditable(false);
            setIsSaved(-1);
            setProfileOffcanvasVisible(false);
          }}
        />
      )}
    </Container>
  );
}

export default MainContent;
