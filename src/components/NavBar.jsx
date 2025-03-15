import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import MainContent from "./MainContent";
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
import IconButton from "@mui/material/IconButton";

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 60;
// Define a breakpoint below which the panel should vanish, e.g., 768px.
const panelVanishBreakpoint = 650;

function CollapsibleSidebar() {
  const name = "JD";
  const [isToggled, setIsToggled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const isSidebarExpanded = isToggled || isHovered;

  const toggleSidebar = () => {
    setIsToggled(prev => !prev);
  };

  // Manage the visibility of text within the sidebar.
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
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Conditionally render the Side Panel (Drawer) */}
        {isPanelVisible && (
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
                  bgcolor: "#FF7A7A",
                }}
              >
                {name}
              </Avatar>
              {isSidebarExpanded && (
                <Box sx={{ ml: 2 }}>
                  <Fade in={textVisible} timeout={400} unmountOnExit>
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

            {/* Navigation List */}
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <List sx={{ flexGrow: 1 }}>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/">
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <HomeIcon />
                    </ListItemIcon>
                    {isSidebarExpanded && (
                      <Fade in={textVisible} timeout={400} unmountOnExit>
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
                      <Fade in={textVisible} timeout={400} unmountOnExit>
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
                      <Fade in={textVisible} timeout={400} unmountOnExit>
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
                      <Fade in={textVisible} timeout={400} unmountOnExit>
                        <Box>
                          <Typography variant="body1">Upload Attendance</Typography>
                        </Box>
                      </Fade>
                    )}
                  </ListItemButton>
                </ListItem>
              </List>

              {/* Toggler Section */}
              <List>
                {/* Button to collapse/expand the panel */}
                <ListItem disablePadding>
                  <ListItemButton onClick={toggleSidebar}>
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {isSidebarExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                {/* Button to hide the entire panel */}
                {isSidebarExpanded && (
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => setIsPanelVisible(false)}>
                      <ListItemIcon sx={{ color: "inherit" }}>
                        <ChevronLeftIcon />
                      </ListItemIcon>
                      <Fade in={textVisible} timeout={400} unmountOnExit>
                        <Box>
                          <Typography variant="body2">Hide Sidebar</Typography>
                        </Box>
                      </Fade>
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Box>
          </Drawer>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            ml: isPanelVisible
              ? isSidebarExpanded
                ? `${drawerWidthExpanded}px`
                : `${drawerWidthCollapsed}px`
              : 0,
            transition: "0.3s ease",
            margin: {
              xs: "0 0.5rem",
              sm: "0 1rem",
              md: "0 2rem",
              lg: "0 3rem",
            },
            minHeight: "100vh",
          }}
        >
          <MainContent />
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
