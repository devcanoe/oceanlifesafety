import styles from "./index.module.css";
import React, { useState } from "react";
import Loader from "@/common/components/display/loader";
import Dropdown, { Iitem } from "@/common/components/form/dropdown";
import InputField from "@/common/components/form/inputfield";
import Button from "@/common/components/form/button";
import FileUploader from "@/common/components/form/fileuploader";
import TextArea from "@/common/components/form/textarea";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  useCreateTicketMutation,
  useGetTypesQuery,
} from "@/common/services/ticket.service";
import { useGetAllCustomersQuery } from "@/common/services/ship.service";
import { useGetAllAccountsQuery } from "@/common/services/company.service";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";
import { priorityArray } from "@/common/constants/dropdown-items";
import Ticket from "@/common/model/ticket.model";
import Account from "@/common/model/company.model";

interface IAddTicketContent {
  close: () => void;
}

export default function AddticketContent({ close }: IAddTicketContent) {
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
  const [fetchErrorStatus, setFetchErrorStatus] = useState<IHandleMotion>({
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

  const fetchErrorHandler = (args: IHandleMotion) => {
    setFetchErrorStatus(args);
  };

  // fetch agents
  const {
    data: users,
    isLoading: userLoading,
    isError: agentError,
  } = useGetAllAccountsQuery();
  const { data: customerData, isLoading: customerLoading } =
    useGetAllCustomersQuery();
  const { data: types, isLoading: typeLoading } = useGetTypesQuery();
  const [createTicket, { isLoading }] = useCreateTicketMutation();

  if (agentError) {
    fetchErrorHandler({
      message: "",
      visibility: agentError,
      status: false,
    });
  }

  let agentsData: Iitem[] = [];

  !userLoading &&
    users?.data.map((agent: Account) => {
      if (agent.role === "AGENT") {
        agentsData.push({
          id: agent._id,
          title: agent.email,
          value: agent._id,
        });
      }
    });

  let customersData: Iitem[] = [];

  !customerLoading &&
    customerData?.data.map((customer: Account) => {
      customersData.push({
        id: customer._id,
        title: customer.email,
        value: customer._id,
      });
    });

  // fetch ticket type
  let typesData: Iitem[] = [];

  !typeLoading &&
    types?.data.map((type: any) => {
      typesData.push({
        id: type._id,
        title: type.name,
        value: type._id,
      });
    });

  const validationSchema = yup.object({
    subject: yup.string().required("Ticket subject is required"),
    type: yup.string().required("Ticket type is required"),
    customer: yup.string().required("Customer is required"),
    agent: yup.string().required("Agent is required"),
    priority: yup.string().required("Priority is required"),
    description: yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      subject: "",
      type: "",
      customer: "",
      agent: "",
      description: "",
      priority: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Ticket) => {
      createTicket({
        subject: values.subject,
        type: values.type,
        customer: values.customer,
        description: values.description,
        agent: values.agent,
        priority: values.priority,
      })
        .then((res: any) => {
          if (res.data.status === "success") {
            close();
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
      <Loader status={typeLoading && customerLoading && userLoading} />

      <section className={styles.container}>
        <InputField
          type={"text"}
          placeholder="Ticket Subject"
          name="subject"
          value={formik.values.subject}
          onChange={formik.handleChange}
          error={formik.touched.subject && Boolean(formik.errors.subject)}
          helperText={formik.touched.subject && formik.errors.subject}
        />
        <Dropdown
          label={"Ticket type"}
          disabled={false}
          items={typesData}
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
        />
        <Dropdown
          label={"Customer"}
          disabled={false}
          items={customersData}
          name="customer"
          value={formik.values.customer}
          onChange={formik.handleChange}
          error={formik.touched.customer && Boolean(formik.errors.customer)}
          helperText={formik.touched.customer && formik.errors.customer}
        />
        <Dropdown
          label={"Agent"}
          disabled={false}
          items={agentsData}
          name="agent"
          value={formik.values.agent}
          onChange={formik.handleChange}
          error={formik.touched.agent && Boolean(formik.errors.agent)}
          helperText={formik.touched.agent && formik.errors.agent}
        />
        <Dropdown
          label={"Priority"}
          disabled={false}
          items={priorityArray}
          name="priority"
          value={formik.values.priority}
          onChange={formik.handleChange}
          error={formik.touched.priority && Boolean(formik.errors.priority)}
          helperText={formik.touched.priority && formik.errors.priority}
        />
        <TextArea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <FileUploader />
        <Button
          isLoading={isLoading}
          label={"Add Ticket"}
          onClick={formik.handleSubmit}
        />
      </section>

      <SToast
        text={"Some error occurred, please refresh page"}
        severity={"error"}
        open={fetchErrorStatus.visibility}
        onClose={function (): void {
          setFetchErrorStatus({
            visibility: false,
          });
        }}
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
    </>
  );
}

export function UpdateticketContent() {
  return (
    <>
      <Loader status={false} />
      <section className={styles.container}>
        <InputField type={"text"} placeholder="Ticket Subject" />
        <Dropdown
          label={"Ticket type"}
          disabled={false}
          items={priorityArray}
          onChange={function (e: any): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Dropdown
          label={"Agent"}
          disabled={false}
          items={priorityArray}
          onChange={function (e: any): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Dropdown
          label={"Priority"}
          disabled={false}
          items={priorityArray}
          onChange={function (e: any): void {
            throw new Error("Function not implemented.");
          }}
        />
        <TextArea
          onChange={function (e: any): void {
            throw new Error("Function not implemented.");
          }}
        />
        <FileUploader />
        <Button
          type="button"
          label={"Update Ticket"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </section>
    </>
  );
}
