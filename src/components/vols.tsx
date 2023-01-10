import React, { useState} from "react"
import '../App.css';
import VolItem from './AfficheVol';
import { Vol } from "../types/types"
import { Button, Form, Header, Row, Search, Wrapper } from './styled';
import axios from "axios";


const App2: React.FC = () => {
  const [vols, setVol] = useState<Vol[]>([])
  const [origine, setOrigine] = useState<string>("")
  const [destination, setDestination] = useState<string>("")
  const [dateD, setDepart] = useState<string>("")
  const [dateA, setArrive] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setOrigine(e.target.value)
  }

  const getAirport = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if(`${dateA}` != "") {

    }

    const options = {
        method: 'GET',
        url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlights',
        params: {
            origin: 'LOND',
            destination: 'NYCA',
            date: '2023-02-05',
            returnDate: '2023-05-05',
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
      const data = response.data;
      let tab = new Array()
      for(let i = 0; i < data.data.length; i++) {
        tab[i] = data.data[i].legs
      }

      if(data.data.length == 0) {
        setError(true)
        setMessage("Aucun vol trouvé avec ces paramètres")
        setVol([])
      } else {
        setError(false)
        setVol(tab)
        console.log(tab)
      }
    }).catch(function (error) {
      console.error(error);
    });
    setOrigine("")
    setDestination("")
  }

  return (
    <div>
      <Wrapper>
        <Row>
          <Header> Vols </Header>
        </Row>
        <Form onSubmit={getAirport}>
            <Row>
                <Search
                    type="text"
                    placeholder='Origine ID (Ex : LOND)'
                    value={origine} 
                    onChange={handleChange}/>
                <label>Date de départ : </label>
                <Search
                    type="date"
                    onChange={handleChange}/>
            </Row>
            <Row>
                <Search
                    type="text"
                    placeholder='Destination ID (Ex : NYCA)'
                    value={destination} 
                    onChange={handleChange}/>
                <label>Date d'arrivé : </label>
                <Search
                    type="date"
                    onChange={handleChange}/>
            </Row>
            <Button type='submit'> Rechercher </Button>
        </Form>
        <div>
          { vols.length > 0 &&
            vols.map(vol => <VolItem key={vol.Id} vol={vol}/>)
          }
        </div>
      </Wrapper>
    </div>
  );
}

export default App2;