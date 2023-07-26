import { Icon } from "@iconify/react";
import { ReactNode } from "react";
import styles from "./index.module.css";

export interface IModalcard {
  displayStatus: boolean;
  close: () => void;
  children?: ReactNode;
}

export interface IHandleMotion {
  message?: string;
  visibility?: boolean;
  status?: boolean;
}

export default function Popup(props: IModalcard) {
  return (
    <>
      {props.displayStatus && (
        <section className={styles.cover}>
          <div className={styles.card}>
            <div className={styles.nav}>
              <button onClick={props.close} className={styles.closebtn}>
                <Icon
                  icon="material-symbols:close"
                  color="black"
                  width="30"
                  height="30"
                />
              </button>
            </div>
            <div className={styles.content}>{props.children}</div>
          </div>
        </section>
      )}
    </>
  );
}
