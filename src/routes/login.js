import styles from "./cssRoutes/login.module.css";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { uid } from "uid";

import { getData } from "../services/FirebaseConfig";
import { setData } from "../services/FirebaseConfig";

//Import Components
import Container from "../components/layout/container";
import LoginForm from "../components/loginForm/loginForm";
import Button from "../components/layout/button";
import RegisterForm from "../components/registerForm/registerForm";

function Login() {
  const [allUsers, setAllUsers] = useState([]);
  const [visible, setVisible] = useState(false);
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

  function createUser(user) {
    const uuid = uid();
    user.id = uuid;
    setData(`tb_user/${uuid}`, user);
    setLocalStorage("name", user.nm_user);
    setLocalStorage("sbName", user.nm_sbuser);
    setLocalStorage("id", user.id);
    navigate("/", { state: "Cadastro efeituado com sucesso!" });
  }

  function setLocalStorage(key, value) {
    return localStorage.setItem(key, value);
  }

  function isVisible() {
    setVisible(true);
  }

  return (
    <Container customClass="start">
      <div className={styles.pos}>
        <div className={styles.content}>
          <div className={styles.contentFrase}>
            <Link to="/" className={styles.linkHome}>
              MoreLife
            </Link>
            <p>
              O MoreLife ajuda você a melhorar sua saúde enquanto escutamos cada
              batimento do seu coração.
            </p>
          </div>
          <div className={styles.formcad}>
            <LoginForm btnText="Entrar" handleSubmit={createSession} />
            <hr />
            <div className={styles.contentBtn}>
              <Button
                text="Criar uma conta"
                customClass="register"
                handleClick={isVisible}
              />
            </div>
          </div>
        </div>
        {visible && <div className={styles.registerSmooth}></div>}
        {visible && (
          <div className={styles.contentRegister}>
            <RegisterForm handleSubmit={createUser} btnText="Cadastre-se" />
          </div>
        )}
      </div>
    </Container>
  );
}

export default Login;
