import styles from './formStyles/checkbox.module.css'

function Checkbox({text, nameCheckbox, value}) {
    return (
        <div className={styles.checkboxContainer}>
            <input
                type="checkbox"
                name={nameCheckbox}
                id={nameCheckbox}
                value={value}
            />
            <label htmlFor={nameCheckbox}>{text}</label>
        </div>
    )
}

export default Checkbox