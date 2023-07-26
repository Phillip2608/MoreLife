import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

//Import Components
import Container from '../components/layout/container'
import LoginForm from '../components/loginForm/loginForm'
function Login() {
    const [allUsers, setAllUsers] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        fetch("http://localhost:5000/users", {
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setAllUsers(data)
            })
            .catch(err => console.log(err))
    }, [])

    function createSession(user){
        allUsers.map(allUser => {
            if(allUser.user_email === user.email && allUser.user_pass === user.pass){
                setLocalStorage("name", allUser.user_name)
                setLocalStorage("sbName", allUser.user_sbname)
                setLocalStorage("age", allUser.user_age)
                setLocalStorage("email", allUser.user_email)
                setLocalStorage("id", allUser.id)
                setLocalStorage("idSexo", allUser.user_sexo.id)
                
                return navigate(`/dashboard/${allUser.user_name}`)
            }
        })
    }

    function setLocalStorage(key, value){
        return localStorage.setItem(key, value)
    }

    return (
        <Container customClass="center">
            <h1>Login</h1>
            <LoginForm btnText="Entrar" handleSubmit={createSession} />
        </Container>
    )
}

export default Login