import styles from './cssRoutes/info.module.css'
import {useState, useEffect} from 'react'

import {useNavigate} from 'react-router-dom'

import FormPerson from '../components/dashForms/formPerson'
import FormAccount from '../components/dashForms/formAccount'

function Info(){
    const [user, setUser] = useState([])
    const id = localStorage.getItem("id")
    const navigate = useNavigate()

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

    function updatePerson(user) {
        fetch(`http://localhost:5000/users/${id}`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(data => {
            setUser(data)
            localStorage.setItem("name", user.user_name)
            localStorage.setItem("sbName", user.user_sbname)
            localStorage.setItem("age", user.user_age)
            navigate(`/dashboard/${user.user_name}/info`)
            
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.infoContainer}>
            <FormPerson 
                txtBtn="Atualizar"
                handleSubmit={updatePerson}
            />
            <FormAccount 
                txtBtn="Atualizar"
            />
        </div>
    )
}

export default Info