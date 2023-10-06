import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import styles from "./index.module.css";
import { useAppDispatch, useAppSelector } from "@/common/lib/hooks";
import { User, logOut, selectCurrentUser } from "@/common/lib/slice/authslice";
import { useEffect, useState } from "react";
import InputField from "@/common/components/form/inputfield";

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
          <input
            type={"text"}
            placeholder={"Search...."}
            className={styles.searchbar}
          />
        </div>

        <div>
          <div className={styles.dropdown}>
            <span className={styles.profile}>
              <Icon icon="ph:user-bold" width={20} height={20} />
            </span>
            <div className={styles.dropdowncontent}>
              <p className={styles.dropdowncontentitem}>Edit profile</p>
              <p className={styles.dropdowncontentitem}>Change password</p>
              <p className={styles.dropdowncontentitem}>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
