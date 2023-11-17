import DashboardLayout from "@/common/layout/dashboard";
import styles from '../styles/search.module.css';
import { useSearchQuery } from "@/common/services/dashboard.service";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { GridColDef, GridRenderCellParams, GridRowSelectionModel } from "@mui/x-data-grid";
import Table from "@/common/components/display/table";
import { Invoice } from "@/common/model/invoice.model";
import Loader from "@/common/components/display/loader";

export default function Search() {
const router = useRouter();

const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
const [ searchValue, setSearchValue ]= useState<string>("")
  
 const { data, isLoading, isSuccess } = useSearchQuery({invoice_id: router.query.search ? router.query.search : searchValue})
    

    let rows: any[] = [];

    !isLoading &&
      data?.data.map((invoice: Invoice) => {
        rows.push({
          id: invoice._id,
          reference_no: `${invoice.ref_no}`,
          receiver_company: `${invoice.receiver_company}`,
          due_date: invoice.due_date,
          total: invoice.total
        });
      });

    const columns: GridColDef[] = [
        { field: "reference_no", headerName: "Reference Number", width: 300 },
        { field: "receiver_company", headerName: "Receiver", width: 200 },
        { field: "due_date", headerName: "Due Date", width: 200 },
        { field: "total", headerName: "Total", width: 200 },
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
              {/* <Link
                href={`#`}
                onClick={() => {
                  deleteInvoiceHandler(params.id);
                }}
                className={"red"}
                style={{ marginRight: "10px" }}
              >
                <Icon icon="ph:trash-bold" /> Delete
              </Link>
              <Link
                href={`/invoice/edit/${params.id}`}
                className={styles.link}
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
      <DashboardLayout>
      <Loader status={isLoading} />
        <section>
        <h3>Search Results</h3>
        <br/>
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
      </DashboardLayout>
    </>
  );
}