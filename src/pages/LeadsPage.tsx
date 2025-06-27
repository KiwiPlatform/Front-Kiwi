import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from './LeadsPage.module.css';
import TopBar from '../components/TopBar';

const LeadsPage = () => {
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

export default LeadsPage; 