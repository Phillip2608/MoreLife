import { Link } from "react-router-dom";
import styles from './cssLayout/navlink.module.css'

function Navlink({to, icon, text, customClass}){
    return(
        <Link to={to} className={styles.navlink}>
            <li>
                {icon} <p>{text}</p>
            </li>
        </Link>
    )
}

export default Navlink