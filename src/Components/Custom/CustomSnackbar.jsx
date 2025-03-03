import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const CustomSnackbar = ({ open, onClose, snackbarColor, snackbarMessage }) => {
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (open) {
      setCanClose(false);

      const timer = setTimeout(() => {
        setCanClose(true);
        onClose();
      }, 6000);

      // Limpieza del temporizador
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway" || !canClose) {
      // Si el motivo es un clic fuera o si aún no se permite cerrar, prevenir el cierre.
      return;
    }
    // Llamar a onClose solo si se permite el cierre.
    onClose();
  };

  return (
    <Snackbar
      TransitionComponent={TransitionLeft}
      open={open}
      autoHideDuration={20000}
      onClose={handleClose} // Usamos nuestra función modificada aquí.
      sx={{ zIndex: "99999" }}
    >
      <Alert
        variant="filled"
        severity={snackbarColor}
        sx={{ maxWidth: "600px" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
