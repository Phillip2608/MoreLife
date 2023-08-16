import styles from "./cssLayout/navbar.module.css";

import { FaHeartbeat } from "react-icons/fa";

import NavLink from "./navlink";

function NavBar() {
  const id = localStorage.getItem("id");

  return (
    <nav className={styles.navbar}>
      <div>
        <FaHeartbeat />
      </div>
      <ul>
        <NavLink text="Download" to="/download" />
        <NavLink text="Sobre" />
        {id && <NavLink text="Dashboard" />}
        {id ? (
          <NavLink text="Meu Perfil" />
        ) : (
          <NavLink text="Entrar" to="/login" />
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
