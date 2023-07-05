import React, { useContext } from "react";
import styles from "./Navbar.module.scss";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../common/providers/UserProvider";
import { useLocalStorage } from "../../common/hooks/useLocalStorage";
import { toast } from "react-toastify";
import { logOut, useUser } from "../../common/firebase/authService";

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [storedUser, setStoredUser] = useLocalStorage("websiteUser");
  const navigate = useNavigate();
  const firebaseUser = useUser();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setUser(undefined);
    setStoredUser(null);

    if (firebaseUser) {
      logOut();
    }

    toast.success("Logout successful. Goodnight!");
    navigate("/login");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link to={"/"} className={styles.logo}>
            Rent a apartment
          </Link>
          {user && (
            <div className={styles.userWrapper}>
              <div className={styles.userText}>
                {user.surname ? `${user.name} ${user.surname}` : `${user.name}`}
              </div>
              <Link to={"followed"} className={styles.button}>
                Followed
              </Link>
              <Link to={"add-rental"} className={styles.button}>
                Add New
              </Link>
              <button className={styles.button} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
