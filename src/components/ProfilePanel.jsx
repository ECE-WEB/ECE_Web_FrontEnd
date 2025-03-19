/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {Box,Drawer} from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Fade } from "@mui/material";

const ProfilePanel = () => {
    const drawerWidthExpanded =240;
    const drawerWidthCollapsed = 0;
    const [isHovered, setIsHovered] = useState(true);
  const [user, setUser] = useState({
    username: "Yekkaluru Divya Teja",
    email: "divyateja050@gmail.com",
    password: "",
    profilePic: "",
  });
  const colorsProp = {
    panelBackgroundColor: "#4D0000",
    panelTextColor: "white",
    profileBorder: "2px solid #FF7A7A",
    profileBackgroundColor: "#FF7A7A",
    hoverBackgroundColor: "#FF7A7A", // Hover color for items
    selectedBackgroundColor: "#800000", // Selected item color
    itemBorderRadius: "12px", // Border radius for items
  };
 return (
   <Drawer
         variant="permanent"
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
         <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: "bold",
            margin:"1.3rem 0rem 3rem 1rem",
            color: "#999999",
          }}
        >
          EDIT Profile
        </Typography>
         <Box
           sx={{
             display: "flex",
             flexDirection: "column",
             alignItems: "center",
             justifyContent: "center",
             p: 2,
           }}
         >
           <Box sx={{ ml: 0, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}} >
           <Avatar
             alt={user.name}
             sx={{
               width: 75,
               height: 75,
               border: colorsProp.profileBorder,
               bgcolor: colorsProp.profileBackgroundColor,
             }}
           >
             {user.avatar}
           </Avatar>
           <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{color: "#4d0000",}} />
           </Box>
             <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
               <Fade in={true} timeout={400} unmountOnExit>
                 <Box>
                   <Typography
                     variant="subtitle1"
                     sx={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                       textAlign: "center",
                       wordWrap: "break-word",
                       whiteSpace: "normal",
                       color:"#fda129"
                     }}
                   > {user.username}
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
         </Box>
       </Drawer>
  );
};

export default ProfilePanel;
