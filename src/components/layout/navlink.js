import { Link } from "react-router-dom";
import styles from "./cssLayout/navlink.module.css";

function Navlink(props) {
  return (
    <Link to={props.to} className={`${styles.navlink} ${styles[props.customClass]}`}>
      <li onClick={props.handleOnClick}>
        {props.icon} <p>{props.text}</p>
      </li>
    </Link>
  );
}

export default Navlink;
