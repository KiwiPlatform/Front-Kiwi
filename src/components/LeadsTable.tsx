import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LeadsTable.module.css';
import { getLeads } from '../services/leadService';
import type { Lead } from '../types/Lead';
import { EditIcon } from './Icons';
import { useLeadsContext } from '../context/LeadsContext';
import { LeadStatusLabels, LeadStatus } from '../types/Lead';

const LeadsTable = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { leadsVersion } = useLeadsContext();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [leadsVersion]);

  return (
      <div className={styles.tableContainer}>
        <div className={styles.tableControls}>
          <div className={styles.showEntries}>
            Mostrar
            <select>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            registros
          </div>
          <div className={styles.searchTable}>
            <label htmlFor="table-search">Buscar:</label>
            <input type="text" id="table-search" placeholder="Buscar pacientes..." />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table>
            <thead>
            <tr>
              <th>Editar</th>
              <th>Cliente</th>
              <th>Clínica</th>
              <th>DNI</th>
              <th>Especialidad</th>
              <th>Teléfono</th>
              <th>Costo</th>
              <th>Ingreso</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr><td colSpan={9} style={{textAlign: 'center', padding: '40px'}}>Cargando...</td></tr>
            ) : (
                leads.map(lead => (
                    <tr key={lead.id}>
                      <td>
                        <button
                            onClick={() => navigate(`/leads/edit/${lead.id}`)}
                            className={styles.editButton}
                            title="Editar paciente"
                        >
                          <EditIcon size={16} color="currentColor" />
                        </button>
                      </td>
                      <td>{lead.cliente}</td>
                      <td>{lead.clinica}</td>
                      <td>{lead.dni}</td>
                      <td>{lead.especialidad}</td>
                      <td>{lead.telefono}</td>
                      <td>S/. {lead.costo}</td>
                      <td>{lead.ingreso}</td>
                      <td>
                        <span className={
                          `${styles.statusBadge} ` +
                          (lead.status === LeadStatus.NUEVO ? styles.statusNuevo :
                          lead.status === LeadStatus.CONTACTADO ? styles.statusContactado :
                          lead.status === LeadStatus.EN_EVALUACION ? styles.statusEvaluacion :
                          lead.status === LeadStatus.PRE_APROBADO ? styles.statusPreaprobado :
                          lead.status === LeadStatus.APROBADO ? styles.statusAprobado :
                          lead.status === LeadStatus.RECHAZADO ? styles.statusRechazado :
                          lead.status === LeadStatus.DESEMBOLSADO ? styles.statusDesembolsado :
                          styles.statusBadge)
                        }
                        >
                          {LeadStatusLabels[lead.status]}
                        </span>
                      </td>
                    </tr>
                ))
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default LeadsTable;