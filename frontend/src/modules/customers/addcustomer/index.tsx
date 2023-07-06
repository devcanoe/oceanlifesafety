import Button from '@/common/components/form/button';
import InputField from '@/common/components/form/inputfield';
import styles from './index.module.css';
import * as yup from 'yup';
import { useCreateCustomerMutation } from '@/common/services/ship.service';
import { useFormik } from 'formik';
import { useRegisterMutation } from '@/common/services/authservice';
import { IHandleMotion } from '@/common/components/display/popup';
import { useState } from 'react';
import SToast from '@/common/components/display/toast/toast';

interface IAddCustomerContent {
    close: () => void
}

export default function AddcustomerContent({ close }: IAddCustomerContent) {

    const [register, { isLoading }] = useCreateCustomerMutation();

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

    const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;  

    
    const validationSchema = yup.object({
        firstname: yup
            .string()
            .required('First Name is required'),
        lastname: yup
            .string()
            .required('Last Name is required'),
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        phone: yup
            .string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Phone Number is required'),
    });

  
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => { 
            register({
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                phone: values.phone,
            }).then((res: any) => {
                console.log(res)
                if (res.data.status === "success") {
                    close()
                    successToastHandler({
                        message: res.data.message,
                        visibility: true,
                        status: true,
                    })
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
        },
    });

    return (
        <>
            <section className={styles.container}>
                <InputField
                    placeholder='First Name'
                    type={'text'}
                    name={'firstname'}
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname && formik.errors.firstname}
                />
                <InputField
                    placeholder='Last Name'
                    type={'text'}
                    name={'lastname'}
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname && formik.errors.lastname}
                />
                <InputField
                    placeholder='Email'
                    type={'email'}
                    name={'email'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <InputField
                    placeholder='Phone Number'
                    type={'tel'}
                    name={'phone'}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
                <Button isLoading={isLoading} label={'Add Customer'} onClick={formik.handleSubmit}/>
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


export function UpdatecustomerContent() {
    return (
        <>
            <section className={styles.container}>
                <InputField type={'text'} placeholder="First name" />
                <InputField type={'text'} placeholder="Last name" />
                <InputField type={'email'} placeholder="Email" />

                <Button label={'Update Customer'} onClick={function (): void {
                    throw new Error('Function not implemented.');
                } }/>
            </section>
        </>
    )
}