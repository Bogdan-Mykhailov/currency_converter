import React, {useEffect} from 'react';
import {Container, CurrencyCounter, Error, Footer, Header, Spinner, Table} from "./components";
import {fetchCurrencyData} from "./api/fetchData";
import {setCurrencyRates, useAppDispatch, useAppSelector} from "./services";
import {setIsError, setIsLoading} from "./services/features/app";

export const App = () => {
  const dispatch = useAppDispatch();
  const {isError, isLoading} = useAppSelector(state => state.app)

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
    <div>
      <Header/>
      <Container>
        {
          isLoading
            ? <Spinner/>
            : <div>
              {
                isError
                  ? <Error/>
                  : <div  style={{display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: "center"}}>
                    <Table/>
                    <CurrencyCounter/>
                  </div>
              }
            </div>
        }
      </Container>
      <Footer/>
    </div>
  );
};
