import styles from './cssForms/forms.module.css'

import {useState} from 'react'

import ButtonForm from '../form/buttonForm'
import Input from '../form/input'
import Message from '../layout/message'

function FormAccount({handleSubmit, txtBtn, dataUser}){
    const [newPass, setNewPass] = useState({
        'user_passAn': '', 
        'user_passNew':'', 
        'conf_user_passNew': '',
        'user_newEmail': ''
    })
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

    const user = dataUser

    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const regexPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

    newPass.user_newEmail = user.user_email
    function validateForm() {
        setMessage('')
        if(newPass.user_newEmail === ''){
            setMessage('O email deve estar preenchido!')
            setType('error')
            return false
        }
        if(user.user_pass !== newPass.user_passAn){
            setMessage('A senha atual deve se coincidir!')
            setType('error')
            return false
        }
        if(newPass.user_passAn === newPass.user_passNew){
            setMessage('A nova senha deve ser diferente da atual!')
            setType('error')
            return false
        }
        if((newPass.user_passNew === '' || newPass.conf_user_passNew === '') && newPass.user_passAn !== ''){
            setMessage('Para atualizar é necessário preencher os campos')
            setType('error')
            return false
        }
        if (regexEmail.test(newPass.user_newEmail) === false) {
            setMessage('O email deve existir!')
            setType('error')
            return false
        }
        if (regexPass.test(newPass.user_passNew) === false) {
            setMessage('A senha deve possuir no mínimo 8 caracteres, 1 número, uma letra minúscula e uma letra maiúscula!')
            setType('error')
            return false
        }
        if(newPass.user_passNew !== newPass.conf_user_passNew){
            setMessage('A nova senha deve se coincidir!')
            setType('error')
            return false
        }

        user.user_pass = newPass.user_passNew
        user.user_confPass = newPass.conf_user_passNew
        user.user_email = newPass.user_newEmail
        newPass.user_passAn= ''
        newPass.user_passNew= ''
        newPass.conf_user_passNew= ''
        setMessage('Atualização feita com sucesso!')
        setType('success')
        return handleSubmit(user)
    }



    function OnChangePass(e) {
        setNewPass({...newPass,[e.target.name]:e.target.value})
        setMessage('')
    }

    function submit(e){
        e.preventDefault()
        validateForm()
    }

    return (
        <div className={styles.formContainer}>
            <h2>Dados da Conta</h2>
            {message && <Message msg={message} type={type} />}
            <form onSubmit={submit}>
                <Input
                    type="email"
                    text="Email"
                    nameInput="user_newEmail"
                    placeholder="Digite um novo email"
                    value={newPass.user_newEmail ? newPass.user_newEmail : ''}
                    handleOnChange={OnChangePass}
                />
                <Input
                    type="password"
                    text="Senha atual"
                    nameInput="user_passAn"
                    placeholder="Digite sua senha atual"
                    value={newPass.user_passAn ? newPass.user_passAn : ''}
                    handleOnChange={OnChangePass}
                />
                <Input
                    type="password"
                    text="Nova senha"
                    nameInput="user_passNew"
                    placeholder="Digite sua nova senha"
                    value={newPass.user_passNew ? newPass.user_passNew : ''}
                    handleOnChange={OnChangePass}
                />
                <Input
                    type="password"
                    text="Confirmar senha"
                    nameInput="conf_user_passNew"
                    value={newPass.conf_user_passNew ? newPass.conf_user_passNew : ''}
                    placeholder="Confirme sua nova senha"
                    handleOnChange={OnChangePass}
                />

                <div className={styles.btnContainer}>
                    <ButtonForm text={txtBtn}/>
                </div>
                
            </form>
        </div>
    )
}

export default FormAccount