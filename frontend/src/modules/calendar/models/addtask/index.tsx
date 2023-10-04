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

interface IAddCompanyContent {
  close: () => void;
}

export default function AddTaskContent({ close }: IAddCompanyContent) {
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

  const [create, { isLoading }] = useCreateCompanyMutation();

  const validationSchema = yup.object({
    title: yup.string().required("title is required"),
    description: yup.string().required("description is required"),
    due_date: yup.date().required("due date is required"),
    due_time: yup.string().required('due time is required')
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      due_date: new Date(),
      due_time: new Date()
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      console.log(values)
    },
  });

  return (
    <>
      <section className={styles.container}>
        <InputField
          type={"text"}
          placeholder=""
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <InputField
          type={"text"}
          placeholder=""
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
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
        <InputField
          type={"time"}
          placeholder=""
          label="Due Time"
          name="due_time"
          value={formik.values.due_time}
          onChange={formik.handleChange}
          error={formik.touched.due_time && Boolean(formik.errors.due_time)}
          helperText={formik.touched.due_time && formik.errors.due_time}
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
          label={"Add Task"}
          onClick={formik.handleSubmit} button={"primary"}       />
      </section>
    </>
  );
}
