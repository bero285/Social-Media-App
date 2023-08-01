import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WiddgetWrapper = styled(Box)(({ theme,position }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.75rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
  position:position
}));
export default WiddgetWrapper;
