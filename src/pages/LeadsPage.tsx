import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import styles from './LeadsPage.module.css';
import TopBar from '../components/navbar/TopBar';

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