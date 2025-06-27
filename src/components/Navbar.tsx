import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { DashboardIcon, NavbarGeneralIcon } from "./Icons"; // Usa tus íconos aquí

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdowns = document.querySelectorAll(`.${styles.dropdownMenu}`);
      let clickedInside = false;
      dropdowns.forEach((dropdown) => {
        if (dropdown.contains(event.target as Node)) {
          clickedInside = true;
        }
      });
      if (!clickedInside) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar dropdowns al cambiar de ruta
  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname]);

  // Verificar overflow y mostrar flechas
  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleNavigate = (path: string) => {
    setOpenMenu(null);
    navigate(path);
  };

  return (
    <nav className={styles.horizontalNavbar}>
      {showLeftArrow && (
        <button className={styles.scrollArrow} onClick={scrollLeft} aria-label="Scroll left">
          <span>&lt;</span>
        </button>
      )}
      <div className={styles.scrollContainer} ref={scrollRef} onScroll={handleScroll}>
        <ul className={styles.navList}>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>
              <span className={styles.iconLabel}>
                <DashboardIcon className={styles.iconSvg}/>
                Dashboard
              </span>
            </NavLink>
          </li>
          {/* Agrega más módulos principales aquí si lo deseas */}
        </ul>
      </div>
      <div className={styles.dropdownWrapper}>
        <div className={styles.dropdown} style={{ position: "relative" }}>
          <button
            className={`${styles.dropdownButton} ${openMenu === "leads" ? styles.open : ""}`}
            onClick={() => handleMenu("leads")}
            aria-expanded={openMenu === "leads"}
          >
            <span className={styles.iconLabel}>
              <NavbarGeneralIcon className={styles.iconSvg}/>
              Leads <span className={styles.arrowDown}>▼</span>
            </span>
          </button>
          {openMenu === "leads" && (
            <div className={styles.dropdownMenu} style={{ right: 0, left: "auto" }}>
              <div className={styles.dropdownItem} onClick={() => handleNavigate("/leads/list")}>Listado de Leads</div>
              <div className={styles.dropdownItem} onClick={() => handleNavigate("/leads/transferir")}>Transferencia de Leads</div>
            </div>
          )}
        </div>
        <div className={styles.dropdown} style={{ position: "relative" }}>
          <button
            className={`${styles.dropdownButton} ${openMenu === "prospectos" ? styles.open : ""}`}
            onClick={() => handleMenu("prospectos")}
            aria-expanded={openMenu === "prospectos"}
          >
            <span className={styles.iconLabel}>
              <NavbarGeneralIcon className={styles.iconSvg}/>
              Prospectos <span className={styles.arrowDown}>▼</span>
            </span>
          </button>
          {openMenu === "prospectos" && (
            <div className={styles.dropdownMenu} style={{ right: 0, left: "auto" }}>
              <div className={styles.dropdownItem} onClick={() => handleNavigate("/prospectos")}>Listado de Prospectos</div>
              <div className={styles.dropdownItem} onClick={() => handleNavigate("/prospectos/transferir")}>Transferencia de Prospectos</div>
            </div>
          )}
        </div>
      </div>
      {showRightArrow && (
        <button className={styles.scrollArrow} onClick={scrollRight} aria-label="Scroll right">
          <span>&gt;</span>
        </button>
      )}
    </nav>
  );
};

export default Navbar;