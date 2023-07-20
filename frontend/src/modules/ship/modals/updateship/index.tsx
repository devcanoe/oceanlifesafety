import Loader from '@/common/components/display/loader';
import Button from '@/common/components/form/button';
import Dropdown, { Iitem } from '@/common/components/form/dropdown';
import InputField from '@/common/components/form/inputfield';
import styles from './index.module.css';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { IHandleMotion } from '@/common/components/display/popup';
import SToast from '@/common/components/display/toast/toast';
import { account_type } from '@/common/constants/dropdown-items';
import Ship from '@/common/model/ship.model';
import { useGetShipQuery, useUpdateShipMutation } from '@/common/services/ship.service';

interface IUpdateaccountContent{
    shipId: string | undefined;
    close: () => void
}

export function UpdateShipContent({ shipId, close }: IUpdateaccountContent) {
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

    const [ loading, setLoading ] = useState<boolean>(true);

    const { data, isLoading, isSuccess } = useGetShipQuery({ id: shipId });

    const [ updateShip, {isLoading: shipLoading} ] = useUpdateShipMutation();

    const validationSchema = yup.object({
        name: yup
            .string()
            .required('Name is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: Ship) => { 
            console.log(values)
            const payload = {
                name: values.name
            };

            updateShip({
                id: shipId,
                body: payload
            }).then((res: any) => {
                close()
                successToastHandler({
                    message: res.data.message,
                    visibility: true,
                    status: true,
                })
            }).catch((err: any) => {
                errorToastHandler({
                    message: err.message,
                    visibility: true,
                    status: false,
                })
            });
           
        },
    });

    useEffect(()=>{
        if(isSuccess){
            formik.setValues({
                name: data?.data.name,
            });

            setLoading(false)
        }
    },[isSuccess])
    
    return (
        <>
            <Loader status={loading}/>
            <section className={styles.container}>
                <InputField
                    type={'text'}
                    placeholder="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <Button isLoading={shipLoading}  label={'Update Ship'} onClick={formik.handleSubmit}/>
            </section>

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
        </>
    )
}