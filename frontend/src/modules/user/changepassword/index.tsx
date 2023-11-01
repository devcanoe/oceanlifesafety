import Loader from '@/common/components/display/loader';
import styles from './index.module.css';
import InputField from '@/common/components/form/inputfield';
import { useState } from 'react';
import { IHandleMotion } from '@/common/components/display/popup';
import { changepasswordValidationSchema } from './changepassword.schema';
import { useFormik } from 'formik';
import Button from '@/common/components/form/button';
import { useChangePasswordMutation } from '@/common/services/user.service';
import SToast from '@/common/components/display/toast/toast';

export default function ChangepasswordContent() {

    const [ changePassword, {isLoading}] = useChangePasswordMutation();

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
            password: '',
            confirmpassword: ''
        },
        validationSchema: changepasswordValidationSchema,
        onSubmit: (values: any) => {
            changePassword({
                password: values.password,
                confirmpassword: values.confirmpassword
            }).then(({data, error}: any)=> {
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
            }).catch(()=>{
                errorToastHandler({
                    message: "Something went wrong",
                    visibility: true,
                    status: false,
                });
            })
        },
      });

    return (
        <>
             <section className={styles.container}>
                <InputField
                    label='Password'
                    type="password"
                    name={"password"}
                    placeholder="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <InputField
                    label='Confirm Password'
                    type="password"
                    name={"confirmpassword"}
                    placeholder="confirm password"
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                    helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                />
                 <Button
                    button="primary"
                    isLoading={isLoading}
                    label={"Change password"}
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