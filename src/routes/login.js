import styles from "./cssRoutes/login.module.css";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { getData } from "../services/FirebaseConfig";

//Import Components
import Container from "../components/layout/container";
import LoginForm from "../components/loginForm/loginForm";
import Button from "../components/layout/button";

function Login() {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    getData("tb_user", (snapshot) => {
      setAllUsers([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((user) => {
          return setAllUsers((allUser) => [...allUser, user]);
        });
      }
    });
  }, []);

  function createSession(user) {
    allUsers.map((allUser) => {
      if (
        allUser.nm_email === user.nm_email &&
        allUser.nm_senha === user.nm_senha
      ) {
        setLocalStorage("name", allUser.nm_user);
        setLocalStorage("sbName", allUser.nm_sbuser);
        setLocalStorage("id", allUser.id);

        return navigate("/");
      }
    });
  }

  console.log(allUsers);

  function setLocalStorage(key, value) {
    return localStorage.setItem(key, value);
  }

  return (
    <Container customClass="start">
      <div className={styles.content}>
        <div className={styles.contentFrase}>
          <h1>MoreLife</h1>
          <p>O MoreLife ajuda voce a melhorar sua saude enquanto escutamos cada batimento do seu coracao</p>
        </div>
        <div className={styles.formcad}>
          <LoginForm btnText="Entrar" handleSubmit={createSession} />
          <hr />
          <div className={styles.contentBtn}>
            <Button text="Criar uma conta" customClass="register"/>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;
