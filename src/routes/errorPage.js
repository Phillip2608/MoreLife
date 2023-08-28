import styles from "./cssRoutes/errorPage.module.css";

function ErrorPage() {
  return (
    <div className={styles.container}>
      <h1>
        Ocorreu um problema inesperado, atualize a pagina ou volte mais tarde!
      </h1>
    </div>
  );
}

export default ErrorPage;
