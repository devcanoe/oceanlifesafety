import InputField from '@/common/components/form/inputfield';
import styles from './index.module.css';
import Button from '@/common/components/form/button';
import { IHandleMotion } from '@/common/components/display/popup';
import { editprofileValidationSchema } from './editprofile.schema';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useFetchUserQuery } from '@/common/services/user.service';
import Loader from '@/common/components/display/loader';

const EditProfileContent = () => {

    const { data, isSuccess } = useFetchUserQuery();
    console.log('data ', isSuccess && data.data)
    const [successToastStatus, setSuccessToastStatus] = useState<IHandleMotion>({
        message: "",
        visibility: false,
        status: false,
      });
      const [errorToastStatus, setErrorToastStatus] = useState<IHandleMotion>({
        message: "",
        visibility: false,
        status: false,
      });
    
      const successToastHandler = (args: IHandleMotion) => {
        setSuccessToastStatus(args);
      };
    
      const errorToastHandler = (args: IHandleMotion) => {
        setErrorToastStatus(args);
      };

      const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            phone: "",
            date_of_birth: "2014-02-09",
            date_hired: "",
            date_fired: "",
            position: ""
        },
        validationSchema: editprofileValidationSchema,
        onSubmit: (values: any) => {
         
        },
      });

      useEffect(()=>{
        if(data){
            formik.setFieldValue('firstname', data.data?.firstname);
            formik.setFieldValue('lastname', data.data?.lastname);
            formik.setFieldValue('email', data.data?.email);
            formik.setFieldValue('phone', data.data?.phone);
        }
      },[isSuccess])

    return (
        <>
            <section className={styles.container}>
                <Loader status={!isSuccess} />
                <div className={styles.col2}>
                <InputField
                    label='Firstname'
                    type="text"
                    name={"firstname"}
                    placeholder="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname && formik.errors.firstname}
                />
                <InputField
                    label='Lastname'
                    type="text"
                    name={"lastname"}
                    placeholder="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname && formik.errors.lastname}
                />
                </div>
                <InputField
                    label='Phone'
                    type="text"
                    name={"phone"}
                    placeholder="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
                <InputField
                    label='Date of Birth'
                    type="date"
                    name={"date_of_birth"}
                    placeholder="Date of birth"
                    value={formik.values.date_of_birth}
                    onChange={formik.handleChange}
                    error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
                    helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
                />
                <InputField
                    label='Position'
                    type="text"
                    name={"position"}
                    placeholder="Position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    error={formik.touched.position && Boolean(formik.errors.position)}
                    helperText={formik.touched.position && formik.errors.position}
                />
                <InputField
                    label='Date Hired'
                    type="date"
                    name={"date_hired"}
                    placeholder="Date hired"
                    value={formik.values.date_hired}
                    onChange={formik.handleChange}
                    error={formik.touched.date_hired && Boolean(formik.errors.date_hired)}
                    helperText={formik.touched.date_hired && formik.errors.date_hired}
                />
                <InputField
                    label='Date Fired'
                    type="date"
                    name={"date_fired"}
                    placeholder="Date fired"
                    value={formik.values.date_fired}
                    onChange={formik.handleChange}
                    error={formik.touched.date_fired && Boolean(formik.errors.date_fired)}
                    helperText={formik.touched.date_fired && formik.errors.date_fired}
                />

                <Button
                    button="primary"
                    isLoading={false}
                    label={"Update Profile"}
                    onClick={formik.handleSubmit}
                />
            </section>
        </>
    )
}

export default EditProfileContent;