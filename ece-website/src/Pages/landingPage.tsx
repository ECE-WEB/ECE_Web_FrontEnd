import { Container, Box, Button, Typography, Card, CardContent, Grid, Avatar, Menu, MenuItem } from "@mui/material";
import sagaGif from "../assets/saga.gif";
import Logo from "../assets/Logo.jpg";
import { useState } from "react";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth={false} sx={{ backgroundColor: "white", minHeight: "100vh", width: "100vw", padding: 3, overflowX: "hidden" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={2} pb={2} mb={4}>
      <img src={Logo} alt="Logo" style={{ width: "2%", borderRadius: "12px" }} />
        <Typography variant="h4" color="#7B1919" fontWeight="bold">
          Department of Electronics and Communication Engineering
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7B1919", color: "white", boxShadow: "none", '&:hover': { backgroundColor: "#d32f2f", boxShadow: "none" } }}
          onClick={handleClick}
        >
          Login
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ boxShadow: "none", elevation: 0, '& .MuiPaper-root': { boxShadow: 'none' } }}
          MenuListProps={{ sx: { boxShadow: "none" } }}
        >
          <MenuItem onClick={handleClose}>Faculty</MenuItem>
          <MenuItem onClick={handleClose}>Alumni</MenuItem>
          <MenuItem onClick={handleClose}>Student</MenuItem>
        </Menu>
      </Box>

      {/* Category Buttons */}
      <Box display="flex" gap={2} mb={4}>
        <Button variant="contained" sx={{ backgroundColor: "#7B1919", color: "white", fontWeight: "bold", boxShadow: "none", '&:hover': { backgroundColor: "#d32f2f", boxShadow: "none" } }}>All</Button>
        <Button variant="contained" sx={{ backgroundColor: "#7B1919", color: "white", fontWeight: "bold", boxShadow: "none", '&:hover': { backgroundColor: "#d32f2f", boxShadow: "none" } }}>Academics</Button>
        <Button variant="contained" sx={{ backgroundColor: "#7B1919", color: "white", fontWeight: "bold", boxShadow: "none", '&:hover': { backgroundColor: "#d32f2f", boxShadow: "none" } }}>Sports</Button>
        <Button variant="contained" sx={{ backgroundColor: "#7B1919", color: "white", fontWeight: "bold", boxShadow: "none", '&:hover': { backgroundColor: "#d32f2f", boxShadow: "none" } }}>Career</Button>
      </Box>

      <Grid container spacing={4}>
        {/* Announcements Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ maxHeight: "500px", overflowY: "auto", paddingRight: 1, scrollbarWidth: "thin", scrollbarColor: "#7B1919 #E0E0E0" }}>
            {announcements.map((announcement) => (
              <Card key={announcement.id} sx={{ mb: 2, borderRadius: "12px", border: "2px solid black", boxShadow: "none", backgroundColor: "white" }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ bgcolor: "gray" }}>{announcement.author.charAt(0)}</Avatar>
                      <Typography variant="subtitle1" fontWeight="bold" color="black">
                        {announcement.author}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="black">{announcement.time}</Typography>
                  </Box>
                  <Typography variant="h6" mt={1} fontWeight="bold" color="black">
                    {announcement.title}
                  </Typography>
                  <Typography variant="body2" color="black">
                    {announcement.description}
                  </Typography>
                  <Typography variant="body2" color="blue" mt={1} sx={{ cursor: "pointer", textAlign: "right" }}>
                    View More
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* GIF Placeholder */}
        <Grid item xs={12} md={4}>
          <Box height={300} bgcolor="#E0E0E0" display="flex" alignItems="center" justifyContent="center" borderRadius={4} ml={4}>
            <Typography variant="h6" color="black">
              <img src={sagaGif} alt="GIF Placeholder" style={{ width: "100%", borderRadius: "12px" }} />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
