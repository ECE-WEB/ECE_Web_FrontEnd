import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MainContent from "./NavBar";
import Typography from "@mui/material/Typography";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidePanel from "./SidePanel";
import { faLayerGroup, faBullhorn, faArrowUpFromBracket, faHand } from '@fortawesome/free-solid-svg-icons';
import ProfilePanel from "./ProfilePanel";

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 60;
// Define a breakpoint below which the panel should vanish, e.g., 768px.
const panelVanishBreakpoint = 650;

function Root() {
  const [isToggled, setIsToggled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [brand, setBrand] = useState({ name: "Dashboard", icon: faLayerGroup });
  const [offcanvasVisible, setOffcanvasVisible] = useState(false);
  const isSidebarExpanded = isToggled || isHovered;

  const toggleSidebar = () => {
    setIsToggled(prev => !prev);
  };

  // Manage the visibility of text within the sidebar.
  useEffect(() => {
    if (isSidebarExpanded) {
      const timer = setTimeout(() => {
        setTextVisible(true);
      }, 280);
      return () => clearTimeout(timer);
    } else {
      setTextVisible(false);
    }
  }, [isSidebarExpanded]);

  // Automatically hide the panel if screen width falls below the breakpoint.
  useEffect(() => {
    const handlePanelVisibility = () => {
      if (window.innerWidth < panelVanishBreakpoint) {
        setIsPanelVisible(false);
      } else {
        setIsPanelVisible(true);
      }
    };

    // Run once on mount and on every resize.
    handlePanelVisibility();
    window.addEventListener("resize", handlePanelVisibility);
    return () => window.removeEventListener("resize", handlePanelVisibility);
  }, []);

  return (
    <Router>
      <Box sx={{ display: "flex" ,height:'100vh'}}>
        <CssBaseline />

        {/* Side Panel */}
        {isPanelVisible && (
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
              ? `calc(100% - ${isHovered ? drawerWidthExpanded : drawerWidthCollapsed}px)`
              : "100%",
            margin: {
              xs: '0 0.5rem',
              sm: '0 1rem',
              md: '0 1.5rem',
              lg: '0 2rem',
              xl: '0 3rem'
            },
            minHeight: "100vh",
            p: 1,
          }}
        >
          <MainContent brand={brand} offcanvasVisible={offcanvasVisible} setOffcanvasVisible = {setOffcanvasVisible}/>

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <Home style={{ padding: "0rem 2rem" }} setBrand={() => {setBrand({ name: "Dashboard", icon: faLayerGroup });setOffcanvasVisible(false)}} />
              }
            />
            <Route
              path="/anouncements"
              element={
                <About setBrand={() => {setBrand({ name: "Announcements", icon: faBullhorn });setOffcanvasVisible(false)}} />
              }
            />
            <Route
              path="/uploadMarks"
              element={
                <Contact setBrand={() => {setBrand({ name: "Upload Marks", icon: faArrowUpFromBracket });setOffcanvasVisible(false)}} />
              }
            />
            <Route
              path="/uploadAttandance"
              element={
                <UploadAttendance setBrand={() => {setBrand({ name: "Upload Attendance", icon: faHand });setOffcanvasVisible(false)}} />
              }
            />
           
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

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
