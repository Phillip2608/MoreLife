import styles from './cssLogin/loginForm.module.css'

//Import react-doms
import { useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'

//Import Components
import Input from '../form/input'
import ButtonForm from '../form/buttonForm'
import Message from '../layout/message'

import { Link } from 'react-router-dom'

function LoginForm({ handleSubmit, btnText, userData }) {
    const [user, setUser] = useState(userData || [])
    const [allUsers, setAllUsers] = useState([])
    const [message, setMessage] = useState("")
    const [type, setType] = useState("success")
    const location = useLocation()
    let msg = ""
    let email = ""
    let pass = ""

    function validationForm(user) {
        allUsers.map(allUser => {
            if (allUser.user_email === user.email) {
                if (allUser.user_pass === user.pass) {
                    email = allUser.user_email
                    pass = allUser.user_pass
                }
            }
        })
        if (user.length === 0) {
            setMessage("Email ou senha inválidos!")
            setType("error")
            return false
        }
        if (email !== user.email || user.email === "") {
            setMessage("Email ou senha inválidos!")
            setType("error")
            return false
        }
        if (pass !== user.pass || user.pass === "") {
            setMessage("Email ou senha inválidos!")
            setType("error")
            return false
        }

        msg = ""
        console.log("Sucesso!")
        return handleSubmit(user)
    }

    const submit = (e) => {
        e.preventDefault()
        validationForm(user)
    }

    function handleChange(e) {
        setMessage("")
        setUser({ ...user, [e.target.name]: e.target.value })
        if (e.target.value === '') {
            setMessage('Email ou senha inválidos!')
            setType('error')
            return false
        }
    }

    if (location.state) {
        msg = location.state
    }

    return (
        <div className={styles.formContainer}>
            {message !== "" && (<Message msg={message} type={type} />)}
            {msg !== "" && (<Message msg={msg} type={type} />)}
            <form onSubmit={submit}>
                <Input
                    type="text"
                    text="Email"
                    nameInput="email"
                    placeholder="Digite seu email"
                    handleOnChange={handleChange}
                    customClass={user.email === '' && "error"}
                    value={user.email ? user.email : ''}
                />
                <Input
                    type="password"
                    text="Senha"
                    nameInput="pass"
                    placeholder="Digite sua senha"
                    handleOnChange={handleChange}
                    customClass={user.pass === '' && "error"}
                    value={user.pass ? user.pass : ''}
                />

                <div className={styles.btnContainer}>
                    <ButtonForm
                        text={btnText}
                    />
                </div>
            </form>
            <div className={styles.linkContainer}>
                <Link to="/register"> Não possui um cadastro?<br />Registre-se! </Link>
            </div>
        </div>
    )
}

export default LoginForm