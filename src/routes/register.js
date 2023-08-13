import styles from "./cssRoutes/register.module.css";

//Importando components
import Container from "../components/layout/container";
import RegisterForm from "../components/registerForm/registerForm";
import { useNavigate } from "react-router-dom";
import { setData } from "../services/FirebaseConfig";
import { uid } from "uid";

function Register() {
  const navigate = useNavigate();

  function createUser(user) {
    const uuid = uid();
    user.id = uuid;
    setData(`tb_user/${uuid}`, user);
    navigate("/login", { state: "Cadastro efeituado com sucesso!" });
  }

  return (
    <Container customClass="center">
      <h1>Register</h1>
      <RegisterForm handleSubmit={createUser} btnText="Cadastrar-se" />
    </Container>
  );
}

export default Register;
