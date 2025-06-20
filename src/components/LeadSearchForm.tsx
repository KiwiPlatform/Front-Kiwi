import styles from './LeadSearchForm.module.css';

const LeadSearchForm = () => {
  return (
    <div className={styles.searchContainer}>
      <h2 className={styles.title}>Listado de pacientes - Búsqueda</h2>
      <form className={styles.formGrid}>
        {/* Row 1 */}
        <div className={styles.formGroup}>
          <label htmlFor="dni">DNI</label>
          <input type="text" id="dni" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cliente">Cliente</label>
          <input type="text" id="cliente" />
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
            <option value="Odontología">Odontología</option>
            <option value="Ginecología">Ginecología</option>
            <option value="Neurología">Neurología</option>
            <option value="Psicología">Psicología</option>
            <option value="Ortopedia">Ortopedia</option>
            <option value="Pediatría">Pediatría</option>
            <option value="Traumatología">Traumatología</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="recepcionista">Recepcionista</label>
          <select id="recepcionista">
            <option value="">Seleccione recepcionista</option>
            <option value="Ana García">Ana García</option>
            <option value="María López">María López</option>
            <option value="Pedro Ruiz">Pedro Ruiz</option>
            <option value="Carmen Vega">Carmen Vega</option>
            <option value="Luis Morales">Luis Morales</option>
            <option value="Sofia Castro">Sofia Castro</option>
            <option value="Diego Ramos">Diego Ramos</option>
            <option value="Elena Torres">Elena Torres</option>
          </select>
        </div>

        {/* Row 2 */}
        <div className={styles.formGroup}>
          <label htmlFor="telefono">Teléfono</label>
          <input type="text" id="telefono" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="correo">Correo</label>
          <input type="email" id="correo" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="costo_min">Costo Mínimo</label>
          <input type="number" id="costo_min" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="costo_max">Costo Máximo</label>
          <input type="number" id="costo_max" />
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
          <button className={`${styles.button} ${styles.searchButton}`}>Búsqueda</button>
          <button className={`${styles.button} ${styles.exportButton}`}>Exportar</button>
      </div>
    </div>
  );
};

export default LeadSearchForm; 