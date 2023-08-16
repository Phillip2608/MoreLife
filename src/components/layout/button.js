import styles from "./cssLayout/button.module.css";

function Button(props) {
  return (
    <>
      <button
        onClick={props.handleClick}
        className={`${styles.button} ${styles[props.customClass]}`}
      >
        {props.text}
      </button>
    </>
  );
}

export default Button;
