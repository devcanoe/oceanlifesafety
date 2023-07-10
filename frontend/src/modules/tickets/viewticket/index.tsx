import Loader from "@/common/components/display/loader";
import styles from "./index.module.css";
import Breadcrumb, { Item } from "@/common/layout/Breadcrumb";
import InputField from "@/common/components/form/inputfield";
import { Navbar } from "../../clients";
import { useRouter } from "next/router";
import { useGetTicketQuery } from "@/common/services/ticket.service";
import { useAppSelector } from "@/common/lib/hooks";
import { User, selectCurrentUser } from "@/common/lib/slice/authslice";
import { useEffect, useState } from "react";
import Popup from "@/common/components/display/popup";
import GenerateInvoiceContent from "../../invoice/modal/generateInvoice";
import {
  useGetMessagesQuery,
  usePostMessageMutation,
} from "@/common/services/message.service";
import AssignAgentContent from "../assignagent";

interface IViewticket {
  ticketId: string;
}

export default function ViewticketContent({ ticketId }: IViewticket) {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const modalToggleHandler = () => {
    setModalStatus((state) => !state);
  };

  const [assignModalStatus, setAssignModalStatus] = useState<boolean>(false);

  const assignModalToggleHandler = () => {
    setAssignModalStatus((state) => !state);
  };

  const router = useRouter();

  // fetch ticket details
  const { data, isLoading, refetch } = useGetTicketQuery({ id: ticketId });

  const breadcrumbPath: Item[] = [
    {
      id: "1",
      url: "/dashboard",
      label: "Dashboard",
      current: false,
    },
    {
      id: "2",
      url: "/tickets",
      label: "Tickets",
      current: false,
    },
    {
      id: "3",
      url: "/tickets",
      label: `${!isLoading && data?.data.subject}`,
      current: true,
    },
  ];

  return (
    <>
      <Loader status={isLoading} />
      {!isLoading && (
        <section className={styles.container}>
          <Breadcrumb path={breadcrumbPath} />
          <Navbar
            title={"Tickets"}
            customButtonLabel="Generate Invoice"
            customButtonAction={modalToggleHandler}
            buttonLabel={"Assign Agent"}
            buttonAction={assignModalToggleHandler}
            deleteAction={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <div className={styles.unevengrid}>
            {!isLoading && (
              <MessageSection data={data} customerId={""} refresh={() => {}} />
            )}
            {!isLoading && <ProfileSection data={data} isLoading={isLoading} />}
          </div>
        </section>
      )}
      <Popup displayStatus={modalStatus} close={modalToggleHandler}>
        <GenerateInvoiceContent />
      </Popup>

      <Popup displayStatus={assignModalStatus} close={assignModalToggleHandler}>
        <AssignAgentContent
          ticket={router.query.id}
          refetch={refetch}
          close={assignModalToggleHandler}
        />
      </Popup>
    </>
  );
}

interface IMessageSection {
  data: any;
  customerId?: string;
  isLoading?: boolean;
  refresh?: () => void | undefined;
}

export function MessageSection(props: IMessageSection) {
  const [message, setMessage] = useState<String>("");
  const user: User = useAppSelector(selectCurrentUser);

  const [sendMessage, { isLoading }] = usePostMessageMutation();
  const {
    data,
    isLoading: dataLoading,
    refetch,
  } = useGetMessagesQuery({ id: props.data.data._id });

  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      sendMessage({
        message,
        to: `${props.data.data.customer._id}`,
        from: user.id,
        ticket: `${props.data.data._id}`,
      })
        .then((res: any) => {
          refetch();
          if (res.status === "success") {
            refetch();
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <section className={styles.messagecontainer}>
        {data ? (
          <>
            <div className={styles.messagearea}>
              {data.data?.map((message: any) => {
                if (user.id === message.from._id) {
                  return (
                    <>
                      <div className={styles.sendercard}>
                        <div className={styles.messageheader}>
                          <small>{message.from.firstname}</small>
                          <small>{message.created_at}</small>
                        </div>
                        <p className={styles.message}>{message.message}</p>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <div className={styles.receivercard}>
                        <div className={styles.messageheader}>
                          <small>{message.to.firstname}</small>
                          <small>{message.created_at}</small>
                        </div>
                        <p className={styles.message}>{message.message}</p>
                      </div>
                    </>
                  );
                }
              })}
            </div>
            <div className={styles.messagefooter}>
              <InputField
                type="text"
                placeholder="Enter message"
                onChange={(e: any) => {
                  setMessage(e.target.value);
                }}
                onKeyUp={handleSubmit}
              />
            </div>
          </>
        ) : (
          <Loader status={dataLoading} />
        )}
      </section>
    </>
  );
}

export function ProfileSection(props: IMessageSection) {
  return (
    <>
      {props.data ? (
        <section className={styles.profilecontainer}>
          <h4>#{props.data.data.reference}</h4>
          <br />
          <h5>Customer full name:</h5>
          <p>
            {props.data.data.customer.firstname}{" "}
            {props.data.data.customer.lastname}
          </p>
          <br />
          <h5>Customer Email:</h5>
          <p>{props.data.data.customer.email}</p>
          <br />
          <h5>Customer Phone:</h5>
          <p>+{props.data.data.customer.phone}</p>
          <br />
          <h5>Subject:</h5>
          <p>{props.data.data.subject}</p>
          <br />
          <h5>Service Type:</h5>
          <p>{props.data.data.type.name}</p>
          <br />
          <h5>Status:</h5>
          <p>{props.data.data.status}</p>
          <br />
          <h5>Description:</h5>
          <p>{props.data.data.description}</p>
          <br />
          <h5>Agent:</h5>
          <p>
            {props.data.data.agent
              ? props.data.data.agent.firstname
              : "Not Assigned"}
          </p>
          <br />
          {/* <h5>Invoice:</h5>
                <p>Filename goes here</p> */}
          <br />
        </section>
      ) : (
        <Loader status={props.isLoading} />
      )}
    </>
  );
}
