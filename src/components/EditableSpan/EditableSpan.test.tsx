import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { EditableSpan } from './EditableSpan';

describe('EditableSpan Component', () => {
  test('renders span when not editing', () => {
    render(<EditableSpan value="10.5" />);
    const spanElement = screen.getByText(/10.5/);
    expect(spanElement).toBeInTheDocument();
  });

  test('enters edit mode on double click', async () => {
    render(<EditableSpan value="10.5" />);
    const spanElement = screen.getByText(/10.5/);

    fireEvent.doubleClick(spanElement);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('updates value and saves changes', async () => {
    render(<EditableSpan value="10.5" />);
    const spanElement = screen.getByText(/10.5/);

    fireEvent.doubleClick(spanElement);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '15' } });

    const checkButton = screen.getByAltText('check');
    fireEvent.click(checkButton);

    await waitFor(() => {
      const updatedSpanElement = screen.getByText(/15/);
      expect(updatedSpanElement).toBeInTheDocument();
    });
  });

  test('cancels editing and reverts to original value', async () => {
    render(<EditableSpan value="10.5" />);
    const spanElement = screen.getByText(/10.5/);

    fireEvent.doubleClick(spanElement);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '15' } });

    const crossButton = screen.getByAltText('cross');
    fireEvent.click(crossButton);

    await waitFor(() => {
      const originalSpanElement = screen.getByText(/10.5/);
      expect(originalSpanElement).toBeInTheDocument();
    });
  });
});
