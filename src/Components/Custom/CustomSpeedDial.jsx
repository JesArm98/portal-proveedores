import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomSpeedDialAction = styled(SpeedDialAction)(() => ({
  "&.MuiButtonBase-root": {
    width: 20,
    height: 20,
    minHeight: "auto",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  ".MuiSvgIcon-root": {
    width: 20,
    height: 20,
  },
}));

const speedDialStyleIcon = {
  position: "relative",
  margin: "auto",
  "& .MuiFab-primary": {
    width: 20,
    height: 20,
    minHeight: "auto",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiSpeedDialIcon-icon": {
    fontSize: 22,
    marginTop: "1px",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};

const CustomSpeedDial = ({ actions = [], rowId, openRowId, setOpenRowId }) => {
  const isOpen = openRowId === rowId; // Saber si este SpeedDial está abierto

  const handleOpen = () => {
    setOpenRowId(isOpen ? null : rowId); // Si está abierto, lo cierra; si no, lo abre y cierra los demás
  };

  return (
    <Box
      sx={{
        width: isOpen ? "auto" : "50px",
        position: "relative",
        transition: "width 0.3s ease-in-out",
        marginLeft: "35px",
      }}
    >
      <SpeedDial
        ariaLabel={`SpeedDial-${rowId}`}
        icon={<SpeedDialIcon sx={{ color: "black" }} onClick={handleOpen} />}
        sx={speedDialStyleIcon}
        open={isOpen}
        direction="right"
      >
        {actions.map(
          ({ tooltipTitle, icon, onClick, condition = true }, index) =>
            condition ? (
              <CustomSpeedDialAction
                key={index}
                icon={icon}
                tooltipTitle={tooltipTitle}
                onClick={() => {
                  onClick();
                  setOpenRowId(null); // Cerrar el SpeedDial después de hacer clic en una acción
                }}
              />
            ) : null
        )}
      </SpeedDial>
    </Box>
  );
};

export default CustomSpeedDial;
