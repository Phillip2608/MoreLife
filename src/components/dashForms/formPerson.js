import styles from './cssForms/forms.module.css'

import {useState, useEffect} from 'react'

import ButtonForm from '../form/buttonForm'
import Input from '../form/input'
import Select from '../form/select'
import Message from '../layout/message'

function FormPerson({handleSubmit, txtBtn, dataUser}){
    const [user, setUser] = useState({})
    const [sexo, setSexo] = useState([])
    const [type, setType] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        setUser(dataUser)
    }, [dataUser])

    function validateForm(user) {
        setMessage('')
        if (user.user_name === '' || 
            user.user_sbname === '' || 
            user.user_age === ''
        ) {
            setMessage('É necessário preencher todos os campos!')
            setType('error')
            return false
        }
        if (parseInt(user.user_age) < 5) {
            setMessage('A idade mínima é de 5 anos!')
            setType('error')
            return false
        }

        if (user.user_sexo === undefined || user.user_sexo.id === 'Selecione uma opção') {
            setMessage('É necessário selecionar uma das opções!')
            setType('error')
            return false
        }

        setMessage('Atualização feita com sucesso!')
        setType('success')
        return handleSubmit(user)
    }
    
    function OnChange(e){
        setUser({ ...user, [e.target.name]: e.target.value })
        setMessage('')
        if (e.target.value === '') {
            setMessage('É necessário preencher todos os campos!')
            setType('error')
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
        setMessage('')
    }

    function submit(e) {
        e.preventDefault()
        validateForm(user)
    }

    return (
        <div className={styles.formContainer}>
            <h2>Dados Pessoais</h2>
            {message && <Message msg={message} type={type} />}
            <form onSubmit={submit}>
                <Input
                    type="text"
                    text="Nome"
                    nameInput="user_name"
                    placeholder="Digite seu nome"
                    value={user.user_name ? user.user_name : ''}
                    handleOnChange={OnChange}
                />
                <Input
                    type="text"
                    text="Sobrenome"
                    nameInput="user_sbname"
                    placeholder="Digite seu sobrenome"
                    value={user.user_sbname ? user.user_sbname : ''}
                    handleOnChange={OnChange}
                />
                <Input
                    type="number"
                    text="Idade"
                    nameInput="user_age"
                    placeholder="Digite sua idade"
                    value={user.user_age ? user.user_age : ''}
                    handleOnChange={OnChange}
                />
                <Select
                    nameSelect="user_sexo"
                    options={sexo}
                    text="Sexo"
                    value={user?.user_sexo?.id}
                    handleOnChange={handleSexo}
                />
                <div className={styles.btnContainer}>
                    <ButtonForm text={txtBtn}/>
                </div>
            </form>
        </div>
    )
}

export default FormPerson