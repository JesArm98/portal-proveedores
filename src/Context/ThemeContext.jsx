import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createContext, useMemo, useState, useContext } from "react";

// Crear contexto de tema
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderComponent = ({ children }) => {
  // Estado para manejar el tema
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  // Alternar entre los modos de tema
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  // Definir el tema de MUI
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode, // Cambia entre "light" y "dark"
          primary: {
            main: mode === "light" ? "#1976d2" : "#90caf9",
          },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
          text: {
            primary: mode === "light" ? "#000000" : "#ffffff",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
