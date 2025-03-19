/* eslint-disable no-unused-vars */
import React, { use, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
import CommunityLogo from "../logos/CommunityLogo";
import {
  faLayerGroup,
  faSearch,
  faEnvelope,
  faBell,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import SidePanel from "./SidePanel";
import ProfilePanel from "./ProfilePanel";

function MainContent({ brand, offcanvasVisible, setOffcanvasVisible }) {
  const searchBreakpoint = 650;
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
  const [showSearch, setShowSearch] = useState(
    window.innerWidth >= searchBreakpoint
  );

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const minSwipeDistance = 40; // Minimum swipe distance to detect
  
  useEffect(() => {
    // Touch Event Handlers
    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      const swipeDistance = touchStartX - touchEndX;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          // Swipe left: Close Offcanvas
          if (offcanvasVisible) {
            console.log("Swipe Left: Closing Offcanvas");
            setOffcanvasVisible(false);
          }
        } else {
          // Swipe right: Open Offcanvas
          if (!offcanvasVisible) {
            console.log("Swipe Right: Opening Offcanvas");
            setOffcanvasVisible(true);
          }
        }
      }

      // Reset touch state
      setTouchStartX(0);
      setTouchEndX(0);
    };

    // Attach event listeners to the window
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [offcanvasVisible, touchStartX, touchEndX]);

  const toggleOffcanvas = () => {
    setOffcanvasVisible(!offcanvasVisible);
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
      setShowSearch(window.innerWidth >= searchBreakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container fluid style={{ padding: "0rem 0rem" }}>
      <Navbar expand="md">
        <Container fluid style={{ padding: "0rem 0rem" }}>
          <div className="d-flex align-items-center w-100">
            {/* Offcanvas Toggle Button */}
            <div
              className="position-relative"
              style={{
                width: "30px",
                height: "40px",
                display: window.innerWidth < searchBreakpoint ? "block" : "none",
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
                  marginRight: "8px",
                }}
              >
                {offcanvasVisible ? (
                  <FontAwesomeIcon icon={faTimes} size={iconSize} />
                ) : (
                  <FontAwesomeIcon
                    icon={brand.icon}
                    size="xl"
                    style={{ marginRight: "8px" }}
                  />
                )}
              </Button>
            </div>

            {/* Brand Section */}
            <div className={`d-flex align-items-center ms-${showSearch ? 0 : 3}`}>
              <Navbar.Brand style={navLinkStyle} href="/">
                {showSearch && (
                  <FontAwesomeIcon
                    icon={brand.icon}
                    style={{ marginRight: "8px" }}
                  />
                )}
                &nbsp;
                {showSearch && brand.name}
              </Navbar.Brand>
            </div>

            {/* Search Bar Section */}
            <div className="d-flex flex-grow-1 justify-content-center">
              {showSearch && (
                <Form className="d-flex" style={{ maxWidth: "250px" }}>
                  <InputGroup>
                    <FormControl
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      style={{
                        height: "1.8rem",
                        padding: "0.6rem",
                        lineHeight: "1.8rem",
                      }}
                    />
                    <Button
                      variant="outline-primary"
                      style={{ height: "1.8rem", lineHeight: "0rem" }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </InputGroup>
                </Form>
              )}
            </div>

            {/* Notification Section */}
            <div className="d-flex align-items-center">
              <div className="position-relative me-3">
                <FontAwesomeIcon icon={faEnvelope} size={iconSize} />
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                  style={{
                    fontSize: "0.7rem",
                    transform: "translate(-50%, -40%)",
                  }}
                >
                  {messages}
                </span>
              </div>
              <div className="position-relative me-3">
                <FontAwesomeIcon icon={faBell} size={iconSize} />
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{
                    fontSize: "0.7rem",
                    transform: "translate(-50%, -40%)",
                  }}
                >
                  {notifications}
                </span>
              </div>
              <div className="position-relative">
                <CommunityLogo />
              </div>
            </div>
          </div>

          {/* Offcanvas Section */}
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
              {!showSearch && (
                <SidePanel
                  isHovered={true}
                  isSidebarExpanded={true}
                  drawerWidthExpanded={drawerWidthExpanded}
                  drawerWidthCollapsed={drawerWidthCollapsed}
                  setIsHovered={()=>{}}
                  textVisible={true}
                  toggleSidebar={null}
                  setIsPanelVisible={null}
                  setProfileOffcanvasVisible = {setProfileOffcanvasVisible}
                  setOffcanvasVisible={setOffcanvasVisible}
                />
              )}
            </Offcanvas.Body>
          </Offcanvas>
          <Offcanvas
            show={profileOffcanvasVisible}
            onHide={() => setProfileOffcanvasVisible(false)}
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
              <ProfilePanel></ProfilePanel>
          </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </Container>
  );
}

export default MainContent;
