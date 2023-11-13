import CalendarComponent from "./calendar";
import styles from "./index.module.css";
import Calendarbreakdown from "./calenderbreakdown";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Popup from "@/common/components/display/popup";
import AddTaskContent from "./models/addtask";
import AddServicingContent from "./models/addservicing";
import dayjs, { Dayjs } from "dayjs";

export default function CalendarSection() {
  const [ currentDate, setCurrentDate ] = useState<Dayjs | undefined>();
  const [addTaskModalStatus, setAddTaskModalStatus] = useState<boolean>(false);
  const [addServicingModalStatus, setAddServicingModalStatus] =
    useState<boolean>(false);

  const createTaskHandler = () => {
    setAddTaskModalStatus((state) => !state);
  };

  const createServicingHandler = () => {
    setAddServicingModalStatus((state) => !state);
  };

  const setCurrentDateValue = (date: Dayjs) => {
    setCurrentDate(date)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.calendarcontainer}>
          <div className={styles.dropdown}>
            <span className={styles.dropdownbutton}>
              Create <Icon icon="teenyicons:down-solid" color="black" />
            </span>
            <div className={styles.dropdowncontent}>
              <p
                className={styles.dropdowncontentitem}
                onClick={createTaskHandler}
              >
                Task
              </p>
              <p
                className={styles.dropdowncontentitem}
                onClick={createServicingHandler}
              >
                Servicing
              </p>
            </div>
          </div>

          <CalendarComponent setCurrentDate={setCurrentDateValue} />

          <div className={styles.filtercontainer}>
            <h5>Filters</h5>
            <div className={styles.filteritem}>
              <input type="checkbox" /> Servicing
            </div>
            <div className={styles.filteritem}>
              <input type="checkbox" /> Tasks
            </div>
          </div>
        </div>
        <div>
          <Calendarbreakdown currentDate={currentDate} />
        </div>
        <Popup displayStatus={addTaskModalStatus} close={createTaskHandler}>
          <AddTaskContent close={createTaskHandler} />
        </Popup>
        <Popup
          displayStatus={addServicingModalStatus}
          close={createServicingHandler}
        >
          <AddServicingContent close={createServicingHandler} />
        </Popup>
      </div>
    </>
  );
}
