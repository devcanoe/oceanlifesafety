import Button from "@/common/components/form/button";
import InputField from "@/common/components/form/inputfield";
import styles from "./index.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useCreateCompanyMutation } from "@/common/services/company.service";
import { useState } from "react";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";
import Company from "@/common/model/company.model";
import { useCreateServiceMutation } from "@/common/services/calendar.service";

interface IAddCompanyContent {
  close: () => void;
}

export default function AddServicingContent({ close }: IAddCompanyContent) {
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

  const [createService, { isLoading }] = useCreateServiceMutation();

  const validationSchema = yup.object({
    company: yup.string().required("firstname is required"),
    vessel: yup.string().required("lastname is required"),
    due_date: yup.date(),
  });

  const formik = useFormik({
    initialValues: {
      company: "",
      vessel: "",
      due_date: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      createService({
        company: values.company,
        vessel: values.vessel,
        due_date: values.due_date
      }).then((res: any)=> {
        console.log(res.data)
        successToastHandler({
          message: res.data.message,
          visibility: true,
          status: true,
        }); 

        close();
      }).catch((err: any)=> [
        errorToastHandler({
          message: 'something unexpected happened',
          visibility: true,
          status: false
        })
      ])
    },
  });

  return (
    <>
      <section className={styles.container}>
        <InputField
          type={"text"}
          placeholder=""
          label="Company"
          name="company"
          value={formik.values.company}
          onChange={formik.handleChange}
          error={formik.touched.company && Boolean(formik.errors.company)}
          helperText={formik.touched.company && formik.errors.company}
        />
        <InputField
          type={"text"}
          placeholder=""
          label="Vessel"
          name="vessel"
          value={formik.values.vessel}
          onChange={formik.handleChange}
          error={formik.touched.vessel && Boolean(formik.errors.vessel)}
          helperText={formik.touched.vessel && formik.errors.vessel}
        />
        <InputField
          type={"date"}
          placeholder=""
          label="Due Date"
          name="due_date"
          value={formik.values.due_date}
          onChange={formik.handleChange}
          error={formik.touched.due_date && Boolean(formik.errors.due_date)}
          helperText={formik.touched.due_date && formik.errors.due_date}
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
          label={"Add Servicing"}
          onClick={formik.handleSubmit}
          button={"primary"}
        />
      </section>
    </>
  );
}
