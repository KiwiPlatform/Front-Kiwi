import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { DashboardIcon, NavbarGeneralIcon } from "./Icons"; // Usa tus íconos aquí
import ReactDOM from "react-dom";

// Nuevo componente para el portal del dropdown
const DropdownMenuPortal = ({ anchorRect, open, items }: {
  anchorRect: DOMRect | null,
  open: boolean,
  items: { label: string, onClick: () => void }[]
}) => {
  if (!open || !anchorRect) return null;
  const style: React.CSSProperties = {
    position: "fixed",
    top: anchorRect.bottom + 8,
    left: anchorRect.right - 200, // 200 = min-width del menú
    minWidth: 200,
    zIndex: 2000
  };
  return ReactDOM.createPortal(
    <div className={styles.dropdownMenu} style={style}>
      {items.map((item, i) => (
        <div key={i} className={styles.dropdownItem} onClick={item.onClick}>{item.label}</div>
      ))}
    </div>,
    document.getElementById("dropdown-root")!
  );
};

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  // Saber si el dropdown debe estar activo
  const isDropdownActive = (prefix: string) => location.pathname.startsWith(prefix);

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

  const handleMenu = (menu: string, event?: React.MouseEvent) => {
    if (openMenu === menu) {
      setOpenMenu(null);
      setAnchorRect(null);
    } else {
      setOpenMenu(menu);
      if (event) setAnchorRect((event.currentTarget as HTMLElement).getBoundingClientRect());
    }
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
          <li className={styles.liNavList}>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>
              <span className={styles.iconLabel}>
                <DashboardIcon className={styles.iconSvg}/>
                Dashboard
              </span>
            </NavLink>
          </li>
          
          {/* Agrega más módulos principales aquí si lo deseas */}
          <li className={styles.dropdown} style={{ position: "relative" }}>
            <button
              className={`${styles.dropdownButton} ${isDropdownActive("/leads") ? styles.active : ""}`}
              onClick={e => handleMenu("leads", e)}
              aria-expanded={openMenu === "leads"}
            >
              <span className={styles.iconLabel}>
                <NavbarGeneralIcon className={styles.iconSvg}/>
                Leads <span className={`${styles.arrowDown} ${openMenu === "leads" ? styles.open : ""}`}>▼</span>
              </span>
            </button>
          </li>
          <li className={styles.dropdown} style={{ position: "relative" }}>
            <button
              className={`${styles.dropdownButton} ${isDropdownActive("/prospectos") ? styles.active : ""}`}
              onClick={e => handleMenu("prospectos", e)}
              aria-expanded={openMenu === "prospectos"}
            >
              <span className={styles.iconLabel}>
                <NavbarGeneralIcon className={styles.iconSvg}/>
                Prospectos <span className={`${styles.arrowDown} ${openMenu === "prospectos" ? styles.open : ""}`}>▼</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
      {showRightArrow && (
        <button className={styles.scrollArrow} onClick={scrollRight} aria-label="Scroll right">
          <span>&gt;</span>
        </button>
      )}
      {/* Portales para los dropdowns */}
      <DropdownMenuPortal
        anchorRect={openMenu === "leads" ? anchorRect : null}
        open={openMenu === "leads"}
        items={[
          { label: "Listado de Leads", onClick: () => handleNavigate("/leads/list") },
          { label: "Transferencia de Leads", onClick: () => handleNavigate("/leads/transferir") },
        ]}
      />
      <DropdownMenuPortal
        anchorRect={openMenu === "prospectos" ? anchorRect : null}
        open={openMenu === "prospectos"}
        items={[
          { label: "Listado de Prospectos", onClick: () => handleNavigate("/prospectos") },
          { label: "Transferencia de Prospectos", onClick: () => handleNavigate("/prospectos/transferir") },
        ]}
      />
    </nav>
  );
};

export default Navbar;