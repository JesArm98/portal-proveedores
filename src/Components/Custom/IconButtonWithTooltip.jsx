import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const IconButtonWithTooltip = ({
  tooltipTitle,
  iconColor,
  IconComponent,
  onIconClick,
  disabled = false,
}) => {
  return (
    <Tooltip arrow title={tooltipTitle}>
      <IconButton
        color="default"
        onClick={onIconClick}
        sx={{ color: iconColor }}
        disabled={disabled}
      >
        {IconComponent}
      </IconButton>
    </Tooltip>
  );
};

export default IconButtonWithTooltip;
