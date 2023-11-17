import { ReactNode, useState } from "react";
import styles from "./index.module.css";
import { Icon } from "@iconify/react";
import dayjs, { Dayjs } from "dayjs";
import { useCheckTaskMutation, useDeleteServiceMutation, useDeleteTaskMutation, useFetchCalendarQuery } from "@/common/services/calendar.service";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";

interface CalendarbreakdownProps {
  currentDate: Dayjs | undefined
}

export default function Calendarbreakdown({currentDate}: CalendarbreakdownProps) {

  const { data, isLoading, isSuccess } = useFetchCalendarQuery({ date: currentDate ? currentDate : dayjs(Date())})

  console.log(dayjs(Date()))
  console.log(isSuccess && data)
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
                      <ServicingContent id={info._id} company={info.company} vessel={info.vessel}/>
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
  vessel,
  id
}: {
  company: string,
  vessel: string,
  id: string
}) {
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

  const [deleteServicing, {isLoading}] = useDeleteServiceMutation();

  const deleteTaskHandler = () => {
    deleteServicing({
      id
    }).then(({ data, error }: any)=> {
      if (data) {
        successToastHandler({
          message: data.message,
          visibility: true,
          status: true,
        });
      }
      if (error) {
        errorToastHandler({
          message: error.data.message,
          visibility: true,
          status: false,
        });
      }
    }).catch((err)=> {
      errorToastHandler({
        message: "Something went wrong",
        visibility: true,
        status: false,
      });
    })
  }

  return (
    <>
      <div className={styles.servicingcontainer}>
        <div>
          <p>{company} </p> <p> {vessel} </p>
        </div>

        <div className={styles.servicingActions}>
            <button className={styles.actionbutton} onClick={deleteTaskHandler}>
              <Icon icon="material-symbols:delete-outline" color="white" />
            </button>
        </div>
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

  const [deleteTask, {isLoading}] = useDeleteTaskMutation();
  const [checkTask, { isLoading: checkTaskLoading}] = useCheckTaskMutation();
  
  const toggleHandler = () => {
    setShowDescription((state) => !state);
  };

  const deleteTaskHandler = () => {
    deleteTask({
      id: props.data._id
    }).then(({ data, error }: any)=> {
      if (data) {
        successToastHandler({
          message: data.message,
          visibility: true,
          status: true,
        });
      }
      if (error) {
        errorToastHandler({
          message: error.data.message,
          visibility: true,
          status: false,
        });
      }
    }).catch((err)=> {
      errorToastHandler({
        message: "Something went wrong",
        visibility: true,
        status: false,
      });
    })
  }

  const checkTaskHandler = () => {
    checkTask({
      id: props.data._id
    }).then(({ data, error }: any)=> {
      if (data) {
        successToastHandler({
          message: data.message,
          visibility: true,
          status: true,
        });
      }
      if (error) {
        errorToastHandler({
          message: error.data.message,
          visibility: true,
          status: false,
        });
      }
    }).catch((err)=> {
      errorToastHandler({
        message: "Something went wrong",
        visibility: true,
        status: false,
      });
    })
  }

  return (
    <>
      <div className={styles.taskcontainer}>
        <div className={styles.taskheadercontainer} >
          <div className={styles.taskheaderrow}>
            {!props.data.status ? (
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
            <button className={styles.actionbutton} onClick={deleteTaskHandler}>
              <Icon icon="material-symbols:delete-outline" color="white" />
            </button>
            <button className={styles.actionbutton} onClick={checkTaskHandler} disabled={props.data.status}>
              <Icon icon="material-symbols:check" color="white" />
            </button>
            <button className={styles.actionbutton} onClick={toggleHandler}>
              <Icon icon="gridicons:dropdown" color="white" height={35} width={35} />
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
      </div>
    </>
  );
}
