import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LeadsTable.module.css';
import { getLeads } from '../services/leadService';
import type { Lead } from '../types/Lead';
import { EditIcon } from './Icons';

const LeadsTable = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  }, []);

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
            </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr><td colSpan={8} style={{textAlign: 'center', padding: '40px'}}>Cargando...</td></tr>
            ) : (
                leads.map(lead => (
                    <tr key={lead.id}>
                      <td>
                        <button
                            onClick={() => navigate(`/dashboard/edit/${lead.id}`)}
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