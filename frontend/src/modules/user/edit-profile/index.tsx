import InputField from '@/common/components/form/inputfield';
import styles from './index.module.css';
import Button from '@/common/components/form/button';
import { IHandleMotion } from '@/common/components/display/popup';
import { editprofileValidationSchema } from './editprofile.schema';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useFetchUserQuery, useUpdateUserMutation } from '@/common/services/user.service';
import Loader from '@/common/components/display/loader';
import SToast from '@/common/components/display/toast/toast';

const EditProfileContent = () => {

    const { data, isSuccess } = useFetchUserQuery();
    const [ updateEditProfile, {isLoading}] = useUpdateUserMutation();

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
            position: ""
        },
        validationSchema: editprofileValidationSchema,
        onSubmit: (values: any) => {
            updateEditProfile({
                position: values.position,
                phone: values.phone
            }).then(({data, error}: any)=> {
                console.log('data ', data);
                if(data) {
                    successToastHandler({
                        message: data.message,
                        visibility: true,
                        status: true,
                    });
                }

                if (error) {
                    errorToastHandler({
                      message: error.data.message,
                      visibility: true,
                      status: false,
                    });
                  }
                
            }).catch(()=> {
                errorToastHandler({
                    message: "Something went wrong",
                    visibility: true,
                    status: false,
                  });
            });
        },
      });

      useEffect(()=>{
        if(data){
            formik.setFieldValue('firstname', data.data?.firstname);
            formik.setFieldValue('lastname', data.data?.lastname);
            formik.setFieldValue('email', data.data?.email);
            formik.setFieldValue('phone', data.data?.phone);
            formik.setFieldValue('position', data.data?.position);
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
                {/* <InputField
                    label='Date of Birth'
                    type="date"
                    name={"date_of_birth"}
                    placeholder="Date of birth"
                    value={formik.values.date_of_birth}
                    onChange={formik.handleChange}
                    error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
                    helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
                /> */}
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
                {/* <InputField
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
                /> */}

                <Button
                    button="primary"
                    isLoading={isLoading}
                    label={"Update Profile"}
                    onClick={formik.handleSubmit}
                />

        <SToast
          text={successToastStatus.message}
          severity={"success"}
          open={successToastStatus.visibility}
          onClose={function (): void {
            setSuccessToastStatus({
              visibility: false,
            });
          }}
        />

        <SToast
          text={errorToastStatus.message}
          severity={"error"}
          open={errorToastStatus.visibility}
          onClose={function (): void {
            setErrorToastStatus({
              visibility: false,
            });
          }}
        />
            </section>
        </>
    )
}

export default EditProfileContent;