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
import { Button,Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faBullhorn, faArrowUpFromBracket, faHand, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
  const user = {
    name: "Yekkaluru Divya Teja",
    avatar: "",
    email: "divyateja050@gmail.com",
  };
  user.avatar = user.name[0];
 
  const location = useLocation();

  const colorsProp = {
    panelBackgroundColor: "#4D0000",
    panelTextColor: "white",
    profileBorder: "2px solid #FF7A7A",
    profileBackgroundColor: "#FF7A7A",
    hoverBackgroundColor: "#FF7A7A", // Hover color for items
    selectedBackgroundColor: "#800000", // Selected item color
    itemBorderRadius: "12px", // Border radius for items
  };
  const handleProfilePanel = () => {
    //window.location.href = "/profile";  
    setProfileOffcanvasVisible(true);
    setOffcanvasVisible(true);
  }
  
  return (
    <>
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
            border: colorsProp.profileBorder,
            bgcolor: colorsProp.profileBackgroundColor,
          }}
        >
          {user.avatar}
        </Avatar>
        {isSidebarExpanded && (
          <Box sx={{ ml: 0, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
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
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <List sx={{ flexGrow: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/studentdashboard"
              sx={{
                alignItems: "center",
                backgroundColor:
                  location.pathname === "/studentdashboard" ? colorsProp.selectedBackgroundColor : "inherit",
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

        {/* Toggler Section */}
        <List>
        <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/logout"
              sx={{
                alignItems: "center",
                backgroundColor:
                  location.pathname === "/logout" ? colorsProp.selectedBackgroundColor : "inherit",
                borderRadius: colorsProp.itemBorderRadius,
                ":hover": {
                  backgroundColor: colorsProp.hoverBackgroundColor,
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </ListItemIcon>
              {isSidebarExpanded && (
                <Fade in={textVisible} timeout={400} unmountOnExit>
                  <Box>
                    <Typography variant="body1">Logout</Typography>
                  </Box>
                </Fade>
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
    </>
  );
};

export default SidePanel;
