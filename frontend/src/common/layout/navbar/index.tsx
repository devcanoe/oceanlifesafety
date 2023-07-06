import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import styles from "./index.module.css";
import { useAppDispatch, useAppSelector } from "@/common/lib/hooks";
import { User, logOut, selectCurrentUser } from "@/common/lib/slice/authslice";
import { useEffect, useState } from "react";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectCurrentUser);
  const router = useRouter();

  const [username, setUsername] = useState<string>();

  const handleLogout = () => {
    dispatch(logOut({}));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    if (router.isReady) {
      setUsername(`Hello ${user.firstname}`);
    }
  }, [router.isReady]);
  return (
    <>
      <div className={styles.navbarcontainer}>
        <div className={styles.leftside}>
          <h5>Welcome back</h5>
          <small className={styles.small}>{username} </small>
        </div>

        <div className={styles.logout} onClick={handleLogout}>
          <Icon icon="material-symbols:logout" />
          Logout
        </div>
      </div>
    </>
  );
}
