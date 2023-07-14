import styles from './cssLayout/linkButton.module.css'
import { Link } from 'react-router-dom'

function LinkButton({to, type, text}){
    return (
        <>
            <Link to={to} className={`${styles.button} ${styles[type]}`}> {text} </Link>
        </>
    )
}

export default LinkButton