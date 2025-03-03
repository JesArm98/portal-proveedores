import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSnackbar } from "@/Context/SnackbarContext";

const Layout = () => {
  const { showSnackbar } = useSnackbar();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // 🔥 Control de verificación
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      if (location.pathname !== "/sign-in") {
        showSnackbar("Inicie sesión para ingresar a las opciones", "warning");
        navigate("/sign-in");
      }
    }

    setIsCheckingAuth(false); // 🚀 Solo cambia cuando termina la verificación
  }, [navigate, location.pathname]);

  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  // ⛔ Bloquea la renderización completa hasta verificar el token
  if (
    isCheckingAuth ||
    (!localStorage.getItem("token") && location.pathname !== "/sign-in")
  ) {
    return null; // 🔥 No muestra absolutamente nada mientras se valida
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar onMenuClick={toggleSidebar} isSidebarOpen={openSidebar} />
      <Sidebar open={openSidebar} onClose={toggleSidebar} />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "60px",
          transition: "margin-left 0.3s ease-in-out",
          marginLeft: openSidebar ? "280px" : "0px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
