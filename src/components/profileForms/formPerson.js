import styles from "./cssForms/forms.module.css";

import { useState, useEffect } from "react";

import ButtonForm from "../form/buttonForm";
import Input from "../form/input";
import Select from "../form/select";
import Message from "../layout/message";

import { getData } from "../../services/FirebaseConfig";

function FormPerson({ handleSubmit, txtBtn, dataUser }) {
  const [user, setUser] = useState({});
  const [sexo, setSexo] = useState([]);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setUser(dataUser);
    getData("tb_sexo", (snapshot) => {
      setSexo([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((sexo) => {
          return setSexo((sexos) => [...sexos, sexo]);
        });
      }
    });
  }, [dataUser]);

  function validateForm(user) {
    setMessage("");
    if (
      user.nm_user === "" ||
      user.nm_sbuser === "" ||
      user.nb_ageuser === ""
    ) {
      setMessage("É necessário preencher todos os campos!");
      setType("error");
      return false;
    }
    if (parseInt(user.nb_ageuser) < 5) {
      setMessage("A idade mínima é de 5 anos!");
      setType("error");
      return false;
    }

    if (
      user.user_sexo === undefined ||
      user.user_sexo.vl_sexo === "Selecione uma opção"
    ) {
      setMessage("É necessário selecionar uma das opções!");
      setType("error");
      return false;
    }

    setMessage("Atualização feita com sucesso!");
    setType("success");
    return handleSubmit(user);
  }

  function OnChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
    setMessage("");
    if (e.target.value === "") {
      setMessage("É necessário preencher todos os campos!");
      setType("error");
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
    setMessage("");
  }

  function submit(e) {
    e.preventDefault();
    validateForm(user);
  }

  return (
    <div className={styles.formContainer}>
      <h1>Dados Pessoais</h1>
      <form onSubmit={submit}>
        <div className={styles.names}>
          <Input
            type="text"
            nameInput="nm_user"
            placeholder="Digite seu nome"
            value={user.nm_user ? user.nm_user : ""}
            handleOnChange={OnChange}
          />
          <div className={styles.leftData}>
            <Input
              type="text"
              nameInput="nm_sbuser"
              placeholder="Digite seu sobrenome"
              value={user.nm_sbuser ? user.nm_sbuser : ""}
              handleOnChange={OnChange}
            />
          </div>
        </div>
        <div className={styles.ageSexo}>
          <div className={styles.cont30}>
            <Input
              type="number"
              nameInput="nb_ageuser"
              placeholder="Digite sua idade"
              value={user.nb_ageuser ? user.nb_ageuser : ""}
              handleOnChange={OnChange}
            />
          </div>
          <div className={styles.cont30}>
            <div className={styles.leftData}>
              <Select
                nameSelect="user_sexo"
                options={sexo}
                value={user?.user_sexo?.vl_sexo}
                handleOnChange={handleSexo}
              />
            </div>
          </div>

          <div className={styles.cont30}>
            <div className={styles.leftBtn}>
              <ButtonForm text={txtBtn} />
            </div>
          </div>
        </div>
      </form>
      {message !== "" && <Message type={type} msg={message} />}
    </div>
  );
}

export default FormPerson;
