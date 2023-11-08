import Button from "@/common/components/form/button";
import styles from "./index.module.css";
import InputField from "@/common/components/form/inputfield";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  useDeleteInvoiceMutation,
  useFetchInvoicesQuery,
  useFetchOneInvoiceQuery,
  useGenerateInvoiceMutation,
  useUpdateInvoiceMutation,
} from "@/common/services/invoice.service";
import { useRouter } from "next/router";
import { Invoice, InvoiceItem } from "@/common/model/invoice.model";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";
import { Icon } from "@iconify/react";
import PDFTemplate from "../pdftemplate";
import { usePDF } from "react-to-pdf";
import TextArea from "@/common/components/form/textarea";
import { formValidationSchema, generateInvoiceSchema } from "../generateInvoice/genereateinvoice.schema";
import IGenerateInvoice from "@/common/services/interface/invoice.interface";
import { invoice } from "@/common/constants/rate";

interface IGenerate {
  invoiceId: string | undefined;
}



export default function UpdateInvoiceContent(props: IGenerate) {
  const {
    data,
    isLoading: invoiceLoading,
    isSuccess,
    refetch,
  } = useFetchOneInvoiceQuery({ id: props.invoiceId });

  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

  
  return (
    <>
      <Button onClick={() => toPDF()} label="Download PDF" button={"primary"}/>
      
      <section>{isSuccess && <PDFTemplate forwardedRef={targetRef} data={data?.data}/>}</section>
    </>
  );
}

export function UpdateInvoice(props: IGenerate) {
  const {
    data,
    isLoading: invoiceLoading,
    isSuccess,
    refetch,
  } = useFetchOneInvoiceQuery({ id: props.invoiceId });

  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

  
  return (
    <>
      <section>{isSuccess && <InvoiceRow data={data.data}/>}</section>
    </>
  );
}


interface IInvoiceRow {
  description: string;
  quantity: number;
  price: number;
  total?: number;
}

export function InvoiceRow(props: { data: any[] }) {


  const [ updateInvoiceContent, isLoading ] = useUpdateInvoiceMutation();

  const [rows, setRows] = useState<any[]>(props.data);
  const [items, setItems] = useState<any[]>(props.data.items);
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
      receiver_name: "",
      receiver_company: "",
      receiver_address: "",
      sender_name: "",
      sender_company: "",
      sender_address: "",
      invoice_date: "",
      due_date: "",
      tax: 0,
      notes: "",
      terms: "",
      items: [],
    },
    validationSchema: generateInvoiceSchema,
    onSubmit: (values: IGenerateInvoice) => {
      updateInvoiceContent({
        id: props.data._id,
        body: {
          receiver_name: values.receiver_name,
          receiver_company: values.receiver_company,
          receiver_address: values.receiver_address,
          sender_name: values.sender_name,
          sender_company: values.sender_company,
          sender_address: values.sender_address,
          invoice_date: values.invoice_date,
          due_date: values.due_date,
          tax: tax,
          subtotal: subTotal,
          total: tax + subTotal,
          notes: values.notes,
          terms: values.terms,
          items: items,
        }
      }) .then((res: any) => {
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
      setItems((state) => [
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
     
      const result = invoice.VAT * newsubtotal;
  
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
    var array = [...items]; // make a separate copy of the array
    var index = array.indexOf(record);
    if (index !== -1) {
      array.splice(index, 1);
      setItems(array);
    }

    setSubTotal((state) => state - sub_total);
  
    if (subTotal === 0) {
      setTax(0);
    } else {
      const newsubtotal = subTotal - sub_total;
      const result = invoice.VAT * newsubtotal;
      
      setTax(result);
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

  useEffect(()=>{
      formik.setFieldValue('receiver_name', rows.receiver_name);
      formik.setFieldValue('receiver_company', rows.receiver_company);
      formik.setFieldValue('receiver_address', rows.receiver_address);
      formik.setFieldValue('sender_name', rows.sender_name);
      formik.setFieldValue('sender_company', rows.sender_company);
      formik.setFieldValue('sender_address', rows.sender_address);
      formik.setFieldValue('notes', rows.notes);
      formik.setFieldValue('terms', rows.terms);
      formik.setFieldValue('invoice_date', rows.invoice_date.split('T')[0]);
      formik.setFieldValue('due_date', rows.due_date.split('T')[0]);
     
      setSubTotal(props.data.subtotal);
      setTax(props.data.tax)
  },[props.data])

  return (
    <>
      <section className={styles.card}>
        <nav className={styles.date}>
          <InputField
              type={"date"}
              name={"invoice_date"}
              label="Invoice Date"
              value={formik.values.invoice_date.split('T')[0]}
              onChange={formik.handleChange}
              error={
                formik.touched.invoice_date &&
                Boolean(formik.errors.invoice_date)
              }
              helperText={
                formik.touched.invoice_date && formik.errors.invoice_date
              }
            />
            <InputField
              type={"date"}
              name={"due_date"}
              label="Due date"
              value={formik.values.due_date.split('T')[0]}
              onChange={formik.handleChange}
              error={
                formik.touched.due_date &&
                Boolean(formik.errors.due_date)
              }
              helperText={
                formik.touched.due_date && formik.errors.due_date
              }
            />
        </nav>
        <div className={styles.address}>
          <aside className={styles.receiver}>
            <InputField
              type={"text"}
              name={"receiver_name"}
              label="Receiver name"
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
              label="Receiver company"
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
              label="Receiver address"
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
              label="Sender name"
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
              label="Sender company"
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
              label="Sender address"
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
            {items.map((record: IInvoiceRow, index: any) => {
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
                  value={formFormik.values.description}
                  onChange={formFormik.handleChange}
                  error={
                    formFormik.touched.description &&
                    Boolean(formFormik.errors.description)
                  }
                  helperText={
                    formFormik.touched.description && formFormik.errors.description
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
                    formFormik.touched.quantity && Boolean(formFormik.errors.quantity)
                  }
                  helperText={formFormik.touched.quantity && formFormik.errors.quantity}
                />
              </div>
              <div className={styles.part}>
                <InputField
                  type={"number"}
                  name={"price"}
                  placeholder="Price"
                  value={formFormik.values.price}
                  onChange={formFormik.handleChange}
                  error={formFormik.touched.price && Boolean(formFormik.errors.price)}
                  helperText={formFormik.touched.price && formFormik.errors.price}
                />
              </div>
              <div className={styles.part}></div>
              <div className={styles.part}>
                <Button label={"ADD"} onClick={formFormik.handleSubmit} />
              </div>
            </div>
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
              value={subTotal + tax}
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
          </div>
        </>

        <div className={styles.submitbtncontainer}>
          <Button 
            button="primary"
            label={"Update Invoice"} 
            onClick={formik.handleSubmit} 
          />
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
