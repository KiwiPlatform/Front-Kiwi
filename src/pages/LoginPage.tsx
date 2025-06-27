import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LoginPage.module.css';
import authService from '../services/authService';
import { KiwiIconLanding, UserSvgIcon } from '../components/Icons';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    if (authService.isAuthenticated()) {
      // Si ya está autenticado, redirigir al dashboard o a la página que intentaba acceder
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor, ingrese su usuario y contraseña.');
      return;
    }

    setLoading(true);
    try {
      await authService.login(username, password);
      
      // Redirigir a la página que intentaba acceder o al dashboard por defecto
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Usuario o contraseña incorrectos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        {/* Panel izquierdo */}
        <div className={styles.leftPanel}>
          <div className={styles.logo}>
            <KiwiIconLanding />
            <div className={styles.logoText}>
              <div><span className={styles.spanLogo1}>KIWI</span> <span className={styles.spanLogo2}>Analytics</span></div>
              <p>with PowerBI Technology</p>
            </div>
          </div>
          <div className={styles.leftIcon}>
            <UserSvgIcon size={120} />
          </div>
          <div className={styles.leftText}>
            Accede al sistema central de gestión y controla cada etapa del flujo operativo con Precisión.
          </div>
          <div className={styles.leftVersion}>Versión 1.0</div>
        </div>
        {/* Panel derecho */}
        <div className={styles.rightPanel}>
          {/* Logo solo visible en mobile */}
          <div className={styles.logoMobile}>
            <KiwiIconLanding />
            <div className={styles.logoText}>
              <div><span className={styles.spanLogo1}>KIWI</span> <span className={styles.spanLogo2}>Analytics</span></div>
              <p>with PowerBI Technology</p>
            </div>
          </div>
          <h2>Iniciar sesión en su cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Usuario</label>
              <input
                id="username"
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                disabled={loading}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                disabled={loading}
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.containerButton}>
              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 