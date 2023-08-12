import styles from './cssRoutes/register.module.css'

//Importando components
import Container from '../components/layout/container'
import RegisterForm from '../components/registerForm/registerForm'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()

    function createUser(user) {
        
    }

    return (
        <Container customClass="center">
            <h1>Register</h1>
            <RegisterForm handleSubmit={createUser} btnText="Cadastrar-se"/>
        </Container>
    )
}

export default Register