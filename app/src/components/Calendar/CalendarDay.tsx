import React, { memo } from 'react';
import styles from '../../../styles/Home.module.css';

interface CalendarDayProps {
  //Fecha del dia del calendario.
  date: number;
  //URL de la imagen de alta definición.
  hdurl: string;
  onClick: () => void;
}

// Componente para mostrar un día del calendario.
const CalendarDay = memo(({ date, hdurl, onClick }: CalendarDayProps) => (
  <div className={styles.calendarDay} onClick={onClick}>
    {hdurl && <img src={hdurl} alt={date.toString()} className={styles.apodImage} />}
    <span className={styles.date}>{date}</span>
  </div>
));

export default CalendarDay;