import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import styles from './DashboardPage.module.css'
import { UserSvgIcon } from '../components/Icons';

const DashboardPage = () => {


  return (
    <div className={styles.dashboardLayout}>
      <TopBar/>
      <Navbar />
      <main className={styles.contentArea}>
        <h1>Dashboard</h1>
        <p style={{color: 'black'}}>Aquí se mostrará el contenido de la sección de dashboard.</p>
        <div className={styles.areaProfile}>
          <div className={styles.bannerProfile}></div>
          <div className={styles.contentProfile}>
            <div className={styles.svgProfile}>
              <UserSvgIcon size={100}/>
              <p>User Kiwi</p>
            </div>
            <div className={styles.datosProfile}><span>26 <br /> LEADS</span> <span>33 <br />PROSPECTOS</span> <span>136 <br />DESEMBOLSOS</span></div>
            <p className={styles.functionProfile}><span>Resumen</span> <span> Editar Perfil</span> <span>Configuración</span></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage; 