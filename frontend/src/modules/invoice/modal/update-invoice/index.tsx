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

interface IGenerate {
  invoiceId: string | undefined
}

export default function UpdateInvoiceContent(props: IGenerate) {
  const {
    data,
    isLoading: invoiceLoading,
    isSuccess,
    refetch,
  } = useFetchOneInvoiceQuery({ id: props.invoiceId });
  return (
    <>
      <section>
        {isSuccess &&
        <InvoiceRow data={data?.data?.items}  />
        }
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

export function InvoiceRow(props: { data: any}) {
  const router = useRouter();
  const [rows, setRows] = useState<IInvoiceRow[]>(props.data);
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
                          type={"text"}
                          value={record.description}
                          onChange={(e: any) => {
                            console.log(rows)
                          
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
                            console.log(data)
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
     

        <div className={styles.submitbtncontainer}>

           <Button label={"Generate Invoice"} onClick={generateInvoice} />
          
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
