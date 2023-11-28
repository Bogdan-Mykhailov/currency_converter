import React, {useEffect} from 'react';
import {Container, CurrencyCounter, Footer, Header, Table} from "./components";
import {fetchCurrencyData} from "./api/fetchData";
import './App.module.css'
import {setCurrencyRates, useAppDispatch} from "./services";
import {setIsError, setIsLoading} from "./services/features/app";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setIsLoading(true));
        const response = await fetchCurrencyData();
        dispatch(setCurrencyRates(response));
      } catch (error) {
        dispatch(setIsError(true));
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Container>
        <div>
          <Table />
          <CurrencyCounter />
        </div>
      </Container>
      <Footer />
    </div>
  );
};
