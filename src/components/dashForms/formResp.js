import styles from './cssForms/forms.module.css'

import {useState} from 'react'

import ButtonForm from '../form/buttonForm'
import Input from '../form/input'
import Message from '../layout/message'

function FormResp({handleSubmit, txtBtn, dataUser}){
    const [respon, setRespon] = useState({
        'name': '',
        'age': '',
        'email': '',
        'cell': ''
    })
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    const user = dataUser

    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    function OnChange(e) {
        setRespon({...respon,[e.target.name]:e.target.value})
        setMessage('')
    }

    function validateForm() {
        if(respon.name === '' || respon.age === '' || respon.email === '' || respon.cell === ''){
            setMessage('É necessário preencher todos os campos!')
            setType('error')
            return false
        }
        if(respon.name.length < 3){
            setMessage('O nome deve ter no mínimo 3 caracteres')
            setType('error')
            return false
        }
        if(parseInt(respon.age) < 18){
            setMessage('O responsável deve ter no mínimo 18 anos!')
            setType('error')
            return false
        }
        if(respon.email === user.user_email){
            setMessage('O email do responsável deve ser diferente do usuário!')
            setType('error')
            return false
        }
        if (regexEmail.test(respon.email) === false) {
            setMessage('O email deve existir!')
            setType('error')
            return false
        }
        if(respon.cell.length < 11 || parseInt(respon.cell) < 0 || respon.cell.length > 11){
            setMessage('O número de telefone deve existir!')
            setType('error')
            return false
        }

        setMessage('Responsável adicionado com sucesso!')
        setType('success')
        respon.id_user = user.id
        return handleSubmit(respon)
    }

    function submit(e) {
        e.preventDefault()
        validateForm()
    }
    return (
        <div className={styles.formContainer}>
            <h2>Dados do Responsável</h2>
            {message && <Message msg={message} type={type} />}
            <form onSubmit={submit}>
                <Input
                    type="text"
                    text="Nome do responsável"
                    nameInput="name"
                    placeholder="Digite o nome completo"
                    value={respon.name ? respon.name : ''}
                    handleOnChange={OnChange}
                />
                <Input
                    type="number"
                    text="Idade do responsável"
                    nameInput="age"
                    placeholder="Digite a idade do responsável"
                    value={respon.age ? respon.age : ''}
                    handleOnChange={OnChange}
                />
                <Input
                    type="email"
                    text="Email do responsável"
                    nameInput="email"
                    placeholder="Digite o email do responsável"
                    value={respon.email ? respon.email : ''}
                    handleOnChange={OnChange}
                />
                <Input
                    type="number"
                    text="Número do responsável"
                    nameInput="cell"
                    value={respon.cell ? respon.cell : ''}
                    placeholder="(xx)xxxxx-xxxx"
                    handleOnChange={OnChange}
                />

                <div className={styles.btnContainer}>
                    <ButtonForm text={txtBtn}/>
                </div>
            </form>
        </div>
    )
}

export default FormResp