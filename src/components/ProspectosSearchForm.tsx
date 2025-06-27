import React, { useState } from 'react';
import styles from './LeadSearchForm.module.css';

const ProspectosSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se implementaría la lógica de búsqueda de prospectos
    console.log('Buscando prospectos:', { searchTerm, selectedStatus, selectedSpecialty });
  };

  return (
    <div className={styles.searchFormContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="search">Buscar Prospecto:</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nombre, DNI, teléfono..."
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="status">Estado:</label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={styles.select}
            >
              <option value="">Todos los estados</option>
              <option value="nuevo">Nuevo</option>
              <option value="contactado">Contactado</option>
              <option value="evaluacion">En Evaluación</option>
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="specialty">Especialidad:</label>
            <select
              id="specialty"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className={styles.select}
            >
              <option value="">Todas las especialidades</option>
              <option value="cardiologia">Cardiología</option>
              <option value="dermatologia">Dermatología</option>
              <option value="ginecologia">Ginecología</option>
              <option value="neurologia">Neurología</option>
              <option value="ortopedia">Ortopedia</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <button type="submit" className={styles.searchButton}>
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProspectosSearchForm; 