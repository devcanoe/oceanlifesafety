import { ReactNode, useState } from "react";
import styles from "./index.module.css";
import Navbar from "../navbar";
import Sidebar from "../sidebar";

interface IDashboardLayout {
  children: ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayout) {
  const [ showSidebar, setShowSidebar ] = useState<boolean>(false);

  const toggleSidebarHandler = () => {
    setShowSidebar((state)=> !state)
  }
  return (
    <>
      <section className={styles.container}>
        {showSidebar && (
          <>
            <Sidebar toggleMenu={toggleSidebarHandler}/>
          </>
        )}
      
        <div className={styles.main}>
          <Navbar toggleMenu={toggleSidebarHandler}/>
          <div className={styles.content}>{children}</div>
        </div>
      </section>
    </>
  );
}
