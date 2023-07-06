import Button from "@/common/components/form/button";
import InputField from "@/common/components/form/inputfield";
import styles from "./index.module.css";
import { useAppDispatch } from "@/common/lib/hooks";
import { useLoginMutation } from "@/common/services/authservice";
import { useRouter } from "next/router";
import { useState } from "react";
import { setCredentials } from "@/common/lib/slice/authslice";
import { useFormik } from "formik";
import * as yup from "yup";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";
import ILogin from "@/common/services/interface/auth.interface";

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

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: ILogin) => {
      const payload = {
        email: values.email,
        password: values.password,
      };
      login(payload)
        .then((res: any) => {
          if (res.data.status === "success") {
            successToastHandler({
              message: res.data.message,
              visibility: true,
              status: true,
            });
            const payload = {
              user: res.data.data.user,
              token: res.data.data.token,
            };
            dispatch(setCredentials(payload));
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.data.user));
            void router.push("/dashboard");
          } else {
            errorToastHandler({
              message: res.data.message,
              visibility: true,
              status: false,
            });
          }
        })
        .catch((err: any) => {
          errorToastHandler({
            message: err.message,
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
            isLoading={isLoading}
            label={"Sign In"}
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
