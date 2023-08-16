import Container from "../components/layout/container";
import Navbar from "../components/dashboard/navdash";
import Greet from "../components/dashboard/greet";
import styles from "./cssRoutes/dashboard.module.css";

import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <Container customClass="center">
      <div className={styles.dashboardContainer}>
        <Navbar />
        <div className={styles.dashboard}>
          <Greet />
          <Outlet />
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;
