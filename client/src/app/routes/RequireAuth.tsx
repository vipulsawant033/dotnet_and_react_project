import { Navigate, Outlet, useLocation } from "react-router";
import { useUserInfoQuery } from "../../features/account/accountApi";
import { Typography } from "@mui/material";

export default function RequireAuth() {
  const { data: user, isLoading } = useUserInfoQuery();
  const location = useLocation();

  if (isLoading) return <Typography variant="h2">loaading ...</Typography>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
