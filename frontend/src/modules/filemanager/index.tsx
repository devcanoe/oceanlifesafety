import Link from "next/link";
import styles from "./index.module.css";
import { Icon } from "@iconify/react";
import ExplorerContent from "@/pages/filemanager/explorer";

export default function FilemanagerContent() {
  return (
    <>
      <main className={styles.container}>
        <aside className={styles.menu}>
          <Link href="" className={styles.menuitem}>
            <Icon icon="material-symbols:folder" />
            Explorer
          </Link>
          <Link href="" className={styles.menuitem}>
            {" "}
            <Icon icon="mdi:clock-outline" /> Recent
          </Link>
          <Link href="" className={styles.menuitem}>
            <Icon icon="material-symbols:star-outline" />
            Starred
          </Link>
        </aside>
        <section>
          <ExplorerContent />
        </section>
      </main>
    </>
  );
}
