import { ReactNode, useState } from "react";
import styles from "./index.module.css";
import { Icon } from "@iconify/react";

export default function Calendarbreakdown() {
  return (
    <>
      <div className={styles.container}>
        <h5>21th Wednesday 2023</h5>
        <div className={styles.calendarlist}>
          <Breakdown type={"task"}>
            <TaskContent status={false} />
          </Breakdown>
          <Breakdown type={"servicing"}>
            <ServicingContent />
          </Breakdown>
        </div>
      </div>
    </>
  );
}

interface IBreakdown {
  children: ReactNode;
  type: "task" | "servicing";
}

export function Breakdown({ children, type }: IBreakdown) {
  return (
    <>
      <div
        className={
          type === "servicing"
            ? styles.breakdownservicecontainer
            : styles.breakdowntaskcontainer
        }
      >
        {children}
      </div>
    </>
  );
}

export function ServicingContent() {
  return (
    <>
      <div className={styles.servicingcontainer}>
        <p>Company Name </p> | <p> vessel </p>
      </div>
    </>
  );
}

interface ITaskContent {
  status: boolean;
}

export function TaskContent(props: ITaskContent) {
  const [showDescription, setShowDescription] = useState<boolean>(true);

  const toggleHandler = () => {
    setShowDescription((state) => !state);
  };

  return (
    <>
      <div className={styles.taskcontainer}>
        <div className={styles.taskheadercontainer} onClick={toggleHandler}>
          <div className={styles.taskheaderrow}>
            {!props.status ? (
              <>
                <Icon icon="tabler:xbox-x" color="white" />
              </>
            ) : (
              <>
                <Icon icon="ei:check" color="white" />
              </>
            )}
            <p>Task Name</p> <p>3:14am</p>
          </div>
          <div className={styles.taskheaderactions}>
            <button className={styles.actionbutton}>
              <Icon icon="material-symbols:delete-outline" color="white" />
            </button>
            <button className={styles.actionbutton}>
              <Icon icon="material-symbols:edit" color="white" />
            </button>
          </div>
        </div>
        <div
          className={
            showDescription ? styles.hidedescription : styles.showdescription
          }
        >
          some description is here
        </div>
      </div>
    </>
  );
}
