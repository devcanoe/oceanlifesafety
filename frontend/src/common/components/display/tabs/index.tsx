import { ReactNode, useState } from "react";
import styles from "./index.module.css";

interface ITab {
  headers: string[];
  contents: ReactNode[];
}

export default function Tabs(props: ITab) {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          {props.headers.map((header: string, index: number) => {
            return (
              <>
                <p
                  className={
                    activeTab === index ? styles.activetab : styles.inactivetab
                  }
                  key={index}
                  onClick={() => setActiveTab(index)}
                >
                  {header}
                </p>
              </>
            );
          })}
        </header>
        <main className={styles.main}>
          {props.contents.map((content: any, index: number) => {
            if (index === activeTab) {
              return <>{content}</>;
            }
          })}
        </main>
      </div>
    </>
  );
}
