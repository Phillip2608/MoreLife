import styles from './cssLayout/navbar.module.css'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.list}>
                <Link to="/graphic">
                    <li>
                        Gráfico
                    </li>
                </Link>
                <Link to="/table">
                    <li>
                        Tabela
                    </li>
                </Link>
                <Link to="/download">
                    <li>
                        Download
                    </li>
                </Link>

            </ul>
        </nav>

    )
}

export default Navbar