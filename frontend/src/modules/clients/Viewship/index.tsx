import Table from "@/common/components/display/table";
import Breadcrumb, { Item } from "@/common/layout/Breadcrumb";
import { Icon } from "@iconify/react";
import { Link } from "@mui/material";
import {
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useState } from "react";
import { Navbar } from "..";
import styles from "./index.module.css";

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Viewclient() {
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      renderCell: (params: GridRenderCellParams<Date>) => (
        <>
          {" "}
          <Link
            href={`/clients/${params.id}`}
            className={styles.link}
            style={{ marginRight: "10px" }}
          >
            <Icon icon="ic:baseline-remove-red-eye" /> View
          </Link>
          <Link
            href={`/clients/${params.id}`}
            className={styles.link}
            style={{ marginRight: "10px" }}
          >
            <Icon
              icon="ph:trash-bold"
              onClick={() => {
                console.log("deleted");
              }}
            />{" "}
            Delete
          </Link>
          <Link href={`/clients/${params.id}`} className={styles.link}>
            <Icon icon="uil:pen" />
            Edit
          </Link>
        </>
      ),
      width: 300,
    },
  ];

  const breadcrumbPath: Item[] = [
    {
      id: "1",
      url: "/dashboard",
      label: "Dashboard",
      current: false,
    },
    {
      id: "2",
      url: "/clients",
      label: "Clients",
      current: false,
    },
    {
      id: "3",
      url: `/clients/${router.query.ship}`,
      label: "ClientName",
      current: false,
    },
    {
      id: "4",
      url: `/clients/${router.query.ship}`,
      label: "ShipName",
      current: true,
    },
  ];

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  console.log(router.query);
  return (
    <>
      <section>
        <Breadcrumb path={breadcrumbPath} />
        <Navbar
          title={"ClientName"}
          rowSelectionModel={rowSelectionModel}
          buttonLabel={"Add Raft"}
          buttonAction={function (): void {
            throw new Error("Function not implemented.");
          }}
          deleteAction={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Table
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={5}
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={(newRowSelectionModel: any) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
        />
      </section>
    </>
  );
}
