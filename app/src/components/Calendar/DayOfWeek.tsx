import React, { memo } from 'react';
import styles from '../../../styles/Home.module.css';

// Componente para mostrar un día de la semana
const DayOfWeek = memo(({ day }: { day: string }) => (
  // Renderiza un elemento div con el nombre del día de la semana
  <div className={styles.dayOfWeek}>{day}</div>
));

export default DayOfWeek;