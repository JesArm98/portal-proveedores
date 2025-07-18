import { useEffect, useState } from "react";
import { useSnackbar } from "@/Context/SnackbarContext";
import CustomTable from "@/Components/Custom/CustomTable";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SourceIcon from "@mui/icons-material/Source";
import AddIcon from "@mui/icons-material/Add";
import { mkConfig } from "export-to-csv";
import IconButtonWithTooltip from "@/Components/Custom/IconButtonWithTooltip";
import { tableCellPropsCenter } from "@/Components/Custom/CustomBoxStyles";
import ExportCsvButton from "@/Components/Custom/ExportCsvButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  CircularProgress,
  DialogTitle,
  Backdrop,
  ListItemText,
  ListItemIcon,
  ListItem,
  Typography,
  List,
} from "@mui/material";
import { useAuth } from "@/Context/AuthContext";
import ConceptosIngresos from "../Ingreso/ConceptosIngresos";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TablaFacturaIngresos from "./TablaCrearFacturaIngreso";
import { InsertDriveFile } from "@mui/icons-material";
import DragAndDropArea from "../Ingreso/DragAndDropArea";
import PreviewDialog from "@/Components/Custom/PreviewDialog";
import CustomDialog from "@/Components/Custom/CustomDialog";

const URL = import.meta.env.VITE_API_URL;

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "Complementos de facturas",
});

function ComplementosFacturas() {
  const [total, setTotal] = useState(0);
  const [contador, setContador] = useState(1);
  const [invalidos, setInvalidos] = useState(false);
  const [validadaCount, setValidadaCount] = useState("");
  const [VerificacionData, setVerificacionData] = useState(null);
  const [verificacionDataConOC, setVerificacionDataConOC] = useState(null);
  const { showSnackbar } = useSnackbar();
  const [isMobile] = useState(window.innerWidth <= 600);
  const [agencias, setAgencias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [conceptosDialogOpen, setConceptosDialogOpen] = useState(false);
  const [PDF, setPDF] = useState("");
  const [openPDF, setOpenPDF] = useState(false);
  const [base64Files, setBase64Files] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validados, setValidados] = useState(false);
  const [conceptos, setConceptos] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const { getConfig } = useAuth();

  const location = useLocation(); // Obtenemos el objeto location

  console.log(invalidos);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const config = getConfig();
        const respuesta = await axios.get(
          `https://${URL}/WS/TuvanosaProveedores/Api/ComplementoPago/GetComplementosPagos?periodo=0&mes=0&idEmpresa=0&idProveedor=0`,
          config
        );
        setAgencias(respuesta.data);
      } catch (error) {
        if (error.response) {
          // Si el error tiene respuesta del servidor, revisamos el código de estado
          if (error.response.status === 401) {
            showSnackbar("Sesión expirada. Redirigiendo al login...", "error");
            localStorage.clear(); // Limpiar el almacenamiento local
            navigate("/sign-in"); // Redirigir al login
          }
        } else if (error.message === "Network Error") {
          showSnackbar("Sesión expirada. Redirigiendo al login...", "error");
          localStorage.clear(); // Limpiar el almacenamiento local
          navigate("/sign-in"); // Redirigir al login
        } else {
          console.error("Error al obtener los datos:", error);
        }
        showSnackbar(`${error.response.data}`, "error");
      } finally {
        setIsLoading(false);
      }
    };

    obtenerDatos();
  }, [contador, navigate]);

  const handleOnCloseCrear = async () => {
    setOpenDialog(false);
    setVerificacionData(null);
    setValidados(false);
    setBase64Files([]);
    setInvalidos(false);
    setVerificacionDataConOC(null);
  };

  const handleOpenPDF = async (id) => {
    try {
      const config = getConfig();

      const respuesta = await axios.get(
        `https://${URL}/WS/TuvanosaProveedores/Api/ComplementoPago/GetComplementoPagoPdfByUUID?uuid=${id}`,

        config
      );

      if (respuesta.status === 200) {
        setPDF({
          archivoB64: respuesta.data,
          type: "application/pdf",
          nombreDoc: `Factura`,
        });

        console.log(respuesta.data);
      }
    } catch (error) {
      showSnackbar(PDF, "error");
    } finally {
      setOpenPDF(true);
    }
  };

  const handleOpenXML = async (id) => {
    try {
      const config = getConfig();
      const respuesta = await axios.get(
        `https://${URL}/WS/TuvanosaProveedores/Api/ComplementoPago/GetComplementoPagoXmlByUUID?uuid=${id}`,
        { ...config, responseType: "text" }
      );

      if (respuesta.status === 200) {
        const blob = new Blob([respuesta.data], { type: "application/xml" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `factura_${id}.xml`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        showSnackbar(`Descargado XML de la factura ${id}`, "success");
      }
    } catch (error) {
      showSnackbar("Error downloading the XML file", "error");
    }
  };

  const handleOpenConceptos = async (conceptos) => {
    setConceptos(conceptos);
    setConceptosDialogOpen(true);
  };

  const getBackgroundColor = (status) => {
    if (status === true || status === "Cargada") return "#2e7d32";
    if (status === false) return "#d32f2f";
    return "#9e9e9e";
  };

  const columns = [
    {
      accessorKey: "descrEstatusSap",
      header: "ESTATUS",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => {
        const status = cell.getValue() ?? ""; // Protección para valores nulos
        return (
          <Box
            sx={{
              display: "flex",
              margin: "auto",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              border: `1px solid ${getBackgroundColor(status)}`,
              color: getBackgroundColor(status),
              fontWeight: "bold",
              width: "120px",
              p: "0.2rem",
            }}
          >
            {status.toUpperCase()}
          </Box>
        );
      },
    },
    {
      accessorKey: "estatusSat",
      header: "ESTATUS SAT",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => {
        const status = cell.getValue() ?? ""; // Protección para valores nulos
        return (
          <Box
            sx={{
              display: "flex",
              margin: "auto",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              border: `1px solid ${getBackgroundColor(status)}`,
              color: getBackgroundColor(status),
              fontWeight: "bold",
              width: "120px",
              p: "0.2rem",
            }}
          >
            {status === true
              ? "VIGENTE"
              : status === false
                ? "CANCELADA"
                : "ERROR"}
          </Box>
        );
      },
    },
    {
      accessorKey: "uuid",
      header: "UUID",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "", // Protección contra valores nulos
    },
    {
      accessorKey: "facturaDto.Fecha",
      header: "Fecha factura",
      Cell: ({ cell }) => {
        const rawDate = cell.getValue() ?? ""; // Protección contra nulos
        if (!rawDate) return "";
        const date = new Date(rawDate);
        return date.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.Folio",
      header: "Folio",
      Cell: ({ cell }) => cell.getValue() ?? "", // Protección contra valores nulos
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.Emisor.Rfc",
      header: "RFC Emisor",
      Cell: ({ cell }) => cell.getValue() ?? "", // Protección contra valores nulos
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.Emisor.Nombre",
      header: "Nombre Emisor",
      Cell: ({ cell }) => cell.getValue() ?? "", // Protección contra valores nulos
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.Emisor.RegimenFiscal",
      header: "Regimen Emisor",
      Cell: ({ cell }) => cell.getValue() ?? "", // Protección contra valores nulos
      ...tableCellPropsCenter,
    },

    {
      accessorKey: "facturaDto.Receptor.Rfc",
      header: "RFC Receptor",
      Cell: ({ cell }) => cell.getValue() ?? "", // Protección contra valores nulos
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.Receptor.Nombre",
      header: "Nombre Receptor",
      Cell: ({ cell }) => cell.getValue() ?? "", // Protección contra valores nulos
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.Receptor.UsoCFDI",
      header: "Uso CFDI",
      Cell: ({ cell }) => cell.getValue() ?? "", // Protección contra valores nulos
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.TipoDeComprobante",
      header: "Tipo C",
      Cell: ({ cell }) => {
        const value = cell.getValue() ?? "";
        if (value === "P") return `Complemento Pago`;
        else return "Invalido";
      },
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.SubTotal",
      header: "SubTotal",
      Cell: ({ cell }) => {
        const value = cell.getValue() ?? 0; // Protección contra valores nulos
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(value);
      },
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.Impuestos.TotalImpuestosTrasladados",
      header: "Impuestos traslados",
      Cell: ({ cell }) => {
        const value = cell.getValue() ?? 0; // Protección contra valores nulos
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(value);
      },
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.Total",
      header: "Total",
      Cell: ({ cell }) => {
        const value = cell.getValue() ?? 0; // Protección contra valores nulos
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(value);
      },
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.Moneda",
      header: "Moneda",
      Cell: ({ cell }) => cell.getValue() ?? "", // Protección contra valores nulos
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "descrEmpl",
      header: "Responsable",
      Cell: ({ cell }) => cell.getValue() ?? "", // Protección contra valores nulos
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.Version",
      header: "Versión",
      Cell: ({ cell }) => cell.getValue() ?? "", // Protección contra valores nulos
      ...tableCellPropsCenter,
    },
  ];

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);

    // Aseguramos que la validación sea insensible a mayúsculas
    const xmlFiles = files.filter((file) =>
      file.name.toLowerCase().endsWith(".xml")
    );

    setLoading(true);
    try {
      const fileObjectsPromises = xmlFiles.map(async (file) => {
        const archivoB64 = await convertFileToBase64(file);
        return {
          nombreArchivo: file.name,
          archivoB64,
        };
      });
      const base64Files = await Promise.all(fileObjectsPromises);
      setBase64Files(base64Files);
    } catch (error) {
      console.error("Error al convertir archivos:", error);
    } finally {
      setLoading(false);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleValidar = async () => {
    const config = getConfig();
    const data = {
      archivosXMLB64: base64Files,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        `https://${URL}/WS/TuvanosaProveedores/Api/ComplementoPago/ValidateComplementoPago`,
        data,
        config
      );

      // Verificar el código de estado
      if (response.status !== 200) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      // En axios, la respuesta está en response.data
      setVerificacionData(response.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    } finally {
      setValidados(true);
      setLoading(false);
    }
  };

  const handleCrear = async () => {
    setLoading(true);
    const config = getConfig();
    const data = verificacionDataConOC ?? VerificacionData;
    setLoading(true);
    try {
      const response = await axios.post(
        `https://${URL}/WS/TuvanosaProveedores/Api/ComplementoPago/CreateComplementoPago`,
        data,
        config
      );

      // Verificar el código de estado
      if (response.status !== 200) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      // En axios, la respuesta está en response.data
      console.log(response.data);
      showSnackbar(`${response.data}`, "success");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    } finally {
      setLoading(false);

      handleOnCloseCrear();
      setContador(contador + 1);
    }
  };

  const getUserDocumentLink =
    "https://firebasestorage.googleapis.com/v0/b/tvn-api-store.appspot.com/o/documentos%2FManuales%20intranet%2FManualFacturasComplementos.pdf?alt=media&token=597fca21-3622-4131-9b61-3d9352dc6ae1";

  return (
    <Box>
      <CustomTable
        columns={columns}
        data={agencias}
        state={{ isLoading }}
        muiTableContainerProps={{
          sx: {
            maxHeight: "60vh",
          },
        }}
        enableRowActions
        renderRowActions={({ row }) => {
          return (
            <Box
              sx={{
                width: "auto",
                position: "relative",
              }}
            >
              <>
                <IconButtonWithTooltip
                  tooltipTitle="Visualizar facturas del complemento"
                  iconColor="#2196F3"
                  IconComponent={<SourceIcon />}
                  onIconClick={() => handleOpenConceptos(row.original.id)}
                />

                <IconButtonWithTooltip
                  tooltipTitle="Visualizar PDF"
                  iconColor="#2196F3"
                  IconComponent={<PictureAsPdfIcon />}
                  onIconClick={() => handleOpenPDF(row.original.uuid)}
                />

                <IconButtonWithTooltip
                  sx
                  tooltipTitle="Descargar XML"
                  iconColor="#2196F3"
                  IconComponent={
                    <img
                      src="/images/XML icon.png"
                      alt="Icono de PDF"
                      style={{
                        width: "34px",
                        height: "20px",
                        filter:
                          "invert(27%) sepia(79%) saturate(3486%) hue-rotate(202deg) brightness(98%) contrast(92%)",
                      }}
                    />
                  }
                  onIconClick={() => handleOpenXML(row.original.uuid)}
                />
              </>
            </Box>
          );
        }}
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{
              width: "fit-content",
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              style={{ width: "fit-content", color: "#262E66" }}
              startIcon={<InfoOutlinedIcon />}
              onClick={() => {
                window.open(getUserDocumentLink, "_blank");
              }}
            >
              {"AYUDA"}
            </Button>
            <Button
              color="primary"
              onClick={() => setOpenDialog(true)}
              startIcon={<AddIcon />}
            >
              {isMobile ? "" : "Agregar"}
            </Button>
            {/* Usar el componente de exportación */}
            <ExportCsvButton
              rows={table.getPrePaginationRowModel().rows}
              columns={columns}
              csvConfig={csvConfig}
            />
          </Box>
        )}
      />

      {/*Crear Factura*/}
      <Dialog
        open={openDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "primary.main",
            color: "common.white",
            py: 2,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Crear Complemento
        </DialogTitle>

        <HighlightOffIcon
          sx={{
            position: "absolute",
            zIndex: 13,
            color: "white",
            right: 18,
            top: 18,
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.2)",
            },
          }}
          variant="contained"
          onClick={handleOnCloseCrear}
        />

        {!VerificacionData && base64Files.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
              {base64Files.length} XML seleccionado
              {base64Files.length !== 1 ? "s" : ""}
            </Typography>
            <List
              sx={{
                bgcolor: "grey.100",
                borderRadius: 2,
                p: 2,
                maxHeight: "240px",
                overflowY: base64Files.length > 5 ? "auto" : "visible",
              }}
            >
              {base64Files.map((archivo, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemIcon>
                    <InsertDriveFile color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={archivo.nombreArchivo}
                    primaryTypographyProps={{ fontWeight: "medium" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {!VerificacionData && (
          <DragAndDropArea
            onFileSelect={(files) => handleFileUpload({ target: { files } })}
            loading={loading}
          />
        )}

        {loading && (
          <Backdrop open={loading} sx={{ zIndex: 9999, color: "#fff" }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        {VerificacionData && (
          <Box sx={{ width: "96%", margin: "0 auto", mb: 3 }}>
            <TablaFacturaIngresos
              agencias={VerificacionData}
              setInvalidos={setInvalidos}
              setValidadaCount={setValidadaCount}
              total={total}
              setTotal={setTotal}
              setVerificacionDataConOC={setVerificacionDataConOC}
              location={location}
            />
          </Box>
        )}

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disabled={
              loading ||
              base64Files.length === 0 ||
              (validados && validadaCount <= 0)
            }
            onClick={validados ? handleCrear : handleValidar}
            sx={{
              fontWeight: "bold",
              px: 2,

              borderRadius: 2,
              "&:disabled": {
                bgcolor: "action.disabledBackground",
                color: "action.disabled",
              },
            }}
          >
            {validados ? "Subir validos" : "Validar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* PDF DIALOG */}
      {PDF ? (
        <PreviewDialog
          previewData={PDF}
          transitionTimeout={400}
          open={openPDF}
          onClose={() => {
            setOpenPDF(false);
            setPDF("");
          }}
        />
      ) : null}

      {/*Conceptos*/}
      <CustomDialog
        title={"Facturas del complemento"}
        transitionTimeout={400}
        open={conceptosDialogOpen}
        onPdfPreview={true}
        paddingContent={0}
        onClose={() => setConceptosDialogOpen(false)}
        width="md"
        fullWidth
      >
        <ConceptosIngresos conceptos={conceptos} />
      </CustomDialog>
    </Box>
  );
}

export default ComplementosFacturas;
