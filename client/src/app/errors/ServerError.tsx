import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation();
  return (
    <Container component={Paper}>
      {state.error ? (
        <>
          <Typography
            variant="h3"
            color="error"
            gutterBottom
            sx={{ px: 4, pt: 4 }}
          >
            {state?.error?.title}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ px: 4, py: 2 }}>
            {state?.error?.detail || "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography
          variant="h3"
          color="error"
          gutterBottom
          sx={{ px: 4, pt: 4 }}
        >
          Server Error
        </Typography>
      )}
    </Container>
  );
}
