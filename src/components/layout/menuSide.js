import styles from "./cssLayout/menuSide.module.css";
import ListItem from "./listItem";

import { FaUser } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function MenuSide() {
  const navigate = useNavigate();

  function close() {
    localStorage.clear();
    navigate("/");
    return window.location.reload()
  }

  return (
    <ul className={styles.menuSide}>
      <ListItem text="Meu Perfil" icon={<FaUser />} />
      <ListItem text="Editar dados" icon={<FaUserEdit />} />
      <ListItem text="Adicionar Responsável" icon={<FaUserPlus />} />
      <ListItem text="Configurações" icon={<FaUserCog />} />
      <ListItem
        text="Sair"
        icon={<FaDoorOpen />}
        customClass="close"
        handleClick={close}
      />
    </ul>
  );
}

export default MenuSide;
