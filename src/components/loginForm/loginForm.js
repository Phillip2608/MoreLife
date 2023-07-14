import styles from './cssLogin/loginForm.module.css'

//Import Components
import Input from '../form/input'
import Checkbox from '../form/checkbox'
import ButtonForm from '../form/buttonForm'

import { Link } from 'react-router-dom'

function LoginForm() {
    return (
        <div className={styles.formContainer}>
            <form action="">
                <Input
                    type="text"
                    text="Email"
                    nameInput="email"
                    placeholder="Digite seu email"
                />
                <Input
                    type="password"
                    text="Senha"
                    nameInput="senha"
                    placeholder="Digite sua senha"
                />
                <Checkbox 
                    text="Manter-me conectado"
                    nameCheckbox="connect"
                    value="connect"
                />
                <ButtonForm text="Entrar" />
            </form>
            <div className={styles.linkContainer}>
                <Link to="/register"> Não possui um cadastro?<br/>Registre-se! </Link>
            </div>
        </div>
    )
}

export default LoginForm