import styles from './cssRoutes/info.module.css'

import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import FormPerson from '../components/dashForms/formPerson'
import FormAccount from '../components/dashForms/formAccount'
import FormResp from '../components/dashForms/formResp'
import CardRespon from '../components/dashboard/cardRespon'

function Info(){
    const [user, setUser] = useState({})
    const [allRespon, setAllRespon] = useState([])
    const id = parseInt(localStorage.getItem("id"))
    const navigate = useNavigate()

    useEffect(() =>{
        fetch(`http://localhost:5000/users/${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setUser(data)
        })
        .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        fetch("http://localhost:5000/responsaveis",{
            method:'GET',
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setAllRespon(data)
        })
        .catch(err => console.log(err))
    }, [id])

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
            localStorage.setItem("name", user.user_name)
            localStorage.setItem("sbName", user.user_sbname)
            localStorage.setItem("age", user.user_age)
            navigate(`/dashboard/${user.user_name}/info`)
            
        })
        .catch(err => console.log(err))
    }

    function updateAccount(user) {
        fetch(`http://localhost:5000/users/${id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    function addRespon(respon) {
        fetch("http://localhost:5000/responsaveis",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(respon)
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.infoContainer}>
            <div className={styles.forms}>
                <FormPerson 
                    txtBtn="Atualizar"
                    handleSubmit={updatePerson}
                    dataUser={user}
                />
                <FormAccount 
                    txtBtn="Atualizar"
                    handleSubmit={updateAccount}
                    dataUser={user}
                />
                <FormResp
                    txtBtn="Adicionar"
                    handleSubmit={addRespon}
                    dataUser={user}
                />
            </div>
            <div className={styles.titleContainer}>
                <h2>Responsáveis</h2>
            </div>
            <div className={styles.responContainer}>
                {allRespon.map(respon =>{
                    if(respon.id_user === id){
                        return(
                            <CardRespon
                                name={respon.name}
                                cell={respon.cell}
                                key={respon.id}
                            />
                        )
                    }
                })}
            </div>
            
        </div>
    )
}

export default Info