import { Icon } from '@iconify/react';
import { GridRowSelectionModel, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Link from 'next/link';
import { useState } from 'react';
import styles from './index.module.css';
import Table from '@/common/components/display/table';
import { useGetDashboardQuery } from '@/common/services/dashboard.service';
import Loader from '@/common/components/display/loader';

export default function DashboardContent() {

    // get dashboard data
    // const { data, isLoading } = useGetDashboardQuery();
    // console.log(!isLoading && data)
    let rows: any[] = [];
    // !isLoading && data?.data.tickets.map((ticket: any) => {
    //     rows.push({
    //         id: ticket._id,
    //         status: ticket.status,
    //         type: ticket.type,
    //         priority: ticket.priority,
    //         agent: ticket.agent.email
    //     })
    // });

    const [rowSelectionModel, setRowSelectionModel] =
        useState<GridRowSelectionModel>([]);
    
        const columns: GridColDef[] = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'type', headerName: 'Type', width: 130 },
            { field: 'status', headerName: 'Status', width: 130 },
            {
              field: 'priority',
              headerName: 'Priority',
              width: 150,
            },
            {
                field: 'agent',
                headerName: 'Agent',
                width: 160,
            },
            {
                field: 'action',
                headerName: 'Action',
                type: 'actions',
                renderCell: (params: GridRenderCellParams<Date>) => (
                    <>
                        <Link href={`/tickets/${params.id}`} className={styles.link} style={{ marginRight: '10px' }}>
                            <Icon icon="ic:baseline-remove-red-eye" />    View
                        </Link>
                    </>
                  ),
                width: 300
              },
          ];
    
    
    return (
        <>
            <DashboardNavbar />
            <Loader status={false}/>
            {true && (
                <>
                <div className={styles.grid2}>
                    <br/>
                    <DashboardCards 
                        completedTickets={0} 
                        unassignedTickets={0} 
                        ongoingTickets={0} 
                        totalAgents={0} 
                    />
                </div>
                <br />
                <br/>
                <section>
                    <h3>Activity Log</h3>
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
                </>
            )
            }
        </>
    )
}

function DashboardNavbar() {
    return (
        <>
            <nav>
                <h3>Dashboard</h3>
            </nav>
        </>
    )
}

interface IDashboardCards {
    completedTickets: number,
    unassignedTickets: number,
    ongoingTickets: number,
    totalAgents: number
}

function DashboardCards(props: IDashboardCards) {
  
    return (
        <>
            <section className={styles.cardscontainer}>
                <div className={styles.card}>
                    <p className={styles.cardp}>Total Companies</p>
                    <h3>{props.completedTickets}</h3>
                    <small className={styles.cardsmall}></small>
                </div>
                <div className={styles.card}>
                    <p className={styles.cardp}>Total Ships</p>
                    <h3>{props.unassignedTickets}</h3>
                    <small className={styles.cardsmall}></small>
                </div>
                <div className={styles.card}>
                    <p className={styles.cardp}>Total Raft</p>
                    <h3>{props.ongoingTickets}</h3>
                    <small className={styles.cardsmall}></small>
                </div>
                <div className={styles.card}>
                    <p className={styles.cardp}>Total Documents</p>
                    <h3>{props.totalAgents}</h3>
                    <small className={styles.cardsmall}></small>
                </div>
            </section>
        </>
    )
}

function Servicecard() {
    return (
        <>
            <div className={styles.card}>
                <p>jgjjk</p>
            </div>
        </>
    )
}

