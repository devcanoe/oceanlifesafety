import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import styles from "./index.module.css";
import { useAppDispatch, useAppSelector } from "@/common/lib/hooks";
import { User, logOut, selectCurrentUser } from "@/common/lib/slice/authslice";
import { useEffect, useState } from "react";
import { menuitems } from "./menuitem";

export default function Sidebar({ toggleMenu }: {
  toggleMenu: () => void
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logOut({}));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <>
    <div className={styles.sidebarwrapper}>
      
      <aside className={styles.sidebarcontainer}>
        <div>
          <nav className={styles.sidebarnav}>
            <button onClick={toggleMenu} className={styles.sidebarbutton}>
              <Icon icon="material-symbols:close" color={'white'} height={50} width={50} />
            </button>
          </nav>
          <header className={styles.sidebarheader}>
            <h4>Oceanlifesafety</h4>
          </header>
          <div className={styles.menulist}>
            {menuitems.map((menuitem: IMenuItem, index: number) => {
              return (
                <>
                  <MenuItem
                    url={menuitem.url}
                    title={menuitem.title}
                    icon={menuitem.icon} 
                    toggleMenu={toggleMenu}                  
                  />
                </>
              );
            })}
          </div>
        </div>
        <footer className={styles.footer}>
          <div className={styles.logout} onClick={handleLogout}>
            <Icon icon="material-symbols:logout" />
            Logout
          </div>
        </footer>
      </aside>
    </div>
    </>
  );
}

interface IMenuItem {
  url: string;
  title: string;
  icon: string;
  toggleMenu: () => void
}

function MenuItem(props: IMenuItem) {
  const router = useRouter();
  return (
    <>
      <Link
        onClick={props.toggleMenu}
        href={props.url}
        className={
          router.pathname.includes(props.url)
            ? styles.menuitemactive
            : styles.menuitemcontainer
        }
      >
        <Icon icon={props.icon} />
        {props.title}
      </Link>
    </>
  );
}
