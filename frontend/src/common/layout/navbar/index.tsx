import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import styles from "./index.module.css";
import { useAppDispatch, useAppSelector } from "@/common/lib/hooks";
import { User, logOut, selectCurrentUser } from "@/common/lib/slice/authslice";
import { useEffect, useState } from "react";
import InputField from "@/common/components/form/inputfield";
import Link from "next/link";

export default function Navbar({ toggleMenu }: {
  toggleMenu: () => void
}) {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectCurrentUser);
  const router = useRouter();

  const [username, setUsername] = useState<string>();
  const [ searchValue, setSearchValue ]= useState<string>("")

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
          <button onClick={toggleMenu} className={styles.navbarbutton}>
            <Icon icon="material-symbols:menu" 
              color={'black'} 
              width={30} 
              height={30} 
            />
          </button>
          
            <input
              type={"text"}
              placeholder={"Search...."}
              className={styles.searchbar}
              onChange={(e)=> {
                setSearchValue(e.target.value)
              }}
              onKeyDown={(e)=> {
                if(e.code === "Enter") {
                  router.push(`/search?search=${searchValue}`)
                }
              }}
            />
          
        </div>

        <div>
          <div className={styles.dropdown}>
            <span className={styles.profile}>
              <Icon icon="ph:user-bold" width={20} height={20} />
            </span>
            <div className={styles.dropdowncontent}>
              <Link href={'/edit-profile'} className={styles.dropdowncontentitem}>Edit profile</Link>
              <Link href={'/changepassword'} className={styles.dropdowncontentitem}>Change password</Link>
              <p className={styles.dropdowncontentitem} onClick={handleLogout}>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
