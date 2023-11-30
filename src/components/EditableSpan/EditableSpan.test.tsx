import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { EditableSpan } from './EditableSpan';

describe('EditableSpan Component', () => {
  it('renders span when not editing', () => {
    render(<EditableSpan value="10.5" />);
    const spanElement = screen.getByText(/10.5/);
    expect(spanElement).toBeInTheDocument();
  });

  it('enters edit mode on double click', async () => {
    render(<EditableSpan value="10.5" />);
    const spanElement = screen.getByText(/10.5/);

    fireEvent.doubleClick(spanElement);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('updates value and saves changes', async () => {
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

  it('cancels editing and reverts to original value', async () => {
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
