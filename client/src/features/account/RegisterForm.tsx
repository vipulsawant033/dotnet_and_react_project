import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterSchema,
} from "../../lib/schemas/registerSchema";
import { useRegisterMutation } from "./accountApi";
import { Link } from "react-router";
import { Person } from "@mui/icons-material";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function RegisterForm() {
  const [registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isLoading },
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await registerUser(data).unwrap();
    } catch (error) {
      const apiError = error as { message: string };
      if (apiError.message && typeof apiError.message === "string") {
        const errorArray = apiError.message.split(",");

        errorArray.forEach((e) => {
          if (e.includes("Password")) {
            setError("password", { message: e });
          } else if (e.includes("Email")) {
            setError("email", { message: e });
          }
        });
      }
    }
  };

  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        marginTop={"8"}
      >
        <Person sx={{ mt: 3, color: "secondary.main", fontSize: 40 }} />
        <Typography variant="h5">Register</Typography>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          width="100%"
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          marginY={3}
        >
          <TextField
            fullWidth
            label="Email"
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading || !isValid}
          >
            Register
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            {" "}
            Already have a account?{" "}
            <Typography component={Link} to="/login" color="primary">
              Login
            </Typography>{" "}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
