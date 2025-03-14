import { Box } from "@mui/material";
import LandingPage from "./Pages/landingPage";

function App() {
  return (
    <Box sx={{ backgroundColor: "white", height: "100vh", width: "100vw", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <LandingPage />
    </Box>
  );
}

export default App;
