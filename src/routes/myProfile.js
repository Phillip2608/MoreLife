import styles from "./cssRoutes/myprofile.module.css";

import { useEffect, useState } from "react";

import { getFromID } from "../services/FirebaseConfig";

import MenuSide from "../components/layout/menuSide";

function MyProfile() {
  const [user, setUser] = useState({});
  const id = localStorage.getItem("id");

  useEffect(() => {
    getFromID("tb_user", id, (snapshot) => {
      setUser({});
      const data = snapshot.val();
      if (data !== null) {
        setUser(data);
      }
    });
  }, []);

  return (
    <div className={styles.contentProfile}>
      <MenuSide />
      <div className={styles.content}></div>
    </div>
  );
}

export default MyProfile;
