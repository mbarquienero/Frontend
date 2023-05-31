import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import CalendarContainer from '../../components/Calendar/CalendarContainer';

describe('CalendarContainer', () => {
    it('displays the current month', () => {
      const {
        currentMonth,
        renderDaysOfWeek,
        renderCalendarDays,
        handlePrevMonth,
        handleNextMonth,
        selectedImage,
        isModalOpen,
        closeModal
      } = CalendarContainer();
  
      render(
        <div>
          <div>{currentMonth}</div>
          <div>{renderDaysOfWeek}</div>
          <div>{renderCalendarDays}</div>
          <button onClick={handlePrevMonth}>Prev</button>
          <button onClick={handleNextMonth}>Next</button>
          <div>{selectedImage}</div>
          <div>{isModalOpen}</div>
        </div>
      );
  
      const currentMonthElement = screen.getByText(currentMonth);
      const isCurrentMonthElementInDOM = !!currentMonthElement;
      expect(isCurrentMonthElementInDOM).toBe(true);
    });

    describe('CalendarContainer', () => {
        it('displays the current month', () => {
          const {
            currentMonth,
            renderDaysOfWeek,
            renderCalendarDays,
            handlePrevMonth,
            handleNextMonth,
            selectedImage,
            isModalOpen,
            closeModal
          } = CalendarContainer();
      
          render(
            <div>
              <div>{currentMonth}</div>
              <div>{renderDaysOfWeek}</div>
              <div>{renderCalendarDays}</div>
              <button onClick={handlePrevMonth}>Prev</button>
              <button onClick={handleNextMonth}>Next</button>
              <div>{selectedImage}</div>
              <div>{isModalOpen}</div>
            </div>
          );
      
          const currentMonthElement = screen.getByText(currentMonth);
          const isCurrentMonthElementInDOM = !!currentMonthElement;
          expect(isCurrentMonthElementInDOM).toBe(true);
        });
      
        it('renders days of the week', () => {
          const {
            renderDaysOfWeek,
          } = CalendarContainer();
      
          render(
            <div>
              <div data-testid="days-of-week">{renderDaysOfWeek}</div>
            </div>
          );
      
          const daysOfWeekElement = screen.getByTestId('days-of-week');
          expect(daysOfWeekElement.children.length).toBe(7);
        });
      
        it('renders calendar days', () => {
          const {
            renderCalendarDays,
          } = CalendarContainer();
      
          render(
            <div>
              <div data-testid="calendar-days">{renderCalendarDays}</div>
            </div>
          );
      
          const calendarDaysElement = screen.getByTestId('calendar-days');
          expect(calendarDaysElement.children.length).toBeGreaterThan(0);
        });
      
        it('calls handlePrevMonth when Prev button is clicked', () => {
          const {
            handlePrevMonth,
          } = CalendarContainer();
      
          render(
            <div>
              <button onClick={handlePrevMonth}>Prev</button>
            </div>
          );
      
          const prevButton = screen.getByText('Prev');
          act(() => {
            prevButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          });
          expect(handlePrevMonth).toHaveBeenCalled();
        });
      
        it('calls handleNextMonth when Next button is clicked', () => {
          const {
            handleNextMonth,
          } = CalendarContainer();
      
          render(
            <div>
              <button onClick={handleNextMonth}>Next</button>
            </div>
          );
      
          const nextButton = screen.getByText('Next');
          act(() => {
            nextButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          });
          expect(handleNextMonth).toHaveBeenCalled();
        });
      
        it('displays selected image when image thumbnail is clicked', () => {
          const {
            renderCalendarDays,
            selectedImage,
          } = CalendarContainer();
      
          render(
            <div>
              <div data-testid="calendar-days">{renderCalendarDays}</div>
              <div data-testid="selected-image">{selectedImage}</div>
            </div>
          );
      
          const calendarDayElement = screen.getByTestId('calendar-day');
          act(() => {
            calendarDayElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          });
          const selectedImageElement = screen.getByTestId('selected-image');
        });
      
        it('closes modal when closeModal is called', () => {
          const {
            isModalOpen,
            closeModal,
          } = CalendarContainer();
      
          render(
            <div>
              <div>{isModalOpen}</div>
            </div>
          );
      
          act(() => {
            closeModal();
          });
          const modalElement = screen.queryByTestId('modal');
        });
      });
  });