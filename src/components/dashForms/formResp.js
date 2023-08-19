import styles from "./cssForms/forms.module.css";

import { useState } from "react";

import ButtonForm from "../form/buttonForm";
import Input from "../form/input";
import Message from "../layout/message";
import { uid } from "uid";

function FormResp({ handleSubmit, txtBtn, dataUser }) {
  const [respon, setRespon] = useState({
    nm_resp: "",
    nb_ageresp: "",
    nm_email: "",
    nb_cell: "",
  });
  const [inputRespon, setInputRespon] = useState({
    nm_resp: "",
    nb_ageresp: "",
    nm_email: "",
    nb_cell: "",
  });
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const user = dataUser;
  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  function OnChange(e) {
    setRespon({ ...respon, [e.target.name]: e.target.value });
    setMessage("");
  }

  function validateForm() {
    if (
      respon.nm_resp === "" ||
      respon.nb_ageresp === "" ||
      respon.nm_email === "" ||
      respon.nb_cell === ""
    ) {
      setMessage("É necessário preencher todos os campos!");
      setType("error");
      return false;
    }
    if (respon.nm_resp.length < 3) {
      setMessage("O nome deve ter no mínimo 3 caracteres");
      setType("error");
      return false;
    }
    if (parseInt(respon.nb_ageresp) < 18) {
      setMessage("O responsável deve ter no mínimo 18 anos!");
      setType("error");
      return false;
    }
    if (respon.nm_email === user.user_email) {
      setMessage("O email do responsável deve ser diferente do usuário!");
      setType("error");
      return false;
    }
    if (regexEmail.test(respon.nm_email) === false) {
      setMessage("O email deve existir!");
      setType("error");
      return false;
    }
    if (
      respon.nb_cell.length < 11 ||
      parseInt(respon.nb_cell) < 0 ||
      respon.nb_cell.length > 11
    ) {
      setMessage("O número de telefone deve existir!");
      setType("error");
      return false;
    }

    setMessage("Responsável adicionado com sucesso!");
    setType("success");
    const uuid = uid();
    inputRespon.nm_resp = respon.nm_resp
    inputRespon.nm_email = respon.nm_email
    inputRespon.nb_ageresp = respon.nb_ageresp
    inputRespon.nb_cell = respon.nb_cell
    inputRespon.id = uuid
    inputRespon.id_user = user.id

    respon.nm_resp = ""
    respon.nm_email = ""
    respon.nb_ageresp = ""
    respon.nb_cell = ""
    return handleSubmit(inputRespon);
  }

  function submit(e) {
    e.preventDefault();
    validateForm();
  }
  return (
    <div className={styles.formContainer}>
      <h1>Dados do Responsável</h1>
      <form onSubmit={submit}>
        <div className={styles.names}>
          <Input
            type="text"
            nameInput="nm_resp"
            placeholder="Digite o nome completo do responsável"
            value={respon.nm_resp ? respon.nm_resp : ""}
            handleOnChange={OnChange}
          />
          <div className={styles.leftData}>
            <Input
              type="number"
              nameInput="nb_ageresp"
              placeholder="Digite a idade do responsável"
              value={respon.nb_ageresp ? respon.nb_ageresp : ""}
              handleOnChange={OnChange}
            />
          </div>
        </div>
        <div className={styles.ageSexo}>
          <div className={styles.cont30}>
            <Input
              type="email"
              nameInput="nm_email"
              placeholder="Digite o email do responsável"
              value={respon.nm_email ? respon.nm_email : ""}
              handleOnChange={OnChange}
            />
          </div>
          <div className={styles.cont30}>
            <div className={styles.leftData}>
              <Input
                type="number"
                nameInput="nb_cell"
                value={respon.nb_cell ? respon.nb_cell : ""}
                placeholder="(xx)xxxxx-xxxx"
                handleOnChange={OnChange}
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

export default FormResp;
