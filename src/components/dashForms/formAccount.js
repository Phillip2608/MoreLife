import {useState} from 'react'

import ButtonForm from '../form/buttonForm'
import Input from '../form/input'

function FormAccount({handleSubmit, txtBtn}){
    const [newPass, setNewPass] = useState([])
    
    function OnChangePass(e) {
        setNewPass({...newPass,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <h2>Dados da Conta</h2>
            <form onSubmit={handleSubmit}>
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

                <ButtonForm text={txtBtn}/>
            </form>
        </div>
    )
}

export default FormAccount