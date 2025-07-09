import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { mkConfig } from "export-to-csv";
import ChecklistIcon from "@mui/icons-material/Checklist";
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
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { InsertDriveFile } from "@mui/icons-material";
import IconButtonWithTooltip from "@/Components/Custom/IconButtonWithTooltip";
import ExportCsvButton from "@/Components/Custom/ExportCsvButton";
import { useAuth } from "@/Context/AuthContext";
import PreviewDialog from "@/Components/Custom/PreviewDialog";
import CustomDialog from "@/Components/Custom/CustomDialog";
import { fieldsTraslados } from "@/Constants/Fields/fields";
import ColumnGenerator from "@/Components/Custom/ColumnGenerator";
import DragAndDropArea from "../Ingreso/DragAndDropArea";
import TablaFacturaIngresos from "../Ingreso/TablaCrearFacturaIngreso";
import { fieldsTrasladosRelacionados } from "@/Constants/Fields/fields";
import { tableCellPropsCenter } from "@/Components/Custom/CustomBoxStyles";
import { useSnackbar } from "@/Context/SnackbarContext";
import CustomTable from "@/Components/Custom/CustomTable";

const URL = import.meta.env.VITE_API_URL;

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "Factura Traslados",
});

function Traslados() {
  // 🔹 Estado de validaciones y datos
  const [validationState, setValidationState] = useState({
    verifiedData: null,
    verifiedDataDeclined: null,
    faltantesData: null,
    errorData: null,
  });

  const [aviso, setAviso] = useState(true);
  const [avisoMantenimiento, setAvisoMantenimiento] = useState(true);

  // 🔹 Estado de UI (booleanos)
  const [uiState, setUiState] = useState({
    isLoading: true,
    isSubmitting: false,
    pdfPreview: false,
    xmlDownload: false,
    openPDF: false,
    openDialog: false,
    openValidateDialog: false,
  });
  const [VerificacionData, setVerificacionData] = useState(null);
  const [isMobile] = useState(window.innerWidth <= 600);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const mensajeRef = useRef("");
  const [validados, setValidados] = useState(false);
  const [mensajeValido, setMensajeValido] = useState(false);
  const [contador, setContador] = useState(1);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(1);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(1);
  const [sucursales, setSucursales] = useState([]);
  const [empresas, setEmpresas] = useState([]); // Estado para almacenar empresas
  const [validadaCount, setValidadaCount] = useState("");
  const [invalidos, setInvalidos] = useState(false);
  const [verificacionDataConOC, setVerificacionDataConOC] = useState(null);
  const [total, setTotal] = useState(0);
  const [trasladosRelacionados, setTrasladosRelacionados] = useState("");
  const [loadingTraslados, setLoadingTraslados] = useState(false);
  const [openTrasladosRelacionados, setOpenTrasladosRelacionados] =
    useState(false);
  const [fetchSucursales, setFetchSucursales] = useState(false);
  // 🔹 Estado de archivos y UUID seleccionado
  const [fileState, setFileState] = useState({
    base64Files: [],
    selectedUuid: null,
    PDF: "",
    data: [],
  });

  console.log(invalidos);

  const location = useLocation(); // Obtenemos el objeto location
  const { showSnackbar } = useSnackbar();
  const { getConfig } = useAuth();

  const obtenerDatos = async () => {
    try {
      const config = getConfig();

      const respuesta = await axios.get(
        `https://${URL}/WS/TuvanosaProveedores/Api/FacturasTraslados/GetFacturas?rol=5`,
        config
      );

      setFileState((prev) => ({ ...prev, data: respuesta.data }));
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setUiState((prev) => ({ ...prev, isLoading: false }));
    }
  };
  useEffect(() => {
    obtenerDatos();
  }, []);

  // 📄 Obtener PDF
  const handleOpenPDF = async (id) => {
    setUiState((prev) => ({ ...prev, pdfPreview: true }));
    try {
      const config = getConfig();
      const respuesta = await axios.get(
        `https://${URL}/WS/TuvanosaProveedores/Api/FacturasTraslados/GetFacturaPdfByUUID?uuid=${id}`,
        config
      );

      if (respuesta.status === 200) {
        setFileState((prev) => ({
          ...prev,
          PDF: {
            archivoB64: respuesta.data,
            type: "application/pdf",
            nombreDoc: "Factura",
          },
        }));
      }
    } catch (error) {
      showSnackbar("Error al obtener el PDF", "error");
    } finally {
      setUiState((prev) => ({ ...prev, openPDF: true, pdfPreview: false }));
    }
  };

  // 📥 Obtener XML
  const handleOpenXML = async (id) => {
    setUiState((prev) => ({ ...prev, xmlDownload: true }));
    try {
      const config = getConfig();
      const respuesta = await axios.get(
        `https://${URL}/WS/TuvanosaProveedores/Api/FacturasTraslados/GetFacturaXmlByUUID?uuid=${id}`,
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
      showSnackbar("Error descargando el XML", "error");
    } finally {
      setUiState((prev) => ({ ...prev, xmlDownload: false }));
    }
  };

  const handleOpenXMLTraslado = async (id) => {
    setUiState((prev) => ({ ...prev, xmlDownload: true }));
    try {
      const config = getConfig();
      const respuesta = await axios.get(
        `https://${URL}/WS/TuvanosaProveedores/Api/FacturasTraslados/GetTrasladoXmlByUUID?uuid=${id}`,
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
      showSnackbar("Error descargando el XML", "error");
    } finally {
      setUiState((prev) => ({ ...prev, xmlDownload: false }));
    }
  };

  //Definición de colores de status
  const getBackgroundColor = (status) => {
    if (status === "Pagada") return "#2e7d32";
    if (status === "En proceso de pago") return "#0288d1";
    if (status === "Cargada en SAP") return "gray";
    if (status === "Cancelada en SAP") return "#d32f2f";
    if (status === "Complementos pendientes") return "#f57c00";
    if (status === "FACTURA INVALIDA") return "#d32f2f";
    if (status === "FACTURA VALIDA") return "#2e7d32";
    if (status === true) return "#2e7d32";
    if (status === false) return "#d32f2f";
    return "#0288d1";
  };

  const handleRelacionados = async (id) => {
    setLoadingTraslados(true);
    setOpenTrasladosRelacionados(true);
    try {
      const config = getConfig();
      const respuesta = await axios.get(
        `https://${URL}/WS/TuvanosaProveedores/Api/FacturasTraslados/GetTrasladosByIdFactura?idFacturaGasto=${id}`,
        config
      );

      setTrasladosRelacionados(respuesta.data);
    } catch (error) {
      showSnackbar("Error al obtener los traslados relacionados", "error");
    } finally {
      setLoadingTraslados(false);
    }
  };

  //Generar las columnas de la tabla principal
  const columns = ColumnGenerator({
    fields: fieldsTraslados, // Las columnas configuradas con valueMap
    getBackgroundColor, // Función para los colores de estado
  });

  const columnsTraslados = ColumnGenerator({
    fields: fieldsTrasladosRelacionados,
    getBackgroundColor,
  });

  // 📌 Columnas generales sin "Error"
  const baseColumns = [
    {
      accessorKey: "descrEstatus",
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
            {status === true ? "VIGENTE" : "CANCELADO"}
          </Box>
        );
      },
    },
    {
      accessorKey: "error",
      header: "Error", // 🔹 Insertamos manualmente la columna de "Error" antes de "UUID"
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
        const value = cell.getValue() ?? 0;
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

  // 📌 Columnas de errores (ya incluyen la columna de "Error")
  const columnsErrores = [...baseColumns];

  // 📌 Columnas para tablas sin "Error" (eliminamos la columna manualmente)
  const columnsRelacionados = baseColumns.filter(
    (col) => col.accessorKey !== "error"
  );
  const columnsNoRelacionados = baseColumns.filter(
    (col) => col.accessorKey !== "error"
  );

  const columnItem2 = [
    {
      accessorKey: "valor",
      header: "Códigos Faltantes",
      ...tableCellPropsCenter,
    },
  ];

  const faltantesDataFormatted = validationState.faltantesData?.map((item) => ({
    valor: item,
  }));

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

  const handleCloseDialog = () => {
    setFileState((prev) => ({
      ...prev,
      selectedUuid: null, // Limpiar UUID seleccionado
      base64Files: [], // Limpiar archivos cargados
    }));

    setUiState((prev) => ({
      ...prev,
      openDialog: false, // Cerrar el diálogo
    }));
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

  const handleValidar = async () => {
    if (!fileState.selectedUuid) {
      showSnackbar(
        "⚠ Debes seleccionar un traslado antes de validar",
        "error"
      );
      return;
    }

    if (fileState.base64Files.length === 0) {
      showSnackbar(
        "⚠ No hay archivos XML seleccionados para validar",
        "error"
      );
      return;
    }

    setUiState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const config = getConfig();

      const archivosXMLB64 = fileState.base64Files.map((file) => ({
        nombreArchivo: file.nombreArchivo ?? "archivo.xml",
        archivoB64: file.archivoB64 ?? "",
      }));

      const data = {
        uuid: fileState.selectedUuid,
        archivosXMLB64,
      };

      const response = await axios.post(
        `https://${URL}/WS/TuvanosaProveedores/Api/FacturasTraslados/ValidarTraslados`,
        data,
        config
      );

      if (response.status !== 200) {
        throw new Error(`Error en la validación: ${response.statusText}`);
      }

      const validos = response.data.Item1.filter(
        (item) => item.contieneGuiasDeFactura && !item.error
      );
      const rechazados = response.data.Item1.filter(
        (item) => !item.contieneGuiasDeFactura && !item.error
      );
      const faltantes = response.data.Item2;

      const errores = response.data.Item1.filter((item) => !item.estatusSap);

      // 🔹 Si solo hay datos relacionados y no hay errores, faltantes ni rechazados, se envían automáticamente
      if (
        validos.length > 0 &&
        rechazados.length === 0 &&
        !faltantes &&
        !errores
      ) {
        showSnackbar(
          "✅ Traslados validados, enviando automáticamente...",
          "success"
        );
        handleEnviarDatos();
        return;
      }

      // 🔹 Si hay cualquier otro caso, abrir el diálogo de validación.
      setValidationState({
        verifiedData: validos,
        verifiedDataDeclined: rechazados,
        faltantesData: faltantes,
        errorData: errores,
      });

      setUiState((prev) => ({ ...prev, openValidateDialog: true }));

      showSnackbar("✅ Traslados validados, revisa los resultados", "success");
    } catch (error) {
      console.error("Error al validar traslados:", error);
      showSnackbar("❌ Error al validar traslados.", "error");
    } finally {
      setUiState((prev) => ({ ...prev, isSubmitting: false }));
      setUiState((prev) => ({ ...prev, isSubmitting: false }));
    }
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

  const getUserDocumentLink =
    "https://firebasestorage.googleapis.com/v0/b/tvn-api-store.appspot.com/o/documentos%2FManuales%20intranet%2FManualFacturasTraslados.pdf?alt=media&token=18e82737-f312-4a00-bace-be9b3db82cab";

  const isMensajeObligatorio =
    (validationState.verifiedData?.length > 0 &&
      validationState.faltantesData?.length > 0) || // 🔹 Relacionados + Faltantes
    (validationState.verifiedDataDeclined?.length > 0 &&
      validationState.faltantesData?.length > 0) || // 🔹 No relacionados + Faltantes
    (validationState.verifiedData?.length > 0 &&
      validationState.verifiedDataDeclined?.length > 0 &&
      validationState.faltantesData?.length > 0); // 🔹 Relacionados + No relacionados + Faltantes

  const shouldShowMensajeField =
    (validationState.verifiedDataDeclined?.length > 0 ||
      validationState.faltantesData?.length > 0) &&
    !(
      validationState.verifiedData?.length > 0 &&
      validationState.verifiedDataDeclined?.length === 0 &&
      validationState.faltantesData?.length === 0
    ) &&
    !(
      validationState.verifiedData?.length === 0 &&
      validationState.verifiedDataDeclined?.length === 0 &&
      !!validationState.faltantesData &&
      !!validationState.errorData
    );

  const guias =
    validationState.faltantesData?.length > 0
      ? validationState.faltantesData?.join(",")
      : "";

  const handleEnviarDatos = async () => {
    const mensajeActual = mensajeRef.current?.value?.trim() || "";
    const tieneValidos = validationState.verifiedData?.length > 0;
    const tieneInvalidos = validationState.verifiedDataDeclined?.length > 0;
    const mensajeLleno = mensajeActual !== "";
    const mensajeValido = mensajeActual.length >= 20; // ✅ Agregamos validación de longitud mínima

    // 🔹 Si el mensaje es obligatorio y está vacío o no cumple con el mínimo, bloquear el envío
    if (isMensajeObligatorio && (!mensajeLleno || !mensajeValido)) {
      showSnackbar(
        "⚠ El mensaje de justificación debe contener al menos 20 caracteres.",
        "error"
      );
      return;
    }

    // 🔹 Determinar los datos a enviar
    let datosAEnviar = [];

    if (tieneValidos) {
      datosAEnviar = [...validationState.verifiedData];
    }

    // 🔹 Si hay no relacionados y el usuario ingresó un mensaje, se agregan
    if (tieneInvalidos && mensajeLleno) {
      datosAEnviar = [...datosAEnviar, ...validationState.verifiedDataDeclined];
    }

    // 🔹 Si no hay datos para enviar, mostramos error
    if (datosAEnviar.length === 0) {
      showSnackbar("No hay traslados para enviar.", "error");
      return;
    }

    const justificacion = mensajeLleno ? encodeURIComponent(mensajeActual) : "";
    const apiUrl = `https://${URL}/WS/TuvanosaProveedores/Api/FacturasTraslados/CreateTraslados?justificacion=${justificacion}&guiasFaltantes=${guias}`;

    try {
      setUiState((prev) => ({ ...prev, isSubmitting: true }));

      const config = getConfig();
      const response = await axios.post(apiUrl, datosAEnviar, config);

      if (response.status === 200) {
        showSnackbar("✅ Traslados enviados correctamente.", "success");

        setValidationState({
          verifiedData: null,
          verifiedDataDeclined: null,
          faltantesData: null,
          errorData: null,
        });

        setUiState((prev) => ({
          ...prev,
          openValidateDialog: false,
          openDialog: false,
        }));

        setMensajeValido(false); // ✅ Resetear validación de mensaje

        // 🔹 Asegurar que los datos se actualicen correctamente
        setTimeout(() => {
          obtenerDatos();
        }, 1000);
      } else {
        throw new Error("❌ Error al enviar traslados.");
      }
    } catch (error) {
      console.error("Error al enviar traslados:", error);
      showSnackbar("❌ Hubo un error al enviar traslados.", "error");
    } finally {
      setUiState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const shouldShowGuardarRelacionados =
    validationState.verifiedData?.length > 0 && // ✅ Hay relacionados
    validationState.verifiedDataDeclined?.length > 0 && // ✅ Hay no relacionados
    (!validationState.faltantesData ||
      validationState.faltantesData.length === 0); // ❌ No hay faltantes

  const handleGuardarRelacionados = async () => {
    try {
      setUiState((prev) => ({ ...prev, isSubmitting: true }));

      const config = getConfig();
      const data = validationState.verifiedData;
      // Obtener el mensaje actual sin usar `validationState.mensaje`
      const mensajeActual = mensajeRef.current?.value?.trim() || "";
      const justificacion = mensajeActual
        ? encodeURIComponent(mensajeActual)
        : "";
      const response = await axios.post(
        `https://${URL}/WS/TuvanosaProveedores/Api/FacturasTraslados/CreateTraslados?justificacion=${justificacion}&guiasFaltantes=""`,
        data,
        config
      );

      if (response.status === 200) {
        showSnackbar("✅ Relacionados guardados correctamente.", "success");
        setUiState((prev) => ({
          ...prev,
          openValidateDialog: false,
          openDialog: false,
        }));

        setFileState((prev) => ({
          ...prev,
          selectedUuid: null, // Limpiar UUID seleccionado
          base64Files: [], // Limpiar archivos cargados
        }));

        setMensajeValido(false); // ✅ Resetear validación de mensaje

        obtenerDatos(); // Actualizar datos después de guardar
      } else {
        throw new Error("Error al guardar relacionados");
      }
    } catch (error) {
      console.error("Error al guardar relacionados:", error);
      showSnackbar("❌ Hubo un error al guardar los relacionados.", "error");
    } finally {
      setUiState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  useEffect(() => {
    const checkMensaje = () => {
      const mensajeActual = mensajeRef.current?.value?.trim() || "";
      setMensajeValido(mensajeActual.length >= 20);
    };

    // Asegurar que el evento solo se agrega si `mensajeRef.current` está disponible
    if (mensajeRef.current) {
      mensajeRef.current.addEventListener("input", checkMensaje);
    }

    return () => {
      if (mensajeRef.current) {
        mensajeRef.current.removeEventListener("input", checkMensaje);
      }
    };
  }, []);

  const handleCloseValidateDialog = () => {
    setUiState((prev) => ({ ...prev, openValidateDialog: false }));
    setMensajeValido(false);
  };

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
      }, 1000);
    }
  };

  const handleSucursalChange = (event) => {
    const selectedValue = event.target.value;
    setSucursalSeleccionada(selectedValue);
  };

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

  const handleCerrarTraslados = () => {
    setOpenTrasladosRelacionados(false);
    setTrasladosRelacionados("");
  };

  return (
    <Box>
      <CustomTable
        columns={columns}
        data={fileState.data}
        globalFilterFn="fuzzy" // Cambia el tipo de filtrado global
        state={{ isLoading: uiState.isLoading }}
        muiTableContainerProps={{
          sx: {
            maxHeight: "60vh",
          },
        }}
        initialState={{
          pagination: { pageIndex: 0, pageSize: 20 },
          density: "compact",
          showColumnFilters: true,
        }}
        muiTablePaperProps={{
          elevation: 0,
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
                  tooltipTitle="Visualizar PDF"
                  iconColor="#0288d1"
                  disabled={uiState.pdfPreview === true}
                  IconComponent={<PictureAsPdfIcon />}
                  onIconClick={() => handleOpenPDF(row.original.uuid)}
                />

                <IconButtonWithTooltip
                  sx
                  tooltipTitle="Descargar XML"
                  iconColor="#0288d1"
                  disabled={uiState.xmlDownload === true}
                  IconComponent={
                    <img
                      src="/images/XML icon.png"
                      alt="Icono de PDF"
                      style={{ width: "34px", height: "20px" }}
                    />
                  }
                  onIconClick={() => handleOpenXML(row.original.uuid)}
                />
                {row.original.estatusSap === 5 && (
                  <IconButtonWithTooltip
                    tooltipTitle="Agregar traslados"
                    iconColor="#0288d1"
                    IconComponent={<AddIcon />}
                    onIconClick={() => {
                      setFileState((prev) => ({
                        ...prev,
                        selectedUuid: row.original.uuid,
                      })); // Guarda el UUID
                      setUiState((prev) => ({ ...prev, openDialog: true })); // Abre el diálogo
                    }}
                  />
                )}
                {row.original.trasladosCargados === true && (
                  <IconButtonWithTooltip
                    tooltipTitle="Ver traslados cargados"
                    iconColor="#0288d1"
                    IconComponent={<ChecklistIcon />}
                    onIconClick={() => {
                      handleRelacionados(row.original.id);
                    }}
                  />
                )}
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
      {fileState.PDF && (
        <PreviewDialog
          previewData={fileState.PDF}
          transitionTimeout={400}
          open={uiState.openPDF}
          onClose={() => setUiState((prev) => ({ ...prev, openPDF: false }))}
        />
      )}

      <CustomDialog
        open={uiState.openDialog}
        onClose={handleCloseDialog}
        title="Agregar traslados"
        onSubmit={handleValidar}
        isSubmitting={uiState.isSubmitting}
        submitLabel={uiState.isSubmitting ? "Validando..." : "Validar"}
        submitDisabled={
          fileState.base64Files.length === 0 || uiState.isSubmitting
        }
      >
        {fileState.base64Files.length > 0 && (
          <Typography textAlign={"center"} pb={3}>
            Traslados para validación en factura {fileState.selectedUuid}
          </Typography>
        )}
        {/* Contenedor de archivos con scroll si excede 100px */}
        <Box
          sx={{
            maxHeight: "100px", // Altura máxima antes de activar scroll
            overflowY: "auto", // Habilita el scroll vertical cuando es necesario
            border: "1px solid gray", // Opcional: Borde para visualizar el área
            borderRadius: "4px",
            padding: "8px",
            marginBottom: "12px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {fileState.base64Files.length > 0 &&
            fileState.base64Files.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4px 8px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <span style={{ fontSize: "14px", wordBreak: "break-word" }}>
                  {file.nombreArchivo}
                </span>
              </Box>
            ))}
        </Box>

        {/* Área de carga de archivos */}
        <DragAndDropArea
          onFileSelect={(files) => handleFileUpload({ target: { files } })}
          loading={uiState.isSubmitting}
        />
      </CustomDialog>

      <CustomDialog
        open={uiState.openValidateDialog}
        onClose={handleCloseValidateDialog}
        title="Validación traslados"
        paddingContent={0}
        marginBottomContent={0}
        width="auto"
        onSubmit={handleEnviarDatos}
        onPdfPreview={
          (validationState.verifiedData?.length === 0 &&
            validationState.verifiedDataDeclined?.length === 0 &&
            !!validationState.faltantesData &&
            !!validationState.errorData) ||
          (validationState.verifiedData?.length > 0 &&
            validationState.verifiedDataDeclined?.length > 0 &&
            !validationState.faltantesData)
        }
        submitDisabled={isMensajeObligatorio && !mensajeValido}
      >
        {validationState.errorData?.length >= 1 && (
          <Box sx={{ border: "1px solid gray" }}>
            <CustomTable
              initialState={{
                pagination: { pageIndex: 0, pageSize: 5 },
                density: "compact",
                showColumnFilters: true,
              }}
              columns={columnsErrores}
              muiTablePaperProps={{
                elevation: 0,
              }}
              renderTopToolbarCustomActions={() => (
                <Box
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <h3 style={{ paddingLeft: 16, color: "#d32f2f" }}>
                    Errores en la validación (No se pueden cargar)
                  </h3>
                </Box>
              )}
              data={validationState.errorData}
            />
          </Box>
        )}
        {/*Compatibles*/}
        {validationState.verifiedData?.length >= 1 && (
          <Box sx={{ border: "1px solid gray" }}>
            <CustomTable
              initialState={{
                pagination: { pageIndex: 0, pageSize: 5 },
                density: "compact",
                showColumnFilters: true,
              }}
              muiTablePaperProps={{
                elevation: 0,
              }}
              columns={columnsRelacionados}
              renderTopToolbarCustomActions={() => (
                <Box
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <h3 style={{ paddingLeft: 16, color: "#388e3c" }}>
                    Traslados relacionados
                  </h3>
                </Box>
              )}
              data={validationState.verifiedData}
            />
          </Box>
        )}
        {/*No relacionados a la factura*/}
        {validationState.verifiedDataDeclined?.length >= 1 && (
          <Box sx={{ border: "1px solid gray" }}>
            <CustomTable
              initialState={{
                pagination: { pageIndex: 0, pageSize: 5 },
                density: "compact",
                showColumnFilters: true,
              }}
              muiTablePaperProps={{
                elevation: 0,
              }}
              columns={columnsNoRelacionados}
              renderTopToolbarCustomActions={() => (
                <Box
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <h3 style={{ paddingLeft: 16, color: "#ffa726" }}>
                    Traslados no relacionados
                  </h3>
                </Box>
              )}
              data={validationState.verifiedDataDeclined}
            />
          </Box>
        )}
        <Box sx={{ display: "flex" }}>
          {/*Faltantes*/}
          <Box sx={{ width: "50%" }}>
            {Array.isArray(faltantesDataFormatted) &&
              faltantesDataFormatted.some((item) => item.valor) && (
                <Box sx={{ border: "1px solid gray" }}>
                  <CustomTable
                    initialState={{
                      pagination: { pageIndex: 0, pageSize: 5 },
                      density: "compact",
                      showColumnFilters: true,
                    }}
                    muiTablePaperProps={{
                      elevation: 0,
                    }}
                    renderTopToolbarCustomActions={() => (
                      <Box
                        sx={{
                          width: "fit-content",
                          display: "flex",
                          gap: 2,
                        }}
                      >
                        <h3 style={{ paddingLeft: 16, color: "#ffa726" }}>
                          Guías faltantes
                        </h3>
                      </Box>
                    )}
                    columns={columnItem2}
                    data={faltantesDataFormatted}
                  />
                </Box>
              )}
            {shouldShowGuardarRelacionados && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  height: "100%",
                  border: "1px solid gray",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleGuardarRelacionados}
                  sx={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    textTransform: "none",
                  }}
                  disabled={mensajeValido}
                >
                  Guardar relacionados
                </Button>
              </Box>
            )}
          </Box>

          {/* Campo de texto para ingresar mensajes */}
          {shouldShowMensajeField && (
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                border: "1px solid gray",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "80%", padding: 2 }}>
                  <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    Justificación:
                  </Typography>
                  <TextField
                    id="justificacion"
                    fullWidth
                    variant="outlined"
                    placeholder="Escribe un mensaje..."
                    inputRef={mensajeRef} // Se usa la referencia directamente
                    rows={2}
                    sx={{ mb: 2 }}
                    onInput={() => {
                      const mensajeActual =
                        mensajeRef.current?.value?.trim() || "";
                      setMensajeValido(mensajeActual.length >= 20);
                    }}
                    error={
                      (isMensajeObligatorio &&
                        (mensajeRef.current?.value?.trim() || "") === "") ||
                      (!isMensajeObligatorio &&
                        (mensajeRef.current?.value?.trim() || "").length < 20)
                    }
                    helperText={
                      isMensajeObligatorio &&
                      (mensajeRef.current?.value?.trim() || "").length < 20
                        ? "El mensaje debe contener al menos 20 caracteres."
                        : "El mensaje debe contener al menos 20 caracteres."
                    }
                  />
                </Box>
              </Paper>
              {!!validationState.verifiedData &&
                !!validationState.verifiedDataDeclined &&
                !validationState.faltantesData && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                      mb: 2,
                    }}
                  >
                    <Button
                      disabled={!mensajeValido}
                      variant="outlined"
                      sx={{
                        width: "fit-content",
                        textTransform: "none",
                      }}
                      onClick={handleEnviarDatos}
                    >
                      Guardar relacionados y no relacionados
                    </Button>
                  </Box>
                )}
            </Box>
          )}
          {!shouldShowMensajeField &&
            validationState.verifiedData?.length === 0 &&
            validationState.verifiedDataDeclined?.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Typography color={"#d32f2f"}>
                  *No se pueden cargar los documentos ya que todos son
                  invalidos.
                </Typography>
              </Box>
            )}
        </Box>
      </CustomDialog>

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
                disable={fetchSucursales}
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
        title="Traslados relacionados a la factura"
        transitionTimeout={400}
        open={openTrasladosRelacionados}
        onPdfPreview={true}
        paddingContent={0}
        onClose={handleCerrarTraslados}
        width="md"
        fullWidth
      >
        <CustomTable
          initialState={{
            pagination: { pageIndex: 0, pageSize: 5 },
            density: "compact",
          }}
          columns={columnsTraslados}
          muiTablePaperProps={{
            elevation: 0,
          }}
          state={{ loading: loadingTraslados }}
          data={trasladosRelacionados}
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
                    sx
                    tooltipTitle="Descargar XML"
                    iconColor="#0288d1"
                    disabled={uiState.xmlDownload === true}
                    IconComponent={
                      <img
                        src="/images/XML icon.png"
                        alt="Icono de PDF"
                        style={{ width: "34px", height: "20px" }}
                      />
                    }
                    onIconClick={() => handleOpenXMLTraslado(row.original.uuid)}
                  />
                </>
              </Box>
            );
          }}
        />
      </CustomDialog>

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
            Se agrego el estatus de <strong>"Revision de Traslados"</strong>{" "}
            para dar a conocer si un traslado se encuentra en revisión por el
            departamento de Contabilidad.
          </li>
          <li>
            Se ha agregado una nueva columna en la tabla que es CVE SAP PROV,
            que como su nombre lo dice es la CLAVE SAP del PROVEEDOR
          </li>
          <li>
            Se ha agregado una nueva columna en la tabla que es TRASLADOS y
            muestra que facturas tienen traslados cargados y cuales no.
          </li>
          <li>
            Se ha agregado un nuevo botón para poder visualizar los traslados
            que tienen cargadas las facturas.
          </li>
        </ul>
      </CustomDialog>
    </Box>
  );
}

export default Traslados;
