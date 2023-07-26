import styles from './cssRoutes/info.module.css'

import { useEffect, useState } from 'react';

import FormPerson from '../components/dashForms/formPerson'
import FormAccount from '../components/dashForms/formAccount'

function Info(){
    const [user, setUser] = useState([])

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

    return (
        <div className={styles.infoContainer}>
            <FormPerson 
                txtBtn="Atualizar"
                dataUser={user}
            />
            <FormAccount 
                txtBtn="Atualizar"
            />
        </div>
    )
}

export default Info