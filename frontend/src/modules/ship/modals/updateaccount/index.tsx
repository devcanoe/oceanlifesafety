import Loader from '@/common/components/display/loader';
import Button from '@/common/components/form/button';
import Dropdown, { Iitem } from '@/common/components/form/dropdown';
import InputField from '@/common/components/form/inputfield';
import styles from './index.module.css';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useCreateAccountMutation, useGetAccountQuery } from '@/common/services/company.service';
import { useState } from 'react';
import { IHandleMotion } from '@/common/components/display/popup';
import SToast from '@/common/components/display/toast/toast';
import { account_type } from '@/common/constants/dropdown-items';

interface IUpdateaccountContent{
    id: string;
    close: () => void
}

export function UpdateaccountContent({ id, close }: IUpdateaccountContent) {

    const [role, setRole] = useState<string>("");
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

    const { data, isLoading } = useGetAccountQuery({id})
   

    const [update, { isLoading: updateLoading }] = useCreateAccountMutation();

    const validationSchema = yup.object({
        firstname: yup
            .string()
            .required('Firstname is required'),
        lastname: yup
            .string()
            .required('Lastname is required'),
        role: yup
            .string()
            .required('Role is required'),
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        phone: yup
            .string()
            .required('Phone is required')
    });

    const formik = useFormik({
        initialValues: {
            firstname: !isLoading && data.data.firstname,
            lastname: !isLoading && data.data.lastname,
            email: !isLoading && data.data.email,
            phone: !isLoading && data.data.phone,
            role: !isLoading && data.data.role
        },
        validationSchema: validationSchema,
        onSubmit: (values) => { 
            console.log(values)
            const payload = {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                phone: values.phone,
                role: values.role
            };

            update(payload).then((res: any) => {
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
    
    return (
        <>
            <Loader status={isLoading}/>
            <section className={styles.container}>
                <Dropdown label={'Account type'} disabled={false} items={account_type}
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                />
                <InputField
                    type={'text'}
                    placeholder="First name"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname && formik.errors.firstname}
                />
                <InputField
                    type={'text'}
                    placeholder="Last name"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname && formik.errors.lastname}
                />
                <InputField
                    type={'email'}
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <InputField
                    type={'text'}
                    placeholder="Phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
                <Button isLoading={updateLoading}  label={'Update Account'} onClick={formik.handleSubmit}/>
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