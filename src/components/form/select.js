import styles from './formStyles/select.module.css'

function Select({nameSelect, text, options, value, handleOnChange}){
    return(
        <div className={styles.selectContainer}>
            <label htmlFor={nameSelect}>{text}</label>
            <select name={nameSelect} id={nameSelect} onChange={handleOnChange} value={value || ''}>
                <option> Selecione uma opção </option>
                {
                    options.map((option) =>(
                        <option value={option.vl_sexo} key={option.vl_sexo}>
                            {option.nm_sexo}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default Select