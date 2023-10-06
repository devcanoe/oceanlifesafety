import Button from "@/common/components/form/button";
import styles from "./index.module.css";
import InputField from "@/common/components/form/inputfield";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  useDeleteInvoiceMutation,
  useFetchInvoicesQuery,
  useFetchOneInvoiceQuery,
  useGenerateInvoiceMutation,
} from "@/common/services/invoice.service";
import { useRouter } from "next/router";
import { Invoice, InvoiceItem } from "@/common/model/invoice.model";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";
import { Icon } from "@iconify/react";
import TextArea from "@/common/components/form/textarea";

interface IGenerate {
  refetch: () => void;
  state?: boolean;
}

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
    isSuccess,
    refetch,
  } = useFetchOneInvoiceQuery({ id: router.query.id });

  console.log(isSuccess && data);

  const [deleteInvoiceMutation, { isLoading: deleteInvoice }] =
    useDeleteInvoiceMutation();

  const successToastHandler = (args: IHandleMotion) => {
    setSuccessToastStatus(args);
  };

  const errorToastHandler = (args: IHandleMotion) => {
    setErrorToastStatus(args);
  };

  const validationSchema = yup.object({
    receiver_name: yup.string().required("Receiver name is required"),
    receiver_company: yup.string().required("Receiver company is required"),
    receiver_address: yup.string().required("Receiver address is required"),
    sender_name: yup.string().required("Sender name is required"),
    sender_company: yup.string().required("Sender company is required"),
    sender_address: yup.string().required("Sender address is required"),
    invoice_date: yup.string().required("Invoice_date is required"),
    due_date: yup.string().required("Due date is required"),
    tax: yup.number().required("Tax is required"),
    subtotal: yup.number().required("Subtotal is required"),
    notes: yup.string(),
    terms: yup.string(),
  });

  const formValidationSchema = yup.object({
    description: yup.string().required("Description is required"),
    quantity: yup.number().min(1).required("Quantity is required"),
    price: yup.number().min(1).required("Price is required"),
  });

  {
    /** formik handler for forms */
  }
  const formik = useFormik({
    initialValues: {
      receiver_name: "",
      receiver_company: "",
      receiver_address: "",
      sender_name: "",
      sender_company: "",
      sender_address: "",
      invoice_date: Date,
      due_date: Date,
      tax: 0,
      subtotal: 0,
      notes: "",
      terms: "",
      description: "",
      quantity: 0,
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  {
    /** formik handler for table dynamic form input */
  }
  const formFormik = useFormik({
    initialValues: {
      description: "",
      quantity: 0,
      price: 0,
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      setRows((state) => [
        ...state,
        {
          description: values.description,
          quantity: values.quantity,
          price: values.price,
          total: values.price * values.quantity,
        },
      ]);

      formFormik.setValues({
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
      items: rows,
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

  return (
    <>
      <section className={styles.card}>
        {/** Start of invoice header */}
        <div className={styles.address}>
          <aside className={styles.receiver}>
            <InputField
              type={"text"}
              name={"receiver_name"}
              placeholder="Receiver name"
              value={formik.values.receiver_name}
              onChange={formik.handleChange}
              error={
                formik.touched.receiver_name &&
                Boolean(formik.errors.receiver_name)
              }
              helperText={
                formik.touched.receiver_name && formik.errors.receiver_name
              }
            />
            <InputField
              type={"text"}
              name={"receiver_company"}
              placeholder="Receiver company"
              value={formik.values.receiver_company}
              onChange={formik.handleChange}
              error={
                formik.touched.receiver_company &&
                Boolean(formik.errors.receiver_company)
              }
              helperText={
                formik.touched.receiver_company &&
                formik.errors.receiver_company
              }
            />
            <InputField
              type={"text"}
              name={"receiver_address"}
              placeholder="Receiver address"
              value={formik.values.receiver_address}
              onChange={formik.handleChange}
              error={
                formik.touched.receiver_address &&
                Boolean(formik.errors.receiver_address)
              }
              helperText={
                formik.touched.receiver_address &&
                formik.errors.receiver_address
              }
            />
          </aside>
          <aside className={styles.sender}>
            <InputField
              type={"text"}
              name={"sender_name"}
              placeholder="Sender name"
              value={formik.values.sender_name}
              onChange={formik.handleChange}
              error={
                formik.touched.sender_name && Boolean(formik.errors.sender_name)
              }
              helperText={
                formik.touched.sender_name && formik.errors.sender_name
              }
            />
            <InputField
              type={"text"}
              name={"sender_company"}
              placeholder="Sender company"
              value={formik.values.sender_company}
              onChange={formik.handleChange}
              error={
                formik.touched.sender_company &&
                Boolean(formik.errors.sender_company)
              }
              helperText={
                formik.touched.sender_company && formik.errors.sender_company
              }
            />
            <InputField
              type={"text"}
              name={"sender_address"}
              placeholder="Sender address"
              value={formik.values.sender_address}
              onChange={formik.handleChange}
              error={
                formik.touched.sender_address &&
                Boolean(formik.errors.sender_address)
              }
              helperText={
                formik.touched.sender_address && formik.errors.sender_address
              }
            />
          </aside>
        </div>
        {/** End of invoice header */}
        {/** Start for table form */}
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
          {/** Start for table preview form */}
          {rows.map((record: IInvoiceRow, index: any) => {
            const sub_total = record.price * record.quantity;
            return (
              <>
                <div className={styles.container} key={index}>
                  <div className={styles.part}>
                    <InputField
                      type={"text"}
                      value={record.description}
                      onChange={(e: any) => {
                        let data: IInvoiceRow[] = [...rows];
                        data[index].description = e.target.value;
                        setRows(() => data);
                      }}
                    />
                  </div>
                  <div className={styles.part}>
                    <InputField
                      type={"number"}
                      value={record.quantity}
                      onChange={(e: any) => {
                        let data: IInvoiceRow[] = [...rows];
                        data[index].quantity = e.target.value;
                        setRows(() => data);
                      }}
                    />
                  </div>
                  <div className={styles.part}>
                    <InputField
                      type={"number"}
                      value={record.price}
                      onChange={(e: any) => {
                        let data: IInvoiceRow[] = [...rows];

                        data[index].price = e.target.value;
                        console.log(data);
                        setRows(() => data);
                      }}
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
                      button="delete"
                      icon={<Icon icon="material-symbols:delete" />}
                      onClick={() => deleteRow(record)}
                    />
                  </div>
                </div>
              </>
            );
          })}
          {/** End for table preview form */}
          {/** Start of dynamic form */}
          <div className={styles.container}>
            <div className={styles.part}>
              <InputField
                type={"text"}
                name={"description"}
                placeholder="Description"
                value={formFormik.values.description}
                onChange={formFormik.handleChange}
                error={
                  formFormik.touched.description &&
                  Boolean(formFormik.errors.description)
                }
                helperText={
                  formFormik.touched.description &&
                  formFormik.errors.description
                }
              />
            </div>
            <div className={styles.part}>
              <InputField
                type={"number"}
                name={"quantity"}
                placeholder="Quantity"
                value={formFormik.values.quantity}
                onChange={formFormik.handleChange}
                error={
                  formFormik.touched.quantity &&
                  Boolean(formFormik.errors.quantity)
                }
                helperText={
                  formFormik.touched.quantity && formFormik.errors.quantity
                }
              />
            </div>
            <div className={styles.part}>
              <InputField
                type={"number"}
                name={"price"}
                placeholder="Price"
                value={formFormik.values.price}
                onChange={formFormik.handleChange}
                error={
                  formFormik.touched.price && Boolean(formFormik.errors.price)
                }
                helperText={formFormik.touched.price && formFormik.errors.price}
              />
            </div>
            <div className={styles.part}></div>
            <div className={styles.part}>
              <Button
                button="primary"
                icon={<Icon icon="material-symbols:add" />}
                onClick={formFormik.handleSubmit}
              />
            </div>
          </div>
          {/** End of dynamic form */}
        </div>
        {/** End for table form */}

        <div className={styles.subfooter}>
          <aside className={styles.subtotal}>
            <p>Subtotal</p>
            <InputField
              type={"Number"}
              name={"subtotal"}
              placeholder="0"
              value={formik.values.subtotal}
              onChange={formik.handleChange}
              error={
                formik.touched.sender_name && Boolean(formik.errors.subtotal)
              }
              helperText={formik.touched.subtotal && formik.errors.subtotal}
            />
          </aside>
          <aside className={styles.subtotal}>
            <p>VAT(12%)</p>
            <InputField
              type={"text"}
              name={"tax"}
              placeholder="Sender name"
              value={formik.values.tax}
              onChange={formik.handleChange}
              error={formik.touched.tax && Boolean(formik.errors.tax)}
              helperText={formik.touched.tax && formik.errors.tax}
            />
          </aside>
          <aside className={styles.subtotal}>
            <p>Total</p>
            <InputField type={"text"} placeholder="" />
          </aside>
        </div>
        <div className={styles.footer}>
          <small>Notes</small>
          <TextArea
            name={"notes"}
            value={formik.values.notes}
            onChange={formik.handleChange}
            error={formik.touched.notes && Boolean(formik.errors.notes)}
            helperText={formik.touched.notes && formik.errors.notes}
          />
          <small>Terms</small>
          <TextArea
            name={"terms"}
            value={formik.values.terms}
            onChange={formik.handleChange}
            error={formik.touched.terms && Boolean(formik.errors.terms)}
            helperText={formik.touched.terms && formik.errors.terms}
          />
        </div>
        <Button
          button="primary"
          label="Generate Invoice "
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
