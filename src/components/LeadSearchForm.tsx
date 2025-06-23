import styles from './LeadSearchForm.module.css';
import { SearchIcon, ExportIcon } from './Icons';

const LeadSearchForm = () => {
  return (
    <div className={styles.searchContainer}>
      <h2 className={styles.title}>Listado de pacientes - Búsqueda</h2>
      <form className={styles.formGrid}>
        {/* Row 1 */}
        <div className={styles.formGroup}>
          <label htmlFor="dni">DNI</label>
          <input type="text" id="dni" placeholder="Ingrese DNI" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cliente">Cliente</label>
          <input type="text" id="cliente" placeholder="Nombre del cliente" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="clinica">Clínica</label>
          <select id="clinica">
            <option value="">Seleccione clínica</option>
            <option value="Clinica San Juan">Clínica San Juan</option>
            <option value="Clinica Central">Clínica Central</option>
            <option value="Clinica Norte">Clínica Norte</option>
            <option value="Clinica Sur">Clínica Sur</option>
            <option value="Clinica Este">Clínica Este</option>
            <option value="Clinica Oeste">Clínica Oeste</option>
            <option value="Clinica Centro">Clínica Centro</option>
            <option value="Clinica Moderna">Clínica Moderna</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="especialidad">Especialidad</label>
          <select id="especialidad">
            <option value="">Seleccione especialidad</option>
            <option value="Dermatología">Dermatología</option>
            <option value="Cardiología">Cardiología</option>
            <option value="Oftalmología">Oftalmología</option>
            {/* Comentamos las especialidades que no existen en el backend
            <option value="Odontología">Odontología</option>
            <option value="Ginecología">Ginecología</option>
            <option value="Neurología">Neurología</option>
            <option value="Psicología">Psicología</option>
            <option value="Ortopedia">Ortopedia</option>
            <option value="Pediatría">Pediatría</option>
            <option value="Traumatología">Traumatología</option>
            */}
          </select>
        </div>

        {/* Row 2 */}
        <div className={styles.formGroup}>
          <label htmlFor="telefono">Teléfono</label>
          <input type="text" id="telefono" placeholder="Número de teléfono" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="costo_min">Costo Mínimo</label>
          <input type="number" id="costo_min" placeholder="S/. 0" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="costo_max">Costo Máximo</label>
          <input type="number" id="costo_max" placeholder="S/. 10000" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ingreso">Año de Ingreso</label>
          <select id="ingreso">
            <option value="">Seleccione año</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
        
        {/* Row 3 - Special Date Field */}
        <div className={`${styles.formGroup} ${styles.dateRangeGroup}`}>
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" name="fecha_tipo" value="registro" defaultChecked />
              Fecha de Registro
            </label>
            <label>
              <input type="radio" name="fecha_tipo" value="ingreso" />
              Fecha de Ingreso
            </label>
          </div>
          <div className={styles.dateInputs}>
            <input type="date" />
            <span>-</span>
            <input type="date" />
          </div>
        </div>

      </form>
      <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.searchButton}`}>
            <SearchIcon size={16} color="currentColor" />
            Búsqueda
          </button>
          <button className={`${styles.button} ${styles.exportButton}`}>
            <ExportIcon size={16} color="currentColor" />
            Exportar
          </button>
      </div>
    </div>
  );
};

export default LeadSearchForm; 