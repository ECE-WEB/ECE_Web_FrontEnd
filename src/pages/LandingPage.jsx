import React, { useState } from "react";
import { Container, Box, Button, Typography, Card, CardContent, Grid, Avatar, Menu, MenuItem } from "@mui/material";
import sagaGif from "../assets/saga.gif";
import Logo from "../assets/Logo.jpg";
import "../styles/LandingPage.css"; // Importing the CSS file

const announcements = [
  {
    id: 1,
    title: "Mid Time Table for E2 is announced",
    description: "Mid 2 schedule came out so I request all the students to check it",
    author: "Dean of Academics",
    time: "12:00 22/06/2025",
  },
  {
    id: 2,
    title: "Mid Time Table for E2 is announced",
    description: "Mid 2 schedule came out so I request all the students to check it",
    author: "Dean of Academics",
    time: "12:00 22/06/2025",
  },
  {
    id: 3,
    title: "Mid Time Table for E2 is announced",
    description: "Mid 2 schedule came out so I request all the students to check it",
    author: "Dean of Academics",
    time: "12:00 22/06/2025",
  },
];

const LandingPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth={false} className="landing-container">
      {/* Header */}
      <Box className="header">
        <Box className="header-content">
          <img src={Logo} alt="Logo" className="logo" />
          <Typography variant="h4" className="header-title">
            Department of Electronics and Communication Engineering
          </Typography>
        </Box>
        <Button variant="contained" className="login-button" onClick={handleClick}>
          Login
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} className="dropdown-menu">
          <MenuItem onClick={handleClose}>Faculty</MenuItem>
          <MenuItem onClick={handleClose}>Alumni</MenuItem>
          <MenuItem onClick={handleClose}>Student</MenuItem>
        </Menu>
      </Box>

      {/* Category Buttons */}
      <Box className="category-buttons">
        <Button variant="contained" className="category-button">All</Button>
        <Button variant="contained" className="category-button">Academics</Button>
        <Button variant="contained" className="category-button">Sports</Button>
        <Button variant="contained" className="category-button">Career</Button>
      </Box>

      <Grid container spacing={4}>
        {/* Announcements Section */}
        <Grid item xs={12} md={6}>
          <Box className="announcements-container">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="announcement-card">
                <CardContent>
                  <Box className="announcement-header">
                    <Box className="announcement-author">
                      <Avatar className="avatar">{announcement.author.charAt(0)}</Avatar>
                      <Typography variant="subtitle1" className="announcement-author-name">
                        {announcement.author}
                      </Typography>
                    </Box>
                    <Typography variant="caption" className="announcement-time">{announcement.time}</Typography>
                  </Box>
                  <Typography variant="h6" className="announcement-title">
                    {announcement.title}
                  </Typography>
                  <Typography variant="body2" className="announcement-description">
                    {announcement.description}
                  </Typography>
                  <Typography variant="body2" className="view-more">
                    View More
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* GIF Placeholder */}
        <Grid item xs={12} md={4}>
          <Box className="gif-container">
            <img src={sagaGif} alt="GIF Placeholder" className="gif-image" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
