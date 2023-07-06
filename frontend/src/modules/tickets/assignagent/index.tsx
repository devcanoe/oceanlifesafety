import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import Loader from "@/common/components/display/loader";
import Dropdown, { Iitem } from "@/common/components/form/dropdown";
import Button from "@/common/components/form/button";
import * as yup from "yup";
import { useFormik } from "formik";
import { useAssignAgentMutation } from "@/common/services/ticket.service";
import {
  useGetAllAccountsQuery,
  useGetAllAgentAccountsQuery,
} from "@/common/services/company.service";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";
import Account from "@/common/model/company.model";

interface IAssignAgentContent {
  ticket: string | string[] | undefined;
  refetch: () => void;
  close: () => void;
}

export default function AssignAgentContent(props: IAssignAgentContent) {
  const [rows, setRow] = useState<Iitem[]>();

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

  // fetch agents
  const { data: users, isLoading: userLoading } = useGetAllAccountsQuery();

  const [assignAgent, { isLoading }] = useAssignAgentMutation();

  const validationSchema = yup.object({
    agent: yup.string().required("Ticket agent is required"),
  });

  const formik = useFormik({
    initialValues: {
      agent: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      assignAgent({
        id: props.ticket,
        body: {
          agent: values.agent,
        },
      })
        .then((res: any) => {
          if (res.data.status === "success") {
            props.close();
            props.refetch();
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
          console.log(err.message);
          errorToastHandler({
            message: err.message,
            visibility: true,
            status: false,
          });
        });
    },
  });

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

  return (
    <>
      <Loader status={userLoading} />
      {!userLoading && (
        <section className={styles.container}>
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
          <Button
            isLoading={isLoading}
            label={"Assign Agent"}
            onClick={formik.handleSubmit}
          />
        </section>
      )}
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
