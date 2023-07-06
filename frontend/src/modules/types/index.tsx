import Loader from '@/common/components/display/loader';
import Popup, { IHandleMotion } from '@/common/components/display/popup';
import Table from '@/common/components/display/table';
import Breadcrumb, { Item } from '@/common/layout/Breadcrumb';
import { Icon } from '@iconify/react';
import { GridColDef, GridRenderCellParams, GridRowSelectionModel } from '@mui/x-data-grid';
import Link from 'next/link';
import { useState } from 'react';
import { Navbar } from '../clients';
import {  UpdatetypeContent } from './addtype';
import styles from './index.module.css';
import AddtypeContent from './addtype';
import { useDeleteTypeMutation, useGetTypesQuery } from '@/common/services/ticket.service';
import { Router, useRouter } from 'next/router';
import SToast from '@/common/components/display/toast/toast';
import { useAppDispatch } from '@/lib/hooks';

export default function TypeContent() {

    const { data, isLoading, refetch } = useGetTypesQuery();

    const [ deleteType, {isLoading: deleteTypeLoading}] = useDeleteTypeMutation();

    const [ id, setId ] = useState<number>();

    let rows: any[] = [];
    
    !isLoading && data?.data.map((type: any) => {
        rows.push({
            id: type._id,
            name: type.name
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
        refetch();
    }

    const updateModalToggleHandler = (id?: number) => {
        if(id) {
            setId(id);
        } else {
            setId(0)
        }
        
        setUpdateModalStatus(state => !state);
        refetch();
    }

    const deleteTypeHandler = (id: number) => {
        deleteType({ id: id.toString() }).then((res: any) => {
            console.log(res)
            if (res.data.status === "success") {
              
                successToastHandler({
                    message: res.data.message,
                    visibility: true,
                    status: true,
                })
                refetch()
               
            } else {
                errorToastHandler({
                    message: res.data.message,
                    visibility: true,
                    status: false,
                })
            }
        }).catch((err: any) => {
            errorToastHandler({
                message: err.message,
                visibility: true,
                status: false,
            })
        })
    }

    
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 170 },
    { field: 'name', headerName: 'Name', width: 130 },
    {
        field: 'action',
        headerName: 'Action',
        type: 'actions',
        renderCell: (params: GridRenderCellParams<Date>) => (
            <>
                <Link href={`#`} onClick={() => deleteTypeHandler(params.id)} className={'red'}  style={{ marginRight: '10px' }}>
                    <Icon icon="ph:trash-bold"  /> Delete
                </Link>
                <Link href={`#`} className={styles.link} onClick={() => updateModalToggleHandler(params.id)}><Icon icon="uil:pen" />Edit</Link>
            </>
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
                url: '/types',
                label: 'Types',
                current: true
            }
        ]

    return (
        <>
            <Loader status={isLoading}/>
            <main className={styles.container}>
                <Breadcrumb path={breadcrumbPath}/>
                <Navbar title={'Types'}
                    rowSelectionModel={rowSelectionModel}
                    buttonLabel={'Add Type'} buttonAction={modalToggleHandler} deleteAction={function (): void {
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
                <AddtypeContent close={modalToggleHandler}/>
            </Popup>

            <Popup
                displayStatus={updateModalStatus}
                close={updateModalToggleHandler}
            >
                <UpdatetypeContent id={id}/>
            </Popup>
        </>
    )
}


