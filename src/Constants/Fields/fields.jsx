export const fieldsUsuariosTable = [
  {
    accessorKey: "estatusDesc",
    header: "ESTATUS",
    type: "status",
    width: "100px",
  },
  {
    accessorKey: "idUsuario",
    header: "ID USUARIO",
  },
  {
    accessorKey: "nombreCompleto",
    header: "NOMBRE",
  },
  {
    accessorKey: "correo",
    header: "EMAIL",
  },
  {
    accessorKey: "codigoEmpleado",
    header: "CODIGO EMPLEADO",
  },
];

export const fielsdOpinionCumplimiento = [
  {
    accessorKey: "estatusDesc",
    header: "ESTATUS",
    type: "status",
    width: "120px",
  },
  {
    accessorKey: "folio",
    header: "FOLIO",
  },
  {
    accessorKey: "nombreEmpleado",
    header: "EMPLEADO",
  },
  {
    accessorKey: "razonSocial",
    header: "PROVEEDOR",
  },
  {
    accessorKey: "rfc",
    header: "RFC",
  },
  {
    accessorKey: "fechaOpinion",
    header: "FECHA OPINIÓN",
    type: "date",
  },
  {
    accessorKey: "fechaSolicitud",
    header: "FECHA SOLICITUD",
    type: "date",
  },
];

export const fieldsDesbloqueoProveedor = [
  {
    accessorKey: "bloqueo",
    header: "ESTATUS",
    type: "status",
    width: "120px",
    valueMap: {
      1: "BLOQUEADO",
      0: "DESBLOQUEADO",
    },
  },
  {
    accessorKey: "razonSocial",
    header: "PROVEEDOR",
  },
  {
    accessorKey: "rfc",
    header: "RFC",
  },
  {
    accessorKey: "supuesto",
    header: "SUPUESTO",
  },
  {
    accessorKey: "listado",
    header: "LISTADO",
  },
  {
    accessorKey: "fechaPublicacion",
    header: "FECHA PUBLICACION",
    type: "date",
  },
];

export const fieldsSupuestosProveedor = [
  {
    accessorKey: "supuesto",
    header: "SUPUESTO",
  },
  {
    accessorKey: "fechaPublicacion",
    header: "FECHA PUBLICACION",
    type: "date",
  },
  {
    accessorKey: "bloqueo",
    header: "BLOQUEO",
  },
  {
    accessorKey: "fechaMovimiento",
    header: "FECHA MOVIMIENTO",
    type: "date",
  },
  {
    accessorKey: "listado",
    header: "LISTADO",
  },
];

export const fieldsRecibosNominas = [
  {
    accessorKey: "numEmpleado",
    header: "CÓDIGO EMPLEADO",
  },
  {
    accessorKey: "rfcReceptor",
    header: "RFC EMPLEADO",
  },
  {
    accessorKey: "nombreReceptor",
    header: "EMPLEADO",
  },
  {
    accessorKey: "rfcEmisor",
    header: "RFC EMPRESA",
  },
  {
    accessorKey: "nombreEmisor",
    header: "RAZÓN SOCIAL",
  },
  {
    accessorKey: "numDiasPagados",
    header: "DIAS PAGADOS",
  },
  {
    accessorKey: "periodo",
    header: "PERIODO",
  },
  {
    accessorKey: "ejercicio",
    header: "EJERCICIO",
  },
  {
    accessorKey: "fechaPago",
    header: "FECHA PAGO",
    type: "date",
  },
  {
    accessorKey: "uuid",
    header: "UUID",
    type: "LinkCell",
  },
];

export const fieldsAgenciaAduanal = [
  {
    accessorKey: "estatus",
    header: "ESTATUS",
    type: "status",
    width: "120px",
    valueMap: {
      1: "ACTIVO", // Mapea "1" a "ACTIVO"
      0: "INACTIVO", // Mapea "0" a "INACTIVO"
    },
  },
  {
    accessorKey: "idAgenciaAduanal",
    header: "ID",
  },
  {
    accessorKey: "descripcion",
    header: "AGENCIA ADUANAL",
  },
  {
    accessorKey: "agenteAduanal",
    header: "AGENTE ADUANAL",
  },
];

export const fieldsPrestamosPendientes = [
  {
    accessorKey: "pagarePago",
    header: "PAGARÉ",
    type: "status",
    width: "120px",
    valueMap: {
      true: "CARGADO", // Mapea "1" a "ACTIVO"
      false: "NO CARGADO", // Mapea "0" a "INACTIVO"
    },
  },
  {
    accessorKey: "id",
    header: "FOLIO",
  },
  {
    accessorKey: "codigoEmpleado",
    header: "CÓDIGO",
  },
  {
    accessorKey: "nombreLargo",
    header: "NOMBRE",
  },
  {
    accessorKey: "empresa",
    header: "EMPRESA",
  },
  {
    accessorKey: "cveSucursal",
    header: "SUCURSAL",
  },
  {
    accessorKey: "tipoPrestamoDescripcion",
    header: "TIPO",
  },
  {
    accessorKey: "importe",
    header: "IMPORTE",
    type: "currency",
  },
  {
    accessorKey: "tasaInteres",
    header: "INTERÉS",
    type: "percent", // Puedes usar un tipo genérico si estás usando un generador de columnas
  },
  {
    accessorKey: "fechaPago",
    header: "FECHA SOLICITUD",
    type: "date",
  },
  {
    accessorKey: "fechaPagoInicial",
    header: "FECHA PAGO INICIAL",
    type: "date",
  },
];

export const fieldsListaCajaAhorro = [
  {
    accessorKey: "cveEmpresa",
    header: "EMPRESA",
  },
  {
    accessorKey: "codigoEmpleado",
    header: "CÓDIGO",
  },
  {
    accessorKey: "nombreLargo",
    header: "NOMBRE",
  },
  {
    accessorKey: "numeroperiodo",
    header: "PERIODO",
  },
  {
    accessorKey: "ejercicio",
    header: "EJERCICIO",
  },
  {
    accessorKey: "importeCaja",
    header: "IMPORTE",
    type: "currency", // Indica que es de tipo moneda
    enableAggregation: true, // Activar agregación
    enableFooter: true, // Activar Footer
  },
];

export const fieldsListaFondoAhorro = [
  {
    accessorKey: "cveEmpresa",
    header: "EMPRESA",
  },
  {
    accessorKey: "codigoEmpleado",
    header: "CÓDIGO",
  },
  {
    accessorKey: "nombreLargo",
    header: "NOMBRE",
  },
  {
    accessorKey: "numeroperiodo",
    header: "PERIODO",
  },
  {
    accessorKey: "ejercicio",
    header: "EJERCICIO",
  },
  {
    accessorKey: "importe",
    header: "IMPORTE EMPLEADO",
    type: "currency", // Indica que es de tipo moneda
    enableAggregation: true, // Activar agregación
    enableFooter: true, // Activar Footer
  },
  {
    accessorKey: "importePatron",
    header: "IMPORTE PATRÓN",
    type: "currency", // Indica que es de tipo moneda
    enableAggregation: true, // Activar agregación
    enableFooter: true, // Activar Footer
  },
];

export const fieldsLiquidacionesPendientes = [
  {
    accessorKey: "estatusDescripcion",
    header: "ESTATUS",
    type: "status",
  },
  {
    accessorKey: "id",
    header: "FOLIO",
  },
  {
    accessorKey: "codigoEmpleado",
    header: "CÓDIGO",
  },
  {
    accessorKey: "nombreLargo",
    header: "NOMBRE",
  },
  {
    accessorKey: "empresa",
    header: "EMPRESA",
  },
  {
    accessorKey: "cveSucursal",
    header: "SUCURSAL",
  },
  {
    accessorKey: "tipoPrestamoDescripcion",
    header: "TIPO",
  },
  {
    accessorKey: "numeroPagos",
    header: "Numero de pagos",
  },
  {
    accessorKey: "importe",
    header: "IMPORTE",
    type: "currency",
  },
  {
    accessorKey: "tasaInteres",
    header: "INTERÉS %",
    type: "percent",
  },
  {
    accessorKey: "fechaPagoInicial",
    header: "FECHA INICIAL",
    type: "date",
  },
  {
    accessorKey: "fechaPagoFinal",
    header: "FECHA FINAL",
    type: "date",
  },
];

export const fieldsConfiguracionCajaAhorro = [
  {
    accessorKey: "limitePrestamo",
    header: "LIMITE PRÉSTAMO",
    type: "status",
    width: "120px",
    valueMap: {
      true: "ACTIVO",
      false: "INACTIVO",
    },
    editVariant: "select",
    editSelectOptions: [
      { text: "SI", value: true },
      { text: "NO", value: false },
    ],
  },
  {
    enableEditing: false,
    accessorKey: "cveEmpresa",
    header: "EMPRESA",
  },
  //Codigo de Empleado
  {
    enableEditing: false,
    accessorKey: "codigoEmpleado",
    header: "CÓDIGO",
  },
  //Nombre
  {
    enableEditing: false,
    accessorKey: "nombreLargo",
    header: "NOMBRE",
  },
  //Aportacion
  {
    accessorKey: "aportacion",
    header: "APORTACIÓN",
    type: "currency",
    enableAggregation: true, // Activar agregación
  },
  //Puesto
  {
    enableEditing: false,
    accessorKey: "puesto",
    header: "PUESTO",
  },
  //Departamento
  {
    enableEditing: false,
    accessorKey: "departamento",
    header: "DEPARTAMENTO",
  },
];

export const fieldsPromesaPago = [
  {
    accessorKey: "idPrestamo",
    header: "FOLIO",
  },
  {
    accessorKey: "codigoEmpleado",
    header: "CÓDIGO",
  },
  {
    accessorKey: "nombreLargo",
    header: "NOMBRE",
  },
  {
    accessorKey: "tipoPrestamoDescripcion",
    header: "TIPO PRESTAMO",
  },
  {
    accessorKey: "estatusDescripcion",
    header: "ESTATUS",
  },
  {
    accessorKey: "importe",
    header: "IMPORTE",
    type: "currency",
  },
  {
    accessorKey: "numeroPagos",
    header: "NO. PAGOS",
  },
  {
    accessorKey: "fechaPagoInicial",
    header: "FECHA INICIO",
    type: "date",
  },
  {
    accessorKey: "fechaPagoFinal",
    header: "FECHA FINAL",
    type: "date",
  },
  {
    accessorKey: "descripcion",
    header: "PONDERADOR",
  },
  {
    accessorKey: "valor",
    header: "DESCRIPCIÓN",
  },
  {
    accessorKey: "aplicacion",
    header: "APLICACIÓN",
  },
];

export const fieldsCorridaGuardar = [
  {
    accessorKey: "numeroPago",
    header: "NÚMERO DE PAGO",
  },
  {
    accessorKey: "dias",
    header: "DIAS A PAGAR",
  },
  {
    accessorKey: "fechaPagostring",
    header: "FECHA DE PAGO",
  },
  {
    accessorKey: "capital",
    header: "CAPITAL",
    type: "currency",
  },
  {
    accessorKey: "pagoConInt",
    header: "PAGO CON INTERES",
    type: "currency",
    enableFooter: true,
    footerLabel: "Total a pagar con intereses",
    colorSumFooter: "info.main",
  },
  {
    accessorKey: "intereses",
    header: "INTERESES",
    type: "currency",
    enableFooter: true,
    footerLabel: "Total de intereses",
    colorSumFooter: "info.main",
  },
  {
    accessorKey: "amortizacion",
    header: "AMORTIZACIÓN",
    type: "currency",
  },
  {
    accessorKey: "saldo",
    header: "SALDO",
    type: "currency",
  },
];

export const fieldsCorridaPrestamo = [
  {
    accessorKey: "estatusDescr",
    header: "ESTATUS",
    type: "status",
  },
  {
    accessorKey: "numeroPago",
    header: "NÚMERO DE PAGO",
  },
  {
    accessorKey: "dias",
    header: "DIAS A PAGAR",
  },
  {
    accessorKey: "fechaPagostring",
    header: "FECHA DE PAGO",
  },
  {
    accessorKey: "capital",
    header: "CAPITAL",
    type: "currency",
  },
  {
    accessorKey: "pagoReal",
    header: "PAGO REAL",
    type: "currency",
    enableFooter: true,
    footerLabel: "Total pago real",
    colorSumFooter: "info.main",
  },
  {
    accessorKey: "pagoConInt",
    header: "PAGO CON INTERESES",
    type: "currency",
    enableFooter: true,
    footerLabel: "Total a pagar con intereses",
    colorSumFooter: "info.main",
  },
  {
    accessorKey: "intereses",
    header: "INTERESES",
    type: "currency",
    enableFooter: true,
    footerLabel: "Total de intereses",
    colorSumFooter: "info.main",
  },
  {
    accessorKey: "amortizacion",
    header: "AMORTIZACIÓN",
    type: "currency",
  },
  {
    accessorKey: "saldo",
    header: "SALDO",
    type: "currency",
  },
];

export const fieldsCorridaGuardarAbono = [
  {
    accessorKey: "estatusDescr",
    header: "ESTATUS",
    type: "status",
  },
  {
    accessorKey: "numeroPago",
    header: "NÚMERO DE PAGO",
  },
  {
    accessorKey: "dias",
    header: "DIAS A PAGAR",
  },
  {
    accessorKey: "fechaPagostring",
    header: "FECHA DE PAGO",
  },
  {
    accessorKey: "capital",
    header: "CAPITAL",
    type: "currency",
  },
  {
    accessorKey: "pagoReal",
    header: "PAGO REAL",
    type: "currency",
  },
  {
    accessorKey: "pagoConInt",
    header: "PAGO CON INTERESES",
    type: "currency",
  },
  {
    accessorKey: "intereses",
    header: "INTERESES",
    type: "currency",
  },
  {
    accessorKey: "amortizacion",
    header: "AMORTIZACIÓN",
    type: "currency",
  },
  {
    accessorKey: "saldo",
    header: "SALDO",
    type: "currency",
  },
];

export const fieldsListaPrestamos = [
  {
    accessorKey: "estatusDescripcion",
    header: "ESTATUS",
    type: "status", // Indicamos que es un campo de estatus
  },
  {
    accessorKey: "id",
    header: "FOLIO",
  },
  {
    accessorKey: "codigoEmpleado",
    header: "CÓDIGO",
  },
  {
    accessorKey: "estatusEmpDesc",
    header: "ESTATUS EMPLEADO",
    type: "status",
  },
  {
    accessorKey: "nombreLargo",
    header: "NOMBRE",
  },
  {
    accessorKey: "cveSucursal",
    header: "SUCURSAL",
  },
  {
    accessorKey: "tipoPrestamoDescripcion",
    header: "TIPO",
  },
  {
    accessorKey: "numeroPagos",
    header: "NUMERO DE PAGOS",
  },
  {
    accessorKey: "importe",
    header: "IMPORTE",
    type: "currency", // Campo de tipo moneda
  },
  {
    accessorKey: "tasaInteres",
    header: "INTERÉS %",
    type: "percent", // Campo de tipo porcentaje
  },

  {
    accessorKey: "fechaPagoInicial",
    header: "FECHA INICIAL",
    type: "date", // Campo de tipo fecha
  },
  {
    accessorKey: "fechaPagoFinal",
    header: "FECHA FINAL",
    type: "date", // Campo de tipo fecha
  },
];

export const fieldsAcumuladoCajaAhorro = [
  {
    accessorKey: "estatusDescripcion",
    header: "ESTATUS",
    type: "status", // Indicamos que es un campo de estatus
  },
  {
    accessorKey: "id",
    header: "FOLIO",
  },
  {
    accessorKey: "codigoEmpleado",
    header: "CÓDIGO",
  },
  {
    accessorKey: "estatusEmpDesc",
    header: "ESTATUS EMPLEADO",
    type: "status",
  },
  {
    accessorKey: "nombreLargo",
    header: "NOMBRE",
  },
  {
    accessorKey: "cveSucursal",
    header: "SUCURSAL",
  },
  {
    accessorKey: "tipoPrestamoDescripcion",
    header: "TIPO",
  },
  {
    accessorKey: "numeroPagos",
    header: "NUMERO DE PAGOS",
  },
  {
    accessorKey: "importe",
    header: "IMPORTE",
    type: "currency", // Campo de tipo moneda
  },
  {
    accessorKey: "tasaInteres",
    header: "INTERÉS %",
    type: "percent", // Campo de tipo porcentaje
  },
  {
    accessorKey: "totalIntereses",
    header: "INTERESES",
    type: "currency", // Campo de tipo porcentaje
  },
  {
    accessorKey: "totalPagado",
    header: "TOTAL PAGADO",
    type: "currency", // Campo de tipo porcentaje
  },
  {
    accessorKey: "totalInteresesPagado",
    header: "TOTAL INTERES",
    type: "currency", // Campo de tipo porcentaje
  },

  {
    accessorKey: "fechaPagoInicial",
    header: "FECHA INICIAL",
    type: "date", // Campo de tipo fecha
  },
  {
    accessorKey: "fechaPagoFinal",
    header: "FECHA FINAL",
    type: "date", // Campo de tipo fecha
  },
  {
    accessorKey: "fechaLiquidacion",
    header: "FECHA LIQUIDACION",
    type: "date", // Campo de tipo fecha
  },
];

export const fieldsAbonosCajaAhorro = [
  {
    accessorKey: "tipoPrestamoDescripcion",
    header: "PRESTAMO",
  },
  {
    accessorKey: "codigoEmpleado",
    header: "CÓDIGO",
  },
  {
    accessorKey: "nombreLargo",
    header: "NOMBRE",
  },
  {
    accessorKey: "numeroPago",
    header: "NUMERO PAGO",
  },
  {
    accessorKey: "dias",
    header: "DIAS",
  },
  {
    accessorKey: "fechaPagostring",
    header: "FECHA DE PAGO",
  },
  {
    accessorKey: "capital",
    header: "CAPITAL",
    type: "currency",
  },
  {
    accessorKey: "pagoConInt",
    header: "PAGO CON INT",
    type: "currency",
  },
  {
    accessorKey: "pagoReal",
    header: "PAGO REAL",
    type: "currency",
  },
  {
    accessorKey: "amortizacion",
    header: "AMORTIZACIÓN",
    type: "currency",
  },
  {
    accessorKey: "intereses",
    header: "INTERESES",
    type: "currency",
  },
  {
    accessorKey: "interesMoratorio",
    header: "INTERES MORATORIO",
    type: "currency",
  },

  {
    accessorKey: "saldo",
    header: "SALDO",
    type: "currency",
  },

  {
    accessorKey: "descripcionPago",
    header: "DESC PAGO",
  },
];

export const fieldsOrgListaClientes = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    enableEditing: false,
    accessorKey: "estatus",
    header: "ESTATUS",
    type: "status",
    valueMap: {
      1: "ACTIVO", // Mapea "1" a "ACTIVO"
      0: "INACTIVO", // Mapea "0" a "INACTIVO"
    },
  },
  {
    accessorKey: "cveSap",
    header: "CLAVE SAP",
  },
  {
    accessorKey: "nombre",
    header: "NOMBRE",
  },
  {
    accessorKey: "rfc",
    header: "RFC",
  },
  {
    accessorKey: "sucursal",
    header: "SUCURSAL",
  },
];

export const fieldsOrgDepartamentos = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "numeroDepartamento",
    header: "NO. DEPTO",
  },
  {
    accessorKey: "descripcion",
    header: "DESCRIPCIÓN",
  },
  {
    accessorKey: "empresa",
    header: "EMPRESA",
  },
];

export const fieldsListaEmpleados = [
  // Estatus
  {
    accessorKey: "estatusDesc",
    header: "ESTATUS",
    type: "status",
  },
  // ID Empleado
  {
    enableEditing: false,
    accessorKey: "idEmpleado",
    header: "ID EMPLEADO",
  },
  // Código de Empleado
  {
    accessorKey: "codigoEmpleado",
    header: "CÓDIGO",
  },
  // Nombre
  {
    enableEditing: false,
    accessorKey: "nombreLargo",
    header: "NOMBRE",
  },
  // Correo
  {
    accessorKey: "correo",
    header: "CORREO",
  },
  // Empresa
  {
    enableEditing: false,
    accessorKey: "cveEmpresa",
    header: "EMPRESA",
  },
  // Sucursal
  {
    enableEditing: false,
    accessorKey: "sucursal",
    header: "SUCURSAL",
  },
  // Puesto
  {
    enableEditing: false,
    accessorKey: "puesto",
    header: "PUESTO",
  },
  {
    enableEditing: false,
    accessorKey: "departamento",
    header: "DEPARTAMENTO",
  },
  // Teléfono
  {
    accessorKey: "telefono",
    header: "TELÉFONO",
  },
  // Fecha Alta
  {
    enableEditing: false,
    accessorKey: "fechaAltaDesc",
    header: "FECHA ALTA",
  },
  // Fecha Baja
  {
    enableEditing: false,
    accessorKey: "fechaBajaDesc",
    header: "FECHA BAJA",
  },
  // NSS
  {
    enableEditing: false,
    accessorKey: "nss",
    header: "NSS",
  },
  // RFC
  {
    enableEditing: false,
    accessorKey: "rfc",
    header: "RFC",
  },
  // CURP
  {
    enableEditing: false,
    accessorKey: "curp",
    header: "CURP",
  },
  // Usuario SAP
  {
    accessorKey: "usuarioSap",
    header: "USUARIO SAP",
  },
];

export const fieldsEmpresas = [
  {
    accessorKey: "id",
    header: "ID EMPRESA",
  },
  {
    accessorKey: "descripcion",
    header: "DESCRIPCION",
  },
  {
    accessorKey: "claveSap",
    header: "CLAVE SAP",
  },
  {
    accessorKey: "rfc",
    header: "RFC",
  },
  {
    accessorKey: "domicilio",
    header: "DOMICILIO",
  },
];

export const fieldsOrdenesCompras = [
  {
    accessorKey: "claveSap",
    header: "CLAVE SAP",
  },
  {
    accessorKey: "ordenCompra",
    header: "ORDEN COMPRA",
  },
  {
    accessorKey: "rfc",
    header: "RFC",
  },
  {
    accessorKey: "razonSocial",
    header: "PROVEEDOR",
  },
  {
    accessorKey: "claveSapSucursal",
    header: "SUCURSAL",
  },
  {
    accessorKey: "monto",
    header: "MONTO",
    type: "currency",
  },
  {
    accessorKey: "abrevia",
    header: "MONEDA",
  },
];

export const fieldsSucursales = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "descripcion",
    header: "DESCRIPCIÓN",
  },
  {
    accessorKey: "claveSAP",
    header: "CVE SAP",
  },
  {
    accessorKey: "division",
    header: "DIVISIÓN",
  },
  {
    accessorKey: "empresa",
    header: "EMPRESA",
  },
];

export const fieldsEstatusFactura = [
  {
    accessorKey: "estatus",
    header: "ESTATUS",
    type: "status",
    valueMap: {
      1: "ACTIVO",
      0: "INACTIVO",
    },
  },
  {
    accessorKey: "idEstatusFacturaProv",
    header: "ID",
  },
  {
    accessorKey: "descripcion",
    header: "ESTATUS FACTURA",
  },
];

export const fieldsEstatusPedimento = [
  {
    accessorKey: "estatus",
    header: "ESTATUS",
    type: "status",
    valueMap: {
      1: "ACTIVO",
      0: "INACTIVO",
    },
  },
  {
    accessorKey: "idEstatusPedimento",
    header: "ID",
  },
  {
    accessorKey: "descripcion",
    header: "ESTATUS PEDIMENTO",
  },
];

export const fieldsTipoTransportes = [
  {
    accessorKey: "estatus",
    header: "ESTATUS",
    type: "status",
    valueMap: {
      1: "ACTIVO",
      0: "INACTIVO",
    },
  },
  {
    accessorKey: "idTipoTransporte",
    header: "ID",
  },
  {
    accessorKey: "descripcion",
    header: "TRANSPORTE",
  },
];

export const fieldsListaProveedores = [
  {
    accessorKey: "idProveedor",
    header: "ID",
  },
  {
    accessorKey: "estatus",
    header: "ESTATUS",
    type: "status",
    valueMap: {
      true: "ACTIVO",
      false: "INACTIVO",
    },
  },
  {
    accessorKey: "razonSocial",
    header: "NOMBRE",
  },
  {
    accessorKey: "rfc",
    header: "RFC",
  },
];

export const fieldsWhiteListProv = [
  {
    accessorKey: "idProveedor",
    header: "ID",
  },
  {
    accessorKey: "razonSocial",
    header: "DESCRIPCIÓN",
  },
];

export const fieldsListaPuestos = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "departamento",
    header: "DEPARTAMENTO",
  },

  {
    accessorKey: "numeroPuesto",
    header: "NO. PUESTO",
  },

  {
    accessorKey: "descripcion",
    header: "DESCRIPCIÓN",
  },

  {
    accessorKey: "empresa",
    header: "EMPRESA",
  },
];

export const fieldsImagenInicioMarketing = [
  {
    accessorKey: "estatus",
    header: "ESTATUS",
    type: "status",
  },
  {
    accessorKey: "imagenUrl", // Usamos el mismo campo que contiene la URL de la imagen
    header: "IMAGEN",
    type: "image",
  },
  {
    accessorKey: "imagenNombre",
    header: "NOMBRE",
  },
  {
    accessorKey: "fechaInicio",
    header: "FECHA INICIO",
    type: "date",
  },
  {
    accessorKey: "fechaExpiracion",
    header: "FECHA EXPIRACIÓN",
    type: "date",
  },
  {
    accessorKey: "imagenUrl",
    header: "URL",
    type: "link",
  },
];

export const fieldsPagarePago = [
  {
    accessorKey: "id",
    header: "FOLIO",
  },
  {
    accessorKey: "estatusDescr",
    header: "ESTATUS",
    type: "status",
    width: "120px",
  },
  {
    accessorKey: "responsable",
    header: "RESPONSABLE",
  },
  {
    accessorKey: "cliente",
    header: "CLIENTE",
  },
  {
    accessorKey: "empresa",
    header: "EMPRESA",
  },
  {
    accessorKey: "cveSucursal",
    header: "SUCURSAL",
  },
  {
    accessorKey: "estado",
    header: "ESTADO",
  },
  {
    accessorKey: "ciudad",
    header: "CIUDAD",
  },
  {
    accessorKey: "importe",
    header: "IMPORTE",
    type: "currency",
  },
  {
    accessorKey: "moneda",
    header: "MONEDA",
  },
  {
    accessorKey: "interes",
    header: "INTERES",
    type: "percent",
  },
  {
    accessorKey: "fechaPagare",
    header: "FECHA PAGARÉ",
    type: "date",
  },
  {
    accessorKey: "fechaVencimiento",
    header: "FECHA VENCIMIENTO",
    type: "date",
  },
];

export const fieldsViaticos = [
  {
    accessorKey: "estatusSat",
    header: "ESTATUS",
    type: "status",
    width: "120px",
    valueMap: {
      true: "VIGENTE", // Mapea "1" a "ACTIVO"
      false: "CANCELADA", // Mapea "0" a "INACTIVO"
    },
  },
  {
    accessorKey: "uuid",
    header: "UUID",
  },
  {
    accessorKey: "fechaDto.Fecha",
    header: "FECHA FACTURA",
    type: "date",
  },
  {
    accessorKey: "facturaDto.Version",
    header: "VERSIÓN",
  },
  {
    accessorKey: "facturaDto.Folio",
    header: "FOLIO",
  },
  // {
  //   accessorKey: "ordenCompra",
  //   header: "ORDEN COMPRA",
  //   Cell: ({ cell }) => {
  //     const value = cell.getValue();
  //     return value > 0 ? value : "";
  //   },
  // },
  {
    accessorKey: "facturaDto.Emisor.Rfc",
    header: "RFC EMISOR",
  },
  {
    accessorKey: "facturaDto.Emisor.Nombre",
    header: "NOMBRE EMISOR",
  },
  {
    accessorKey: "facturaDto.Emisor.RegimenFiscal",
    header: "REGIMEN EMISOR",
  },
  {
    accessorKey: "facturaDto.Receptor.Rfc",
    header: "RFC RECEPTOR",
  },
  {
    accessorKey: "facturaDto.Receptor.Nombre",
    header: "NOMBRE RECEPTOR",
  },
  {
    accessorKey: "facturaDto.Receptor.UsoCFDI",
    header: "USO CFDI",
  },
  // {
  //   accessorKey: "facturaDto.TipoDeComprobante",
  //   header: "TIPO C",
  //   Cell: ({ cell }) => {
  //     const value = cell.getValue();
  //     if (value === "I") return `INGRESO`;
  //     else return "Invalido";
  //   },
  // },
  {
    accessorKey: "facturaDto.SubTotal",
    header: "SUBTOTAL",
    type: "currency",
  },
  {
    accessorKey: "facturaDto.Impuestos.TotalImpuestosTrasladados",
    header: "IMPUESTOS TRASLADOS",
    type: "currency",
  },
  {
    accessorKey: "facturaDto.Total",
    header: "TOTAL",
    type: "currency",
  },
  {
    accessorKey: "facturaDto.Moneda",
    header: "MONEDA",
  },
  // {
  //   accessorFn: (row) => {
  //     const traslados = row.facturaDto.Impuestos.Traslados;
  //     if (traslados && traslados.length > 0) {
  //       return traslados[0].TasaOCuota;
  //     } else {
  //       return "";
  //     }
  //   },
  //   accessorKey:"TasaOCuota",
  //   header: "Tasa o Cuota",

  // },
  {
    accessorKey: "facturaDto.MetodoPago",
    header: "METODO DE PAGO",
  },
  {
    accessorKey: "facturaDto.FormaPago",
    header: "FORMA DE PAGO",
  },
  {
    accessorKey: "descrEmpl",
    header: "RESPONSABLE",
  },
  {
    accessorKey: "id",
    header: "FOLIO",
  },
];

export const fieldsTraslados = [
  {
    accessorKey: "descrEstatusSap",
    header: "ESTATUS",
    type: "status",
    width: "fit-content",
  },
  {
    accessorKey: "estatusSat",
    header: "ESTATUS SAT",
    type: "status",
    width: "fit-content",
    valueMap: {
      true: "VIGENTE",
      false: "CANCELADA",
    },
  },
  {
    accessorKey: "incluyeCartaPorte",
    header: "CARTA PORTE",
    type: "status",
    width: "fit-content",
    valueMap: {
      true: "INCLUIDA",
      false: "NO INCLUIDA",
    },
  },
  {
    accessorKey: "trasladosCargados",
    header: "TRASLADOS",
    type: "status",
    width: "fit-content",
    valueMap: {
      true: "CARGADOS",
      false: "NO CARGADOS",
    },
  },
  // ID
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "docContable",
    header: "Doc Contable",
  },
  {
    accessorKey: "uuid",
    header: "UUID",
  },
  {
    accessorKey: "claveSapProv",
    header: "CVE SAP PROV",
  },
  {
    accessorKey: "facturaDto.Emisor.Rfc",
    header: "RFC Emisor",
  },
  {
    accessorKey: "facturaDto.Emisor.Nombre",
    header: "Nombre Emisor",
  },
  {
    accessorKey: "facturaDto.Emisor.RegimenFiscal",
    header: "Regimen Emisor",
  },
  {
    accessorKey: "facturaDto.Receptor.Rfc",
    header: "RFC Receptor",
  },
  {
    accessorKey: "facturaDto.Receptor.Nombre",
    header: "Nombre Receptor",
  },
  {
    accessorKey: "facturaDto.Receptor.UsoCFDI",
    header: "Uso CFDI",
  },
  {
    accessorKey: "facturaDto.TipoDeComprobante",
    header: "Tipo C",
    valueMap: {
      I: "Ingreso",
      E: "Egreso",
      P: "Complemento pago",
      T: " Traslado",
    },
  },
  {
    accessorKey: "facturaDto.Fecha",
    header: "Fecha factura",
    type: "date",
  },
  {
    accessorKey: "fechaModificacion",
    header: "Fecha carga",
    type: "date",
  },
  {
    accessorKey: "facturaDto.Folio",
    header: "Folio",
  },
  {
    accessorKey: "facturaDto.SubTotal",
    header: "SubTotal",
    type: "currency",
  },
  {
    id: "TasaOCuota",
    header: "Tasa o Cuota",
    accessorFn: (row) => {
      const traslados = row?.facturaDto?.Impuestos?.Traslados;
      if (traslados && traslados.length > 0) {
        return `${traslados[0].TasaOCuota}%`;
      }
      return "";
    },
  },
  {
    accessorKey: "facturaDto.Impuestos.TotalImpuestosTrasladados",
    header: "Impuestos traslados",
    type: "currency",
  },
  {
    accessorKey: "facturaDto.Impuestos.TotalImpuestosRetenidos",
    header: "Impuestos retenidos",
    type: "currency",
  },
  {
    accessorKey: "facturaDto.Total",
    header: "Total",
    type: "currency",
  },
  {
    accessorKey: "facturaDto.Moneda",
    header: "Moneda",
  },
  {
    accessorKey: "facturaDto.MetodoPago",
    header: "Metodo de pago",
  },
  {
    accessorKey: "facturaDto.FormaPago",
    header: "Forma de pago",
  },
  {
    accessorKey: "facturaDto.Version",
    header: "Versión",
  },
];

export const fieldsTrasladosRelacionados = [
  {
    accessorKey: "descrEstatusSap",
    header: "ESTATUS",
    type: "status",
    width: "fit-content",
  },
  {
    accessorKey: "estatusSat",
    header: "ESTATUS SAT",
    type: "status",
    width: "fit-content",
    valueMap: {
      true: "VIGENTE",
      false: "CANCELADA",
    },
  },
  // ID
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "uuid",
    header: "UUID",
  },
  {
    accessorKey: "claveSapProv",
    header: "CVE SAP PROV",
  },
  {
    accessorKey: "facturaDto.Emisor.Rfc",
    header: "RFC Emisor",
  },
  {
    accessorKey: "facturaDto.Emisor.Nombre",
    header: "Nombre Emisor",
  },
  {
    accessorKey: "facturaDto.Emisor.RegimenFiscal",
    header: "Regimen Emisor",
  },
  {
    accessorKey: "facturaDto.Receptor.Rfc",
    header: "RFC Receptor",
  },
  {
    accessorKey: "facturaDto.Receptor.Nombre",
    header: "Nombre Receptor",
  },
  {
    accessorKey: "facturaDto.Receptor.UsoCFDI",
    header: "Uso CFDI",
  },
  {
    accessorKey: "facturaDto.TipoDeComprobante",
    header: "Tipo C",
    valueMap: {
      I: "Ingreso",
      E: "Egreso",
      P: "Complemento pago",
      T: " Traslado",
    },
  },
  {
    accessorKey: "facturaDto.Fecha",
    header: "Fecha factura",
    type: "date",
  },
  {
    accessorKey: "fechaModificacion",
    header: "Fecha carga",
    type: "date",
  },
  {
    accessorKey: "facturaDto.Folio",
    header: "Folio",
  },
  {
    accessorKey: "facturaDto.SubTotal",
    header: "SubTotal",
    type: "currency",
  },
  {
    id: "TasaOCuota",
    header: "Tasa o Cuota",
    accessorFn: (row) => {
      const traslados = row?.facturaDto?.Impuestos?.Traslados;
      if (traslados && traslados.length > 0) {
        return `${traslados[0].TasaOCuota}%`;
      }
      return "";
    },
  },
  {
    accessorKey: "facturaDto.Impuestos.TotalImpuestosTrasladados",
    header: "Impuestos traslados",
    type: "currency",
  },
  {
    accessorKey: "facturaDto.Impuestos.TotalImpuestosRetenidos",
    header: "Impuestos retenidos",
    type: "currency",
  },
  {
    accessorKey: "facturaDto.Total",
    header: "Total",
    type: "currency",
  },
  {
    accessorKey: "facturaDto.Moneda",
    header: "Moneda",
  },
  {
    accessorKey: "facturaDto.MetodoPago",
    header: "Metodo de pago",
  },
  {
    accessorKey: "facturaDto.FormaPago",
    header: "Forma de pago",
  },
  {
    accessorKey: "facturaDto.Version",
    header: "Versión",
  },
];

export const fieldsTrasladosSecundaria = [
  {
    accessorKey: "descrEstatusSap",
    header: "ESTATUS",
    type: "status",
    width: "fit-content",
  },
  {
    accessorKey: "estatusSat",
    header: "ESTATUS SAT",
    type: "status",
    width: "fit-content",
    valueMap: {
      true: "VIGENTE",
      false: "CANCELADA",
    },
  },
  // ID
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "uuid",
    header: "UUID",
  },
  {
    accessorKey: "claveSapProv",
    header: "CVE SAP PROV",
  },
  {
    accessorKey: "facturaDto.Emisor.Rfc",
    header: "RFC Emisor",
  },
  {
    accessorKey: "facturaDto.Emisor.Nombre",
    header: "Nombre Emisor",
  },
  {
    accessorKey: "facturaDto.Emisor.RegimenFiscal",
    header: "Regimen Emisor",
  },
  {
    accessorKey: "facturaDto.Receptor.Rfc",
    header: "RFC Receptor",
  },
  {
    accessorKey: "facturaDto.Receptor.Nombre",
    header: "Nombre Receptor",
  },
  {
    accessorKey: "facturaDto.Receptor.UsoCFDI",
    header: "Uso CFDI",
  },
  {
    accessorKey: "facturaDto.TipoDeComprobante",
    header: "Tipo C",
    valueMap: {
      I: "Ingreso",
      E: "Egreso",
      P: "Complemento pago",
      T: " Traslado",
    },
  },
  {
    accessorKey: "facturaDto.Fecha",
    header: "Fecha factura",
    type: "date",
  },
  {
    accessorKey: "fechaModificacion",
    header: "Fecha carga",
    type: "date",
  },
  {
    accessorKey: "facturaDto.Folio",
    header: "Folio",
  },
  {
    accessorKey: "facturaDto.SubTotal",
    header: "SubTotal",
    type: "currency",
  },
  {
    id: "TasaOCuota",
    header: "Tasa o Cuota",
    accessorFn: (row) => {
      const traslados = row?.facturaDto?.Impuestos?.Traslados;
      if (traslados && traslados.length > 0) {
        return `${traslados[0].TasaOCuota}%`;
      }
      return "";
    },
  },
  {
    accessorKey: "facturaDto.Impuestos.TotalImpuestosTrasladados",
    header: "Impuestos traslados",
    type: "currency",
  },
  {
    accessorKey: "facturaDto.Impuestos.TotalImpuestosRetenidos",
    header: "Impuestos retenidos",
    type: "currency",
  },
  {
    accessorKey: "facturaDto.Total",
    header: "Total",
    type: "currency",
  },
  {
    accessorKey: "facturaDto.Moneda",
    header: "Moneda",
  },
  {
    accessorKey: "facturaDto.MetodoPago",
    header: "Metodo de pago",
  },
  {
    accessorKey: "facturaDto.FormaPago",
    header: "Forma de pago",
  },
  {
    accessorKey: "facturaDto.Version",
    header: "Versión",
  },
];
