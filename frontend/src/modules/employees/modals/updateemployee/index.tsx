import Loader from "@/common/components/display/loader";
import Button from "@/common/components/form/button";
import Dropdown, { Iitem } from "@/common/components/form/dropdown";
import InputField from "@/common/components/form/inputfield";
import styles from "./index.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";
import { account_type } from "@/common/constants/dropdown-items";
import Company from "@/common/model/company.model";
import {
  useGetCompaniesQuery,
  useGetOneCompanyQuery,
  useUpdateCompanyMutation,
} from "@/common/services/company.service";
import { useFetchUserQuery, useUpdateUserMutation } from "@/common/services/user.service";

interface IUpdateaccountContent {
  id: string | undefined;
  close: () => void;
}

export function UpdateEmployeeContent({ id, close }: IUpdateaccountContent) {
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

  const [loading, setLoading] = useState<boolean>(true);

  const successToastHandler = (args: IHandleMotion) => {
    setSuccessToastStatus(args);
  };

  const errorToastHandler = (args: IHandleMotion) => {
    setErrorToastStatus(args);
  };

  const { data, isLoading, isSuccess } = useFetchUserQuery({ id });

  const [updateUser, { isLoading: userLoading }] =
    useUpdateUserMutation();

  const validationSchema = yup.object({
    firstname: yup.string().required("firstname is required"),
    lastname: yup.string().required("lastname is required"),
    address: yup.string().required("Address is required"),
    email: yup.string().required("email is required"),
    phone: yup.string().required("phone is required"),
    position: yup.string().required("position is required"),
    // date_of_birth: yup.date().required("dob is required"),
    // date_hired: yup.date().required("date hired is required"),
    // date_fired: yup.date(),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      email: "",
      phone: "",
      position: "",
      // date_of_birth: new Date(),
      // date_hired: new Date(),
      // date_fired: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      updateUser({
        ...values
      }).then(({ data, error }: any)=> {
      
        if (data) {
          successToastHandler({
            message: data.message,
            visibility: true,
            status: true,
          });
        }
        if (error) {
          error.data.errors.map((error: any)=> {
            errorToastHandler({
              message: error.message,
              visibility: true,
              status: false,
            });
          })
          
        }
      }).catch((err: any)=> {
        errorToastHandler({
          message: "Something went wrong",
          visibility: true,
          status: false,
        });
      })
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      formik.setFieldValue('firstname', data.data.firstname)
      formik.setFieldValue('lastname', data.data.lastname)
      formik.setFieldValue('email', data.data.email)
      formik.setFieldValue('address', data.data.address)
      formik.setFieldValue('phone', data.data.phone)
      formik.setFieldValue('position', data.data.position)
      formik.setFieldValue('date_of_birth', data.data?.date_of_birth)
      formik.setFieldValue('date_hired', data.data.date_hired)
      formik.setFieldValue('date_fired', data.data.date_fired)
    }
  }, [isSuccess]);

  return (
    <>
      <Loader status={loading} />
      <section className={styles.container}>
        <InputField
          type={"text"}
          placeholder=""
          label="First Name"
          name="firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname}
        />
        <InputField
          type={"text"}
          placeholder=""
          label="Last Name"
          name="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
        />
        {/* <InputField
          type={"date"}
          placeholder=""
          label="Date of birth"
          name="date_of_birth"
          value={formik.values.date_of_birth}
          onChange={formik.handleChange}
          error={
            formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)
          }
          helperText={
            formik.touched.date_of_birth && formik.errors.date_of_birth
          }
        />
        <InputField
          type={"date"}
          label="Date Hired"
          placeholder=""
          name="date_hired"
          value={formik.values.date_hired}
          onChange={formik.handleChange}
          error={formik.touched.date_hired && Boolean(formik.errors.date_hired)}
          helperText={formik.touched.date_hired && formik.errors.date_hired}
        />

        <InputField
          type={"date"}
          placeholder=""
          label="Date Fired"
          name="date_fired"
          value={formik.values.date_fired}
          onChange={formik.handleChange}
          error={formik.touched.date_fired && Boolean(formik.errors.date_fired)}
          helperText={formik.touched.date_fired && formik.errors.date_fired}
        /> */}
        <InputField
          type={"text"}
          placeholder=""
          label="Address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />

        <InputField
          type={"text"}
          placeholder=""
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <InputField
          type={"text"}
          placeholder=""
          label="Position"
          name="position"
          value={formik.values.position}
          onChange={formik.handleChange}
          error={formik.touched.position && Boolean(formik.errors.position)}
          helperText={formik.touched.position && formik.errors.position}
        />
        <InputField
          type={"text"}
          placeholder=""
          label="Phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
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
        <Button
          isLoading={isLoading}
          label={"Update Employee"}
          onClick={formik.handleSubmit}
          button={"primary"}
        />
      </section>
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
    </>
  );
}
