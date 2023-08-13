import styles from "./cssLogin/loginForm.module.css";

//Import react-doms
import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

//Import Components
import Input from "../form/input";
import ButtonForm from "../form/buttonForm";
import Message from "../layout/message";

import { Link } from "react-router-dom";

import { getData } from "../../services/FirebaseConfig";

function LoginForm({ handleSubmit, btnText, userData }) {
  const [user, setUser] = useState(userData || []);
  const [allUsers, setAllUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const location = useLocation();
  let msg = "";
  let email = "";
  let pass = "";

  useEffect(() => {
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

  function validationForm(user) {
    allUsers.map((allUser) => {
      if (allUser.nm_email === user.nm_email) {
        if (allUser.nm_senha === user.nm_senha) {
          email = allUser.nm_email;
          pass = allUser.nm_senha;
        }
      }
    });
    if (user.length === 0) {
      setMessage("Email ou senha inválidos!");
      setType("error");
      return false;
    }
    if (email !== user.nm_email || user.nm_email === "") {
      setMessage("Email ou senha inválidos!");
      setType("error");
      return false;
    }
    if (pass !== user.nm_senha || user.nm_senha === "") {
      setMessage("Email ou senha inválidos!");
      setType("error");
      return false;
    }

    msg = "";
    console.log("Sucesso!");
    return handleSubmit(user);
  }

  const submit = (e) => {
    e.preventDefault();
    validationForm(user);
  };

  function handleChange(e) {
    setMessage("");
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.value === "") {
      setMessage("Email ou senha inválidos!");
      setType("error");
      return false;
    }
  }

  if (location.state) {
    msg = location.state;
  }

  return (
    <div className={styles.formContainer}>
      {message !== "" && <Message msg={message} type={type} />}
      {msg !== "" && <Message msg={msg} type={type} />}
      <form onSubmit={submit}>
        <Input
          type="text"
          text="Email"
          nameInput="nm_email"
          placeholder="Digite seu email"
          handleOnChange={handleChange}
          customClass={user.nm_email === "" && "error"}
          value={user.nm_email ? user.nm_email : ""}
        />
        <Input
          type="password"
          text="Senha"
          nameInput="nm_senha"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
          customClass={user.nm_senha === "" && "error"}
          value={user.nm_senha ? user.nm_senha : ""}
        />

        <div className={styles.btnContainer}>
          <ButtonForm text={btnText} />
        </div>
      </form>
      <div className={styles.linkContainer}>
        <Link to="/register">
          {" "}
          Não possui um cadastro?
          <br />
          Registre-se!{" "}
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;