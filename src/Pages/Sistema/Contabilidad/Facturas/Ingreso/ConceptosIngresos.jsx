import CustomTable from "@/Components/Custom/CustomTable";
import { tableCellPropsCenter } from "@/Components/Custom/CustomBoxStyles";

function ConceptosIngresos({ conceptos }) {
  const columns = [
    //CANTIDAD
    {
      accessorKey: "Cantidad",
      header: "Cantidad",
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "Descripcion",
      header: "Descripción",
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "ValorUnitario",
      header: "Valor unitario",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(value);
      },
    },
    {
      accessorKey: "Importe",
      header: "Importe",
      ...tableCellPropsCenter,
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(value);
      },
    },
    {
      accessorKey: "ClaveProdServ",
      header: "Clave Prod/Serv",
      ...tableCellPropsCenter,
    },
    {
      accessorKey: "ClaveUnidad",
      header: "Clave unidad",
      ...tableCellPropsCenter,
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={conceptos}
      muiTableContainerProps={{
        sx: {
          maxHeight: "60vh",
        },
      }}
    />
  );
}

export default ConceptosIngresos;
