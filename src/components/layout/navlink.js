import { Link } from "react-router-dom";
import styles from './cssLayout/navlink.module.css'

function Navlink({to, icon, text, customClass, handleOnClick}){
    return(
        <Link to={to} className={styles.navlink}>
            <li onClick={handleOnClick}>
                {icon} <p>{text}</p>
            </li>
        </Link>
    )
}

export default Navlink