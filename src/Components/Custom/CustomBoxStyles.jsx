// customStyles.js
const customBoxStyles = (width = "100px", color = "#000") => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: "4px",
  border: `1px solid ${color}`,
  color: color,
  fontWeight: "bold",
  width: width,
  p: "0.2rem",
});

// Puedes exportar una configuración adicional para las celdas
export const tableCellPropsCenter = {
  size: "auto",
  enableClickToCopy: true,
  muiTableHeadCellProps: {
    align: "center",
  },
  muiTableBodyCellProps: {
    align: "center",
  },
};

export const speedDialStyleConf = {
  "&.MuiButtonBase-root": {
    width: 20,
    height: 20,
    minHeight: "auto",
    backgroundColor: "transparent", // Fondo transparente
    boxShadow: "none", // Sin sombra
  },
  ".MuiFab-root": {
    width: 20,
    height: 20,
    minHeight: "auto",
    backgroundColor: "transparent", // Fondo transparente
    boxShadow: "none", // Sin sombra
  },
  ".MuiSpeedDialAction-staticTooltipLabel": {
    fontSize: 10, // Ajusta el tamaño de la etiqueta si es necesario
  },
  ".MuiSvgIcon-root": {
    width: 15,
    height: 15,
  },
};

export const speedDialStyleIcon = {
  position: "relative",
  margin: "auto",
  "& .MuiFab-primary": {
    width: 25,
    height: 25,
    minHeight: "auto", // Sobrescribe el minHeight predeterminado
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent", // Evitar cambio de color al hacer hover
    },
  },
  "& .MuiSpeedDialIcon-icon": {
    fontSize: 22,
    marginTop: "1px",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent", // Evitar cambio de color al hacer hover
    },
  },
};

export default customBoxStyles;
