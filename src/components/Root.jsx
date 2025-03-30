import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {
  faLayerGroup,
  faBullhorn,
  faArrowUpFromBracket,
  faHand,
} from "@fortawesome/free-solid-svg-icons";

import NavBar from "./NavBar";
import ProfilePanel from "./ProfilePanel";
import SidePanel from "./SidePanel";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import StudentDashboard from "../pages/StudentDashboard";
import StudentAttendance from "../pages/StudentAttendance";
import StudentSchedule from "../pages/StudentSchedule";
import StudentMarks from "../pages/StudentMarks";
import ChatBody from "./ChatBody";
import ChatBox from "./ChatBox";
import { Offcanvas } from "react-bootstrap";

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 60;
const panelVanishBreakpoint = 650;

const RootContent = () => {
  const location = useLocation();
  const [isToggled, setIsToggled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [brand, setBrand] = useState({ name: "Dashboard", icon: faLayerGroup });
  const [offcanvasVisible, setOffcanvasVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false); // ✅ Chat toggle
  const isSidebarExpanded = isToggled || isHovered;

  const toggleSidebar = () => setIsToggled((prev) => !prev);
  const toggleChatBox = () => setShowChatBox((prev) => !prev); // ✅ Toggle handler

  useEffect(() => {
    const protectedPaths = [
      "/studentdashboard",
      "/studentattendance",
      "/studentschedule",
      "/studentmarks",
      "/profilepanel",
      "/facultydashboard",
      "/uploadMarks",
      "/uploadAttandance",
      "/anouncements",
    ];
    setIsLoggedIn(protectedPaths.includes(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    if (isSidebarExpanded) {
      const timer = setTimeout(() => setTextVisible(true), 280);
      return () => clearTimeout(timer);
    } else {
      setTextVisible(false);
    }
  }, [isSidebarExpanded]);

  useEffect(() => {
    const handlePanelVisibility = () => {
      setIsPanelVisible(window.innerWidth >= panelVanishBreakpoint);
    };
    handlePanelVisibility();
    window.addEventListener("resize", handlePanelVisibility);
    return () => window.removeEventListener("resize", handlePanelVisibility);
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      {/* Side Panel */}
      {isLoggedIn && isPanelVisible && (
        <SidePanel
          isHovered={isHovered}
          isSidebarExpanded={isSidebarExpanded}
          drawerWidthExpanded={drawerWidthExpanded}
          drawerWidthCollapsed={drawerWidthCollapsed}
          setIsHovered={setIsHovered}
          textVisible={textVisible}
          toggleSidebar={toggleSidebar}
          setIsPanelVisible={setIsPanelVisible}
          setOffcanvasVisible={null}
          setProfileOffcanvasVisible={null}
        />
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "width 0.5s ease",
          width: isPanelVisible
            ? `calc(100% - ${
                isHovered ? drawerWidthExpanded : drawerWidthCollapsed
              }px)`
            : "100%",
          margin: {
            xs: "0 0.5rem",
            sm: "0 1rem",
            md: "0 1.5rem",
            lg: "0 2rem",
            xl: "0 3rem",
          },
          minHeight: "100vh",
          p: 1,
        }}
      >
        {/* NavBar only if logged in */}
        {isLoggedIn && (
          <NavBar
            brand={brand}
            offcanvasVisible={offcanvasVisible}
            setOffcanvasVisible={setOffcanvasVisible}
            onChatToggle={toggleChatBox} // ✅ pass toggle
            showChatBox={showChatBox} // ✅ pass visibility
          />
        )}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sidepanel" element={<SidePanel />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/studentattendance" element={<StudentAttendance />} />
          <Route path="/studentschedule" element={<StudentSchedule />} />
          <Route path="/studentmarks" element={<StudentMarks />} />
          <Route path="/profilepanel" element={<ProfilePanel />} />
          <Route path="/chatbody" element={<ChatBody />} />
          <Route path="/chatbox" element={<ChatBox />} />
          <Route
            path="/facultydashboard"
            element={
              <Home
                setBrand={() => {
                  setBrand({ name: "Dashboard", icon: faLayerGroup });
                  setOffcanvasVisible(false);
                }}
              />
            }
          />
          <Route
            path="/anouncements"
            element={
              <About
                setBrand={() => {
                  setBrand({ name: "Announcements", icon: faBullhorn });
                  setOffcanvasVisible(false);
                }}
              />
            }
          />
          <Route
            path="/uploadMarks"
            element={
              <Contact
                setBrand={() => {
                  setBrand({ name: "Upload Marks", icon: faArrowUpFromBracket });
                  setOffcanvasVisible(false);
                }}
              />
            }
          />
          <Route
            path="/uploadAttandance"
            element={
              <UploadAttendance
                setBrand={() => {
                  setBrand({ name: "Upload Attendance", icon: faHand });
                  setOffcanvasVisible(false);
                }}
              />
            }
          />
        </Routes>

        {/* ✅ ChatBox Offcanvas */}
        {isLoggedIn && (
          <Offcanvas
            show={showChatBox}
            onHide={toggleChatBox}
            placement="end"
            style={{
              zIndex: 1065,
              height: "100vh",
              width: "360px",
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              padding: "0px",
            }}
          >
            <Offcanvas.Body style={{ padding: 0 }}>
              <ChatBox />
            </Offcanvas.Body>
          </Offcanvas>
        )}
      </Box>
    </Box>
  );
};

// Wrapping RootContent with Router
const Root = () => (
  <Router>
    <RootContent />
  </Router>
);

// Dummy route content components
const Home = ({ setBrand }) => {
  useEffect(() => {
    setBrand();
  }, []);
  return (
    <>
      <Typography variant="h4">Home Content</Typography>
      <Typography paragraph>This is the home page.</Typography>
    </>
  );
};

const About = ({ setBrand }) => {
  useEffect(() => {
    setBrand();
  }, []);
  return (
    <>
      <Typography variant="h4">About Content</Typography>
      <Typography paragraph>This is the about page.</Typography>
    </>
  );
};

const Contact = ({ setBrand }) => {
  useEffect(() => {
    setBrand();
  }, []);
  return (
    <>
      <Typography variant="h4">Contact Content</Typography>
      <Typography paragraph>This is the contact page.</Typography>
    </>
  );
};

const UploadAttendance = ({ setBrand }) => {
  useEffect(() => {
    setBrand();
  }, []);
  return (
    <>
      <Typography variant="h4">Upload Attendance</Typography>
      <Typography paragraph>This is the upload attendance page.</Typography>
    </>
  );
};

export default Root;
