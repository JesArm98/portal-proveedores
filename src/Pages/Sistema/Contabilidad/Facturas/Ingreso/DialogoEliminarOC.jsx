import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const DialogoEliminarOC = ({ open, setOpenEliminarOC, handleEliminarOC }) => {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          bgcolor: "primary.main",
          color: "common.white",
          py: 2,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Eliminar orden de compra
      </DialogTitle>

      <HighlightOffIcon
        sx={{
          position: "absolute",
          zIndex: 13,
          color: "white",
          right: 12,
          top: 12,
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.2)",
          },
        }}
        onClick={() => setOpenEliminarOC(false)}
        variant="contained"
      />

      <DialogContent sx={{ mt: 3, px: 4 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <label
            htmlFor="ordenCompra"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            Deseas eliminar la orden de compra?
          </label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#262e66",
            color: "white",
          }}
          onClick={() => handleEliminarOC()}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogoEliminarOC;
