import Button from "@/common/components/form/button";
import InputField from "@/common/components/form/inputfield";
import styles from "./index.module.css";
import { useAppDispatch } from "@/common/lib/hooks";
import { useLoginMutation } from "@/common/services/authservice";
import { useRouter } from "next/router";
import { useState } from "react";
import { setCredentials } from "@/common/lib/slice/authslice";
import { useFormik } from "formik";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";
import ILogin from "@/common/services/interface/auth.interface";
import { signinValidationSchema } from "./signin.schema";

export default function SigninContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
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
      email: "",
      password: "",
    },
    validationSchema: signinValidationSchema,
    onSubmit: (values: ILogin) => {
      const payload = {
        email: values.email,
        password: values.password,
      };
      login(payload)
        .then(({data, error}: any) => {
          if (data) {
            successToastHandler({
              message: data.message,
              visibility: true,
              status: true,
            });
            const payload = {
              user: data.data.user,
              token: data.data.token,
            };
            dispatch(setCredentials(payload));
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));
            void router.push("/dashboard");
          } 
      
          if(error){
            errorToastHandler({
              message: error.data.message,
              visibility: true,
              status: false,
            });
          }
        })
        .catch(() => {
          errorToastHandler({
            message: "Something went wrong",
            visibility: true,
            status: false,
          });
        });
    },
  });

  return (
    <>
      <main className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
              <h4 className={styles.h4}>SIGN IN</h4>
          </div>
          <InputField
            type="email"
            name={"email"}
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <InputField
            name={"password"}
            placeholder="Password"
            type={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            button="primary"
            isLoading={isLoading}
            label={"Sign Into your Account"}
            onClick={formik.handleSubmit}
          />
        </div>

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
      </main>
    </>
  );
}
