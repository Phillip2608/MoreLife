import styles from './cssDashboard/dashboard.module.css'
import Navbar from '../layout/navbar'
function Dashboard(props){
    return(
        <div className={styles.dashboard}>
            <Navbar />
            {props.children}
        </div>
    )
}

export default Dashboard