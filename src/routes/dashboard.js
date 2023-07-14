import Container from '../components/layout/container'
import Navbar from '../components/layout/navbar'
import styles from './cssRoutes/dashboard.module.css'

import { Outlet } from 'react-router-dom'

function Dashboard() {
    return (
        <Container customClass="center">
            <div className={styles.dashboard}>
                <Navbar />
                <Outlet />
            </div>
        </Container>
    )
}

export default Dashboard