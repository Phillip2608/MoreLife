import styles from "./cssForms/forms.module.css";

import { useState } from "react";

import ButtonForm from "../form/buttonForm";
import Input from "../form/input";
import Message from "../layout/message";

function FormAccount({ handleSubmit, txtBtn, dataUser }) {
  const [newPass, setNewPass] = useState({
    nm_senhaAn: "",
    nm_senhaNew: "",
    conf_nm_senhaNew: "",
    nm_newEmail: "",
  });
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const user = dataUser;

  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  const regexPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

  newPass.nm_newEmail = user.nm_email;
  function validateForm() {
    setMessage("");
    if (newPass.nm_newEmail === "") {
      setMessage("O email deve estar preenchido!");
      setType("error");
      return false;
    }
    if (user.nm_senha !== newPass.nm_senhaAn) {
      setMessage("A senha atual deve se coincidir!");
      setType("error");
      return false;
    }
    if (newPass.nm_senhaAn === newPass.nm_senhaNew) {
      setMessage("A nova senha deve ser diferente da atual!");
      setType("error");
      return false;
    }
    if (
      (newPass.nm_senhaNew === "" || newPass.conf_nm_senhaNew === "") &&
      newPass.nm_senhaAn !== ""
    ) {
      setMessage("Para atualizar é necessário preencher os campos");
      setType("error");
      return false;
    }
    if (regexEmail.test(newPass.nm_newEmail) === false) {
      setMessage("O email deve existir!");
      setType("error");
      return false;
    }
    if (regexPass.test(newPass.nm_senhaNew) === false) {
      setMessage(
        "A senha deve possuir no mínimo 8 caracteres, 1 número, uma letra minúscula e uma letra maiúscula!"
      );
      setType("error");
      return false;
    }
    if (newPass.nm_senhaNew !== newPass.conf_nm_senhaNew) {
      setMessage("A nova senha deve se coincidir!");
      setType("error");
      return false;
    }

    user.nm_senha = newPass.nm_senhaNew;
    user.nm_email = newPass.nm_newEmail;
    newPass.nm_senhaAn = "";
    newPass.nm_senhaNew = "";
    newPass.conf_nm_senhaNew = "";
    setMessage("Atualização feita com sucesso!");
    setType("success");
    return handleSubmit(user);
  }

  function OnChangePass(e) {
    setNewPass({ ...newPass, [e.target.name]: e.target.value });
    setMessage("");
  }

  function submit(e) {
    e.preventDefault();
    validateForm();
  }

  return (
    <div className={styles.formContainer}>
      <h1>Dados da Conta</h1>
      <form onSubmit={submit}>
        <div className={styles.names}>
          <Input
            type="email"
            nameInput="nm_newEmail"
            placeholder="Digite um novo email"
            value={newPass.nm_newEmail ? newPass.nm_newEmail : ""}
            handleOnChange={OnChangePass}
          />
          <div className={styles.leftData}>
            <Input
              type="password"
              nameInput="nm_senhaAn"
              placeholder="Digite sua senha atual"
              value={newPass.nm_senhaAn ? newPass.nm_senhaAn : ""}
              handleOnChange={OnChangePass}
            />
          </div>
        </div>

        <div className={styles.ageSexo}>
          <div className={styles.cont30}>
            <Input
              type="password"
              nameInput="nm_senhaNew"
              placeholder="Digite sua nova senha"
              value={newPass.nm_senhaNew ? newPass.nm_senhaNew : ""}
              handleOnChange={OnChangePass}
            />
          </div>
          <div className={styles.cont30}>
            <div className={styles.leftData}>
              <Input
                type="password"
                nameInput="conf_nm_senhaNew"
                value={newPass.conf_nm_senhaNew ? newPass.conf_nm_senhaNew : ""}
                placeholder="Confirme sua nova senha"
                handleOnChange={OnChangePass}
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
    </div>
  );
}

export default FormAccount;
