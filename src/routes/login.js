import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { getData } from "../services/FirebaseConfig";

//Import Components
import Container from "../components/layout/container";
import LoginForm from "../components/loginForm/loginForm";
function Login() {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear()
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

  console.log(allUsers);

  function setLocalStorage(key, value) {
    return localStorage.setItem(key, value);
  }

  return (
    <Container customClass="center">
      <h1>Login</h1>
      <LoginForm btnText="Entrar" handleSubmit={createSession} />
    </Container>
  );
}

export default Login;
