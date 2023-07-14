import styles from './formStyles/input.module.css'

function Input({ type, text, nameInput, placeholder }) {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={nameInput}>{text}</label>
            <input
                type={type}
                name={nameInput}
                id={nameInput}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input