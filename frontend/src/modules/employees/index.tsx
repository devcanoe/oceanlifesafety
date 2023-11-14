import Loader from "@/common/components/display/loader";
import Popup, { IHandleMotion } from "@/common/components/display/popup";
import Table from "@/common/components/display/table";
import { Icon } from "@iconify/react";
import {
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "../clients";
import styles from "./index.module.css";
import SToast from "@/common/components/display/toast/toast";
import {
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
} from "@/common/services/company.service";
import AddEmployeeContent from "./modals/addemployee";

export default function EmployeeContent() {
  const [id, setId] = useState<string | undefined>();
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [updateModalStatus, setUpdateModalStatus] = useState<boolean>(false);
  const [deleteModalStatus, setDeleteModalStatus] = useState<boolean>(false);
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

  const { data, isLoading, isSuccess, isError, refetch } =
    useGetCompaniesQuery();

  const [deleteCompany, { isLoading: deleteCompanyLoading }] =
    useDeleteCompanyMutation();

  let rows: any[] = [];

  const successToastHandler = (args: IHandleMotion) => {
    setSuccessToastStatus(args);
  };

  const errorToastHandler = (args: IHandleMotion) => {
    setErrorToastStatus(args);
  };

  const fetchErrorHandler = (args: IHandleMotion) => {
    setFetchErrorStatus(args);
  };

  const modalToggleHandler = () => {
    setModalStatus((state) => !state);
    refetch();
  };

  const updateModalToggleHandler = () => {
    setUpdateModalStatus((state) => !state);
    refetch();
  };

  const deleteModalToggleHandler = () => {
    setDeleteModalStatus((state) => !state);
    refetch();
  };

  const deleteCompanyHandler = (id: string) => {
    deleteCompany({ id })
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
    { field: "firstname", headerName: "First Name", width: 230 },
    { field: "lastname", headerName: "Last Name", width: 230 },
    { field: "position", headerName: "Position", width: 230 },
    { field: "phone", headerName: "Phone", width: 230 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      renderCell: (params: GridRenderCellParams<Date>) => (
        <>
          <Link
            href={`/company/${params.id}`}
            className={styles.link}
            style={{ marginRight: "10px" }}
          >
            <Icon icon="ic:baseline-remove-red-eye" />
          </Link>
          <Link
            href={`#`}
            onClick={() => {
              deleteCompanyHandler(params.id);
            }}
            className={"red"}
            style={{ marginRight: "10px" }}
          >
            <Icon icon="ph:trash-bold" />
          </Link>
          <Link
            href={`#`}
            className={styles.link}
            onClick={() => {
              updateModalToggleHandler();
              setId(params.id.toString());
            }}
          >
            <Icon icon="uil:pen" />
          </Link>
        </>
      ),
      width: 300,
    },
  ];

  return (
    <>
      <main className={styles.container}>
        <Loader status={isLoading} />
        <Navbar
          title={"Employee"}
          rowSelectionModel={rowSelectionModel}
          buttonLabel={"Add Employee"}
          buttonAction={modalToggleHandler}
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
      <Popup displayStatus={modalStatus} close={modalToggleHandler}>
        <AddEmployeeContent close={modalToggleHandler} />
      </Popup>

      <Popup
        displayStatus={updateModalStatus}
        close={updateModalToggleHandler}
      ></Popup>
    </>
  );
}
