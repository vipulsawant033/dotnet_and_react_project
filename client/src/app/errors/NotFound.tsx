import { SearchOff } from "@mui/icons-material";
import { Container, Paper, Typography, Divider, Button } from "@mui/material";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <Container
      component={Paper}
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 6,
      }}
    >
      <SearchOff color="primary" sx={{ fontSize: 100 }} />
      <Typography variant="h3" gutterBottom>
        Oops - we couldn't find what you were looking for.
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/catalog">
        Go back to shop
      </Button>
    </Container>
  );
}
