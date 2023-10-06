import { useState } from "react";
import styles from "./index.module.css";
import { Icon } from "@iconify/react";

export interface Data {
  type: "folder" | "file" | "pdf" | "excel";
  name: string;
}

interface TableContentProps {
  data: Data[];
}

export default function TableContent(props: TableContentProps) {
  const [layout, setLayout] = useState<boolean>(true);

  const setListLayout = () => {
    setLayout(false);
  };

  const setGridLayout = () => {
    setLayout(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div onClick={setGridLayout}>
            <Icon icon="mdi:grid" />
          </div>
          <div onClick={setListLayout}>
            <Icon icon="material-symbols:list" />
          </div>
        </div>
        {layout ? (
          <>
            <Grid data={props.data} />
          </>
        ) : (
          <>
            <List data={props.data} />
          </>
        )}
      </div>
    </>
  );
}

interface IGrid {
  data: Data[];
}

export function Grid(props: IGrid) {
  return (
    <>
      <section className={styles.gridlayout}>
        {props.data.map((d: Data) => {
          return (
            <>
              <div className={styles.gridcontainer}>
                <div className={styles.gridheader}>
                  <div>
                    <p>{d.name}</p>
                  </div>
                  <div>
                    <div className={styles.dropdown}>
                      <div className={styles.dropdownbutton}>
                        <Icon icon="mdi:dots-vertical" />
                      </div>
                      <div className={styles.dropdowncontent}>
                        <p className={styles.dropdowncontentitem}>
                          Edit profile
                        </p>
                        <p className={styles.dropdowncontentitem}>
                          Change password
                        </p>
                        <p className={styles.dropdowncontentitem}>Logout</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.gridthumbnail}>
                  {d.type === "folder" && (
                    <Icon
                      icon="material-symbols:folder"
                      height={40}
                      width={40}
                    />
                  )}
                  {d.type === "file" && (
                    <Icon icon="mdi:file-outline" height={40} width={40} />
                  )}
                  {d.type === "pdf" && (
                    <Icon icon="teenyicons:pdf-solid" height={40} width={40} />
                  )}
                  {d.type === "excel" && (
                    <Icon
                      icon="file-icons:microsoft-excel"
                      height={40}
                      width={40}
                    />
                  )}
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
}

interface ListProps {
  data: Data[];
}

export function List(props: ListProps) {
  return (
    <>
      <section className={styles.listlayout}>
        {props.data.map((d: Data) => {
          return (
            <>
              <div className={styles.listcontainer}>
                <div className={styles.listdetail}>
                  {d.type === "pdf" && <Icon icon="teenyicons:pdf-solid" />}
                  {d.type === "excel" && (
                    <Icon icon="file-icons:microsoft-excel" />
                  )}
                  {d.type === "folder" && (
                    <Icon icon="material-symbols:folder" />
                  )}
                  {d.type === "file" && <Icon icon="mdi:file-outline" />}
                  <p>{d.name}</p>
                </div>
                <div className={styles.dropdown}>
                  <div className={styles.dropdownbutton}>
                    <Icon icon="mdi:dots-vertical" />
                  </div>
                  <div className={styles.dropdowncontent}>
                    <p className={styles.dropdowncontentitem}>Edit profile</p>
                    <p className={styles.dropdowncontentitem}>
                      Change password
                    </p>
                    <p className={styles.dropdowncontentitem}>Logout</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
}
