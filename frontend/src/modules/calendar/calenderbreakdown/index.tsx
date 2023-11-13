import { ReactNode, useState } from "react";
import styles from "./index.module.css";
import { Icon } from "@iconify/react";
import dayjs, { Dayjs } from "dayjs";
import { useFetchCalendarQuery } from "@/common/services/calendar.service";

interface CalendarbreakdownProps {
  currentDate: Dayjs | undefined
}

export default function Calendarbreakdown({currentDate}: CalendarbreakdownProps) {

  const { data, isLoading, isSuccess } = useFetchCalendarQuery({ date: currentDate ? currentDate : dayjs(Date())})

    console.log('query ' + !isLoading && data);
  return (
    <>
      <div className={styles.container}>
        { isSuccess && (
          <>
          <h5>{ currentDate?.toString() }</h5>
          <div className={styles.calendarlist}>
            { data?.data.map((info: any, index: number)=> {
              return (
                <>
                  <Breakdown type={info.type}>
                    {info.type === "TASK" && 
                    <TaskContent status={false} data={info}/>
                    }
                    {info.type === "SERVICING" && 
                      <ServicingContent company={info.company} vessel={info.vessel}/>
                    }
                  </Breakdown>
                </>
              )
              })
            }
          </div>
          </>
        )}
      </div>
    </>
  );
}

interface IBreakdown {
  children: ReactNode;
  type: "TASK" | "SERVICING";
}

export function Breakdown({ children, type }: IBreakdown) {
  return (
    <>
      <div
        className={
          type === "SERVICING"
            ? styles.breakdownservicecontainer
            : styles.breakdowntaskcontainer
        }
      >
        {children}
      </div>
    </>
  );
}

export function ServicingContent({
  company,
  vessel
}: {
  company: string,
  vessel: string
}) {
  return (
    <>
      <div className={styles.servicingcontainer}>
        <p>{company} </p> | <p> {vessel} </p>
      </div>
    </>
  );
}

interface ITaskContent {
  status: boolean;
  data: any
}

export function TaskContent(props: ITaskContent) {
  const [showDescription, setShowDescription] = useState<boolean>(true);
  console.log('task '+ JSON.stringify(props.data))
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
            <p>{props.data.title}</p> <p>{props.data.due_time}</p>
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
          {props.data.description}
        </div>
      </div>
    </>
  );
}
