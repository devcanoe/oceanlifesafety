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
import GenerateInvoiceContent from "./modal/generateInvoice";
import {
  useDeleteInvoiceMutation,
  useFetchInvoicesQuery,
} from "@/common/services/invoice.service";
import { Invoice } from "@/common/model/invoice.model";
import { useRouter } from "next/router";

export default function InvoiceContent() {
  const router = useRouter();

  const { data, isLoading, isSuccess, isError, refetch } =
    useFetchInvoicesQuery();

  const [deleteInvoice, { isLoading: deleteCompanyLoading }] =
    useDeleteInvoiceMutation();

  let rows: any[] = [];

  !isLoading &&
    data?.data.map((invoice: Invoice) => {
      rows.push({
        id: invoice._id,
        reference_no: `${invoice.ref_no}`,
      });
    });

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [modalStatus, setModalStatus] = useState<boolean>(false);

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
    router.push("/invoice/create");
    // refetch();
  };

  const updateModalToggleHandler = () => {
    setUpdateModalStatus((state) => !state);
    // refetch();
  };

  const deleteInvoiceHandler = (id: string) => {
    deleteInvoice({ id })
      .then((res: any) => {
        successToastHandler({
          message: res.data.message,
          visibility: true,
          status: true,
        });
        // refetch();
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
    { field: "reference_no", headerName: "Reference Number", width: 200 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      renderCell: (params: GridRenderCellParams<Date>) => (
        <>
          <Link
            href={`/invoice/${params.id}`}
            className={styles.link}
            style={{ marginRight: "10px" }}
          >
            <Icon icon="ic:baseline-remove-red-eye" />
            View
          </Link>
          <Link
            href={`#`}
            onClick={() => {
              deleteInvoiceHandler(params.id);
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
      <main className={styles.container}>
        <Loader status={isLoading} />
        <Navbar
          title={"Invoice"}
          rowSelectionModel={rowSelectionModel}
          buttonLabel={"Add Invoice"}
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
      {/* <Popup displayStatus={modalStatus} close={modalToggleHandler}>
        <GenerateInvoiceContent refetch={refetch} />
      </Popup> */}

      {/* <Popup displayStatus={updateModalStatus} close={updateModalToggleHandler}>
        <UpdateaccountContent close={updateModalToggleHandler} id={props.id} />
      </Popup> */}
    </>
  );
}
