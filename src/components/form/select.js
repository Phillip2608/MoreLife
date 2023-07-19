import styles from './formStyles/select.module.css'

function Select({nameSelect, text, options, value, handleOnChange}){
    return(
        <div className={styles.selectContainer}>
            <label htmlFor={nameSelect}>{text}</label>
            <select name={nameSelect} id={nameSelect} onChange={handleOnChange} value={value || ''}>
                <option> Selecione uma opção </option>
                {
                    options.map((option) =>(
                        <option value={option.id} key={option.id}>
                            {option.name}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default Select