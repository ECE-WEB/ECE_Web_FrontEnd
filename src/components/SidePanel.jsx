import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Fade from "@mui/material/Fade";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 70;

function CollapsibleSidebar() {
  
  const [isToggled, setIsToggled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const isSidebarExpanded = (isToggled && isHovered);

  const toggleSidebar = () => {
    setIsToggled((prev) => !prev);
  };

  useEffect(() => {
    if (isSidebarExpanded) {
      const timer = setTimeout(() => {
        setTextVisible(true);
      }, 300); 
      return () => clearTimeout(timer);
    } else {
      
      setTextVisible(false);
    }
  }, [isSidebarExpanded]);

  return (
    <Router>
      <Box sx={{ display: "flex" ,overflowY: "auto",height: "100vh"}}>
        <CssBaseline />

        {/* Left Sidebar */}
        <Drawer
          variant="permanent"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            width: isSidebarExpanded ? drawerWidthExpanded : drawerWidthCollapsed,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isSidebarExpanded ? drawerWidthExpanded : drawerWidthCollapsed,
              boxSizing: "border-box",
              transition: "width 0.5s ease",
              overflowX: "hidden",
              overflowY: "auto",
              backgroundColor: "#4D0000",
              color: "white",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              height: "100vh",
            },
          }}
        >
          {/* Profile Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isSidebarExpanded ? "row" : "column",
              alignItems: "center",
              justifyContent: isSidebarExpanded ? "flex-start" : "center",
              p: 2,
              borderBottom: "1px solid #ddd",
            }}
          >
            <Avatar
              alt="John Doe"
              sx={{
                width: 45,
                height: 45,
                border: "2px solid #FF7A7A",
                bgcolor: "#FF5722",
              }}
            >
              JD
            </Avatar>
            {isSidebarExpanded && (
              <Box sx={{ ml: 2 }}>
                <Fade in={textVisible} timeout={300} unmountOnExit>
                  <Box>
                    <Typography variant="subtitle1">John Doe</Typography>
                    <Typography variant="caption" color="text.secondary">
                      john.doe@example.com
                    </Typography>
                  </Box>
                </Fade>
              </Box>
            )}
          </Box>

          {/* Navigation List and Toggle Button */}
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <List sx={{ flexGrow: 1 }}>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/">
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <HomeIcon />
                  </ListItemIcon>
                  {isSidebarExpanded && (
                    <Fade in={textVisible} timeout={300} unmountOnExit>
                      <Box>
                        <Typography variant="body1">Dashboard</Typography>
                      </Box>
                    </Fade>
                  )}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/about">
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <InfoIcon />
                  </ListItemIcon>
                  {isSidebarExpanded && (
                    <Fade in={textVisible} timeout={300} unmountOnExit>
                      <Box>
                        <Typography variant="body1">Announcements</Typography>
                      </Box>
                    </Fade>
                  )}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/contact">
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <ContactMailIcon />
                  </ListItemIcon>
                  {isSidebarExpanded && (
                    <Fade in={textVisible} timeout={300} unmountOnExit>
                      <Box>
                        <Typography variant="body1">Upload Marks</Typography>
                      </Box>
                    </Fade>
                  )}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/contact">
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <ContactMailIcon />
                  </ListItemIcon>
                  {isSidebarExpanded && (
                    <Fade in={textVisible} timeout={300} unmountOnExit>
                      <Box>
                        <Typography variant="body1">Upload Attandance</Typography>
                      </Box>
                    </Fade>
                  )}
                </ListItemButton>
              </ListItem>
            </List>

            {/* Toggle Button at the Bottom */}
            <List>
              <ListItem disablePadding onClick={toggleSidebar}>
                <ListItemButton >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {isSidebarExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: isSidebarExpanded ? `${drawerWidthExpanded}px` : `${drawerWidthCollapsed}px`,
            transition: "margin-left 0.3s ease",
          }}
        >
          <Toolbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Typography variant="h4">Home Content</Typography>
                  <Typography paragraph>This is the home page.</Typography>
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Typography variant="h4">About Content</Typography>
                  <Typography paragraph>This is the about page.</Typography>
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Typography variant="h4">Contact Content</Typography>
                  <Typography paragraph>This is the contact page.</Typography>
                </>
              }
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default CollapsibleSidebar;
