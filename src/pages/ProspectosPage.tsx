import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import styles from './DashboardPage.module.css'; // Reusing dashboard styles for consistency
import TopBar from '../components/navbar/TopBar';

const ProspectosPage = () => {
  return (
    <div className={styles.dashboardLayout}>
      <TopBar/>
      <Navbar />
      <main className={styles.contentArea}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProspectosPage; 