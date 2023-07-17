import styles from './cssRoutes/login.module.css'

//Import Components
import Container from '../components/layout/container'
import LoginForm from '../components/loginForm/loginForm'
function Login() {
    return (
        <Container customClass="center">
            <h1>Login</h1>
            <LoginForm/>
        </Container>
    )
}

export default Login