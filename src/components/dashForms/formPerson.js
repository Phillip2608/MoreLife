import {useState, useEffect} from 'react'

import ButtonForm from '../form/buttonForm'
import Input from '../form/input'
import Select from '../form/select'

function FormPerson({handleSubmit, dataUser, txtBtn}){
    const [user, setUser] = useState([])
    const [sexo, setSexo] = useState([])
    const [message, setMessage] = useState("")
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

    function validateForm(user) {
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
        return handleSubmit(user)
    }
    

    function OnChange(e){
        setUser({ ...user, [e.target.name]: e.target.value })
        if (e.target.value === '') {
            return false
        }
        console.log(user)
    }

    function handleSexo(e) {
        setUser({
            ...user, user_sexo: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        })
    }

    function submit(e) {
        e.preventDefault()
        validateForm(user)
    }

    return (
        <div>
            <h2>Dados Pessoais</h2>
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

                <ButtonForm text={txtBtn}/>
            </form>
        </div>
    )
}

export default FormPerson