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
import TextField from "@mui/material/TextField";
import { Button, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faBullhorn, faArrowUpFromBracket, faHand, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const colorsProp = {
  panelBackgroundColor: "#4D0000",
  panelTextColor: "white",
  profileBorder: "2px solid #FF7A7A",
  profileBackgroundColor: "#FF7A7A",
  hoverBackgroundColor: "#FF7A7A",
  selectedBackgroundColor: "#800000",
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
  setOffcanvasVisible,
}) => {
  const location = useLocation();

  const user = {
    name: "Yekkaluru Divya Teja",
    avatar: "Y",
    email: "divyateja050@gmail.com",
    role: (sessionStorage.getItem("role") || "student").toLowerCase(),
  };
  user.avatar = user.name[0];

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
      { name: "Announcements", path: "/anouncements", icon: faBullhorn },
      { name: "View Marks", path: "/studentMarks", icon: faArrowUpFromBracket },
      { name: "Attendance", path: "/studentattendance", icon: faHand },
      { name: "Schedule", path: "/studentschedule", icon: faHand },
    ],
  };

  const sidebarOptions = menuItems[user.role] || menuItems.student;

  const handleProfilePanel = () => {
<<<<<<<<< Temporary merge branch 1
=========
    //window.location.href = "/profile";
    console.log("profileclicked")  
>>>>>>>>> Temporary merge branch 2
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
          backgroundColor: colorsProp.panelBackgroundColor,
          color: colorsProp.panelTextColor,
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
            sm: "row",
            md: "row",
          },
          alignItems: {
            xs: "center",
            sm: "flex-start",
            md: "flex-start",
          },
          justifyContent: {
            xs: "center",
            sm: "flex-start",
            md: "flex-start",
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
            border: colorsProp.profileBorder,
            bgcolor: colorsProp.profileBackgroundColor,
          }}
        >
          {user.avatar}
        </Avatar>
        {isSidebarExpanded && (
          <Box sx={{ ml: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <Fade in={textVisible} timeout={400} unmountOnExit>
              <Box>
                <Typography variant="subtitle1">{user.name}</Typography>
                <Typography variant="caption">{user.email}</Typography>
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
<<<<<<<<< Temporary merge branch 1

        {/* Logout Button */}
=========
        <List>
          <ListItem disablePadding>
            {isSidebarExpanded && (
              <Fade in={textVisible} timeout={400} unmountOnExit>
                <Box>
                  <img src="/src/assets/Teacher.png" style={{ width: '100%', height: '100%' }} alt="Teacher" />
                </Box>
              </Fade>
            )}
          </ListItem>
        </List>
        {/* Toggler Section */}
>>>>>>>>> Temporary merge branch 2
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                alignItems: "center",
                borderRadius: colorsProp.itemBorderRadius,
                ":hover": { backgroundColor: colorsProp.hoverBackgroundColor },
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
