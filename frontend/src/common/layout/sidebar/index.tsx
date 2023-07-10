import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import styles from "./index.module.css";

export default function Sidebar() {
  return (
    <>
      <aside className={styles.sidebarcontainer}>
        <header className={styles.sidebarheader}>
          <h4>Oceanlifesafety</h4>
        </header>
        <MenuItem
          url={"/dashboard"}
          title={"Dashboard"}
          icon={"material-symbols:dashboard"}
        />
        <MenuItem
          url={"/company"}
          title={"Company"}
          icon={"mdi:user-group"}
        />
        <MenuItem
          url={"/invoice"}
          title={"Invoice"}
          icon={"majesticons:tickets-line"}
        />
        {/* <MenuItem url={"/customers"} title={"Customers"} icon={"mdi:user"} />
        <MenuItem url={"/types"} title={"Types"} icon={"mdi:user"} /> */}
      </aside>
    </>
  );
}

interface IMenuItem {
  url: string;
  title: string;
  icon: string;
}

function MenuItem(props: IMenuItem) {
  const router = useRouter();
  return (
    <>
      <Link
        href={props.url}
        className={
          props.url === router.pathname
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
