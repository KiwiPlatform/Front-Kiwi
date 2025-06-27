import { KiwiIconLanding, UserSvgIcon, LogoutIcon } from '../components/Icons';
import authService from '../services/authService';
import styles from './TopBar.module.css'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const TopBar = ()=> {
    const currentUser = authService.getCurrentUser();
    const userName = currentUser?.user ? `${currentUser.user.name} ${currentUser.user.first_surname}` : 'Usuario';
    const [open, setOpen] = useState(false);
    const userRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Cerrar el menú si se hace click fuera
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (userRef.current && !userRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleSignOut = () => {
      authService.logout();
      navigate('/login');
    };

    return(
        <>
        <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <div className={styles.topBarLogo}>
            <KiwiIconLanding size={38} />
            <div>
            <span className={styles.spanLogo} >KIWI Analytics</span>
            <p className={styles.pLogo}>with PowerBI Technology</p>
            </div>
          </div>
        </div>
        <div
          className={styles.topBarUser}
          ref={userRef}
          tabIndex={0}
          onClick={() => setOpen((prev) => !prev)}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <UserSvgIcon size={38} />
          <span className={styles.spanUsername}>{userName}</span>
          <span style={{ marginLeft: 6, fontSize: '0.8em' }}>▼</span>
          {open && (
            <div className={styles.dropdownMenu} style={{ right: 0, left: 'auto', minWidth: 180 }}>
              <div className={styles.dropdownItem} onClick={() => { setOpen(false); navigate('/profile'); }}>
                Profile
              </div>
              <div className={styles.dropdownItem} onClick={() => { setOpen(false); navigate('/profile/edit'); }}>
                Edit profile
              </div>
              <div className={styles.dropdownItem} onClick={handleSignOut} style={{ color: '#5E767A', fontWeight: 600 }}>
                <span style={{ marginRight: 8 }}><LogoutIcon size={18} /></span> Sign out
              </div>
            </div>
          )}
        </div>
      </div>
        </>
    )

}
export default TopBar
