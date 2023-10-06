import { Icon } from "@iconify/react";
import {
  GridRowSelectionModel,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import styles from "./index.module.css";
import Table from "@/common/components/display/table";
import { useGetDashboardQuery } from "@/common/services/dashboard.service";
import Loader from "@/common/components/display/loader";

export default function DashboardContent() {
  // get dashboard data
  const { data, isLoading, isSuccess } = useGetDashboardQuery();
  console.log(isSuccess && data);
  let rows: any[] = [];
  !isLoading &&
    data?.data.table.map((activity: any) => {
      rows.push({
        id: activity._id,
        description: activity.description,
        created_at: activity.created_at,
      });
    });

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const columns: GridColDef[] = [
    { field: "description", headerName: "Description", width: 630 },
    { field: "created_at", headerName: "Created Date", width: 530 },
  ];

  return (
    <>
      <DashboardNavbar />
      <Loader status={isLoading} />
      {true && (
        <>
          <div className={styles.grid2}>
            <br />
            <DashboardCards
              completedTickets={isSuccess && data.data.company}
              unassignedTickets={isSuccess && data.data.ship}
              ongoingTickets={isSuccess && data.data.raft}
              totalAgents={isSuccess && data.data.form}
            />
          </div>
          <br />
          <br />
          <section>
            <h3>Activity Log</h3>
            <br />
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
      )}
    </>
  );
}

function DashboardNavbar() {
  return (
    <>
      <nav>
        <h3>Dashboard</h3>
      </nav>
    </>
  );
}

interface IDashboardCards {
  completedTickets: number;
  unassignedTickets: number;
  ongoingTickets: number;
  totalAgents: number;
}

function DashboardCards(props: IDashboardCards) {
  return (
    <>
      <section className={styles.cardscontainer}>
        <div className={styles.card}>
          <div className={styles.icons}>
            <Icon
              icon="mdi:company"
              width="30"
              height="30"
              color="rgb(2,0,36)"
            />
          </div>
          <div className={styles.carddetails}>
            <p className={styles.cardp}>Total Companies</p>
            <h3>{props.completedTickets}</h3>
            <small className={styles.cardsmall}></small>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icons}>
            <Icon
              icon="tabler:ship"
              width="30"
              height="30"
              color="rgb(2,0,36)"
            />
          </div>
          <div className={styles.carddetails}>
            <p className={styles.cardp}>Total Ships</p>
            <h3>{props.unassignedTickets}</h3>
            <small className={styles.cardsmall}></small>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icons}>
            <Icon
              icon="map:rafting"
              width="30"
              height="30"
              color="rgb(2,0,36)"
            />
          </div>
          <div className={styles.carddetails}>
            <p className={styles.cardp}>Total Raft</p>
            <h3>{props.ongoingTickets}</h3>
            <small className={styles.cardsmall}></small>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icons}>
            <Icon
              icon="carbon:document"
              width="30"
              height="30"
              color="dark-blue"
            />
          </div>
          <div className={styles.carddetails}>
            <p className={styles.cardp}>Total Documents</p>
            <h3>{props.totalAgents}</h3>
            <small className={styles.cardsmall}></small>
          </div>
        </div>
      </section>
    </>
  );
}

function Servicecard() {
  return (
    <>
      <div className={styles.card}>
        <p>jgjjk</p>
      </div>
    </>
  );
}
