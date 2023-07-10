import { IHandleMotion } from "@/common/components/display/popup";
import Table from "@/common/components/display/table";
import { Icon } from "@iconify/react";
import {
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import SToast from "@/common/components/display/toast/toast";
import Ship from "@/common/model/ship.model";
import { useDeleteRaftMutation, useGetAllRaftsQuery } from "@/common/services/raft.service";

export default function RaftContent(props:{id: string}) {

  const router = useRouter();

  const { data, isLoading, isSuccess, isError, refetch } =
    useGetAllRaftsQuery({id: props.id});

  const [deleteRaft, { isLoading: deleteShipLoading }] =
    useDeleteRaftMutation();


  let rows: any[] = [];
 
  isSuccess &&
    data?.data.map((ship: Ship) => {
      rows.push({
        id: ship._id,
        name: `${ship.name}`,
      });
    });

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [successToastStatus, setSuccessToastStatus] = useState<IHandleMotion>({
    message: "",
    visibility: false,
    status: false,
  });
  const [errorToastStatus, setErrorToastStatus] = useState<IHandleMotion>({
    message: "",
    visibility: false,
    status: false,
  });
  const [fetchErrorStatus, setFetchErrorStatus] = useState<IHandleMotion>({
    message: "",
    visibility: false,
    status: false,
  });

  const successToastHandler = (args: IHandleMotion) => {
    setSuccessToastStatus(args);
  };

  const errorToastHandler = (args: IHandleMotion) => {
    setErrorToastStatus(args);
  };

  const fetchErrorHandler = (args: IHandleMotion) => {
    setFetchErrorStatus(args);
  };

  const deleteRaftHandler = (id: string) => {
    deleteRaft({ id })
      .then((res: any) => {
        successToastHandler({
          message: res.data.message,
          visibility: true,
          status: true,
        });
        refetch();
      })
      .catch((err: any) => {
        errorToastHandler({
          message: err.message,
          visibility: true,
          status: false,
        });
      });
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      renderCell: (params: GridRenderCellParams<Date>) => (
        <>
          <Link href={`/company/${params.id}`} className={styles.link} style={{ marginRight: '10px' }}>
              <Icon icon="ic:baseline-remove-red-eye" />    View
          </Link>
          <Link
            href={`#`}
            onClick={() => {
              deleteRaftHandler(params.id);
            }}
            className={"red"}
            style={{ marginRight: "10px" }}
          >
            <Icon icon="ph:trash-bold" /> Delete
          </Link>
          {/* <Link
            href={`#`}
            className={styles.link}
            onClick={() => {
              updateModalToggleHandler();
              setId(params.id.toString());
            }}
          >
            <Icon icon="uil:pen" />
            Edit
          </Link> */}
        </>
      ),
      width: 300,
    },
  ];

  return (
    <>
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
      <SToast
        text={successToastStatus.message}
        severity={"success"}
        open={successToastStatus.visibility}
        onClose={function (): void {
          setSuccessToastStatus({
            visibility: false,
          });
        }}
      />

      <SToast
        text={errorToastStatus.message}
        severity={"error"}
        open={errorToastStatus.visibility}
        onClose={function (): void {
          setErrorToastStatus({
            visibility: false,
          });
        }}
      />

      <SToast
        text={"Some error occurred, please refresh page"}
        severity={"error"}
        open={fetchErrorStatus.visibility}
        onClose={function (): void {
          setFetchErrorStatus({
            visibility: false,
          });
        }}
      />
    </>
  );
}
