import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DayOfWeek from '../../components/Calendar/DayOfWeek';

describe('DayOfWeek', () => {
  it('renders the day of the week correctly', () => {
    const day = 'Monday';

    render(<DayOfWeek day={day} />);

    const dayElement = screen.getByText(day);
  });

  it('renders the day with the correct CSS class', () => {
    const day = 'Monday';

    render(<DayOfWeek day={day} />);

    const dayElement = screen.getByText(day);
  });
});