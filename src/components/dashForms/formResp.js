import styles from './cssForms/forms.module.css'

import {useState} from 'react'

import ButtonForm from '../form/buttonForm'
import Input from '../form/input'
import Message from '../layout/message'

function FormResp({handleSubmit, txtBtn, dataUser}){
    const [respon, setRespon] = useState({
        'nm_resp': '',
        'nb_ageresp': '',
        'nm_email': '',
        'nb_cell': ''
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
        if(respon.nm_resp === '' || respon.nb_ageresp === '' || respon.nm_email === '' || respon.nb_cell === ''){
            setMessage('É necessário preencher todos os campos!')
            setType('error')
            return false
        }
        if(respon.nm_resp.length < 3){
            setMessage('O nome deve ter no mínimo 3 caracteres')
            setType('error')
            return false
        }
        if(parseInt(respon.nb_ageresp) < 18){
            setMessage('O responsável deve ter no mínimo 18 anos!')
            setType('error')
            return false
        }
        if(respon.nm_email === user.user_email){
            setMessage('O email do responsável deve ser diferente do usuário!')
            setType('error')
            return false
        }
        if (regexEmail.test(respon.nm_email) === false) {
            setMessage('O email deve existir!')
            setType('error')
            return false
        }
        if(respon.nb_cell.length < 11 || parseInt(respon.nb_cell) < 0 || respon.nb_cell.length > 11){
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
                    nameInput="nm_resp"
                    placeholder="Digite o nome completo"
                    value={respon.nm_resp ? respon.nm_resp : ''}
                    handleOnChange={OnChange}
                />
                <Input
                    type="number"
                    text="Idade do responsável"
                    nameInput="nb_ageresp"
                    placeholder="Digite a idade do responsável"
                    value={respon.nb_ageresp ? respon.nb_ageresp : ''}
                    handleOnChange={OnChange}
                />
                <Input
                    type="email"
                    text="Email do responsável"
                    nameInput="nm_email"
                    placeholder="Digite o email do responsável"
                    value={respon.nm_email ? respon.nm_email : ''}
                    handleOnChange={OnChange}
                />
                <Input
                    type="number"
                    text="Número do responsável"
                    nameInput="nb_cell"
                    value={respon.nb_cell ? respon.nb_cell : ''}
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