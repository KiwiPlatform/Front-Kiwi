import Navbar from '../components/Navbar';
import styles from './DashboardPage.module.css'; // Reusing dashboard styles for consistency

const MantenimientoPage = () => {
  return (
    <div className={styles.dashboardLayout}>
      <Navbar />
      <main className={styles.contentArea}>
        <h1>Mantenimiento</h1>
        <p>Aquí se mostrará el contenido de la sección de mantenimiento.</p>
      </main>
    </div>
  );
};

export default MantenimientoPage; 