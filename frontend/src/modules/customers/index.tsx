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
import AddcylinderContent from './addcustomer';
import styles from './index.module.css';
import { useDeleteCustomerMutation, useGetAllCustomersQuery } from '@/common/services/ship.service';
import SToast from '@/common/components/display/toast/toast';

export default function CustomerContent() {

    const { data, isLoading, isSuccess, refetch } = useGetAllCustomersQuery();
  
    const [deleteCustomer, { isLoading: deleteCustomerLoading }] = useDeleteCustomerMutation();
    
    let rows: any[] = [];

    !isLoading && data?.data.map((customer: any) => {
        console.log(customer)
        rows.push({
            id: customer._id,
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email,
            phone: customer.phone
        })
    });

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
        setModalStatus(state=> !state);
        refetch()
    }

    const updateModalToggleHandler = () => {
        setUpdateModalStatus(state=> !state);
        refetch()
    }

    const deleteCustomerHandler = (id: number) => {
        deleteCustomer({ id: id.toString() }).then((res: any) => {
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
        { field: 'firstname', headerName: 'First name', width: 150 },
        { field: 'lastname', headerName: 'Last name', width: 150 },
        { field: 'email', headerName: 'Email', width: 230 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            type: 'actions',
            renderCell: (params: GridRenderCellParams<Date>) => (
                <> 
                    <Link href={`#`} onClick={() => { console.log(params.id);  deleteCustomerHandler(params.id)}} className={'red'} style={{ marginRight: '10px' }}>
                        <Icon icon="ph:trash-bold"  /> Delete
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
                url: '/customers',
                label: 'Customers',
                current: true
            }
        ]

    return (
        <>
            <Loader status={isLoading}/>
            <main className={styles.container}>
                <Breadcrumb path={breadcrumbPath}/>
                <Navbar title={'Customers'}
                    rowSelectionModel={rowSelectionModel}
                    buttonLabel={'Add Customer'} buttonAction={modalToggleHandler} deleteAction={function (): void {
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
                <AddcylinderContent close={modalToggleHandler}/>
            </Popup>
        </>
    )
}


