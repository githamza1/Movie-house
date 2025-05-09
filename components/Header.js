// components/Header.js
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useThemeContext } from '../contexts/ThemeContext';

export default function Header() {
  const { darkMode, toggleDarkMode } = useThemeContext();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Movie House
        </Typography>
        <Button color="inherit" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

