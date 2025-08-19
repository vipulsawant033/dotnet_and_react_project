import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

type Props = {
  darkMode: boolean;
  toggleDarkMode: (mode: boolean) => void;
};

export default function NavBar({ darkMode, toggleDarkMode }: Props) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => toggleDarkMode(!darkMode)}
        >
          {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
