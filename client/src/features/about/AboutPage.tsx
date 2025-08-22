import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import {
  useLazyGet400ErrorQuery,
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetValidationErrorQuery,
} from "./errorApi";
import { useState } from "react";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [trigger400] = useLazyGet400ErrorQuery();
  const [trigger401] = useLazyGet401ErrorQuery();
  const [trigger404] = useLazyGet404ErrorQuery();
  const [trigger500] = useLazyGet500ErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        const errorArray = (err as { message: string }).message.split(",");
        setValidationErrors(errorArray);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        About Page Error Testing
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            trigger400().catch((err) => {
              console.log(err);
            })
          }
        >
          Test 400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            trigger401().catch((err) => {
              console.log(err);
            })
          }
        >
          Test 401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            trigger404().catch((err) => {
              console.log(err);
            })
          }
        >
          Test 404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            trigger500().catch((err) => {
              console.log(err);
            })
          }
        >
          Test 500 Error
        </Button>
        <Button variant="contained" onClick={() => getValidationError()}>
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>{error}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
