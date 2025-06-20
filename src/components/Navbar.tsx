import { useNavigate, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import authService from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const userName = currentUser?.user ? `${currentUser.user.name} ${currentUser.user.first_surname}` : 'Usuario';

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        KIWI
      </div>
      <div className={styles.profile}>
        {userName}
      </div>
      <nav className={styles.navLinks}>
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : ''}>
              Listado de leads
            </NavLink>
          </li>
          <li>
            <NavLink to="/seguridad" className={({ isActive }) => isActive ? styles.active : ''}>
              Seguridad
            </NavLink>
          </li>
          <li>
            <NavLink to="/mantenimiento" className={({ isActive }) => isActive ? styles.active : ''}>
              Mantenimiento
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.logoutSection}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Navbar; 