/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
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
<<<<<<<<< Temporary merge branch 1
import SidePanel from "./SidePanel";
=========
import Drawer from "@mui/material/Drawer";
>>>>>>>>> Temporary merge branch 2
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import StudentDashboard from "../pages/StudentDashboard";
<<<<<<<<< Temporary merge branch 1
import StudentAttendance from "../pages/StudentAttendance";
import StudentSchedule from "../pages/StudentSchedule";
import StudentMarks from "../pages/StudentMarks";
import ChatBody from "./ChatBody";
import ChatBox from "./ChatBox";
import { Offcanvas } from "react-bootstrap";

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 60;
const panelVanishBreakpoint = 650;
=========
import ChatBox from "./community/ChatBox";

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 60;
const panelVanishBreakpoint = 768;
>>>>>>>>> Temporary merge branch 2

const RootContent = () => {
  const location = useLocation();
  const [isToggled, setIsToggled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const [textVisible, setTextVisible] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileBreakpoint);
  const [brand, setBrand] = useState({ name: "Dashboard", icon: faLayerGroup });
  const [offcanvasVisible, setOffcanvasVisible] = useState(false);
<<<<<<<<< Temporary merge branch 1
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

=========
  const [isComunityVisible,setIsCommunityVisible] = useState(false);
  const [isLogoAnim , setLogoAnim] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isSidebarExpanded = isToggled || isHovered;
  const userStatus = 1;
  const colorsProp = {
    panelBackgroundColor: "#4D0000",
    panelTextColor: "white",
    profileBorder: "2px solid #FF7A7A",
    profileBackgroundColor: "#FF7A7A",
    hoverBackgroundColor: "#FF7A7A", // Hover color for items
    selectedBackgroundColor: "#800000", // Selected item color
    itemBorderRadius: "12px", // Border radius for items
  };
  const toggleSidebar = () => {
    setIsToggled(prev => !prev);
  };
  const location = useLocation();

  // If the route is "/overlay", we slide the main content offscreen (translateX: -100%)
  const translate = location.pathname === '/overlay' ? -100 : 0;
  // Manage the visibility of text within the sidebar.
>>>>>>>>> Temporary merge branch 2
  useEffect(() => {
    if (isSidebarExpanded) {
      const timer = setTimeout(() => setTextVisible(true), 280);
      return () => clearTimeout(timer);
    } else {
      setTextVisible(false);
    }
  }, [isSidebarExpanded]);

<<<<<<<<< Temporary merge branch 1
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
=========
  // Automatically hide the panel if screen width falls below the breakpoint.
  // Inside Root component:
useEffect(() => {
  const handlePanelVisibility = () => {
    const newWidth = window.innerWidth;
    // Update panel visibility based on the breakpoint
    if (newWidth < panelVanishBreakpoint) {
      setIsPanelVisible(false);
    } else {
      setIsPanelVisible(true);
    }
    // Update the state with the new window width
    setWindowWidth(newWidth);
    // If you need to log the updated value, use newWidth directly:
    setIsMobile(window.innerWidth <= mobileBreakpoint);
  };
  
  // Set initial state on mount
  handlePanelVisibility();
  window.addEventListener("resize", handlePanelVisibility);
  return () => window.removeEventListener("resize", handlePanelVisibility);
}, []);
return (
      <Box sx={{ display: "flex" ,height:'100vh'}}>
        <CssBaseline />
>>>>>>>>> Temporary merge branch 2

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
<<<<<<<<< Temporary merge branch 1
        )}
=========
        )):<></>}
        {/* Main Content */}
        <Box
          component="main"
          sx={{
            display:"flex",
            flexDirection:"column",
            flexGrow: 1,
            margin: {
              xs: '0 0.5rem',
              sm: '0 1rem',
              md: '0 1rem',
              lg: '0 1rem',
              xl: '0 2rem'
            },
            width: '100vw',
            transition: 'transform 300ms ease',
            transform: `translateX(${translate}%)`,
            minHeight: "100vh",
            p: 1,
          }}
        >
          {(userStatus == 1)?<NavBar brand={brand} isMobile={isMobile} setLogoAnim={setLogoAnim} isLogoAnim={isLogoAnim} offcanvasVisible={offcanvasVisible} isComunityVisible={isComunityVisible} setIsCommunityVisible={setIsCommunityVisible} setOffcanvasVisible = {setOffcanvasVisible}/> : <></>}
>>>>>>>>> Temporary merge branch 2

          {/* Routes */}
          <Routes>
          <Route path="/" element={<LandingPage />} />
<<<<<<<<< Temporary merge branch 1
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
=========
            <Route path="/login" element={<LoginPage />} />
            <Route path="/studentdashboard" element={<StudentDashboard  />} />
            <Route
              path="/facultydashboard"
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
            <Route path="/overlay" element={<></>} />
          </Routes>
        </Box>
        {(userStatus == 1)?!isMobile &&(
         <Drawer
         anchor="right"
         variant="persistent"
         open={true} // Always mounted so we can animate via transform
         sx={{
          maxWidth:"500px",
          width:`${isComunityVisible ? Math.round(windowWidth / 3): 0}px`,
          transition:"width 0.6s ease",
          flexShrink: 0,
           "& .MuiDrawer-paper": {
            maxWidth:"500px",
            minWidth:`${isComunityVisible?330:0}px`,
            width:`${isComunityVisible ? Math.round(windowWidth / 3.2): 0}px`,
             boxSizing: "border-box",
             // Apply a custom, longer transition on transform only
             transition: "transform 500ms ease-in-out",
             willChange: "transform",
             // Slide the paper in or out based on isComunityVisible
             transform: isComunityVisible ? "translateX(0)" : "translateX(100%)",
             overflowX: "hidden",
             overflowY: "auto",
             backgroundColor: "white",
             borderTopLeftRadius: "20px",
             borderBottomLeftRadius: "20px",
             height: "100%",
             position: "fixed", // ensure it stays at the right edge without layout shifts
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
        
        ):<></>}
      </Box>
    
  );
}
>>>>>>>>> Temporary merge branch 2

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
