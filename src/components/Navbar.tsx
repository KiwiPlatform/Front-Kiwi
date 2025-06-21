import { useNavigate, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import authService from '../services/authService';
import { UserIcon, LogoutIcon, LogoKiwi } from './Icons';

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
        <LogoKiwi width={120} height={32} color="#ffffff" />
      </div>
      <div className={styles.profile}>
        <UserIcon size={16} color="currentColor" />
        {userName}
      </div>
      <nav className={styles.navLinks}>
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : ''}>
              Listado de pacientes
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
          <LogoutIcon size={16} color="currentColor" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Navbar; 