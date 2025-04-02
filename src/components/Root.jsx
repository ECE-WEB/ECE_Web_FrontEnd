import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { faLayerGroup, faBullhorn, faArrowUpFromBracket, faHand } from '@fortawesome/free-solid-svg-icons';

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
import ChatBox from "./community/ChatBox";

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 60;
const panelVanishBreakpoint = 768;
const mobileBreakpoint = 768;

function RootWrapper() {
  return (
    <Router>
      <Root />
    </Router>
  );
}

function Root() {
  const [isToggled, setIsToggled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileBreakpoint);
  const [brand, setBrand] = useState({ name: "Dashboard", icon: faLayerGroup });
  const [offcanvasVisible, setOffcanvasVisible] = useState(false);
  const [isComunityVisible, setIsCommunityVisible] = useState(false);
  const [isLogoAnim, setLogoAnim] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isSidebarExpanded = isToggled || isHovered;
  const userStatus = 1;

  const toggleSidebar = () => setIsToggled(prev => !prev);

  const location = useLocation();
  const translate = location.pathname === '/overlay' ? -100 : 0;

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
      const newWidth = window.innerWidth;
      setIsPanelVisible(newWidth >= panelVanishBreakpoint);
      setIsMobile(newWidth <= mobileBreakpoint);
      setWindowWidth(newWidth);
    };
    handlePanelVisibility();
    window.addEventListener("resize", handlePanelVisibility);
    return () => window.removeEventListener("resize", handlePanelVisibility);
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      {/* Side Panel */}
      {userStatus === 1 && isPanelVisible && (
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
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          margin: {
            xs: '0 0.5rem',
            sm: '0 1rem',
            md: '0 1rem',
            lg: '0 1rem',
            xl: '0 2rem'
          },
          width: isPanelVisible
            ? `calc(100% - ${isSidebarExpanded ? drawerWidthExpanded : drawerWidthCollapsed}px)`
            : "100%",
          transition: 'transform 300ms ease',
          transform: `translateX(${translate}%)`,
          minHeight: "100vh",
          p: 1,
        }}
      >
        {userStatus === 1 && (
          <NavBar
            brand={brand}
            isMobile={isMobile}
            setLogoAnim={setLogoAnim}
            isLogoAnim={isLogoAnim}
            offcanvasVisible={offcanvasVisible}
            setOffcanvasVisible={setOffcanvasVisible}
            isComunityVisible={isComunityVisible}
            setIsCommunityVisible={setIsCommunityVisible}
          />
        )}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/studentattendance" element={<StudentAttendance />} />
          <Route path="/studentschedule" element={<StudentSchedule />} />
          <Route path="/studentmarks" element={<StudentMarks />} />
          <Route path="/profilepanel" element={<ProfilePanel />} />
          <Route path="/chatbody" element={<ChatBody />} />
          <Route path="/chatbox" element={<ChatBox />} />
          <Route path="/overlay" element={<></>} />
          <Route path="/facultydashboard" element={<Home setBrand={() => { setBrand({ name: "Dashboard", icon: faLayerGroup }); setOffcanvasVisible(false); }} />} />
          <Route path="/anouncements" element={<About setBrand={() => { setBrand({ name: "Announcements", icon: faBullhorn }); setOffcanvasVisible(false); }} />} />
          <Route path="/uploadMarks" element={<Contact setBrand={() => { setBrand({ name: "Upload Marks", icon: faArrowUpFromBracket }); setOffcanvasVisible(false); }} />} />
          <Route path="/uploadAttandance" element={<UploadAttendance setBrand={() => { setBrand({ name: "Upload Attendance", icon: faHand }); setOffcanvasVisible(false); }} />} />
        </Routes>
      </Box>

      {userStatus === 1 && !isMobile && (
        <Drawer
          anchor="right"
          variant="persistent"
          open={true}
          sx={{
            maxWidth: "500px",
            width: `${isComunityVisible ? Math.round(windowWidth / 3) : 0}px`,
            transition: "width 0.6s ease",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              maxWidth: "500px",
              minWidth: `${isComunityVisible ? 330 : 0}px`,
              width: `${isComunityVisible ? Math.round(windowWidth / 3.2) : 0}px`,
              boxSizing: "border-box",
              transition: "transform 500ms ease-in-out",
              willChange: "transform",
              transform: isComunityVisible ? "translateX(0)" : "translateX(100%)",
              overflowX: "hidden",
              overflowY: "auto",
              backgroundColor: "white",
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              height: "100%",
              position: "fixed",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
              padding: 0,
            }}
          >
            <ChatBox isLogoAnim={isLogoAnim} setLogoAnim={setLogoAnim} setIsCommunityVisible={setIsCommunityVisible} />
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

const Home = ({ setBrand }) => {
  useEffect(() => { setBrand(); }, []);
  return (
    <>
      <Typography variant="h4">Home Content</Typography>
      <Typography paragraph>This is the home page.</Typography>
    </>
  );
};

const About = ({ setBrand }) => {
  useEffect(() => { setBrand(); }, []);
  return (
    <>
      <Typography variant="h4">About Content</Typography>
      <Typography paragraph>This is the about page.</Typography>
    </>
  );
};

const Contact = ({ setBrand }) => {
  useEffect(() => { setBrand(); }, []);
  return (
    <>
      <Typography variant="h4">Contact Content</Typography>
      <Typography paragraph>This is the contact page.</Typography>
    </>
  );
};

const UploadAttendance = ({ setBrand }) => {
  useEffect(() => { setBrand(); }, []);
  return (
    <>
      <Typography variant="h4">Upload Attendance</Typography>
      <Typography paragraph>This is the upload attendance page.</Typography>
    </>
  );
};

export default RootWrapper;
