'use client';
import React from 'react';
import styles from './styles/Home.module.css';
import CalendarContainer from '../app/src/components/Calendar/CalendarContainer';

// Componente de calendario
const months = ["January", "February"];

// Obtener los estados y métodos del componente CalendarContainer
const Calendar = () => {
  const {
    isLoading,
    currentMonth,
    renderDaysOfWeek,
    renderCalendarDays,
    handlePrevMonth,
    handleNextMonth,
    selectedImage,
    isModalOpen,
    closeModal,
  } = CalendarContainer();

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          Please wait, the application is loading...
        </div>
      )}

      {/* Renderizar el calendario si isLoading es falso */}
      {!isLoading && (
        <div className={styles.calendar}>
           {/* Encabezado del calendario */}
          <div className={styles.header}>
            {/* Botón para el mes anterior */}
            {currentMonth !== 0 && (
              <button className={styles.prevButton} onClick={handlePrevMonth}>
                Prev
              </button>
            )}
            {/* Nombre del mes y año */}
            <div className={styles.month}>{months[currentMonth]} 2023</div>
             {/* Botón para el siguiente mes */}
            {currentMonth !== 1 && (
              <button className={styles.nextButton} onClick={handleNextMonth}>
                Next
              </button>
            )}
          </div>
          {/* Días de la semana */}
          <div className={styles.daysOfWeek}>{renderDaysOfWeek}</div>
           {/* Días del calendario */}
          <div className={styles.calendarDays}>{renderCalendarDays}</div>
        </div>
      )}
       {/* Mostrar modal si hay una imagen seleccionada y el modal está abierto */}
      {selectedImage && isModalOpen && (
        <div className={`${styles.modal} ${isModalOpen ? styles.modalOpen : ""}`}>
          <div className={styles.modalContent}>
            {/* Botón para cerrar el modal */}
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
            {/* Imagen y detalles */}
            <img
              src={selectedImage.hdurl}
              alt={selectedImage.date}
              className={styles.modalImage}
            />
            <h3 className={styles.modalTitle}>{selectedImage.date}</h3>
            <p className={styles.modalDescription}>
              {selectedImage.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente principal Home que renderiza el calendario
export default function Home() {
  return <Calendar />;
}