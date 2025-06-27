import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LeadsTable.module.css';
import { EditIcon } from './Icons';

// Interfaz para Prospecto (similar a Lead pero adaptada)
interface Prospecto {
  id: string;
  cliente: string;
  clinica: string;
  dni: string;
  especialidad: string;
  telefono: string;
  costo: number;
  ingreso: string;
  status: string;
}

// Mock data para prospectos
const mockProspectos: Prospecto[] = [
  {
    id: '1',
    cliente: 'María González',
    clinica: 'Clínica San José',
    dni: '12345678',
    especialidad: 'Cardiología',
    telefono: '999-123-456',
    costo: 5000,
    ingreso: '2024-01-15',
    status: 'Nuevo'
  },
  {
    id: '2',
    cliente: 'Carlos Rodríguez',
    clinica: 'Hospital Central',
    dni: '87654321',
    especialidad: 'Dermatología',
    telefono: '999-654-321',
    costo: 3000,
    ingreso: '2024-01-16',
    status: 'Contactado'
  },
  {
    id: '3',
    cliente: 'Ana Martínez',
    clinica: 'Clínica Santa María',
    dni: '11223344',
    especialidad: 'Ginecología',
    telefono: '999-111-222',
    costo: 4500,
    ingreso: '2024-01-17',
    status: 'En Evaluación'
  }
];

const ProspectosTable = () => {
  const [prospectos, setProspectos] = useState<Prospecto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular carga de datos
    const fetchProspectos = async () => {
      try {
        // En un caso real, aquí se haría la llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
        setProspectos(mockProspectos);
      } catch (error) {
        console.error("Failed to fetch prospectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProspectos();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'nuevo':
        return styles.statusNuevo;
      case 'contactado':
        return styles.statusContactado;
      case 'en evaluación':
        return styles.statusEvaluacion;
      case 'aprobado':
        return styles.statusAprobado;
      case 'rechazado':
        return styles.statusRechazado;
      default:
        return styles.statusBadge;
    }
  };

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
          <input type="text" id="table-search" placeholder="Buscar prospectos..." />
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
              <tr><td colSpan={9} style={{textAlign: 'center', padding: '40px'}}>Cargando prospectos...</td></tr>
            ) : (
              prospectos.map(prospecto => (
                <tr key={prospecto.id}>
                  <td>
                    <button
                      onClick={() => navigate(`/prospectos/edit/${prospecto.id}`)}
                      className={styles.editButton}
                      title="Editar prospecto"
                    >
                      <EditIcon size={16} color="currentColor" />
                    </button>
                  </td>
                  <td>{prospecto.cliente}</td>
                  <td>{prospecto.clinica}</td>
                  <td>{prospecto.dni}</td>
                  <td>{prospecto.especialidad}</td>
                  <td>{prospecto.telefono}</td>
                  <td>S/. {prospecto.costo}</td>
                  <td>{prospecto.ingreso}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(prospecto.status)}`}>
                      {prospecto.status}
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

export default ProspectosTable; 