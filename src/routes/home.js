import styles from "./cssRoutes/home.module.css";

//Import components
import Container from "../components/layout/container";
import LinkButton from "../components/layout/linkButton";

function Home() {
  return (
    <Container>
      <div className={styles.home}>
        <div className={styles.img}></div>
        <div className={styles.smooth}></div>
        <div className={styles.content}>
          <div>
            <h1>
              Comece a mudar sua vida<br />
              enquanto joga
            </h1>
            <div className={styles.contentBtn}>
              <LinkButton to="/download" text="vamos começar" type="login"/>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;
