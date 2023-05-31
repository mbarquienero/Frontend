'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import DayOfWeek from './DayOfWeek';
import CalendarDay from './CalendarDay';

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Contenedor del calendario
const CalendarContainer = () => {
  // Estado para el mes actual
  const [currentMonth, setCurrentMonth] = useState(1);
  // Estado para la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState<any>(null);
  // Estado para indicar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para almacenar en caché las imagenes
  const [imageCache, setImageCache] = useState<any>({});
  // Estado para indicar si se estan cargando las imagenes
  const [isLoading, setIsLoading] = useState(true);

  // Efecto para cargar las imagenes
  useEffect(() => {
    fetchImages();
  }, []);

  // Obtener todas las imagenes
  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    const newImageCache = { ...imageCache };

    const startMonth = 0;
    const endMonth = 1;

    for (let month = startMonth; month <= endMonth; month++) {
      const startDate = new Date(2023, month, 1);
      const endDate = new Date(2023, month + 1, 0);

      while (startDate <= endDate) {
        const dateStr = formatDate(startDate);
        if (!newImageCache[dateStr]) {
          const apod = await fetchApodByDate(dateStr);
          newImageCache[dateStr] = {
            hdurl: apod.hdurl,
            description: apod.explanation
          };
        }
        startDate.setDate(startDate.getDate() + 1);
      }
    }

    setImageCache(newImageCache);
    setIsLoading(false);
  }, [imageCache]);

  // Obtener la imagen del dia mediante una solicitud a la API de la NASA
  const fetchApodByDate = useCallback(async (date: string) => {
    const apiKey = "LRRJVqljiwIs9xRqw2sw3I4FqvIQWCiOPBALoQlp";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }, []);

  // Formatear la fecha en formato YYYY-MM-DD
  const formatDate = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // Manejar el cambio al mes anterior
  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        return 11;
      }
      return prevMonth - 1;
    });
  }, []);

  // Manejar el cambio al siguiente mes
  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        return 0;
      }
      return prevMonth + 1;
    });
  }, []);

  // Manejar el clic en una imagen del dia
  const handleImageClick = useCallback((date: string) => {
    const { hdurl, description } = imageCache[date];
    setSelectedImage({ date, hdurl, description });
    setIsModalOpen(true);
  }, [imageCache]);

  // Cerrar el modal con efecto de retardo
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  }, []);

  // Renderizado de los días de la semana
  const renderDaysOfWeek = useMemo(() => {
    return daysOfWeek.map((day) => (
      <DayOfWeek key={day} day={day} />
    ));
  }, []);

  // Renderizado de los días del calendario
  const renderCalendarDays = useMemo(() => {
    const startDate = new Date(2023, currentMonth, 1);
    const endDate = new Date(2023, currentMonth + 1, 0);

    const calendarDays = [];

    while (startDate <= endDate) {
      const dateStr = formatDate(startDate);
      const { hdurl } = imageCache[dateStr] || {};

      calendarDays.push(
        <CalendarDay
          key={startDate.getDate()}
          date={startDate.getDate()}
          hdurl={hdurl}
          onClick={() => handleImageClick(dateStr)}
        />
      );

      startDate.setDate(startDate.getDate() + 1);
    }

    return calendarDays;
  }, [currentMonth, formatDate, handleImageClick, imageCache]);

  return {
    isLoading,
    currentMonth,
    renderDaysOfWeek,
    renderCalendarDays,
    handlePrevMonth,
    handleNextMonth,
    selectedImage,
    isModalOpen,
    closeModal,
  };
};

export default CalendarContainer;