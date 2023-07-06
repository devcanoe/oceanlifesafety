import Button from '@/common/components/form/button';
import InputField from '@/common/components/form/inputfield';
import styles from './index.module.css';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useCreateCompanyMutation } from '@/common/services/company.service';
import { useState } from 'react';
import { IHandleMotion } from '@/common/components/display/popup';
import SToast from '@/common/components/display/toast/toast';
import Company from '@/common/model/company.model';
import Ship from '@/common/model/ship.model';
import { useCreateShipMutation } from '@/common/services/ship.service';
import Link from 'next/link';

interface IAddShipContent {
    close: () => void;
    companyId: string;
}

export default function AddFormContent({ close, companyId }: IAddShipContent) {

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
    
    return (
        <>
            <section className={styles.container}>
              
                <Link className={styles.card} href={'/forms/create-eepd'}>Create EEPD</Link>
               
                <Link className={styles.card} href={'/forms/create-eepd'}>Create EEPD</Link>
                
            </section>
        </>
    )
}