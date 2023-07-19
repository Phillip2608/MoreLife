import styles from './formStyles/input.module.css'

function Input({ type, text, nameInput, placeholder, handleOnChange, value, customClass}) {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={nameInput}>{text}</label>
            <input
                className={`${styles.inputForm} ${styles[customClass]}`}
                type={type}
                name={nameInput}
                id={nameInput}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )
}

export default Input