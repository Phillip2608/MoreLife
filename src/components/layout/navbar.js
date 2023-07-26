import styles from './cssLayout/navbar.module.css'

//ICONS
import {FaSignal} from 'react-icons/fa'
import {FaTable} from 'react-icons/fa'
import {FaDownload} from 'react-icons/fa'
import {FaDoorOpen} from 'react-icons/fa'
import { FaInfo } from 'react-icons/fa'

//layout components
import Navlink from './navlink'

import {useNavigate} from 'react-router-dom'

function Navbar() {
    const username = localStorage.getItem("name")
    const navigate = useNavigate()

    function deleteLocal() {
        localStorage.clear()

        return navigate("/login")
    }

    return (
        <nav className={styles.navbar}>
            <ul className={styles.list}>
                <div className={styles.infoUser}>
                    <span></span>
                    <p>{localStorage.getItem("name")}</p>
                </div>
                <Navlink to={`/dashboard/${username !== '' && username}/graphic`} icon={<FaSignal />} text="Gráfico"/>
                <Navlink to={`/dashboard/${username !== '' && username}/table`} icon={<FaTable />} text="Tabela"/>
                <Navlink to={`/dashboard/${username !== '' && username}/download`} icon={<FaDownload />} text="Download"/>
                <Navlink to={`/dashboard/${username !== '' && username}/info`} icon={<FaInfo/>} text="Informações"/>
                <Navlink icon={<FaDoorOpen/>} text="Sair" handleOnClick={deleteLocal}/>
                <p>v.beta</p>
            </ul>
        </nav>

    )
}

export default Navbar