import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import CalendarDay from '../../components/Calendar/CalendarDay';

describe('CalendarDay', () => {
    it('renders date and image if hdurl is provided', () => {
      const date = 1;
      const hdurl = 'https://example.com/image.jpg';
      const onClick = jest.fn();
  
      render(<CalendarDay date={date} hdurl={hdurl} onClick={onClick} />);
  
      const imageElement = screen.getByAltText(date.toString());
      expect(imageElement.getAttribute('src')).toBe(hdurl);
  
      const dateElement = screen.getByText(date.toString());
      expect(dateElement).toBeTruthy();
    });
  
    it('renders only date if hdurl is not provided', () => {
      const date = 1;
      const onClick = jest.fn();
  
      render(<CalendarDay date={date} hdurl="" onClick={onClick} />);
  
      const imageElement = screen.queryByAltText(date.toString());
      expect(imageElement).toBeNull();
  
      const dateElement = screen.getByText(date.toString());
      expect(dateElement).toBeTruthy();
    });
  
    it('calls onClick function when clicked', () => {
      const date = 1;
      const hdurl = 'https://localhost:3000/images/image.jpg';
      const onClick = jest.fn();
  
      render(<CalendarDay date={date} hdurl={hdurl} onClick={onClick} />);
  
      const calendarDayElement = screen.getByTestId('calendar-day');
      fireEvent.click(calendarDayElement);
  
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });