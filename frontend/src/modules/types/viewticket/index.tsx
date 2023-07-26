import Loader from "@/common/components/display/loader";
import styles from "./index.module.css";
import Breadcrumb, { Item } from "@/common/layout/Breadcrumb";
import InputField from "@/common/components/form/inputfield";
import { Navbar } from "../../clients";

export default function ViewtypeContent() {
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
      label: "Ticketname",
      current: true,
    },
  ];
  return (
    <>
      <Loader status={false} />
      <section className={styles.container}>
        <Breadcrumb path={breadcrumbPath} />
        <Navbar
          title={"Tickets"}
          buttonLabel={"Close Ticket"}
          buttonAction={() => {}}
          deleteAction={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className={styles.unevengrid}>
          <MessageSection />
          <ProfileSection />
        </div>
      </section>
    </>
  );
}

export function MessageSection() {
  return (
    <>
      <section className={styles.messagecontainer}>
        <div className={styles.messagearea}>
          <div className={styles.receivercard}>
            <div className={styles.messageheader}>
              <small>customer</small>
              <small>Date</small>
            </div>
            <p className={styles.message}>some text goes here</p>
          </div>

          <div className={styles.sendercard}>
            <div className={styles.messageheader}>
              <small>customer</small>
              <small>Date</small>
            </div>
            <p className={styles.message}>some text goes here</p>
          </div>
        </div>
        <div className={styles.messagefooter}>
          <InputField type="text" placeholder="Enter message" />
        </div>
      </section>
    </>
  );
}

export function ProfileSection() {
  return (
    <>
      <section className={styles.profilecontainer}>
        <h3>#PC-123456789</h3>
        <h5>Customer full name:</h5>
        <p>Mac-Eteli</p>
        <br />
        <h5>Customer Email:</h5>
        <p>maceteligolden@gmail.com</p>
        <br />
        <h5>Customer Phone:</h5>
        <p>+2347016181313</p>
        <br />
        <h5>Subject:</h5>
        <p>ticket subject goes here</p>
        <br />
        <h5>Service Type:</h5>
        <p>ticket subject goes here</p>
        <br />
        <h5>Status:</h5>
        <p>ticket subject goes here</p>
        <br />
        <h5>Description:</h5>
        <p>ticket subject goes here</p>
        <br />
        <h5>Invoice:</h5>
        <p>Filename goes here</p>
        <br />
      </section>
    </>
  );
}
