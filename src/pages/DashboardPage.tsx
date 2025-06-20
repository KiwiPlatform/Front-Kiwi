import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <div className={styles.dashboardLayout}>
      <Navbar />
      <main className={styles.contentArea}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardPage; 