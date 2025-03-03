import { Box, Stack } from "@mui/material";
import customBoxStyles from "./CustomBoxStyles";
import { tableCellPropsCenter } from "./CustomBoxStyles";

// Funciones de formateo
const formatFecha = (fecha) => {
  if (typeof fecha !== "string" || !fecha.includes("T")) {
    return "Fecha inválida"; // Devuelve un mensaje o un valor predeterminado
  }
  return fecha.split("T")[0];
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);
};

//* Celda para mostrar imágenes
const ImageCell = ({ cell }) => {
  const url = cell.getValue();
  return url ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={url}
        alt="Imagen"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "8px",
          objectFit: "cover", // Ajustar imagen sin distorsión
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      />
    </Box>
  ) : null;
};
ImageCell.displayName = "ImageCell";

//* Celda para mostrar enlaces
const LinkCell = ({ cell }) => {
  const url = cell.getValue();
  return url ? (
    <Box
      sx={{
        maxWidth: 200,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={url} // Mostrar URL completa al pasar el mouse
    >
      {url}
    </Box>
  ) : null;
};
LinkCell.displayName = "LinkCell";

//* Celda para formatear fechas eliminando apartir de la T
const DateCell = ({ cell }) => <Box>{formatFecha(cell.getValue())}</Box>;
DateCell.displayName = "DateCell";

//* Celda para formatear valores como porcentaje teniendo que ser numerico
const PercentCell = ({ cell }) => {
  const value = cell.getValue();
  return <Box>{`${value}%`}</Box>;
};
PercentCell.displayName = "PercentCell";

//* Celda para formatear valores de moneda
const CurrencyCell = ({ cell }) => <Box>{formatCurrency(cell.getValue())}</Box>;
CurrencyCell.displayName = "CurrencyCell";

//* Celda para mostrar el estatus con estilo
const StatusCell = ({ cell, getBackgroundColor, width }) => {
  const status = cell.getValue();
  return (
    <Box sx={customBoxStyles(width || "100px", getBackgroundColor(status))}>
      {status}
    </Box>
  );
};
StatusCell.displayName = "StatusCell";

// Celda por defecto para cualquier otro valor
const DefaultCell = ({ cell }) => <Box>{cell.getValue()}</Box>;
DefaultCell.displayName = "DefaultCell";

//* Función para generar celda por defecto
const generateDefaultCell = (field) => {
  const DefaultCellComponent = ({ cell }) => {
    const value = cell.getValue();
    const displayValue = field.valueMap
      ? field.valueMap[value] || value
      : value;

    return <Box>{displayValue}</Box>;
  };

  DefaultCellComponent.displayName = "DefaultCellComponent";
  return DefaultCellComponent;
};

//* Función para generar columnas para 'status'
const generateStatusCell = (field, getBackgroundColor) => {
  const StatusCellComponent = ({ cell }) => {
    const status = cell.getValue();
    const displayValue = field.valueMap
      ? field.valueMap[status] || "DESCONOCIDO"
      : status; // Usa el mapeo si está disponible
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
          border: `1px solid ${getBackgroundColor(status)}`,
          color: getBackgroundColor(status),
          fontWeight: "bold",
          width: field.width || "100px",
          padding: "0.2rem",
        }}
      >
        {displayValue}
      </Box>
    );
  };
  StatusCellComponent.displayName = "StatusCellComponent";
  return StatusCellComponent;
};

//* Función para mapear las columnas
const generateColumn = (field, getBackgroundColor) => {
  const {
    accessorKey,
    header,
    type,
    width,
    enableFooter,
    enableAggregation,
    footerLabel = "Total",
    colorSumFooter = "warning.main",
    ...props
  } = field;

  const column = {
    accessorKey,
    header,
    width: width || "auto",
    ...tableCellPropsCenter,
    ...props, // Incluye cualquier propiedad adicional que venga en el campo
  };

  //* Lógica centralizada basada en el tipo de dato
  switch (type) {
    case "date":
      column.Cell = DateCell;
      break;

    case "currency":
      column.Cell = CurrencyCell;

      if (enableAggregation) {
        column.aggregationFn = "sum"; // Agregación por suma
        column.AggregatedCell = ({ cell, table }) => (
          <>
            Total{" "}
            {table.getColumn(cell.row.groupingColumnId ?? "").columnDef.header}:{" "}
            <Box sx={{ color: "success.main", fontWeight: "bold" }}>
              {formatCurrency(cell.getValue())}
            </Box>
          </>
        );
        column.AggregatedCell.displayName = "AggregatedCell";
      }

      if (enableFooter) {
        column.Footer = ({ table }) => {
          const total = table
            .getPrePaginationRowModel()
            .rows.reduce(
              (acc, row) => acc + (row.original[accessorKey] || 0),
              0
            );

          return (
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {footerLabel}
              <Box color={colorSumFooter}>{formatCurrency(total)}</Box>
            </Stack>
          );
        };
        column.Footer.displayName = "Footer";
      }

      break;

    case "percent":
      column.Cell = PercentCell;
      break;

    case "status":
      column.Cell = generateStatusCell(field, getBackgroundColor);
      break;

    case "link":
      column.Cell = LinkCell;
      break;

    case "image":
      column.Cell = ImageCell;
      break;

    default:
      column.Cell = generateDefaultCell(field);
      break;
  }

  return column;
};

//* Componente ColumnGenerator
const ColumnGenerator = ({ fields, getBackgroundColor }) => {
  return fields.map((field) => generateColumn(field, getBackgroundColor));
};

// Asignar displayName al componente ColumnGenerator
ColumnGenerator.displayName = "ColumnGenerator";

export default ColumnGenerator;
