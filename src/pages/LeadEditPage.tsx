import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLeadById } from '../services/leadService';
import type { Lead } from '../types/Lead';
import styles from './LeadEditPage.module.css';

const LeadEditPage = () => {
  const { leadId } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (leadId) {
      const fetchLead = async () => {
        setLoading(true);
        try {
          const data = await getLeadById(parseInt(leadId, 10));
          if (data) {
            setLead(data);
          } else {
            console.error("Lead not found");
          }
        } catch (error) {
          console.error("Failed to fetch lead:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchLead();
    }
  }, [leadId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLead(prevLead => (prevLead ? { ...prevLead, [name]: value } : null));
  };
  
  if (loading) return <div className={styles.centered}>Cargando...</div>;
  if (!lead) return <div className={styles.centered}>Paciente no encontrado.</div>;

  return (
    <div className={styles.editPageContainer}>
      <header className={styles.pageHeader}>
        <h1>Paciente: {lead.cliente}</h1>
        <button onClick={() => navigate("/dashboard")} className={styles.returnButton}>
          &larr; Retornar
        </button>
      </header>
      
      <div className={styles.formContainer}>
        <section>
          <h2 className={styles.sectionTitle}>Información del registro</h2>
          <div className={`${styles.formGrid} ${styles.gridCols3}`}>
            <div className={styles.formGroup}>
              <label>Recepcionista</label>
              <input type="text" value={lead.recepcionista} readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>Clínica</label>
              <input type="text" value={lead.clinica} readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>Año de Ingreso</label>
              <input type="text" value={lead.ingreso} readOnly />
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>Información del paciente</h2>
          <div className={`${styles.formGrid} ${styles.gridCols3}`}>
            {/* Fila 1 */}
            <div className={styles.formGroup}>
              <label>DNI *</label>
              <input name="dni" value={lead.dni} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Cliente *</label>
              <input name="cliente" value={lead.cliente} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Teléfono *</label>
              <input name="telefono" value={lead.telefono} onChange={handleChange} />
            </div>

            {/* Fila 2 */}
            <div className={styles.formGroup}>
              <label>Correo Electrónico *</label>
              <input name="correo" value={lead.correo} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Especialidad *</label>
              <select name="especialidad" value={lead.especialidad} onChange={handleChange}>
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
              <label>Costo *</label>
              <input name="costo" value={lead.costo} onChange={handleChange} />
            </div>
          </div>
        </section>
        
        <section>
          <div className={styles.formGroup}>
            <label>Observaciones</label>
            <textarea rows={4} defaultValue="Paciente registrado en el sistema médico"></textarea>
          </div>
        </section>

      </div>

      <footer className={styles.pageFooter}>
        <button className={styles.saveButton}>Grabar</button>
        <button onClick={() => navigate("/dashboard")} className={styles.returnButton}>
          &larr; Retornar
        </button>
      </footer>
    </div>
  );
};

export default LeadEditPage; 