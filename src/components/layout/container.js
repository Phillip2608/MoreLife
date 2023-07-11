import styles from './cssLayout/container.module.css'

function Container(props){
    return <section className={`${styles.container} ${styles[props.customClass]}`}>{props.children}</section>
    
}

export default Container