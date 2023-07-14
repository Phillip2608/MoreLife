import Container from './components/layout/container'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container customClass="center">
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
