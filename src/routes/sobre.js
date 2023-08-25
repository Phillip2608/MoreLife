import Container from "../components/layout/container";
import styles from "./cssRoutes/sobre.module.css";

import MoreLife1 from "../img/More_Life_1.png";

function Sobre() {
  return (
    <Container>
      <div className={styles.sobreContainer}>
        <h1>SOBRE NÓS</h1>
        <div className={styles.contentLado}>
          <img
            src={MoreLife1}
            alt="Imagem do projeto"
            className={styles.imgMoreLife}
          />
          <p className={styles.textLado}>
            O MoreLife foi criado com o objetivo de ajudar as pessoas a se
            cuidarem enquanto jogam.
            <br />
            Com uma pulseira conectada ao pulso do usuário, o MoreLife detecta seus batimentos cardíacos através de sua pulsação, tendo total monitoramento de sua saúde cardíaca, podendo evitar problemas futuros que prejudiquem sua saúde.
            <br/>
            O MoreLife não só se preocupa com sua saúde cardíaca, mas também tem funcionalidades extras que auxiliam em seu bem-estar, sendo uma delas os cronômetros que podem gerenciar seu tempo enquanto joga, ou até mesmo criar timers para se hidratar ou se levantar da cadeira de vez em quando.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Sobre;
