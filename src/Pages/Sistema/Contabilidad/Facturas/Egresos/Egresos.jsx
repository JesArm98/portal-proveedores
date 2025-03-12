import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { mkConfig } from "export-to-csv";
import IconButtonWithTooltip from "@/Components/Custom/IconButtonWithTooltip";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { InsertDriveFile } from "@mui/icons-material";
import { tableCellPropsCenter } from "@/Components/Custom/CustomBoxStyles";
import { useAuth } from "@/Context/AuthContext";
import { useSnackbar } from "@/Context/SnackbarContext";
import CustomTable from "@/Components/Custom/CustomTable";
import ExportCsvButton from "@/Components/Custom/ExportCsvButton";
import AddIcon from "@mui/icons-material/Add";
import PreviewDialog from "@/Components/Custom/PreviewDialog";
import CustomDialog from "@/Components/Custom/CustomDialog";
import TablaFacturaIngresos from "../../Facturas/Ingreso/TablaCrearFacturaIngreso";
import DragAndDropArea from "../Ingreso/DragAndDropArea";

const URL = import.meta.env.VITE_API_URL;

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "Facturas Gastos",
});

function Egresos() {
  const { showSnackbar } = useSnackbar();
  const [agencias, setAgencias] = useState([]);
  const [xmlDownload, setXmlDownload] = useState(false);
  const [pdfPreview, setPdfPreview] = useState(false);
  const [PDF, setPDF] = useState("");
  const [openPDF, setOpenPDF] = useState(false);
  const [isMobile] = useState(window.innerWidth <= 600);
  const { getConfig } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(1);
  const [contador, setContador] = useState(1);
  const [aviso, setAviso] = useState(true);
  //  const [avisoMantenimiento, setAvisoMantenimiento] = useState(true);
  const [VerificacionData, setVerificacionData] = useState(null);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(1);
  const [verificacionDataConOC, setVerificacionDataConOC] = useState(null);
  const [validados, setValidados] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidos, setInvalidos] = useState(false);
  const [validadaCount, setValidadaCount] = useState("");
  const [fetchSucursales, setFetchSucursales] = useState(false);
  const [total, setTotal] = useState(0);
  const [fileState, setFileState] = useState({
    base64Files: [],
    selectedUuid: null,
    PDF: "",
    data: [],
  });

  const location = useLocation(); // Obtenemos el objeto location

  const [uiState, setUiState] = useState({
    isLoading: true,
    isSubmitting: false,
    pdfPreview: false,
    xmlDownload: false,
    openPDF: false,
    openDialog: false,
    openValidateDialog: false,
  });

  const [sucursales, setSucursales] = useState([]);
  const [empresas, setEmpresas] = useState([]); // Estado para almacenar empresas

  console.log(invalidos);

  const obtenerDatos = async () => {
    try {
      const config = getConfig();

      const respuesta = await axios.get(
        `https://${URL}/WS/TuvanosaProveedores/Api/FacturasEgresos/GetFacturas?rol=5`,
        config
      );

      setAgencias(respuesta.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setUiState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  useEffect(() => {
    setFetchSucursales(true);
    const fetchSucursales = async () => {
      const idEmpresa = empresaSeleccionada
        ? empresaSeleccionada
        : localStorage.getItem("idEmpresa");

      if (!idEmpresa) return;

      try {
        const config = getConfig();
        const response = await axios.get(
          `https://${URL}/WS/TuvanosaEmpleados/Api/Empleados/GetSucursales?id_empresa=${idEmpresa}`,
          config
        );

        setSucursales(response.data);
      } catch (error) {
        console.error("Error al obtener las sucursales: ", error);
      } finally {
        setFetchSucursales(false);
      }
    };

    fetchSucursales();
  }, [empresaSeleccionada]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const config = getConfig();
        const response = await axios.get(
          `https://${URL}/WS/TuvanosaEmpleados/Api/Empleados/GetEmpresas`,
          config
        );
        setEmpresas(response.data); // Guardamos la lista de empresas
      } catch (error) {
        console.error("Error al obtener las empresas: ", error);
      }
    };

    fetchEmpresas();
  }, []);

  const handleOpenPDF = async (id) => {
    setPdfPreview(true);
    try {
      const config = getConfig();

      const respuesta = await axios.get(
        `https://${URL}/WS/TuvanosaProveedores/Api/FacturasEgresos/GetFacturaPdfByUUID?uuid=${id}`,

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
      // Add a 3-second delay before setting xmlDownload to false
      setTimeout(() => {
        setPdfPreview(false);
      }, 1000); // 3000ms = 3 seconds
    }
  };

  const handleOpenXML = async (id) => {
    setXmlDownload(true);
    try {
      const config = getConfig();
      // Ensure the response is received as text
      const respuesta = await axios.get(
        `https://${URL}/WS/TuvanosaProveedores/Api/FacturasEgresos/GetFacturaXmlByUUID?uuid=${id}`,
        { ...config, responseType: "text" }
      );

      if (respuesta.status === 200) {
        // Create a Blob from the XML data
        const blob = new Blob([respuesta.data], { type: "application/xml" });
        // Generate a URL for the Blob
        const url = window.URL.createObjectURL(blob);
        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = url;
        // Set the filename for the downloaded file
        link.setAttribute("download", `factura_${id}.xml`);
        // Append the link to the document body
        document.body.appendChild(link);
        // Programmatically click the link to trigger the download
        link.click();
        // Clean up by removing the link and revoking the object URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        showSnackbar(`Descargado XML de la factura ${id}`, "success");
      }
    } catch (error) {
      showSnackbar("Error downloading the XML file", "error");
    } finally {
      // Add a 3-second delay before setting xmlDownload to false
      setTimeout(() => {
        setXmlDownload(false);
      }, 1000); // 3000ms = 3 seconds
    }
  };

  // Editar color Activo/Inactivo
  const getBackgroundColor = (status) => {
    if (status === "Pagada") return "#2e7d32";
    if (status === "En proceso de pago") return "#0288d1";
    if (status === "Cargada en SAP") return "gray";
    if (status === "Cancelada en SAP") return "#d32f2f";
    if (status === "Complementos pendientes") return "#f57c00";
    if (status === true) return "#2e7d32";
    if (status === false) return "#d32f2f";
    return "#0288d1";
  };

  const getUserDocumentLink =
    "https://firebasestorage.googleapis.com/v0/b/tvn-api-store.appspot.com/o/documentos%2FManuales%20intranet%2FManualFacturasEgresos.pdf?alt=media&token=2b93a2c8-f54d-4e38-9835-71b3e14f4fc1";

  const columns = [
    // ESTATUS
    {
      accessorKey: "descrEstatusSap",
      header: "ESTATUS",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => {
        const status = cell.getValue() ?? "";
        return (
          <Box
            sx={() => ({
              display: "flex",
              margin: "auto",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              border: `1px solid ${getBackgroundColor(status)}`,
              color: getBackgroundColor(status),
              fontWeight: "bold",
              p: "0.2rem",
            })}
          >
            {status.toUpperCase()}
          </Box>
        );
      },
    },
    {
      accessorKey: "estatusSat",
      header: "ESTATUS SAT",
      ...tableCellPropsCenter, // Reutiliza las props de alineación centrada
      Cell: ({ cell }) => {
        const status = cell.getValue();
        return (
          <Box
            sx={() => ({
              display: "flex",
              margin: "auto",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "4px",
              border: `1px solid ${getBackgroundColor(status)}`,
              color: getBackgroundColor(status),
              fontWeight: "bold",
              p: "0.2rem",
            })}
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
    // ID
    {
      accessorKey: "id",
      header: "ID",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "docContable",
      header: "Doc Contable",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "uuid",
      header: "UUID",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "claveSapProv",
      header: "CVE SAP PROV",
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "facturaDto.Emisor.Rfc",
      header: "RFC Emisor",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "facturaDto.Emisor.Nombre",
      header: "Nombre Emisor",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "facturaDto.Emisor.RegimenFiscal",
      header: "Regimen Emisor",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "facturaDto.Receptor.Rfc",
      header: "RFC Receptor",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "facturaDto.Receptor.Nombre",
      header: "Nombre Receptor",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "facturaDto.Receptor.UsoCFDI",
      header: "Uso CFDI",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "facturaDto.TipoDeComprobante",
      header: "Tipo C",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => {
        const value = cell.getValue() ?? "";
        return value === "I" ? "Ingreso" : value;
      },
    },
    {
      accessorKey: "facturaDto.Fecha",
      header: "Fecha factura",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => {
        const dateValue = cell.getValue();
        if (!dateValue) return "";
        const date = new Date(dateValue);
        return date.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
    {
      accessorKey: "fechaModificacion",
      header: "Fecha carga",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => {
        const dateValue = cell.getValue();
        if (!dateValue) return "";
        const date = new Date(dateValue);
        return date.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
    {
      accessorKey: "facturaDto.Folio",
      header: "Folio",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "facturaDto.SubTotal",
      header: "SubTotal",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => {
        // Si viene null o undefined, lo forzamos a 0 para que no truene el formateador
        const value = cell.getValue() ?? 0;
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(value);
      },
    },
    {
      id: "TasaOCuota",
      header: "Tasa o Cuota",
      ...tableCellPropsCenter,
      accessorFn: (row) => {
        const traslados = row?.facturaDto?.Impuestos?.Traslados;
        if (traslados && traslados.length > 0) {
          return `${traslados[0].TasaOCuota}%`;
        }
        return "";
      },
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "facturaDto.Impuestos.TotalImpuestosTrasladados",
      header: "Impuestos traslados",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => {
        const value = cell.getValue() ?? 0;
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(value);
      },
    },
    {
      accessorKey: "facturaDto.Impuestos.TotalImpuestosRetenidos",
      header: "Impuestos retenidos",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => {
        const value = cell.getValue() ?? 0;
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(value);
      },
    },
    {
      accessorKey: "facturaDto.Total",
      header: "Total",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => {
        // Add null check here
        const rawValue = cell.getValue();
        const value =
          rawValue !== null && rawValue !== undefined ? rawValue : 0;
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(value);
      },
    },
    {
      accessorKey: "facturaDto.Moneda",
      header: "Moneda",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "facturaDto.MetodoPago",
      header: "Metodo de pago",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "facturaDto.FormaPago",
      header: "Forma de pago",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
    {
      accessorKey: "facturaDto.Version",
      header: "Versión",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => cell.getValue() ?? "",
    },
  ];

  const handleOnCloseCrear = async () => {
    setOpenDialog(false);
    setVerificacionData(null);
    setValidados(false);
    setFileState((prev) => ({
      ...prev,
      base64Files: [],
    }));
    setInvalidos(false);
  };

  const handleValidarFI = async () => {
    const config = getConfig();
    const data = {
      idSucursal: sucursalSeleccionada,
      archivosXMLB64: fileState.base64Files,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        `https://${URL}/WS/TuvanosaProveedores/Api/FacturasSap/ValidarFactura`,
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
        `https://${URL}/WS/TuvanosaProveedores/Api/FacturasSap/CreateFactura`,
        data,
        config
      );

      // Verificar el código de estado
      if (response.status !== 200) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      // En axios, la respuesta está en response.data
      showSnackbar(`${response.data}`, "success");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    } finally {
      setLoading(false);

      handleOnCloseCrear();
      setContador(contador + 1);
      // 🔹 Asegurar que los datos se actualicen correctamente
      setTimeout(() => {
        obtenerDatos();
      }, 100);
    }
  };

  const handleSucursalChange = (event) => {
    const selectedValue = event.target.value;
    setSucursalSeleccionada(selectedValue);
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

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);

    // 🔹 Filtrar solo archivos XML
    const xmlFiles = files.filter((file) =>
      file.name.toLowerCase().endsWith(".xml")
    );

    if (xmlFiles.length !== files.length) {
      showSnackbar("⚠ Solo se permiten archivos XML", "error");
      return;
    }

    setUiState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      // 🔹 Convertir archivos a Base64
      const fileObjectsPromises = xmlFiles.map(async (file) => {
        const archivoB64 = await convertFileToBase64(file);
        return {
          nombreArchivo: file.name,
          archivoB64,
        };
      });

      const base64Files = await Promise.all(fileObjectsPromises);

      setFileState((prev) => ({
        ...prev,
        base64Files,
      }));

      showSnackbar(
        `✅ ${base64Files.length} archivos XML cargados exitosamente`,
        "success"
      );
    } catch (error) {
      console.error("❌ Error al convertir archivos a Base64:", error);
      showSnackbar("❌ Error al procesar los archivos", "error");
    } finally {
      setUiState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <Box>
      <CustomTable
        columns={columns}
        data={agencias}
        state={{ isLoading: uiState.isLoading }}
        globalFilterFn="contains" // Cambia el tipo de filtrado global
        muiTableContainerProps={{
          sx: {
            maxHeight: "60vh",
          },
        }}
        enableRowActions
        initialState={{
          pagination: { pageIndex: 0, pageSize: 20 },
          density: "compact",
          showColumnFilters: true,
        }}
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
                  tooltipTitle="Visualizar PDF"
                  iconColor="#0288d1"
                  disabled={pdfPreview === true}
                  IconComponent={<PictureAsPdfIcon />}
                  onIconClick={() => handleOpenPDF(row.original.uuid)}
                />

                <IconButtonWithTooltip
                  sx
                  tooltipTitle="Descargar XML"
                  iconColor="#0288d1"
                  disabled={xmlDownload === true}
                  IconComponent={
                    <img
                      src="/images/XML icon.png"
                      alt="Icono de PDF"
                      style={{ width: "34px", height: "20px" }}
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
                const documentLink = getUserDocumentLink();
                if (documentLink) {
                  window.open(documentLink, "_blank");
                } else {
                  showSnackbar(
                    `No tiene permisos para acceder a este documento`,
                    "error"
                  );
                }
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

      {/* PDF DIALOG */}
      {PDF && (
        <PreviewDialog
          previewData={PDF}
          transitionTimeout={400}
          open={openPDF}
          onClose={() => {
            setOpenPDF(false);
            setPDF("");
          }}
        />
      )}
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
          Crear Factura
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

        <DialogContent sx={{ mt: 2, px: 4 }}>
          {!VerificacionData && fileState.base64Files.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
                {fileState.base64Files.length} XML seleccionado
                {fileState.base64Files.length !== 1 ? "s" : ""}
              </Typography>
              <List
                sx={{
                  bgcolor: "grey.100",
                  borderRadius: 2,
                  p: 2,
                  maxHeight: "240px",
                  overflowY:
                    fileState.base64Files.length > 5 ? "auto" : "visible",
                }}
              >
                {fileState.base64Files.map((archivo, index) => (
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
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="empresa-select-label">Empresa</InputLabel>
              <Select
                labelId="empresa-select-label"
                label="Empresa"
                value={empresaSeleccionada || ""}
                onChange={(event) => setEmpresaSeleccionada(event.target.value)}
              >
                {empresas.map((empresa) => (
                  <MenuItem key={empresa.id} value={empresa.id}>
                    {empresa.claveSap} -{empresa.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {!VerificacionData && (
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="sucursal-select-label">Sucursal</InputLabel>
              <Select
                labelId="sucursal-select-label"
                label="Sucursal"
                value={sucursalSeleccionada || ""}
                onChange={handleSucursalChange}
                disabled={fetchSucursales}
                endAdornment={
                  fetchSucursales && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        right: 30,
                        top: "50%",
                        marginTop: "-12px",
                        color: "primary.main",
                        pointerEvents: "none",
                      }}
                    />
                  )
                }
              >
                {sucursales.map((sucursal) => (
                  <MenuItem key={sucursal.id} value={sucursal.id}>
                    {sucursal.claveSAP} - {sucursal.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
        </DialogContent>
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
              fileState.base64Files.length === 0 ||
              (validados && validadaCount <= 0)
            }
            onClick={validados ? handleCrear : handleValidarFI}
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

      <CustomDialog
        title={"AVISO"}
        transitionTimeout={400}
        open={aviso}
        onPdfPreview={true}
        paddingContent={0}
        onClose={() => setAviso(false)}
        width="md"
        fullWidth
      >
        <ul>
          <li>
            Se ha integrado el botón "Agregar" el cual nos permite subir
            Facturas de tipo Egresos (CFDI G02)
          </li>{" "}
          <li>
            Se ha agregado una nueva columna en la tabla que es CVE SAP PROV,
            que como su nombre lo dice es la CLAVE SAP del PROVEEDOR
          </li>
        </ul>
      </CustomDialog>
    </Box>
  );
}

export default Egresos;
