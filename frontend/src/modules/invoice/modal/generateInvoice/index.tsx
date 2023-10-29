import Button from "@/common/components/form/button";
import styles from "./index.module.css";
import InputField from "@/common/components/form/inputfield";
import { useState } from "react";
import { useFormik } from "formik";
import {
  useDeleteInvoiceMutation,
  useFetchOneInvoiceQuery,
  useGenerateInvoiceMutation,
} from "@/common/services/invoice.service";
import { useRouter } from "next/router";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";
import { Icon } from "@iconify/react";
import TextArea from "@/common/components/form/textarea";
import {
  formValidationSchema,
  generateInvoiceSchema,
} from "./genereateinvoice.schema";
import IGenerateInvoice from "@/common/services/interface/invoice.interface";
import { invoice } from "@/common/constants/rate";

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
  const [subTotal, setSubTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);

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
      invoice_date: new Date(),
      due_date: new Date(),
      tax: 0,
      notes: "",
      terms: "",
      items: [],
    },
    validationSchema: generateInvoiceSchema,
    onSubmit: (values: IGenerateInvoice) => {
      generateInvoiceMutation({
        items: rows,
        receiver_name: values.receiver_name,
        receiver_company: values.receiver_company,
        receiver_address: values.receiver_address,
        sender_address: values.sender_address,
        sender_company: values.sender_company,
        sender_name: values.sender_name,
        invoice_date: values.invoice_date,
        due_date: values.due_date,
        tax,
        sub_total: subTotal,
        total: tax + subTotal,
        notes: values.notes,
        terms: values.terms,
      })
        .then((res: any) => {
          console.log(res.data);
          if (res.data.status === "success") {
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
          console.log(err.message);
          errorToastHandler({
            message: err.message,
            visibility: true,
            status: false,
          });
        });
    },
  });

  const formFormik = useFormik({
    initialValues: {
      description: "",
      quantity: 0,
      price: 0,
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      const sub_total = values.price * values.quantity;
      setRows((state) => [
        ...state,
        {
          description: values.description,
          quantity: values.quantity,
          price: values.price,
          total: sub_total,
        },
      ]);
      const newsubtotal = subTotal + sub_total;
      setSubTotal((state) => state + sub_total);
      console.log("total ", newsubtotal);
      const result = invoice.VAT * newsubtotal;
      console.log("result ", result);
      setTax(result);
      // formik.setFieldValue('tax', (invoice.VAT * subTotal))
      formFormik.setValues({
        description: "",
        quantity: 0,
        price: 0,
      });
    },
  });

  const deleteRow = (record: IInvoiceRow) => {
    const sub_total = record.price * record.quantity;
    var array = [...rows]; // make a separate copy of the array
    var index = array.indexOf(record);
    if (index !== -1) {
      array.splice(index, 1);
      setRows(array);
    }

    setSubTotal((state) => state - sub_total);
    console.log("total ", subTotal);
    if (subTotal === 0) {
      setTax(0);
    } else {
      const newsubtotal = subTotal - sub_total;
      const result = invoice.VAT * newsubtotal;
      console.log("result ", newsubtotal);
      setTax(result);
    }
  };

  // const deleteInvoiceHandler = (id: string) => {
  //   deleteInvoiceMutation({ id })
  //     .then((res: any) => {
  //       if (res.data.status === "success") {
  //         refetch();
  //         successToastHandler({
  //           message: res.data.message,
  //           visibility: true,
  //           status: true,
  //         });
  //       } else {
  //         errorToastHandler({
  //           message: res.data.message,
  //           visibility: true,
  //           status: false,
  //         });
  //       }
  //       console.log(res.data.message);
  //     })
  //     .catch((err: any) => {
  //       errorToastHandler({
  //         message: err.message,
  //         visibility: true,
  //         status: false,
  //       });
  //     });
  // };

  // const generateInvoice = () => {

  // };

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
            const sub_total: number = record.price * record.quantity;

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
                        // setSubTotal((state) => state + (record.price * record.quantity));
                        // const newsubtotal = subTotal - (record.price * record.quantity);
                        // const result = invoice.VAT * newsubtotal;
                        // console.log('result ', newsubtotal)
                        // setTax(result);
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
                        setRows(() => data);
                        // setSubTotal((state) => state + (record.price * record.quantity));
                        // const newsubtotal = subTotal - (record.price * record.quantity);
                        // const result = invoice.VAT * newsubtotal;
                        // console.log('result ', newsubtotal)
                        // setTax(result);
                      }}
                    />
                  </div>
                  <div className={styles.part}>
                    <InputField
                      type={"number"}
                      value={sub_total}
                      onChange={(e: any) => {}}
                      disabled={true}
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
              value={subTotal}
              disabled={true}
            />
          </aside>
          <aside className={styles.subtotal}>
            <p>VAT(12%)</p>
            <InputField
              type={"text"}
              placeholder="tax"
              value={tax}
              disabled={true}
            />
          </aside>
          <aside className={styles.subtotal}>
            <p>Total</p>
            <InputField
              type={"text"}
              value={tax + subTotal}
              placeholder=""
              disabled={true}
            />
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
          label="Generate Invoice"
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

function calculateSubtotal(rows: IInvoiceRow[]) {
  let sub_total = 0;

  rows.map((row: IInvoiceRow) => {
    sub_total += row.total ? row.total : 0;
  });

  return sub_total;
}
