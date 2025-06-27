import styles from './LeadSearchForm.module.css';
import { SearchIcon, ExportIcon } from './Icons';

const LeadSearchForm = () => {
  return (
    <div className={styles.searchContainer}>
      <h2 className={styles.title}>Listado de pacientes - Búsqueda</h2>
      <form className={styles.formGrid}>
        {/* Fila 1 - 3 columnas */}
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

        {/* Fila 2 - 3 columnas */}
        <div className={styles.formGroup}>
          <label htmlFor="especialidad">Especialidad</label>
          <select id="especialidad">
            <option value="">Seleccione especialidad</option>
            <option value="Dermatología">Dermatología</option>
            <option value="Cardiología">Cardiología</option>
            <option value="Oftalmología">Oftalmología</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="telefono">Teléfono</label>
          <input type="text" id="telefono" placeholder="Número de teléfono" />
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

        {/* Fila 3 - 3 columnas */}
        <div className={styles.formGroup}>
          <label htmlFor="recepcionista">Recepcionista</label>
          <select id="recepcionista">
            <option value="">Seleccione recepcionista</option>
            <option value="Dermatología">Maria</option>
            <option value="Cardiología">Pepito</option>
            <option value="Oftalmología">Laura</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="telefono">Teléfono fijo</label>
          <input type="text" id="telefono" placeholder="Número de teléfono" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="desembolsado">Estado</label>
          <select id="desembolsado">
            <option value="">Seleccione estado</option>
            <option value="NUEVO">NUEVO</option>
            <option value="CONTACTADO">CONTACTADO</option>
            <option value="PRE_APROBADO">PRE_APROBADO</option>
            <option value="APROBADO">APROBADO</option>
            <option value="RECHAZADO">RECHAZADO</option>
            <option value="DESEMBOLSADO">DESEMBOLSADO</option>
          </select>
        </div>
        
        {/* Fila 4 - 2 columnas normales + 1 contenedor de fechas */}
        <div className={styles.formGroup}>
          <label htmlFor="costo_min">Costo Mínimo</label>
          <input type="number" id="costo_min" placeholder="S/. 0" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="costo_max">Costo Máximo</label>
          <input type="number" id="costo_max" placeholder="S/. 10000" />
        </div>
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