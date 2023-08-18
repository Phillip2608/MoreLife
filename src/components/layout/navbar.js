import styles from "./cssLayout/navbar.module.css";

import { useEffect, useState } from "react";
import { FaHeartbeat } from "react-icons/fa";

import NavLink from "./navlink";

function NavBar() {
  const [id, setId] = useState("")
  useEffect(() => {
    setId(localStorage.getItem("id"))
  }, [])

  console.log(id)

  return (
    <nav className={styles.navbar}>
      <div>
        <FaHeartbeat />
      </div>
      <ul>
        <NavLink text="Download" to="/download" />
        <NavLink text="Sobre" />
        {id !== null ? <NavLink text="Dashboard" /> : ""}
        {id !== null ? (
          <NavLink text="Meu Perfil" to="/myprofile"/>
        ) : (
          <NavLink text="Entrar" to="/login" />
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
