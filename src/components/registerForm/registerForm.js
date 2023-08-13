import styles from "./cssRegister/registerForm.module.css";

//imports react
import { useEffect, useState } from "react";

//imports react-routers-dom
import { Link } from "react-router-dom";

import { getData } from "../../services/FirebaseConfig";

//Importando components
import Input from "../form/input";
import Select from "../form/select";
import ButtonForm from "../form/buttonForm";
import Message from "../layout/message";

function RegisterForm({ handleSubmit, btnText, userData }) {
  const [sexo, setSexo] = useState([]);
  const [user, setUser] = useState(userData || []);
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  let email = "";

  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  const regexPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

  useEffect(() => {
    getData("tb_sexo", (snapshot) => {
        setSexo([])
        const data = snapshot.val()
        if(data !== null){
            Object.values(data).map(sexo => {
                return setSexo(sexos => [...sexos, sexo])
            })
        }
    })
    getData("tb_user", (snapshot) => {
        setAllUsers([])
        const data = snapshot.val()
        if(data !== null){
            Object.values(data).map(user => {
                return setAllUsers(allUser => [...allUser, user])
            })
        }
    })
  }, []);

  function validateForm(user) {
    if (user.length === 0) {
      setMessage("É necessário preencher todos os campos!");
      return false;
    }
    if (
      user.nm_user === "" ||
      user.nm_sbuser === "" ||
      user.nb_ageuser === "" ||
      user.nm_email === "" ||
      user.nm_senha === "" ||
      user.user_confPass === ""
    ) {
      setMessage("É necessário preencher todos os campos!");
      return false;
    }
    if (parseInt(user.nb_ageuser) < 5) {
      setMessage("A idade mínima é de 5 anos!");
      return false;
    }
    if (regexEmail.test(user.nm_email) === false) {
      setMessage("O email deve existir!");
      return false;
    }
    if (regexPass.test(user.nm_senha) === false) {
      setMessage(
        "A senha deve possuir no mínimo 8 caracteres, 1 número, uma letra minúscula e uma letra maiúscula!"
      );
      return false;
    }
    if (user.nm_senha !== user.user_confPass) {
      setMessage("As senhas devem se coincidir!");
      return false;
    }
    if (
      user.user_sexo === undefined ||
      user.user_sexo.id === "Selecione uma opção"
    ) {
      setMessage("É necessário selecionar uma das opções!");
      return false;
    }

    allUsers.map((allUser) => {
      if (allUser.nm_email === user.nm_email) {
        email = allUser.nm_email;
      }
    });
    if (email === user.nm_email) {
      setMessage("Já possuímos uma conta com este email!");
      return false;
    }

    setMessage("");
    return handleSubmit(user);
  }

  const submit = (e) => {
    e.preventDefault();
    validateForm(user);
  };

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.value === "") {
      setMessage("É necessário preencher todos os campos!");
      return false;
    }
  }

  function handleSexo(e) {
    setUser({
      ...user,
      user_sexo: {
        vl_sexo: e.target.value,
        nm_sexo: e.target.options[e.target.selectedIndex].text,
      },
    });
  }
  return (
    <div className={styles.registerContainer}>
      {message !== "" && <Message msg={message} type="error" />}
      <form onSubmit={submit}>
        <div className={styles.formDiv}>
          <Input
            text="Nome"
            type="text"
            nameInput="nm_user"
            placeholder="Digite seu primeiro nome"
            handleOnChange={handleChange}
            customClass={user.nm_user === "" && "error"}
            value={user.nm_user ? user.nm_user : ""}
          />
          <Input
            text="Sobrenome"
            type="text"
            nameInput="nm_sbuser"
            placeholder="Digite seu sobrenome"
            handleOnChange={handleChange}
            customClass={user.nm_sbuser === "" && "error"}
            value={user.nm_sbuser ? user.nm_sbuser : ""}
          />
          <Input
            text="Idade"
            type="number"
            nameInput="nb_ageuser"
            placeholder="Digite sua idade"
            handleOnChange={handleChange}
            customClass={
              (user.nb_ageuser === "" && "error") ||
              (parseInt(user.nb_ageuser) < 5 && "error")
            }
            value={user.nb_ageuser ? user.nb_ageuser : ""}
          />
          <Select
            nameSelect="user_sexo"
            options={sexo}
            text="Sexo"
            handleOnChange={handleSexo}
            value={user.user_sexo ? user.user_sexo.vl_sexo : ""}
          />
        </div>
        <div className={styles.formDiv}>
          <Input
            text="Email"
            type="email"
            nameInput="nm_email"
            placeholder="Digite seu email"
            handleOnChange={handleChange}
            customClass={user.nm_email === "" && "error"}
            value={user.nm_email ? user.nm_email : ""}
          />
          <Input
            text="Senha"
            type="password"
            nameInput="nm_senha"
            placeholder="Digite sua senha"
            handleOnChange={handleChange}
            customClass={user.nm_senha === "" && "error"}
            value={user.nm_senha ? user.nm_senha : ""}
          />
          <Input
            text="Confirmar senha"
            type="password"
            nameInput="user_confPass"
            placeholder="Confirme sua senha"
            handleOnChange={handleChange}
            customClass={user.user_confPass === "" && "error"}
            value={user.user_confPass ? user.user_confPass : ""}
          />
          <div className={styles.btnContainer}>
            <ButtonForm text={btnText} />
          </div>
        </div>
      </form>
      <div className={styles.linkContainer}>
        <Link to="/login">
          Já possui um cadastro?
          <br />
          Logar!
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
