import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import styles from "./index.module.css";
import { useAppDispatch, useAppSelector } from "@/common/lib/hooks";
import { User, selectCurrentUser } from "@/common/lib/slice/authslice";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user: User = useAppSelector(selectCurrentUser);
  
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    if (router.isReady) {
      setUsername(`${user.firstname} ${user.lastname}`);
      setEmail(`${user.email}`)
    }
  }, [router.isReady]);
  return (
    <>
      <aside className={styles.sidebarcontainer}>
        <header className={styles.sidebarheader}>
          <h4>Oceanlifesafety</h4>
        </header>
        <div className={styles.avatarbox}>
          <div className={styles.avatar}>

          </div>
          <p>{username}</p>
          <small>{email}</small>
        </div>
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
