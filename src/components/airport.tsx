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
      url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchAirport',
      params: {query: `${search}`},
      headers: {
        'X-RapidAPI-Key': 'c2a4b54320msh39c2bd408379f9bp100c21jsnd83fb8c8efcf',
        'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      const data = response.data;
      if(data.data.length == 0) {
        setError(true)
        setMessage("Aucun Aéroport trouvé")
        setAirport([])
      } else {
        setError(false)
        let tab = new Array()
        for(let i = 0; i < data.data.length; i++) {
          if(data.data[i].CityName.toLowerCase() == `${search}`.toLowerCase()) {
            tab[i] = data.data[i]
          }
        }
        setAirport(tab)
      }
    }).catch(function (error) {
      console.error(error);
    });
    setSearch("")
  }

  return (
    <div>
      <Wrapper>
        <Row>
          <Header> Aéroport </Header>
        </Row>
        <Form onSubmit={getAirport}>
          <Search
            id = "ville"
            type="text"
            placeholder='Recherche par ville (ex : Paris)'
            value={search} 
            onChange={handleChange}/>
            <Button type='submit'> Rechercher</Button>
        </Form>
        <div>
          {
            error && <p>{`${message}`}</p>
          }
          { airports.length > 0 &&
            airports.map(airport => <AirportItem key={airport.PlaceId} airport={airport}/>)
          }
        </div>
      </Wrapper>
    </div>
  );
}

export default App;