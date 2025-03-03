// Archivo: CustomTable.js
import { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";

const CustomTable = ({ columns, data, ...otherProps }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // useEffect Mobile
  useEffect(() => {
    // Manejador para actualizar el estado basado en el tamaño de la ventana
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    // Agregar listener para el evento resize
    window.addEventListener("resize", handleResize);

    // Limpiar el listener cuando el componente se desmonte
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <MaterialReactTable
      // Configuraciones globales
      muiTableContainerProps={{
        sx: {
          transition: "all 3s",
          maxHeight: isMobile
            ? "62vh"
            : {
                maxHeight: "75vh", // Valor por defecto para pantallas más grandes
                "@media (max-height: 800px)": {
                  maxHeight: "50vh", // Para pantallas con altura máxima de 800px
                },
                "@media (max-height: 700px)": {
                  maxHeight: "65vh", // Para pantallas con altura máxima de 700px
                },
                "@media (max-height: 600px)": {
                  maxHeight: "60vh", // Para pantallas con altura máxima de 600px
                },
                "@media (max-height: 500px)": {
                  maxHeight: "55vh", // Para pantallas con altura máxima de 500px
                },
                // ... puedes añadir más puntos de ruptura según sea necesario
              },
          height: "auto",
        },
      }}
      muiTablePaginationProps={{}}
      muiTableHeadCellProps={{
        sx: () => ({
          fontSize: "16px",
        }),
      }}
      muiTableBodyProps={{}}
      muiTablePaperProps={{
        elevation: isMobile ? 0 : 10,
        sx: {
          borderRadius: isMobile ? "" : "4px",
        },
      }}
      localization={MRT_Localization_ES}
      enableColumnFilterModes
      globalFilterFn="contains"
      enableStickyHeader
      enableStickyFooter
      initialState={{
        density: "compact",
        pagination: { pageIndex: 0, pageSize: 10 },
      }}
      enableDensityToggle={false}
      enableGrouping
      enableColumnOrdering
      enableColumnDragging
      enableFullScreenToggle={false}
      // Props dinámicas
      columns={columns}
      data={data}
      {...otherProps}
    />
  );
};

export default CustomTable;
