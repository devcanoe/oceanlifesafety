import Loader from "@/common/components/display/loader";
import Popup, { IHandleMotion } from "@/common/components/display/popup";
import Table from "@/common/components/display/table";
import Breadcrumb, { Item } from "@/common/layout/Breadcrumb";
import { Icon } from "@iconify/react";
import {
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { Navbar } from "../clients";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import SToast from "@/common/components/display/toast/toast";
import { UpdateShipContent } from "./modals/updateship";
import AddCompanyContent from "./modals/addship";
import {
  useDeleteShipMutation,
  useGetAllShipsQuery,
} from "@/common/services/ship.service";
import Ship from "@/common/model/ship.model";
import { useAppSelector } from "@/common/lib/hooks";
import { selectShipActive } from "@/common/lib/slice/ship.slice";
import AddShipContent from "./modals/addship";
import CompanyDetail from "../company/details";
import Tabs from "@/common/components/display/tabs";
import GetFormsContent from "../form/get-forms";
import RaftContent from "../raft";

export default function ShipContent(props: { id: string }) {
  const router = useRouter();

  const { data, isLoading, isSuccess, isError, refetch } = useGetAllShipsQuery({
    id: props.id,
  });

  const [deleteCompany, { isLoading: deleteShipLoading }] =
    useDeleteShipMutation();

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
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [updateModalStatus, setUpdateModalStatus] = useState<boolean>(false);
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

  const modalToggleHandler = () => {
    setModalStatus((state) => !state);
    refetch();
  };

  const updateModalToggleHandler = () => {
    setUpdateModalStatus((state) => !state);
    refetch();
  };

  if (isError) {
    fetchErrorHandler({
      message: "",
      visibility: isError,
      status: false,
    });
  }

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
    { field: "name", headerName: "Name", width: 130 },
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
            <Icon icon="ic:baseline-remove-red-eye" /> View
          </Link>
          <Link
            href={`#`}
            onClick={() => {
              deleteCompanyHandler(params.id);
            }}
            className={"red"}
            style={{ marginRight: "10px" }}
          >
            <Icon icon="ph:trash-bold" /> Delete
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
      url: "/company",
      label: "Company",
      current: true,
    },
  ];

  const headers: string[] = ["Ships", "Rafts", "Forms"];

  const contents: ReactNode[] = [
    <Table
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={5}
      rowSelectionModel={rowSelectionModel}
      onRowSelectionModelChange={(newRowSelectionModel: any) => {
        setRowSelectionModel(newRowSelectionModel);
      }}
    />,
    <RaftContent id={router.query.id} />,
    <GetFormsContent />,
  ];

  return (
    <>
      <main className={styles.container}>
        <Loader status={isLoading} />

        <Breadcrumb path={breadcrumbPath} />

        <CompanyDetail id={props.id} refetchShips={() => refetch()} />

        <Tabs headers={headers} contents={contents} />
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
        <AddShipContent
          companyId={router.query?.id}
          close={modalToggleHandler}
        />
      </Popup>

      <Popup displayStatus={updateModalStatus} close={updateModalToggleHandler}>
        <UpdateShipContent close={updateModalToggleHandler} shipId={id} />
      </Popup>
    </>
  );
}
