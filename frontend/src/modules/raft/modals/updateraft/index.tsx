import Loader from "@/common/components/display/loader";
import Button from "@/common/components/form/button";
import InputField from "@/common/components/form/inputfield";
import styles from "./index.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";
import Raft from "@/common/model/raft.model";
import { useGetRaftQuery, useUpdateRaftMutation } from "@/common/services/raft.service";

interface IUpdateRaftContent {
  id: string | undefined;
  close: () => void;
}

export function UpdateRaftContent({ id, close }: IUpdateRaftContent) {

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

  const { data, isLoading, isSuccess } = useGetRaftQuery({id});
  console.log(!isLoading && data)
  const [ updateRaft, { isLoading: raftLoading }] = useUpdateRaftMutation()

  const validationSchema = yup.object({
    serial_no: yup.string().required("Serial No is required"),
    capacity: yup.number().required("Capacity is required"),
    man_date: yup.date().required("Man Date is required"),
    last_service_date: yup.date().required("Last Service Date is required"),
    make: yup.string().required("Make is required"),
    type: yup.string().required("Type is required"),
    cert_no: yup.string().required("Cert No is required"),
  });

  const formik = useFormik({
    initialValues: {
      serial_no: "",
      capacity: 0,
      man_date: new Date(),
      last_service_date: new Date(),
      make: "",
      type: "",
      cert_no: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Raft) => {

      updateRaft({
        id,
        body: values
      })
        .then((res: any) => {
          close();
          successToastHandler({
            message: res.data.message,
            visibility: true,
            status: true,
          });
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

  useEffect(() => {
    if (isSuccess) {
      console.log(data?.data)
      formik.setValues({
        serial_no: data?.data?.serial_no,
        capacity: data?.data?.capacity,
        man_date: data?.data?.man_date,
        last_service_date: data?.data?.last_service_date,
        make: data?.data?.make,
        type: data?.data?.type,
        cert_no: data?.data?.cert_no,
      });

      setLoading(false);
    }
  }, [isSuccess]);

  return (
    <>
      <Loader status={loading} />
      <section className={styles.container}>
        <InputField
          label="Serial Number"
          type={"text"}
          name="serial_no"
          value={formik.values.serial_no}
          onChange={formik.handleChange}
          error={formik.touched.serial_no && Boolean(formik.errors.serial_no)}
          helperText={formik.touched.serial_no && formik.errors.serial_no}
        />
        <InputField
          label="Capacity"
          type={"number"}
          name="capacity"
          value={formik.values.capacity}
          onChange={formik.handleChange}
          error={formik.touched.capacity && Boolean(formik.errors.capacity)}
          helperText={formik.touched.capacity && formik.errors.capacity}
        />
        <InputField
          label="Man Date"
          type={"date"}
          name="man_date"
          value={formik.values.man_date}
          onChange={formik.handleChange}
          error={formik.touched.man_date && Boolean(formik.errors.man_date)}
          helperText={formik.touched.man_date && formik.errors.man_date}
        />
        <InputField
          label="Last Service Date"
          type={"date"}
          name="last_service_date"
          value={formik.values.last_service_date}
          onChange={formik.handleChange}
          error={
            formik.touched.last_service_date &&
            Boolean(formik.errors.last_service_date)
          }
          helperText={
            formik.touched.last_service_date && formik.errors.last_service_date
          }
        />
        <InputField
          label="Make"
          type={"text"}
          name="make"
          value={formik.values.make}
          onChange={formik.handleChange}
          error={formik.touched.make && Boolean(formik.errors.make)}
          helperText={formik.touched.make && formik.errors.make}
        />
        <InputField
          label="Type"
          type={"text"}
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
        />
        <InputField
          label="Cert No"
          type={"text"}
          name="cert_no"
          value={formik.values.cert_no}
          onChange={formik.handleChange}
          error={formik.touched.cert_no && Boolean(formik.errors.cert_no)}
          helperText={formik.touched.cert_no && formik.errors.cert_no}
        />
        <Button
          isLoading={raftLoading}
          label={"Update Raft"}
          onClick={formik.handleSubmit}
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
