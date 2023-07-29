import styles from "./cssDashboard/cardRespon.module.css";

function CardRespon({name, cell}){
    return(
        <div className={styles.cardRespon}>
            <h2>{name}</h2>
            <p>
                Entre em contato com seu responsável: <span>{cell}</span>
            </p>
        </div>
    )
}

export default CardRespon