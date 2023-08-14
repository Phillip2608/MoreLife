import styles from "./cssRoutes/info.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormPerson from "../components/dashForms/formPerson";
import FormAccount from "../components/dashForms/formAccount";
import FormResp from "../components/dashForms/formResp";
import CardRespon from "../components/dashboard/cardRespon";

import { getData } from "../services/FirebaseConfig";

function Info() {
  const [user, setUser] = useState({});
  const [allRespon, setAllRespon] = useState([]);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    getData(`tb_user/${id}`, (snapshot) => {
      setUser({});
      const data = snapshot.val()
      if(data !== null){
        setUser(data)
      }
    });
  }, []);

  console.log(user)

  function updatePerson(user) {}

  function updateAccount(user) {}

  function addRespon(respon) {}

  return (
    <div className={styles.infoContainer}>
      <div className={styles.forms}>
        <FormPerson
          txtBtn="Atualizar"
          handleSubmit={updatePerson}
          dataUser={user}
        />
        <FormAccount
          txtBtn="Atualizar"
          handleSubmit={updateAccount}
          dataUser={user}
        />
        <FormResp txtBtn="Adicionar" handleSubmit={addRespon} dataUser={user} />
      </div>
      <div className={styles.titleContainer}>
        <h2>Responsáveis</h2>
      </div>
      <div className={styles.responContainer}>
        {allRespon.map((respon) => {
          if (respon.id_user === id) {
            return (
              <CardRespon
                name={respon.name}
                cell={respon.cell}
                key={respon.id}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default Info;
