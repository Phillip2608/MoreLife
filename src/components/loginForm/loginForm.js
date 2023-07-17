import styles from './cssLogin/loginForm.module.css'

//Import react-doms
import { useLocation } from 'react-router-dom'

//Import Components
import Input from '../form/input'
import Checkbox from '../form/checkbox'
import ButtonForm from '../form/buttonForm'
import Message from '../layout/message'

import { Link } from 'react-router-dom'

function LoginForm() {
    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state
    }

    return (
        <div className={styles.formContainer}>
            {message && (
                <Message msg={message} type="success"/>
            )}
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