import styles from './cssLayout/greet.module.css'

function Greet(){
    const date = Date()
    const hour = parseInt(date.substr(15,3))
    const user = localStorage.getItem("name") 
    let message = ""

    if(hour >= 6 && hour < 12){
        message = `Olá ${user}, bom dia!`
    }else if(hour >= 12 && hour < 18){
        message = `Olá ${user}, boa tarde!`
    }else{
        message = `Olá ${user}, boa noite!`
    }
    
    return (
        <div className={styles.greetContainer}>
            <h2>{message}</h2>
        </div>
        
    )
}

export default Greet