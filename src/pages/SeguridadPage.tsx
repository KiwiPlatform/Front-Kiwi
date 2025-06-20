import Navbar from '../components/Navbar';
import styles from './DashboardPage.module.css'; // Reusing dashboard styles for consistency

const SeguridadPage = () => {
  return (
    <div className={styles.dashboardLayout}>
      <Navbar />
      <main className={styles.contentArea}>
        <h1>Seguridad</h1>
        <p>Aquí se mostrará el contenido de la sección de seguridad.</p>
      </main>
    </div>
  );
};

export default SeguridadPage; 