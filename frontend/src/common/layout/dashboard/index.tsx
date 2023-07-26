import { ReactNode } from "react";
import styles from "./index.module.css";
import Navbar from "../navbar";
import Sidebar from "../sidebar";

interface IDashboardLayout {
  children: ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayout) {
  return (
    <>
      <section className={styles.container}>
        <Sidebar />

        <div className={styles.main}>
          <Navbar />
          <div className={styles.content}>{children}</div>
        </div>
      </section>
    </>
  );
}
