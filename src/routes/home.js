import styles from './cssRoutes/home.module.css'

//Import components
import LinkButton from '../components/layout/linkButton'

function Home() {
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