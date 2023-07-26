import {useState, useEffect} from 'react'

import ButtonForm from '../form/buttonForm'
import Input from '../form/input'
import Select from '../form/select'

function FormPerson({handleSubmit, dataUser, txtBtn}){
    const [user, setUser] = useState([])
    const [sexo, setSexo] = useState([])

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

    return (
        <div>
            <h2>Dados Pessoais</h2>
            <form onSubmit={handleSubmit}>
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
                    value={localStorage.getItem("idSexo")}
                    handleOnChange={handleSexo}
                />

                <ButtonForm text={txtBtn}/>
            </form>
        </div>
    )
}

export default FormPerson