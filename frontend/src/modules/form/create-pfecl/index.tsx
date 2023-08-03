import Breadcrumb from "@/common/layout/Breadcrumb";
import styles from "./index.module.css";
import Dropdown, { Iitem } from "@/common/components/form/dropdown";
import InputField from "@/common/components/form/inputfield";
import { useState } from "react";
import FormColumn from "@/common/model/form_columns.model";
import Button from "@/common/components/form/button";
import * as yup from "yup";
import { useFormik } from "formik";
import Form from "@/common/model/form.model";
import { useGetAllShipsQuery } from "@/common/services/ship.service";
import Loader from "@/common/components/display/loader";
import Ship from "@/common/model/ship.model";
import {
  useCreateBACLMutation,
  useCreateEEPDMutation,
  useCreatePFECLMutation,
} from "@/common/services/form.service";
import SToast from "@/common/components/display/toast/toast";
import { IHandleMotion } from "@/common/components/display/popup";
import { useRouter } from "next/router";

interface ICreatePFECL {
  companyId: string;
}

export default function CreatePFECLContent(props: ICreatePFECL) {
  const [rows, setRows] = useState<FormColumn[]>([]);
  const [serialNo, setSerialNo] = useState<string>();
  const [make, setMake] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [dateHydTested, setDateHydTested] = useState<Date>();
  const [cylinderCondition, setCylinderCondition] = useState<string>();
  const [type, setType] = useState<string>();
  const [kg, setKg] = useState<string>();
  const [remark, setRemark] = useState<string>();
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

  const { data, isLoading, isSuccess } = useGetAllShipsQuery({
    id: props.companyId,
  });

  let shipArray: Iitem[] = [];

  const router = useRouter();

  isSuccess &&
    data?.data.map((ship: Ship) => {
      shipArray.push({
        id: ship._id,
        title: ship.name,
        value: ship._id,
      });
    });

  const addRow = () => {
    setRows((state) => [
      ...state,
      {
        serial_no: serialNo,
        make,
        location,
        remark,
        date_hyd_tested: dateHydTested,
        cylinder_condition: cylinderCondition,
        kg,
        type,
      },
    ]);

    setSerialNo("");
    setMake("");
    setLocation("");
    setDateHydTested(new Date());
    setCylinderCondition("");
    setType("");
    setKg("");
    setRemark("");
  };

  const deleteRow = (record: FormColumn) => {
    var array = [...rows]; // make a separate copy of the array
    var index = array.indexOf(record);
    if (index !== -1) {
      array.splice(index, 1);
      setRows(array);
    }
  };

  const validationSchema = yup.object({
    ship: yup.string().required("Ship is required"),
    location_of_vessel: yup.string().required("Location of Vessel is required"),
    service_date: yup.date().required("Service Date is required"),
    flag_state: yup.string().required("Flag state is required"),
    last_service_date: yup.date().required("Last service date is required"),
  });

  const [createPFECL, { isLoading: eepdLoading }] = useCreatePFECLMutation();

  const formik = useFormik({
    initialValues: {
      ship: "",
      location_of_vessel: "",
      service_date: new Date(),
      flag_state: "",
      last_service_date: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: (values: Form) => {
      createPFECL({
        ...values,
        specifications: rows,
        company: props.companyId,
      })
        .then((res: any) => {
          if (res.data.status === "success") {
            successToastHandler({
              message: res.data.message,
              visibility: true,
              status: true,
            });

            router.push(`/company/${props.companyId}`);
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
      <Loader status={isLoading} />
      <section className={styles.container}>
        <Breadcrumb />
        <div className={styles.container}>
          <Dropdown
            label={"Ship"}
            disabled={false}
            items={shipArray}
            name={"ship"}
            value={formik.values.ship}
            onChange={formik.handleChange}
            error={formik.touched.ship && Boolean(formik.errors.ship)}
            helperText={formik.touched.ship && formik.errors.ship}
          />
          <InputField
            type={"text"}
            label={"Location of Vessel"}
            name={"location_of_vessel"}
            placeholder=""
            value={formik.values.location_of_vessel}
            onChange={formik.handleChange}
            error={
              formik.touched.location_of_vessel &&
              Boolean(formik.errors.location_of_vessel)
            }
            helperText={
              formik.touched.location_of_vessel &&
              formik.errors.location_of_vessel
            }
          />
          <InputField
            type={"date"}
            label="Service Date"
            name={"service_date"}
            placeholder=""
            value={formik.values.service_date}
            onChange={formik.handleChange}
            error={
              formik.touched.service_date && Boolean(formik.errors.service_date)
            }
            helperText={
              formik.touched.service_date && formik.errors.service_date
            }
          />
          <InputField
            type={"text"}
            label="Flag state"
            name={"flag_state"}
            placeholder=""
            value={formik.values.flag_state}
            onChange={formik.handleChange}
            error={
              formik.touched.flag_state && Boolean(formik.errors.flag_state)
            }
            helperText={formik.touched.flag_state && formik.errors.flag_state}
          />
          <InputField
            type={"date"}
            label="Last Service Date"
            name={"last_service_date"}
            placeholder="Description"
            value={formik.values.last_service_date}
            onChange={formik.handleChange}
            error={
              formik.touched.last_service_date &&
              Boolean(formik.errors.last_service_date)
            }
            helperText={
              formik.touched.last_service_date &&
              formik.errors.last_service_date
            }
          />
        </div>
        {rows.map((row: FormColumn, index: number) => {
          return (
            <>
              <div className={styles.formcontainer} key={index}>
                <div className={styles.main}>
                  <div className={styles.input}>
                    <small>Serial No</small>
                    <InputField
                      type={"text"}
                      value={row.serial_no}
                      onChange={(e: any) => {
                        let data: FormColumn[] = [...rows];

                        data[index].serial_no = e.target.value;

                        setRows(() => data);
                      }}
                    />
                  </div>
                  <div className={styles.input}>
                    <small>Make</small>
                    <InputField
                      type={"text"}
                      value={row.make}
                      onChange={(e: any) => {
                        let data: FormColumn[] = [...rows];

                        data[index].make = e.target.value;

                        setRows(() => data);
                      }}
                    />
                  </div>
                  <div className={styles.input}>
                    <small>Location</small>
                    <InputField
                      type={"text"}
                      value={row.location}
                      onChange={(e: any) => {
                        let data: FormColumn[] = [...rows];

                        data[index].location = e.target.value;

                        setRows(() => data);
                      }}
                    />
                  </div>
                  <div className={styles.input}>
                    <small>Date HYD testing</small>
                    <InputField
                      type={"date"}
                      value={row.date_hyd_tested}
                      onChange={(e: any) => {
                        let data: FormColumn[] = [...rows];

                        data[index].date_hyd_tested = e.target.value;

                        setRows(() => data);
                      }}
                    />
                  </div>
                  <div className={styles.input}>
                    <small>Cylinder condition</small>
                    <InputField
                      type={"text"}
                      value={row.cylinder_condition}
                      onChange={(e: any) => {
                        let data: FormColumn[] = [...rows];

                        data[index].cylinder_condition = e.target.value;

                        setRows(() => data);
                      }}
                    />
                  </div>
                  <div className={styles.input}>
                    <small>Type</small>
                    <InputField
                      type={"text"}
                      value={row.type}
                      onChange={(e: any) => {
                        let data: FormColumn[] = [...rows];

                        data[index].type = e.target.value;

                        setRows(() => data);
                      }}
                    />
                  </div>
                  <div className={styles.input}>
                    <small>Kg</small>
                    <InputField
                      type={"text"}
                      value={row.kg}
                      onChange={(e: any) => {
                        let data: FormColumn[] = [...rows];

                        data[index].kg = e.target.value;

                        setRows(() => data);
                      }}
                    />
                  </div>
                  <div className={styles.input}>
                    <small>Remark</small>
                    <InputField
                      type={"text"}
                      value={row.remark}
                      onChange={(e: any) => {
                        let data: FormColumn[] = [...rows];

                        data[index].remark = e.target.value;

                        setRows(() => data);
                      }}
                    />
                  </div>
                </div>
                <div className={styles.buttoncontainer}>
                  <Button label="Delete" onClick={() => deleteRow(row)} />
                </div>
              </div>
            </>
          );
        })}
        <div className={styles.formcontainer}>
          <div className={styles.main}>
            <div className={styles.input}>
              <small>Serial No</small>
              <InputField
                type={"text"}
                name={"serial_no"}
                placeholder=""
                value={serialNo}
                onChange={(e: any) => {
                  setSerialNo(e.target.value);
                }}
              />
            </div>
            <div className={styles.input}>
              <small>Make</small>
              <InputField
                type={"text"}
                name={"make"}
                placeholder=""
                value={make}
                onChange={(e: any) => {
                  setMake(e.target.value);
                }}
              />
            </div>
            <div className={styles.input}>
              <small>Location</small>
              <InputField
                type={"text"}
                name={"location"}
                placeholder=""
                value={location}
                onChange={(e: any) => {
                  setLocation(e.target.value);
                }}
              />
            </div>
            <div className={styles.input}>
              <small>Date HYD testing</small>
              <InputField
                type={"date"}
                name={"date_hyd_tested"}
                placeholder=""
                value={dateHydTested}
                onChange={(e: any) => {
                  setDateHydTested(e.target.value);
                }}
              />
            </div>
            <div className={styles.input}>
              <small>Cylinder condition</small>
              <InputField
                type={"text"}
                name={"cylinder_condition"}
                placeholder=""
                value={cylinderCondition}
                onChange={(e: any) => {
                  setCylinderCondition(e.target.value);
                }}
              />
            </div>
            <div className={styles.input}>
              <small>Type</small>
              <InputField
                type={"text"}
                name={"testing_bar"}
                placeholder=""
                value={type}
                onChange={(e: any) => {
                  setType(e.target.value);
                }}
              />
            </div>
            <div className={styles.input}>
              <small>Kg</small>
              <InputField
                type={"text"}
                name={"refiling_bar"}
                placeholder=""
                value={kg}
                onChange={(e: any) => {
                  setKg(e.target.value);
                }}
              />
            </div>
            <div className={styles.input}>
              <small>Remark</small>
              <InputField
                type={"text"}
                name={"remark"}
                placeholder=""
                value={remark}
                onChange={(e: any) => {
                  setRemark(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.buttoncontainer}>
            <Button label="Add" onClick={addRow} />
          </div>
        </div>
        <div>
          <Button
            label="Submit"
            isLoading={eepdLoading}
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
      </section>
    </>
  );
}
