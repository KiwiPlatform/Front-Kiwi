import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLeadById, updateLead } from '../services/leadService';
import type { Lead } from '../types/Lead';
import { LeadStatus, LeadStatusLabels } from '../types/Lead';
import styles from './LeadEditPage.module.css';
import { ArrowLeftIcon, SaveIcon } from '../components/Icons';
import { useLeadsContext } from '../context/LeadsContext';

const LeadEditPage = () => {
  const { leadId } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { refreshLeads } = useLeadsContext();

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
    
    // Log de depuración para verificar cambios en los selectores
    if (name === 'especialidad' || name === 'status') {
      console.log('Cambio en selector:', {
        name: name,
        value: value,
        previousValue: lead?.[name as keyof Lead]
      });
    }
    
    setLead(prevLead => (prevLead ? { ...prevLead, [name]: value } : null));
  };

  const handleSave = async () => {
    if (!lead || !leadId) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Validar campos requeridos (los que tienen asterisco en la interfaz)
      const requiredFields = ['dni', 'cliente', 'telefono', 'especialidad', 'costo'];
      const missingFields = requiredFields.filter(field => {
        const value = lead[field as keyof Lead];
        return !value || String(value).trim() === '';
      });

      if (missingFields.length > 0) {
        const fieldNames = {
          dni: 'DNI',
          cliente: 'Cliente',
          telefono: 'Teléfono',
          especialidad: 'Especialidad',
          costo: 'Costo'
        };
        const missingFieldNames = missingFields.map(field => fieldNames[field as keyof typeof fieldNames]);
        setError(`Por favor complete los campos requeridos: ${missingFieldNames.join(', ')}`);
        return;
      }

      // Log de depuración para ver qué datos se están enviando
      console.log('Datos a enviar al backend:', {
        id: leadId,
        lead: lead,
        especialidad: lead.especialidad,
        status: lead.status,
        especialidadOriginal: lead.especialidad,
        cambios: Object.keys(lead)
      });

      await updateLead(parseInt(leadId, 10), lead);
      refreshLeads();
      setSuccess(true);

      // Mostrar mensaje de éxito por 2 segundos antes de redirigir
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error updating lead:', error);
      setError('Error al guardar los cambios. Por favor, intente nuevamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.centered}>Cargando...</div>;
  if (!lead) return <div className={styles.centered}>Paciente no encontrado.</div>;

  return (
      <div className={styles.editPageContainer}>
        <header className={styles.pageHeader}>
          <h1>Paciente: {lead.cliente}</h1>
          <button onClick={() => navigate("/leads/list")} className={styles.returnButton}>
            <ArrowLeftIcon size={16} color="currentColor" />
            Retornar
          </button>
        </header>

        {/* Mensajes de estado */}
        {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
        )}

        {success && (
            <div className={styles.successMessage}>
              ¡Paciente actualizado exitosamente! Redirigiendo...
            </div>
        )}

        <div className={styles.formContainer}>
          <section>
            <h2 className={styles.sectionTitle}>Información del paciente</h2>
            <div className={`${styles.formGrid} ${styles.gridCols3}`}>
              {/* Fila 1 */}
              <div className={styles.formGroup}>
                <label>DNI *</label>
                <input
                    name="dni"
                    value={lead.dni}
                    onChange={handleChange}
                    placeholder="Ingrese DNI"
                    disabled={saving}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Cliente *</label>
                <input
                    name="cliente"
                    value={lead.cliente}
                    onChange={handleChange}
                    placeholder="Nombre completo"
                    disabled={saving}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Teléfono *</label>
                <input
                    name="telefono"
                    value={lead.telefono}
                    onChange={handleChange}
                    placeholder="Número de teléfono"
                    disabled={saving}
                />
              </div>

              {/* Fila 2 */}
              <div className={styles.formGroup}>
                <label>Especialidad *</label>
                <select
                    name="especialidad"
                    value={lead.especialidad}
                    onChange={handleChange}
                    disabled={saving}
                >
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
              <div className={styles.formGroup}>
                <label>Costo *</label>
                <input
                    name="costo"
                    value={lead.costo}
                    onChange={handleChange}
                    placeholder="S/. 0.00"
                    disabled={saving}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Clínica</label>
                <input type="text" value={lead.clinica} readOnly />
              </div>
              <div className={styles.formGroup}>
                <label>Correo Electrónico</label>
                <input
                    name="correo"
                    value={lead.correo}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    disabled={true}
                    title="Este campo no se puede editar desde el listado"
                />
              </div>
            </div>
          </section>

          <section>
            <div className={styles.observacionStatusRow}>
              <div className={styles.formGroup}>
                <label>Observaciones</label>
                <textarea
                    name="observacion"
                    rows={4}
                    value={lead.observacion || ''}
                    onChange={handleChange}
                    placeholder="Ingrese observaciones adicionales..."
                    disabled={saving}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Status *</label>
                <select
                    name="status"
                    value={lead.status}
                    onChange={handleChange}
                    disabled={saving}
                    className={styles.statusSmallSelect}
                >
                  {Object.values(LeadStatus).map((status) => (
                    <option key={status} value={status}>{LeadStatusLabels[status]}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

        </div>

        <footer className={styles.pageFooter}>
          <button
              onClick={handleSave}
              className={styles.saveButton}
              disabled={saving}
          >
            <SaveIcon size={16} color="currentColor" />
            {saving ? 'Guardando...' : 'Grabar'}
          </button>
          <button
              onClick={() => navigate("/leads/list")}
              className={styles.returnButton}
              disabled={saving}
          >
            <ArrowLeftIcon size={16} color="currentColor" />
            Retornar
          </button>
        </footer>
      </div>
  );
};

export default LeadEditPage;