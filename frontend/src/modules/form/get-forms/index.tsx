import Loader from "@/common/components/display/loader";
import { IHandleMotion } from "@/common/components/display/popup";
import Table from "@/common/components/display/table";
import SToast from "@/common/components/display/toast/toast";
import Form from "@/common/model/form.model";
import Ship from "@/common/model/ship.model";
import { useDeleteFormMutation, useGetFormsQuery } from "@/common/services/form.service";
import { Icon } from "@iconify/react";
import { GridColDef, GridRenderCellParams, GridRowSelectionModel } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function GetFormsContent() {
    const router = useRouter();

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
    
      const successToastHandler = (args: IHandleMotion) => {
        setSuccessToastStatus(args);
      };
    
      const errorToastHandler = (args: IHandleMotion) => {
        setErrorToastStatus(args);
      };

    const { data, isLoading, isSuccess, refetch } = useGetFormsQuery({id: router.query.id});
    
    const [deleteForm] = useDeleteFormMutation()

    let rows: any[] = [];
 
    isSuccess &&
        data?.data.map((form: Form) => {
       
            rows.push({
                id: form._id,
                type: `${form.type}`,
                ship: `${form.ship.name}`
            });
        });

    const deleteFormHandler = (id: string) => {
        deleteForm({ id })
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
    { field: "type", headerName: "Document Type", width: 150 },
    { field: "ship", headerName: "Ship Name", width: 130 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      renderCell: (params: GridRenderCellParams<Date>) => (
        <>
          <Link href={`/company/${params.id}`}  style={{ marginRight: '10px' }}>
              <Icon icon="ic:baseline-remove-red-eye" />    View
          </Link>
          <Link
            href={`#`}
            onClick={() => {
              deleteFormHandler(params.id);
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
            <Loader status={isLoading}/>
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
        </>
    )
}