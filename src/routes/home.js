import styles from './cssRoutes/home.module.css'

//Import components
import LinkButton from '../components/layout/linkButton'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const username = localStorage.getItem("name")

    useEffect(() => {
        if(username){
            return navigate(`/dashboard/${username}`)
        }
    }, [])

    

    return (
        <div className={styles.home}>
            <h1>MoreLife</h1>
            <div>
                <LinkButton to="/login" type="login" text="Login" />
                <LinkButton to="/register" type="register" text="Register" />
            </div>
        </div>
    )
}

export default Home