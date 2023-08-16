import styles from "./cssLayout/header.module.css";

import NavBar from "./navbar";

function Header() {
  return (
    <header className={styles.header}>
      <NavBar />
    </header>
  );
}

export default Header;
