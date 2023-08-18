import styles from "./cssLayout/listItem.module.css";

function ListItem(props) {
  return (
    <li className={styles.contentItem} onClick={props.handleClick}>
      <div className={`${styles.item} ${styles[props.customClass]}`}>
        {props.icon}
        <p>{props.text}</p>
      </div>
    </li>
  );
}

export default ListItem;
