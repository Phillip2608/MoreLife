import styles from "../cssRoutes/info.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormPerson from "../../components/dashForms/formPerson";
import FormAccount from "../../components/dashForms/formAccount";
import FormResp from "../../components/dashForms/formResp";
import CardRespon from "../../components/dashboard/cardRespon";

import { getData, updateData, setData } from "../../services/FirebaseConfig";

function Info() {
  const [user, setUser] = useState({});
  const [allRespon, setAllRespon] = useState([]);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    getData(`tb_user/${id}`, (snapshot) => {
      setUser({});
      const data = snapshot.val();
      if (data !== null) {
        setUser(data);
      }
    });
    getData(`tb_responsavel`, (snapshot) => {
      setAllRespon([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((respon) => {
          return setAllRespon((respons) => [...respons, respon]);
        });
      }
    });
  }, []);

  console.log(user);

  function updatePerson(user) {
    updateData("tb_user", user.id, user);
  }

  function updateAccount(user) {
    updateData("tb_user", user.id, user);
  }

  function addRespon(respon) {
    setData(`tb_responsavel/${respon.id}`, respon);
  }

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
                name={respon.nm_resp}
                cell={respon.nb_cell}
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
