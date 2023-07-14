import styles from './cssRegister/registerForm.module.css'

//imports react
import { useEffect, useState } from 'react'

//imports react-routers-dom
import { Link } from 'react-router-dom'

//Importando components
import Input from '../form/input'
import Select from '../form/select'
import ButtonForm from '../form/buttonForm'

function RegisterForm({ handleSubmit, btnText, userData }) {
    const [sexo, setSexo] = useState([])
    const [user, setUser] = useState(userData || [])


    useEffect(() => {
        fetch("http://localhost:5000/sexos", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setSexo(data)
            })
            .catch(err => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(user)
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
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
            <form onSubmit={submit}>
                <div className={styles.formDiv}>
                    <Input
                        text="Nome"
                        type="text"
                        nameInput="user_name"
                        placeholder="Digite seu primeiro nome"
                        handleOnChange={handleChange}
                        value={user.user_name ? user.user_name : ''}
                    />
                    <Input
                        text="Sobrenome"
                        type="text"
                        nameInput="user_sbname"
                        placeholder="Digite seu sobrenome"
                        handleOnChange={handleChange}
                        value={user.user_sbname ? user.user_sbname : ''}
                    />
                    <Input
                        text="Idade"
                        type="number"
                        nameInput="user_age"
                        placeholder="Digite sua idade"
                        handleOnChange={handleChange}
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
                        value={user.user_email ? user.user_email : ''}
                    />
                    <Input
                        text="Senha"
                        type="password"
                        nameInput="user_pass"
                        placeholder="Digite sua senha"
                        handleOnChange={handleChange}
                        value={user.user_pass ? user.user_pass : ''}
                    />
                    <Input
                        text="Confirmar senha"
                        type="password"
                        nameInput="user_confPass"
                        placeholder="Confirme sua senha"
                        handleOnChange={handleChange}
                        value={user.user_confPass ? user.user_confPass : ''}
                    />
                    <div>
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