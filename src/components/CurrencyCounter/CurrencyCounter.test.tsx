import {fireEvent, render, waitFor, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { CurrencyCounter } from './CurrencyCounter';
import {store} from "../../services";

describe('CurrencyCounter', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <CurrencyCounter />
      </Provider>
    );

    const changeLabel = screen.getByLabelText('Change');
    const getLabel = screen.getByLabelText('Get');

    expect(changeLabel).toBeInTheDocument();
    expect(getLabel).toBeInTheDocument();

    const changeInput = screen.getByLabelText('Change') as HTMLInputElement;
    const getInput = screen.getByLabelText('Get') as HTMLInputElement;

    expect(changeInput.value).toBe('1');
    expect(getInput.value).toBe('');

    const changeSelect = screen.getByLabelText('Change') as HTMLSelectElement;
    const getSelect = screen.getByLabelText('Get') as HTMLSelectElement;

    expect(changeSelect.value).toBe('1');
    expect(getSelect.value).toBe('');
  });

  test('swaps currencies on icon click', async () => {
    render(
      <Provider store={store}>
        <CurrencyCounter />
      </Provider>
    );

    const swapIcon = screen.getByAltText('Switch Icon');
    fireEvent.click(swapIcon);

    await waitFor(() => {
      const inputChange = screen.getByLabelText('Change');
      const inputGet = screen.getByLabelText('Get');

      expect(inputChange).toHaveValue(null);
      expect(inputGet).toHaveValue('1');
    });
  });


});
