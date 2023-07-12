import Dashboard from './components/dashboard/dashboard';
import Container from './components/layout/container'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container customClass="center">
        <Dashboard>
          <Outlet />
        </Dashboard>
      </Container>
    </div>
  );
}

export default App;
