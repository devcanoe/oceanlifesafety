import Table from "@/common/components/display/table";
import Button from "@/common/components/form/button";
import Breadcrumb, { Item } from "@/common/layout/Breadcrumb";
import { Icon } from "@iconify/react";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { isPropertySignature } from "typescript";
import styles from "./index.module.css";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "Name", headerName: "Name", width: 130 },
  { field: "Number_of_Raft", headerName: "Number of Raft", width: 130 },
  {
    field: "Number_of_Ship",
    headerName: "Number of Ship",
    type: "number",
    width: 130,
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

export default function ShipContent() {
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

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
      current: true,
    },
  ];

  return (
    <>
      <main className={styles.container}>
        <Breadcrumb path={breadcrumbPath} />
        <Navbar
          title={"Clients"}
          rowSelectionModel={rowSelectionModel}
          buttonLabel={"Add Client"}
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
      </main>
    </>
  );
}

interface INavbar {
  title: string;
  rowSelectionModel?: GridRowSelectionModel;
  buttonLabel?: string;
  buttonAction?: () => void;
  customButtonLabel?: string;
  customButtonAction?: () => void;
  deleteAction: () => void;
}

export function Navbar({
  rowSelectionModel,
  title,
  buttonLabel,
  buttonAction,
  deleteAction,
  customButtonLabel,
  customButtonAction,
}: INavbar) {
  return (
    <>
      <nav className={styles.clientnavbar}>
        <h3>{title}</h3>

        <div className={styles.clientbutton}>
          {rowSelectionModel?.length ||
            (0 > 0 && (
              <Icon
                icon="ph:trash-bold"
                color="red"
                width={30}
                height={30}
                onClick={deleteAction}
              />
            ))}
          {customButtonLabel && customButtonAction && (
            <Button label={customButtonLabel} onClick={customButtonAction} />
          )}
          {buttonLabel && buttonAction && (
            <Button label={buttonLabel} onClick={buttonAction} />
          )}
        </div>
      </nav>
    </>
  );
}
