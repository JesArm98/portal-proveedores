// ExportCsvButton.js
import { useState } from "react";
import { generateCsv, download } from "export-to-csv";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, CircularProgress, LinearProgress } from "@mui/material";

const ExportCsvButton = ({ rows, columns, csvConfig }) => {
  const [exportarDisa, setExportarDisa] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0); // Progreso de la exportación
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMobile] = useState(window.innerWidth <= 600);

  const handleExportRows = async () => {
    if (!rows?.length || !columns?.length) {
      console.warn("No hay datos para exportar");
      return;
    }
    setExportarDisa(true);
    setIsExporting(true);
    setIsCompleted(false);
    setProgress(0);

    // Obtener los accessorKey y headers de las columnas
    const columnsToExport = columns.map((column) => ({
      accessorKey: column.accessorKey,
      header: column.header,
    }));

    // Dividir el procesamiento de datos en partes
    const rowData = [];
    const totalRows = rows.length;

    for (let i = 0; i < totalRows; i++) {
      const row = rows[i];
      const filteredRow = {};

      columnsToExport.forEach((col) => {
        if (
          Object.prototype.hasOwnProperty.call(row.original, col.accessorKey)
        ) {
          filteredRow[col.header] = row.original[col.accessorKey];
        }
      });

      rowData.push(filteredRow);

      // Actualizar progreso después de procesar cada fila
      const newProgress = ((i + 1) / totalRows) * 100;
      setProgress(newProgress);
    }

    // Mostrar el check y esperar antes de descargar
    setIsExporting(false);
    setIsCompleted(true);

    setTimeout(() => {
      // Generar y descargar el CSV después de completar el procesamiento
      const csv = generateCsv(csvConfig)(rowData);
      download(csvConfig)(csv);

      // Reiniciar el botón después de la descarga
      setIsCompleted(false);
      setExportarDisa(false); // Habilita el botón
    }, 1500); // Aumentado a 1.5 segundos para mejor feedback visual
  };

  return (
    <div style={{ width: "fit-content", position: "relative" }}>
      {/* Barra de progreso lineal encima del botón */}
      {isExporting && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            width: "100%",
            marginBottom: 1,
            height: 4,
            borderRadius: 2,
            "& .MuiLinearProgress-bar": {
              transition: "transform 0.2s linear",
            },
          }}
        />
      )}

      <Button
        style={{
          width: "fit-content",
          transition: "all 0.3s ease",
          transform: isExporting ? "scale(1.02)" : "scale(1)",
        }}
        color="success"
        disabled={rows.length === 0 || exportarDisa}
        onClick={handleExportRows}
        startIcon={
          isCompleted ? (
            <CheckCircleIcon
              sx={{
                color: "green",
                animation: "fadeIn 0.5s ease-in",
              }}
            />
          ) : isExporting ? (
            <CircularProgress
              variant="determinate"
              value={progress}
              size={20}
              sx={{
                color: "#262E66",
                transition: "all 0.3s ease",
              }}
            />
          ) : (
            <FileDownloadIcon />
          )
        }
      >
        {isExporting ? "Exportando..." : isMobile ? "" : "Exportar"}
      </Button>
    </div>
  );
};

// Animaciones CSS mejoradas
const styles = `
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
`;

// Agregar el estilo CSS al documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ExportCsvButton;
