import styles from './formStyles/buttonForm.module.css'

function ButtonForm({text}){
    return (
        <>
            <button className={styles.button}>{text}</button>
        </>
    )
}

export default ButtonForm