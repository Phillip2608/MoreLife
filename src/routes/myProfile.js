import styles from "./cssRoutes/myprofile.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getFromID,
  updateData,
} from "../services/FirebaseConfig";

import { FaUser } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";
import ListItem from "../components/layout/listItem";
import FormPerson from "../components/dashForms/formPerson";

function MyProfile() {
  const [user, setUser] = useState({});
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

    showSlides(slideIndex);
  }, []);

  function updatePerson(user) {
    updateData("tb_user", user.id, user);
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
                Luiz{user.nm_user} {user.nm_sbuser}, {user.nb_ageuser}
              </h1>
              <h3>luiz@gmail.com{user.nm_email}</h3>
              <h4>{user?.user_sexo?.nm_sexo}</h4>
            </div>
          </div>
        </div>
        <div className={`${styles.contentUser} ${styles.fade}`}>
          <FormPerson
            txtBtn="Atualizar"
            handleSubmit={updatePerson}
            dataUser={user}
          />
          <hr />
        </div>
        <div className={`${styles.contentUser} ${styles.fade}`}>add</div>
        <div className={`${styles.contentUser} ${styles.fade}`}>config</div>
      </div>
    </div>
  );
}

export default MyProfile;
