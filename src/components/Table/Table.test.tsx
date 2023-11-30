import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider
import { Table } from './Table';
import {store} from "../../services";
import {getRoundedNumber} from "../../utils/helpers";

describe('Table Component', () => {
  test('renders table with currency data', () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
  test('renders table headers', () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const currencyHeader = screen.getByText(/Currency/i);
    const buyHeader = screen.getByText(/Buy/i);
    const sellHeader = screen.getByText(/Sell/i);

    expect(currencyHeader).toBeInTheDocument();
    expect(buyHeader).toBeInTheDocument();
    expect(sellHeader).toBeInTheDocument();
  });

  test('renders currency data rows', () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const currencyData = store.getState().currency.currencies;
    currencyData.forEach(({ ccy, base_ccy, buy, sale }) => {
      const currencyRow = screen.getByText(`${ccy}/${base_ccy}`);
      const buyCell = screen.getByText(getRoundedNumber(buy));
      const sellCell = screen.getByText(getRoundedNumber(sale));

      expect(currencyRow).toBeInTheDocument();
      expect(buyCell).toBeInTheDocument();
      expect(sellCell).toBeInTheDocument();
    });
  });

  test('renders editable spans with rounded numbers', () => {
    render(
      <Provider store={store}>
        <Table />
      </Provider>
    );

    const currencyData = store.getState().currency.currencies;
    currencyData.forEach(({ buy, sale }) => {
      const buyCell = screen.getByText(getRoundedNumber(buy));
      const sellCell = screen.getByText(getRoundedNumber(sale));

      expect(buyCell.tagName).toBe('SPAN');
      expect(sellCell.tagName).toBe('SPAN');
    });
  });
});
