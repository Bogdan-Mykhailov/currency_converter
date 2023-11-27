import React, {useEffect, useState} from 'react';
import {Container, Footer, Header, Table} from "./components";
import {CurrencyDataType} from "./utils/types";
import {fetchCurrencyData} from "./api/fetchData";
import './App.module.css'


export const App = () => {
  const [currency, setCurrency] = useState<CurrencyDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCurrencyData();
        setCurrency(response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <Container>
        <Table
          currency={currency}
          isLoading={isLoading}
          isError={isError}
        />
      </Container>
      <Footer />
    </div>
  );
};
