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

const colorsProp = {
  selectedBackgroundColor: "#6e0f0f",
  hoverBackgroundColor: "#801919",
  itemBorderRadius: "12px",
};

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

  if (location.pathname === "/") return null;

  const user = {
    name: "Yekkaluru Divya Teja",
    avatar: "Y",
    email: "divyateja050@gmail.com",
    role: (sessionStorage.getItem("role") || "student").toLowerCase(),
  };

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

  const sidebarOptions = menuItems[user.role] || menuItems.student;

  const handleProfilePanel = () => {
    //window.location.href = "/profile";
    console.log("profileclicked")  
    setProfileOffcanvasVisible(true);
    setOffcanvasVisible(true);
  };

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {setIsHovered(false)}}
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
          padding: 2,
          flexDirection: {
            xs: "column",
            sm:"row", // Column orientation for mobile (small screens)
            md: "row", // Row orientation for desktop (medium and larger screens)
          },
          alignItems: {
            xs: "center", // Center alignment for mobile
            sm: "flex-start", // Left alignment for desktop
            md: "flex-start", // Left alignment for desktop
          },
          justifyContent: {
            xs: "center", // Center on mobile
            sm: "flex-start", // Left alignment for desktop
            md: "flex-start", // Align to start on desktop
          },
          cursor: "pointer",
          pt: 2,
          pl: 0.5,
          pb: 2,
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
          <Box sx={{ ml: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <Fade in={textVisible} timeout={400} unmountOnExit>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textAlign: "center",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    textAlign: "center",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
            </Fade>
          </Box>
        )}
      </Box>

      {/* Navigation List */}
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <List sx={{ flexGrow: 1 }}>
          {sidebarOptions.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  alignItems: "center",
                  backgroundColor: location.pathname === item.path ? colorsProp.selectedBackgroundColor : "inherit",
                  borderRadius: colorsProp.itemBorderRadius,
                  ":hover": { backgroundColor: colorsProp.hoverBackgroundColor },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <FontAwesomeIcon icon={item.icon} style={{ marginRight: "8px" }} />
                </ListItemIcon>
                {isSidebarExpanded && (
                  <Fade in={textVisible} timeout={400} unmountOnExit>
                    <Typography variant="body1">{item.name}</Typography>
                  </Fade>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
        <ListItem disablePadding>
        {isSidebarExpanded && (
                <Fade in={textVisible} timeout={400} unmountOnExit>
                  <Box>
                  <img src="/src/assets/Teacher.png" style={{width: '100%', height: '100%'}} />
                  </Box>
                </Fade>
              )}
          </ListItem>
        </List>
        {/* Toggler Section */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                alignItems: "center",
                borderRadius: colorsProp.itemBorderRadius,
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