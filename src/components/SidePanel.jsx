import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Fade from "@mui/material/Fade";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faBullhorn, faArrowUpFromBracket, faHand, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";

const SidePanel = ({
  isHovered,
  isSidebarExpanded,
  drawerWidthExpanded,
  drawerWidthCollapsed,
  setIsHovered,
  textVisible,
  setProfileOffcanvasVisible,
  setOffcanvasVisible
}) => {

  const location = useLocation();

  // 🚀 **Hide sidebar if the user is on the landing page**
  if (location.pathname === "/") return null;

  // Retrieve user details and role from sessionStorage
  const user = {
    name: "Yekkaluru Divya Teja",
    avatar: "Y",
    email: "divyateja050@gmail.com",
    role: (sessionStorage.getItem("role") || "student").toLowerCase(), // Normalize to lowercase
  };

  // Define Role-Based Sidebar Menu Items
  const menuItems = {
    admin: [
      { name: "Dashboard", path: "/dashboard", icon: faLayerGroup },
      { name: "Announcements", path: "/announcements", icon: faBullhorn },
      { name: "Manage Users", path: "/manageUsers", icon: faHand },
      { name: "Upload Reports", path: "/uploadReports", icon: faArrowUpFromBracket },
    ],
    faculty: [
      { name: "Dashboard", path: "/dashboard", icon: faLayerGroup },
      { name: "Announcements", path: "/announcements", icon: faBullhorn },
      { name: "Upload Marks", path: "/uploadMarks", icon: faArrowUpFromBracket },
      { name: "Upload Attendance", path: "/uploadAttendance", icon: faHand },
    ],
    student: [
      { name: "Dashboard", path: "/studentdashboard", icon: faLayerGroup },
      { name: "Announcements", path: "/announcements", icon: faBullhorn },
      { name: "View Marks", path: "/studentMarks", icon: faArrowUpFromBracket },
      { name: "Attendance", path: "/studentattendance", icon: faHand },
      { name: "Schedule", path: "/studentschedule", icon: faHand },
    ],
  };

  // Fetch the appropriate menu list based on user role
  const sidebarOptions = menuItems[user.role] || menuItems.student;

  const handleProfilePanel = () => {
    setProfileOffcanvasVisible(true);
    setOffcanvasVisible(true);
  };

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: isHovered ? drawerWidthExpanded : drawerWidthCollapsed,
        transition: "width 0.5s ease",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isHovered ? drawerWidthExpanded : drawerWidthCollapsed,
          boxSizing: "border-box",
          transition: "width 0.4s ease",
          overflowX: "hidden",
          overflowY: "auto",
          backgroundColor: "#4D0000",
          color: "white",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          height: "100%",
        },
      }}
    >
      {/* Profile Section */}
      <Box
        onClick={handleProfilePanel}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Avatar
          alt={user.name}
          sx={{
            width: 50,
            height: 50,
            border: "2px solid #FF7A7A",
            bgcolor: "#FF7A7A",
          }}
        >
          {user.avatar}
        </Avatar>
        {isSidebarExpanded && (
          <Fade in={textVisible} timeout={400} unmountOnExit>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1">{user.name}</Typography>
              <Typography variant="caption">{user.email}</Typography>
            </Box>
          </Fade>
        )}
      </Box>

      {/* Navigation List */}
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <List sx={{ flexGrow: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                alignItems: "center",
                backgroundColor:
                  location.pathname === "/facultydashboard" ? colorsProp.selectedBackgroundColor : "inherit",
                borderRadius: colorsProp.itemBorderRadius, // Apply border radius
                ":hover": {
                  backgroundColor: colorsProp.hoverBackgroundColor, // Apply hover color
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <FontAwesomeIcon icon={faLayerGroup} style={{ marginRight: '8px' }} />
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
            <ListItemButton
              component={Link}
              to="/anouncements"
              sx={{
                alignItems: "center",
                backgroundColor:
                  location.pathname === "/anouncements" ? colorsProp.selectedBackgroundColor : "inherit",
                borderRadius: colorsProp.itemBorderRadius,
                ":hover": {
                  backgroundColor: colorsProp.hoverBackgroundColor,
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <FontAwesomeIcon icon={faBullhorn} style={{ marginRight: '8px' }} />
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
            <ListItemButton
              component={Link}
              to="/uploadMarks"
              sx={{
                alignItems: "center",
                backgroundColor:
                  location.pathname === "/uploadMarks" ? colorsProp.selectedBackgroundColor : "inherit",
                borderRadius: colorsProp.itemBorderRadius,
                ":hover": {
                  backgroundColor: colorsProp.hoverBackgroundColor,
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <FontAwesomeIcon icon={faArrowUpFromBracket} style={{ marginRight: '8px' }} />
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
            <ListItemButton
              component={Link}
              to="/uploadAttandance"
              sx={{
                alignItems: "center",
                backgroundColor:
                  location.pathname === "/uploadAttandance" ? colorsProp.selectedBackgroundColor : "inherit",
                borderRadius: colorsProp.itemBorderRadius,
                ":hover": {
                  backgroundColor: colorsProp.hoverBackgroundColor,
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <FontAwesomeIcon icon={faHand} style={{ marginRight: '8px' }} />
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

        {/* Logout Button */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                alignItems: "center",
                borderRadius: "12px",
                ":hover": { backgroundColor: "#FF7A7A" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </ListItemIcon>
              {isSidebarExpanded && (
                <Fade in={textVisible} timeout={400} unmountOnExit>
                  <Typography variant="body1">Logout</Typography>
                </Fade>
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SidePanel;
