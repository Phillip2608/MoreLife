import styles from './cssRegister/registerForm.module.css'

//imports react
import { useEffect, useState } from 'react'

//imports react-routers-dom
import { Link } from 'react-router-dom'

//Importando components
import Input from '../form/input'
import Select from '../form/select'
import ButtonForm from '../form/buttonForm'
import Message from '../layout/message'

function RegisterForm({ handleSubmit, btnText, userData }) {
    const [sexo, setSexo] = useState([])
    const [user, setUser] = useState(userData || [])
    const [message, setMessage] = useState("")
    const [allUsers, setAllUsers] = useState([])
    let email = ""

    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const regexPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

    function validateForm(user) {
        if (user.length === 0) {
            setMessage('É necessário preencher todos os campos!')
            return false
        }
        if (user.user_name === '' || 
            user.user_sbname === '' || 
            user.user_age === '' ||
            user.user_email === '' ||
            user.user_pass === '' ||
            user.user_confPass === ''
        ) {
            setMessage('É necessário preencher todos os campos!')
            return false
        }
        if (parseInt(user.user_age) < 5) {
            setMessage('A idade mínima é de 5 anos!')
            return false
        }
        if (regexEmail.test(user.user_email) === false) {
            setMessage('O email deve existir!')
            return false
        }
        if (regexPass.test(user.user_pass) === false) {
            setMessage('A senha deve possuir no mínimo 8 caracteres, 1 número, uma letra minúscula e uma letra maiúscula!')
            return false
        }
        if (user.user_pass !== user.user_confPass) {
            setMessage('As senhas devem se coincidir!')
            return false
        }
        if (user.user_sexo === undefined || user.user_sexo.id === 'Selecione uma opção') {
            setMessage('É necessário selecionar uma das opções!')
            return false
        }

        allUsers.map(allUser =>{
            if(allUser.user_email === user.user_email){
                email = allUser.user_email
            }
        })
        if(email === user.user_email){
            setMessage('Já possuímos uma conta com este email!')
            return false
        }

        setMessage('')
        return handleSubmit(user)
    }

    const submit = (e) => {
        e.preventDefault()
        validateForm(user)
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
        if (e.target.value === '') {
            setMessage('É necessário preencher todos os campos!')
            return false
        }
    }

    function handleSexo(e) {
        setUser({
            ...user, user_sexo: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        })
    }
    return (
        <div className={styles.registerContainer}>
            {message !== "" && <Message msg={message} type="error" />}
            <form onSubmit={submit}>
                <div className={styles.formDiv}>
                    <Input
                        text="Nome"
                        type="text"
                        nameInput="user_name"
                        placeholder="Digite seu primeiro nome"
                        handleOnChange={handleChange}
                        customClass={user.user_name === '' && "error"}
                        value={user.user_name ? user.user_name : ''}
                    />
                    <Input
                        text="Sobrenome"
                        type="text"
                        nameInput="user_sbname"
                        placeholder="Digite seu sobrenome"
                        handleOnChange={handleChange}
                        customClass={user.user_sbname === '' && "error"}
                        value={user.user_sbname ? user.user_sbname : ''}
                    />
                    <Input
                        text="Idade"
                        type="number"
                        nameInput="user_age"
                        placeholder="Digite sua idade"
                        handleOnChange={handleChange}
                        customClass={(user.user_age === '' && "error") || (parseInt(user.user_age) < 5 && "error")}
                        value={user.user_age ? user.user_age : ''}
                    />
                    <Select
                        nameSelect="user_sexo"
                        options={sexo}
                        text="Sexo"
                        handleOnChange={handleSexo}
                        value={user.user_sexo ? user.user_sexo.id : ''}
                    />
                </div>
                <div className={styles.formDiv}>
                    <Input
                        text="Email"
                        type="email"
                        nameInput="user_email"
                        placeholder="Digite seu email"
                        handleOnChange={handleChange}
                        customClass={user.user_email === '' && "error"}
                        value={user.user_email ? user.user_email : ''}
                    />
                    <Input
                        text="Senha"
                        type="password"
                        nameInput="user_pass"
                        placeholder="Digite sua senha"
                        handleOnChange={handleChange}
                        customClass={user.user_pass === '' && "error"}
                        value={user.user_pass ? user.user_pass : ''}
                    />
                    <Input
                        text="Confirmar senha"
                        type="password"
                        nameInput="user_confPass"
                        placeholder="Confirme sua senha"
                        handleOnChange={handleChange}
                        customClass={user.user_confPass === '' && "error"}
                        value={user.user_confPass ? user.user_confPass : ''}
                    />
                    <div className={styles.btnContainer}>
                        <ButtonForm
                            text={btnText}
                        />
                    </div>

                </div>
            </form>
            <div className={styles.linkContainer}>
                <Link to="/login">Já possui um cadastro?<br />Logar!</Link>
            </div>

        </div>
    )
}

export default RegisterForm