/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Container, Button, Form, InputGroup } from "react-bootstrap"; // React Bootstrap
import { TextField, Box, Drawer } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPen } from "@fortawesome/free-solid-svg-icons";
import { Fade } from "@mui/material";
import { FaEdit, FaSave } from "react-icons/fa";
import { noAuto } from "@fortawesome/fontawesome-svg-core";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";

const ProfilePanel = ({isEditable,setIsEditable,setProfileOffcanvasVisible,user,setUser}) => {
  const drawerWidthExpanded = 240;
  const drawerWidthCollapsed = 0;
  const [isHovered, setIsHovered] = useState(true);
  
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  

  useEffect(() => {
    setIsEditable(isNameEditable || isEmailEditable || isPasswordEditable);
    setProfileOffcanvasVisible(true);
  }, [isNameEditable, isEmailEditable, isPasswordEditable]);
  // Function to fetch user details from API
  const fetchUserDetails = async () => {
    try {
      const response = await fetch("https://example.com/api/user/details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // Set the user details in the state
      setUser({
        username: data.username,
        email: data.email,
        password: data.password,
        profilePic: data.profilePic,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Function to update user details via API
  const handleUpdateDetails = async () => {
    try {
      const response = await fetch("https://example.com/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
        }),
      });

      if (response.ok) {
        alert("Details updated successfully!");
      } else {
        alert("Failed to update details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 0,
        }}
      ><Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: "1.4rem",
          textAlign: "left",
          margin: "1.3rem 0rem 1.5rem 1.5rem",
          color: "#999999",
        }}
      >
          Edit Profile
        </Typography></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box sx={{ ml: 0, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }} >
          <Avatar
            alt={user.name}
            sx={{
              width: 85,
              height: 85,
              border: colorsProp.profileBorder,
              bgcolor: colorsProp.profileBackgroundColor,
            }}
          >
            {user.avatar}
          </Avatar>
          <Box sx={{ backgroundColor: "#e0e0e0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", borderRadius: "5px", padding: "0.2rem", marginTop: "-0.5rem", marginLeft: "5rem" }}>
            <FontAwesomeIcon icon={faPen} size="md" style={{ color: "#4d0000", }} />
          </Box>
        </Box>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
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
                  color: "#fda129"
                }}
              > {user.name}
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
      <Container
        className={`rounded`}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#4d0000", // Light green for edit, light red for view
          maxWidth: "100%",
          padding: "0.5rem 1.5rem",
        }}
      >
        <Form>
          <Form.Group controlId="nameInput" style={{ alignContent: "center" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "left",
                margin: "0.5rem 0rem",
                color: "#999999",
              }}
            >Your Name
            </Typography>
            <InputGroup
              style={{
                backgroundColor:   isNameEditable ? "#ffffff" : "#4d0000",
                border: "none", // Light background for editable, dark for disabled
                color:   isNameEditable ? "#4d0000" : "#ffffff", // Text color matches mode
                height: "2rem", // Adjust field height
                padding: "0rem",
                width: "100%",
              }}
            >
              <Form.Control
                type="text"
                value={user.name}
                disabled={!isEditable || !isNameEditable}
                onChange={(e) => setUser({...user,name:e.target.value})}
                style={{
                  backgroundColor:   isNameEditable ? "#ffffff" : "#4d0000", // Light background for editable, dark for disabled
                  color:   isNameEditable ? "#4d0000" : "#ffffff", // Text color matches mode
                  height: "100%", // Adjust field height
                }}
                onFocus={(e) => {
                  e.target.style.border = "2px solid #fda129"; // Green border on focus
                  e.target.style.boxShadow = "0 0 4px #fda129"; // Green glow effect
                }}
                onBlur={(e) => {
                  e.target.style.border = "none"; // Revert to default border
                  e.target.style.boxShadow = "none"; // Remove glow effect
                }}
              />
              <Button
                variant={null}
                onClick={() =>{setIsNameEditable(!isNameEditable)}} // Toggle functionality
                className="d-flex align-items-center"
                style={{ padding: "0.1rem" }}
              >
                {  isNameEditable ? (
                  <>
                    <Box sx={{ backgroundColor: "#e0e0e0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", borderRadius: "5px", padding: "0.2rem" }}>
                      <FontAwesomeIcon icon={faSave} size="md" style={{ color: "#4d0000", }} />
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ backgroundColor: "#e0e0e0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", borderRadius: "5px", padding: "0.2rem" }}>
                      <FontAwesomeIcon icon={faPen} size="md" style={{ color: "#4d0000", }} />
                    </Box>
                  </>
                )}
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="emailInput" style={{ alignContent: "center" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "left",
                margin: "0.5rem 0rem",
                color: "#999999",
              }}
            >Email Id
            </Typography>
            <InputGroup
              style={{
                backgroundColor:   isEmailEditable ? "#ffffff" : "#4d0000", // Light background for editable, dark for disabled
                color:   isEmailEditable ? "#4d0000" : "#ffffff", // Text color matches mode
                height: "2rem", // Adjust field height
                padding: "0rem",
                width: "100%",
              }}
            >
              <Form.Control
                type="text"
                value={user.email}
                disabled={!isEditable || !isEmailEditable}
                onChange={(e) => setUser({...user,email:e.target.value})}
                style={{
                  backgroundColor:   isEmailEditable? "#ffffff" : "#4d0000", // Light background for editable, dark for disabled
                  color:   isEmailEditable? "#4d0000" : "#ffffff", // Text color matches mode
                  height: "100%", // Adjust field height
                }}
              />
              <Button
                variant={null}
                onClick={() => {setIsEmailEditable(!isEmailEditable);}} // Toggle functionality
                className="d-flex align-items-center"
                style={{ padding: "0.1rem" }}
              >
                {  isEmailEditable ? (
                  <>
                    <Box sx={{ backgroundColor: "#e0e0e0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", borderRadius: "5px", padding: "0.2rem" }}>
                      <FontAwesomeIcon icon={faSave} size="md" style={{ color: "#4d0000", }} />
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ backgroundColor: "#e0e0e0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", borderRadius: "5px", padding: "0.2rem" }}>
                      <FontAwesomeIcon icon={faPen} size="md" style={{ color: "#4d0000", }} />
                    </Box>
                  </>
                )}
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="passwordInput" style={{ alignContent: "center" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "left",
                margin: "0.5rem 0rem",
                color: "#999999",
              }}
            >Password
            </Typography>
            <InputGroup
              style={{
                backgroundColor:   isPasswordEditable? "#ffffff" : "#4d0000", // Light background for editable, dark for disabled
                color:   isPasswordEditable ? "#4d0000" : "#ffffff", // Text color matches mode
                height: "2rem", // Adjust field height
                padding: "0rem",
                width: "100%",
              }}
            >
              <Form.Control
                type="password"
                value={user.password}
                disabled={!isEditable || !isPasswordEditable}
                onChange={(e) => setUser({...user,password:e.target.value})}
                style={{
                  backgroundColor: isPasswordEditable ? "#ffffff" : "#4d0000", // Light background for editable, dark for disabled
                  color: isPasswordEditable ? "#4d0000" : "#ffffff", // Text color matches mode
                  height: "100%", // Adjust field height
                }}
              />
              <Button
                variant={null}
                onClick={() => {setIsPasswordEditable(!isPasswordEditable)}} // Toggle functionality
                className="d-flex align-items-center"
                style={{ padding: "0.1rem" }}

              >
                {  isPasswordEditable ? (
                  <>
                    <Box sx={{ backgroundColor: "#e0e0e0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", borderRadius: "5px", padding: "0.2rem" }}>
                      <FontAwesomeIcon icon={faSave} size="md" style={{ color: "#4d0000", }} />
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ backgroundColor: "#e0e0e0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", borderRadius: "5px", padding: "0.2rem" }}>
                      <FontAwesomeIcon icon={faPen} size="md" style={{ color: "#4d0000", }} />
                    </Box>
                  </>
                )}
              </Button>
            </InputGroup>
          </Form.Group>
          <Button
            variant="primary"
            className="mt-3"
            onClick={()=>{if(!isEditable)handleUpdateDetails()}} // Call the update function on click
            style={{
              alignSelf: "center",
              padding: "0.5rem 1rem",
              margin:"0rem 1.5rem",
              backgroundColor: "#fda129",
              color: "#ffffff",
              border: "none",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            Update Details
          </Button>
        </Form>
      </Container>
    </Drawer>
  );
};

export default ProfilePanel;
