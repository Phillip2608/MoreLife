import styles from './cssRoutes/info.module.css'

import { useEffect, useState } from 'react';

import UpdateForm from '../components/dashboard/updateForm'
import Input from '../components/form/input'

import FormPerson from '../components/dashForms/formPerson'

function Info(){
    const [user, setUser] = useState([])
    const [sexo, setSexo] = useState([])
    const [newPass, setNewPass] = useState([])
    const [message, setMessage] = useState("")

    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const regexPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

    const id = localStorage.getItem("id")

    useEffect(() =>{
        fetch(`http://localhost:5000/users/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setUser(data)
            })
            .catch(err => console.log(err))
    },[id])

    function OnChangePass(e) {
        setNewPass({...newPass,[e.target.name]:e.target.value})
    }

    function validatePerson(user) {
        if (user.length === 0) {
            setMessage('É necessário preencher todos os campos!')
            return false
        }
        if (user.user_name === '' || 
            user.user_sbname === '' || 
            user.user_age === ''
        ) {
            setMessage('É necessário preencher todos os campos!')
            return false
        }
        if (parseInt(user.user_age) < 5) {
            setMessage('A idade mínima é de 5 anos!')
            return false
        }
        if (user.user_sexo === undefined || user.user_sexo.id === 'Selecione uma opção') {
            setMessage('É necessário selecionar uma das opções!')
            return false
        }

        setMessage('')
        return fetchPerson()
    }

    function fetchPerson() {
        fetch(`http://localhost:5000/users/${id}`,{
            method:"PATCH",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(data => {
            setUser(data)
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    function submitPerson(e) {
        e.preventDefault()
        validatePerson(user)
    }

    return (
        <div className={styles.infoContainer}>
            <FormPerson 
                txtBtn="Atualizar"
            />
            <UpdateForm formName="Dados da conta" txtBtn="Atualizar">
                <Input
                    type="password"
                    text="Antiga senha"
                    nameInput="user_passAn"
                    placeholder="Digite sua senha atual"
                    handleOnChange={OnChangePass}
                />
                <Input
                    type="password"
                    text="Nova senha"
                    nameInput="user_passNew"
                    placeholder="Digite sua nova senha"
                    handleOnChange={OnChangePass}
                />
                <Input
                    type="password"
                    text="Confirmar senha"
                    nameInput="conf_user_passNew"
                    placeholder="Confirme sua nova senha"
                    handleOnChange={OnChangePass}
                />
            </UpdateForm>
            <UpdateForm formName="Dados do responsável" txtBtn="Atualizar">

            </UpdateForm>
        </div>
    )
}

export default Info