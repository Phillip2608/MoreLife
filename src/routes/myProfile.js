import styles from "./cssRoutes/myprofile.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getFromID,
  updateData,
  setData,
  getData,
} from "../services/FirebaseConfig";

import { FaUser } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";
import ListItem from "../components/layout/listItem";
import FormPerson from "../components/dashForms/formPerson";
import FormAccount from "../components/dashForms/formAccount";
import FormResp from "../components/dashForms/formResp";
import CardRespon from "../components/dashboard/cardRespon";

function MyProfile() {
  const [user, setUser] = useState({});
  const [allRespon, setAllRespon] = useState([]);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const slideIndex = 1;

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName(styles.contentUser);
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[n - 1].style.display = "block";
  }

  function close() {
    localStorage.clear();
    navigate("/");
    return window.location.reload();
  }

  useEffect(() => {
    getFromID("tb_user", id, (snapshot) => {
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
          if (respon.id_user === id) {
            return setAllRespon((respons) => [...respons, respon]);
          }
        });
      }
    });

    showSlides(slideIndex);
  }, [id]);

  function update(user) {
    updateData("tb_user", user.id, user);
  }

  function addRespon(respon) {
    setData(`tb_responsavel/${respon.id}`, respon);
  }

  return (
    <div className={styles.contentProfile}>
      <ul className={styles.menuSide}>
        <ListItem
          text="Meu Perfil"
          icon={<FaUser />}
          handleClick={() => showSlides(1)}
        />
        <ListItem
          text="Editar dados"
          icon={<FaUserEdit />}
          handleClick={() => showSlides(2)}
        />
        <ListItem
          text="Adicionar Responsável"
          icon={<FaUserPlus />}
          handleClick={() => showSlides(3)}
        />
        <ListItem
          text="Configurações"
          icon={<FaUserCog />}
          handleClick={() => showSlides(4)}
        />
        <ListItem
          text="Sair"
          icon={<FaDoorOpen />}
          customClass="close"
          handleClick={close}
        />
      </ul>
      <div className={styles.content}>
        <div className={`${styles.contentUser} ${styles.fade}`}>
          <div className={styles.person}>
            <span>.</span>
            <div className={styles.name}>
              <h1>
                {user.nm_user} {user.nm_sbuser}, {user.nb_ageuser}
              </h1>
              <h3>{user.nm_email}</h3>
              <h4>{user?.user_sexo?.nm_sexo}</h4>
            </div>
          </div>
          <hr />
          {allRespon.length === 0 ? (
            <div className={styles.respNone}>
              {" "}
              <p>nenhum responsável cadastrado</p>
            </div>
          ) : (
            <div>
              <h1 className={styles.titleResp}>Responsáveis</h1>
              <div className={styles.respOk}>
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
          )}
        </div>
        <div className={`${styles.contentUser} ${styles.fade}`}>
          <FormPerson
            txtBtn="Atualizar"
            handleSubmit={update}
            dataUser={user}
          />
          <hr />
          <FormAccount
            txtBtn="Atualizar"
            handleSubmit={update}
            dataUser={user}
          />
        </div>
        <div className={`${styles.contentUser} ${styles.fade}`}>
          <FormResp
            txtBtn="Adicionar"
            handleSubmit={addRespon}
            dataUser={user}
            allRespon={allRespon}
          />
          <hr />
          {allRespon.length === 0 ? (
            <div className={styles.respNone}>
              {" "}
              <p>nenhum responsável cadastrado</p>
            </div>
          ) : (
            <div>
              <h1>Responsáveis</h1>
              <div className={styles.respOk}>
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
          )}
        </div>
        <div className={`${styles.contentUser} ${styles.fade}`}>config</div>
      </div>
    </div>
  );
}

export default MyProfile;
