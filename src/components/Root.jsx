/* eslint-disable no-unused-vars */
import React, { useState, useEffect,useRef } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  faLayerGroup,
  faBullhorn,
  faArrowUpFromBracket,
  faHand,
} from "@fortawesome/free-solid-svg-icons";
import SidePanel from "./SidePanel";
import NavBar from "./NavBar";
import ProfilePanel from "./ProfilePanel";
import Drawer from "@mui/material/Drawer";
import LandingPage from "../pages/LandingPage";
import StudentAttendance from "../pages/StudentAttendance";
import StudentSchedule from "../pages/StudentSchedule";
import StudentMarks from "../pages/StudentMarks";
import LoginPage from "../pages/LoginPage";
import StudentDashboard from "../pages/StudentDashboard";
import ChatBox from "./community/ChatBox";
const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 60;
const mobileBreakpoint = 768;//900 to 930
const panelVanishBreakpoint = 768;

const Root = () => {
  const location = useLocation();
  const [isToggled, setIsToggled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const [textVisible, setTextVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(
      window.innerWidth <= mobileBreakpoint
    );
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [brand, setBrand] = useState({ name: "Dashboard", icon: faLayerGroup });
  const [offcanvasVisible, setOffcanvasVisible] = useState(false);
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


  // If the route is "/overlay", we slide the main content offscreen (translateX: -100%)
  const translate = location.pathname === '/overlay' ? -100 : 0;
  // Manage the visibility of text within the sidebar.
  useEffect(() => {
    if (isSidebarExpanded) {
      const timer = setTimeout(() => setTextVisible(true), 280);
      return () => clearTimeout(timer);
    } else {
      setTextVisible(false);
    }
  }, [isSidebarExpanded]);

  // Automatically hide the panel if screen width falls below the breakpoint.
  // Inside Root component:
useEffect(() => {
  const handlePanelVisibility = () => {
    const newWidth = window.innerWidth;
    console.log(newWidth);
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
      <Box  sx={{ display: "flex" ,height:'100vh'}}>
        <CssBaseline />

        {/* Side Panel */}
        {(userStatus == 1)?(isPanelVisible && (
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
            width:"100%",
            transition: 'transform 300ms ease',
            transform: `translateX(${translate}%)`,
            minHeight: "100%",
            p: 1,
          }}
        >
          {(userStatus == 1 && location.pathname !== "/") && (
  <NavBar brand={brand} isMobile={isMobile} setLogoAnim={setLogoAnim} isLogoAnim={isLogoAnim} offcanvasVisible={offcanvasVisible} isComunityVisible={isComunityVisible} setIsCommunityVisible={setIsCommunityVisible} setOffcanvasVisible = {setOffcanvasVisible}/>
)}

          {/* Routes */}
          <Routes>
          <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/studentdashboard" element={<StudentDashboard  />} />
            <Route path="/studentattendance" element={<StudentAttendance  />} />
            <Route path="/studentschedule" element={<StudentSchedule  />} />
            <Route path="/studentmarks" element={<StudentMarks  />} />
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