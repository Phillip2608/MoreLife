import styles from './cssLayout/navbar.module.css'

//ICONS
import {FaSignal} from 'react-icons/fa'
import {FaTable} from 'react-icons/fa'
import {FaDownload} from 'react-icons/fa'
import {FaDoorOpen} from 'react-icons/fa'
import { FaInfo } from 'react-icons/fa'

//layout components
import Navlink from './navlink'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.list}>
                <div className={styles.infoUser}>
                    <span></span>
                    <p>{localStorage.getItem("name")}</p>
                </div>
                <Navlink to="/dashboard/graphic" icon={<FaSignal />} text="Gráfico"/>
                <Navlink to="/dashboard/table" icon={<FaTable />} text="Tabela"/>
                <Navlink to="/dashboard/download" icon={<FaDownload />} text="Download"/>
                <Navlink to="" icon={<FaInfo/>} text="Informações"/>
                <Navlink to="" icon={<FaDoorOpen/>} text="Sair"/>
                <p>v.beta</p>
            </ul>
        </nav>

    )
}

export default Navbar