import Loader from '@/common/components/display/loader';
import Popup, { IHandleMotion } from '@/common/components/display/popup';
import Table from '@/common/components/display/table';
import Button from '@/common/components/form/button';
import Breadcrumb, { Item } from '@/common/layout/Breadcrumb';
import { Icon } from '@iconify/react';
import { GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import Link from 'next/link';
import { useState } from 'react';
import { isPropertySignature } from 'typescript';
import { Navbar } from '../clients';
import AdditemContent from '../company/modals/addcompany';
import AddticketContent, { UpdateticketContent } from './addticket';

import styles from './index.module.css';
import { useDeleteTicketMutation, useGetAllTicketsQuery } from '@/common/services/ticket.service';
import SToast from '@/common/components/display/toast/toast';

export default function TicketContent() {

    const { data, isLoading, refetch } = useGetAllTicketsQuery();

    const [deleteTicket, { isLoading: deleteTicketLoading }] = useDeleteTicketMutation();

    let rows: any[] = [];

    !isLoading && data?.data.map((ticket: any) => {
        console.log(ticket)
        rows.push({
            id: ticket._id,
            type: ticket.type.name,
            status: ticket.status,
            priority: ticket.priority,
            agent: ticket.agent.email
        })
    })

    const [rowSelectionModel, setRowSelectionModel] =
        useState<GridRowSelectionModel>([]);
    
    const [modalStatus, setModalStatus] = useState<boolean>(false);
    const [updateModalStatus, setUpdateModalStatus] = useState<boolean>(false);
    const [successToastStatus, setSuccessToastStatus] = useState<IHandleMotion>({
        message: '',
        visibility: false,
        status: false
    });
    const [errorToastStatus, setErrorToastStatus] = useState<IHandleMotion>({
        message: '',
        visibility: false,
        status: false
    });

    const successToastHandler = (args: IHandleMotion) => {
        setSuccessToastStatus(args);
    }

    const errorToastHandler =(args: IHandleMotion) => {
        setErrorToastStatus(args);
    }
    
    const modalToggleHandler = () => {
        setModalStatus(state => !state);
        refetch()
    }

    const updateModalToggleHandler = () => {
        setUpdateModalStatus(state => !state);
        refetch()
    }

    const deleteTicketHandler = (id: number) => {
        deleteTicket({ id: id.toString() }).then((res: any) => {
            successToastHandler({
                message: res.data.message,
                visibility: true,
                status: true,
            })
            refetch()
        }).catch((err: any) => {
            errorToastHandler({
                message: err.message,
                visibility: true,
                status: false,
            })
        })
    }  

    
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
                <Link href={`#`}  onClick={() => { deleteTicketHandler(params.id)}} className={'red'} style={{ marginRight: '10px' }}>
                <Icon icon="ph:trash-bold" /> Delete
                </Link>
                <Link href={`#`} className={styles.link} onClick={updateModalToggleHandler}><Icon icon="uil:pen" />Edit</Link></>
          ),
        width: 300
      },
  ];

        const breadcrumbPath: Item[] = [
            {
                id: '1',
                url: '/dashboard',
                label: 'Dashboard',
                current: false
            },
            {
                id: '2',
                url: '/tickets',
                label: 'Tickets',
                current: true
            }
        ]

    return (
        <>
            <Loader status={isLoading}/>
            <main className={styles.container}>
                <Breadcrumb path={breadcrumbPath}/>
                <Navbar title={'Tickets'}
                    rowSelectionModel={rowSelectionModel}
                    buttonLabel={'Add Ticket'} buttonAction={modalToggleHandler} deleteAction={function (): void {
                    throw new Error('Function not implemented.');
                } } />
                <Table
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={5}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={(newRowSelectionModel: any) => {
                        setRowSelectionModel(newRowSelectionModel);
                      }} />
            </main>
            <SToast text={successToastStatus.message} severity={'success'} open={successToastStatus.visibility} onClose={function (): void {
                    setSuccessToastStatus({
                        visibility: false
                    })
                }} />
                
            <SToast text={errorToastStatus.message} severity={'error'} open={errorToastStatus.visibility} onClose={function (): void {
                setErrorToastStatus({
                    visibility: false
                })
            } }/>
            <Popup
                displayStatus={modalStatus}
                close={modalToggleHandler}
            >
                <AddticketContent close={modalToggleHandler}/>
            </Popup>

            <Popup
                displayStatus={updateModalStatus}
                close={updateModalToggleHandler}
            >
                <UpdateticketContent/>
            </Popup>
        </>
    )
}


