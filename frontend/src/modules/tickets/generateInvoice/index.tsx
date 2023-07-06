import Button from "@/common/components/form/button";
import styles from "./index.module.css";
import InputField from "@/common/components/form/inputfield";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  useDeleteInvoiceMutation,
  useFetchInvoiceQuery,
  useGenerateInvoiceMutation,
} from "@/common/services/invoice.service";
import { useRouter } from "next/router";
import { Invoice } from "@/common/model/invoice.model";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";
import { Icon } from "@iconify/react";
import { useDeleteAccountMutation } from "@/common/services/company.service";

export default function GenerateInvoiceContent() {
  return (
    <>
      <section>
        <InvoiceRow />
      </section>
    </>
  );
}

interface IInvoiceRow {
  description: string;
  quantity: number;
  price: number;
  total?: number;
}

export function InvoiceRow() {
  const router = useRouter();
  const [rows, setRows] = useState<IInvoiceRow[]>([]);
  const [tab, setTab] = useState<"CREATE" | "VIEW" | "">("");

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

  const [generateInvoiceMutation, { isLoading }] = useGenerateInvoiceMutation();
  const {
    data,
    isLoading: invoiceLoading,
    refetch,
  } = useFetchInvoiceQuery({ id: router.query.id });
  const [deleteInvoiceMutation, { isLoading: deleteInvoice }] =
    useDeleteInvoiceMutation();

  const successToastHandler = (args: IHandleMotion) => {
    setSuccessToastStatus(args);
  };

  const errorToastHandler = (args: IHandleMotion) => {
    setErrorToastStatus(args);
  };

  const validationSchema = yup.object({
    description: yup.string().required("Description is required"),
    quantity: yup.number().min(1).required("Quantity is required"),
    price: yup.number().min(1).required("Price is required"),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      quantity: 0,
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values: IInvoiceRow) => {
      setRows((state) => [
        ...state,
        {
          description: values.description,
          quantity: values.quantity,
          price: values.price,
          total: values.price * values.quantity,
        },
      ]);

      formik.setValues({
        description: "",
        quantity: 0,
        price: 0,
      });
    },
  });

  const deleteRow = (record: IInvoiceRow) => {
    var array = [...rows]; // make a separate copy of the array
    var index = array.indexOf(record);
    if (index !== -1) {
      array.splice(index, 1);
      setRows(array);
    }
  };

  const deleteInvoiceHandler = (id: string) => {
    deleteInvoiceMutation({ id })
      .then((res: any) => {
        if (res.data.status === "success") {
          refetch();
          successToastHandler({
            message: res.data.message,
            visibility: true,
            status: true,
          });
        } else {
          errorToastHandler({
            message: res.data.message,
            visibility: true,
            status: false,
          });
        }
        console.log(res.data.message);
      })
      .catch((err: any) => {
        errorToastHandler({
          message: err.message,
          visibility: true,
          status: false,
        });
      });
  };

  const generateInvoice = () => {
    generateInvoiceMutation({
      ticket: router.query.id,
      fields: rows,
    })
      .then((res: any) => {
        if (res.data.status === "success") {
          close();
          successToastHandler({
            message: res.data.message,
            visibility: true,
            status: true,
          });
          setRows([]);
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
  };

  const viewInvoice = () => {
    setTab("VIEW");
  };

  const goBack = () => {
    setTab("");
  };

  let total_amount = 0;

  return (
    <>
      <section>
        {tab === "" && (
          <>
            <header className={styles.container}>
              <div className={styles.part}>
                <p>Description</p>
              </div>
              <div className={styles.part}>
                <p>Quantity</p>
              </div>
              <div className={styles.part}>
                <p>Price($)</p>
              </div>
              <div className={styles.part}>
                <p>Sub Total($)</p>
              </div>
              <div className={styles.part}>
                <p>Action</p>
              </div>
            </header>
            <div>
              {rows.map((record: IInvoiceRow, index: any) => {
                const sub_total = record.price * record.quantity;
                return (
                  <>
                    <div className={styles.container} key={index}>
                      <div className={styles.part}>
                        <InputField
                          type={"test"}
                          value={record.description}
                          onChange={(e: any) => {}}
                        />
                      </div>
                      <div className={styles.part}>
                        <InputField
                          type={"number"}
                          value={record.quantity}
                          onChange={(e: any) => {}}
                        />
                      </div>
                      <div className={styles.part}>
                        <InputField
                          type={"number"}
                          value={record.price}
                          onChange={(e: any) => {}}
                        />
                      </div>
                      <div className={styles.part}>
                        <InputField
                          type={"number"}
                          value={sub_total}
                          onChange={(e: any) => {}}
                        />
                      </div>
                      <div className={styles.part}>
                        <Button
                          label={"DELETE"}
                          onClick={() => deleteRow(record)}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
              <div className={styles.container}>
                <div className={styles.part}>
                  <InputField
                    type={"text"}
                    name={"description"}
                    placeholder="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </div>
                <div className={styles.part}>
                  <InputField
                    type={"number"}
                    name={"quantity"}
                    placeholder="Quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.quantity && Boolean(formik.errors.quantity)
                    }
                    helperText={
                      formik.touched.quantity && formik.errors.quantity
                    }
                  />
                </div>
                <div className={styles.part}>
                  <InputField
                    type={"number"}
                    name={"price"}
                    placeholder="Price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </div>
                <div className={styles.part}></div>
                <div className={styles.part}>
                  <Button label={"ADD"} onClick={formik.handleSubmit} />
                </div>
              </div>
            </div>
          </>
        )}
        {tab === "VIEW" && (
          <>
            <header className={styles.container}>
              <div className={styles.part}>
                <p>Description</p>
              </div>
              <div className={styles.part}>
                <p>Quantity</p>
              </div>
              <div className={styles.part}>
                <p>Price($)</p>
              </div>
              <div className={styles.part}>
                <p>Sub Total</p>
              </div>
              <div className={styles.part}>
                <p>Action</p>
              </div>
            </header>
            <div>
              {data?.data.map((record: Invoice, index: any) => {
                const sub_total = record.amount * record.quantity;
                total_amount += sub_total;
                return (
                  <>
                    <div className={styles.contentcontainer} key={index}>
                      <div className={styles.part}>{record.service}</div>
                      <div className={styles.part}>{record.quantity}</div>
                      <div className={styles.part}>{record.amount}</div>
                      <div className={styles.part}>{sub_total}</div>

                      <div className={styles.part}>
                        <Button
                          icon={<Icon icon="ph:trash-bold" color="white" />}
                          onClick={() => deleteInvoiceHandler(record._id)}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
              <div className={styles.totalcontainer}>
                <div>Total:</div>
                <div>${total_amount}</div>
              </div>
            </div>
          </>
        )}
        <div className={styles.submitbtncontainer}>
          {tab === "VIEW" && (
            <>
              <Button label={"Go Back"} onClick={goBack} />
              <Button
                icon={<Icon icon="mdi:reload" />}
                onClick={() => {
                  refetch();
                }}
              />
            </>
          )}
          {tab === "" && (
            <>
              <Button label={"View Invoice"} onClick={viewInvoice} />
              <Button label={"Generate Invoice"} onClick={generateInvoice} />
            </>
          )}
        </div>
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
