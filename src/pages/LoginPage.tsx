import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import authService from '../services/authService';
import { LogoKiwi } from '../components/Icons';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      navigate('/dashboard');
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
        <div className={styles.logo}>
          <LogoKiwi width={180} height={48} color="#38F2AB" />
        </div>
        <p className={styles.welcomeText}>Bienvenido</p>
        <p className={styles.systemName}>Sistema de Gestión de Pacientes</p>
        <h2>Inicie sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              disabled={loading}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              disabled={loading}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <footer className={styles.footer}>
          KIWI ® Todos los derechos reservados - 2024
        </footer>
      </div>
    </div>
  );
};

export default LoginPage; 