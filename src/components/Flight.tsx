import React, { useState} from "react"
import '../App.css';
import AirportItem from './AfficheAirport';
import { Airport } from "../types/types"
import { Button, Form, Header, Row, Search, Wrapper } from './styled';
import axios from "axios";


const App: React.FC = () => {
  const [airports, setAirport] = useState<Airport[]>([])
  const [search, setSearch] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.target.value)
  }

  const getAirport = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const options = {
        method: 'GET',
        url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlights',
        params: {
          origin: 'LOND',
          destination: 'NYCA',
          date: '<REQUIRED>',
          adults: '1',
          currency: 'USD',
          countryCode: 'US',
          market: 'en-US'
        },
        headers: {
          'X-RapidAPI-Key': 'c2a4b54320msh39c2bd408379f9bp100c21jsnd83fb8c8efcf',
          'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
  }

  return (
    <div>
      <Wrapper>
        <Row>
          <Header> Aéroport </Header>
        </Row>
        <Form onSubmit={getAirport}>
          <Search
            type="text"
            placeholder='Recherche'
            value={search} 
            onChange={handleChange}/>
            <Button type='submit'> Rechercher </Button>
        </Form>
        <div>
          { airports.length > 0 &&
            airports.map(airport => <AirportItem key={airport.PlaceId} airport={airport}/>)
          }
        </div>
      </Wrapper>
    </div>
  );
}

export default App;