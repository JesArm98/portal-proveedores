import { createContext, useContext, useState, useMemo } from "react";
import CustomSnackbar from "@/Components/Custom/CustomSnackbar";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "",
  });

  const showSnackbar = (message, color) => {
    setSnackbar({ open: true, message, color });
    setTimeout(() => {
      setSnackbar({ open: false, message: "", color: "" });
    }, 7000);
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "", color: "" });
  };

  const contextValue = useMemo(
    () => ({
      snackbar,
      showSnackbar,
      closeSnackbar,
    }),
    [snackbar]
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <CustomSnackbar
        open={snackbar.open}
        onClose={closeSnackbar}
        snackbarColor={snackbar.color}
        snackbarMessage={snackbar.message}
        width="100px"
      />
    </SnackbarContext.Provider>
  );
};
