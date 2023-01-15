import React, { useState} from "react"
import '../App.css';
import VolItem from './AfficheVol';
import { Vol } from "../types/types"
import { Button, Form, Header, Row, Search, Wrapper } from './styled';
import axios, { AxiosResponse } from "axios";


const App2: React.FC = () => {
  const [vols, setVol] = useState<Vol[]>([])
  const [origine, setOrigine] = useState<string>("")
  const [destination, setDestination] = useState<string>("")
  const [depart, setDepart] = useState<string>("")
  const [arrive, setArrive] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    if(e.target.id === "origine"){
        setOrigine(e.target.value)
    }
    if(e.target.id === "destination"){
        setDestination(e.target.value)
    }
    if(e.target.id === "depart"){
        setDepart(e.target.value)
    }
    if(e.target.id === "arrive"){
        setArrive(e.target.value)
    }
  }

  const getVol = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const options = {
        method: 'GET',
        url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlights',
        params: {
            origin: `${origine}`,
            destination: `${destination}`,
            date: `${depart}`,
            returnDate: `${arrive}`,
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

    axios.request(options).then(function (response :AxiosResponse<{data: Vol[]}>) {
      const data = response.data;
      console.log(data)
      if(data.data.length == 0) {
        setError(true)
        setMessage("Aucun vol trouvé avec ces paramètres")
        setVol([])
      } else {
        data.data.sort((volA, volB) => {
          if(volA.price.amount > volB.price.amount) {
            return 1;
          } else {
            return -1;
          }
        })
        setError(false)        
        setVol(data.data)
      }
    }).catch(function (error) {
        console.error(error);
    });
    setOrigine("")
    setDestination("")
    setDepart("")
    setArrive("")
  }

  return (
    <div>
      <Wrapper>
        <Row>
          <Header> Vols </Header>
        </Row>
        <Form onSubmit={getVol}>
            <Row>
                <Search
                    id="origine"
                    type="text"
                    placeholder='Origine ID (Ex : LOND)'
                    value={origine} 
                    onChange={handleChange}/>
                <Search
                    id="destination"
                    type="text"
                    placeholder='Destination ID (Ex : NYCA)'
                    value={destination} 
                    onChange={handleChange}/>
            </Row>
            <Row>
                <label>Date de départ : </label>
                <Search
                    id="depart"
                    type="date"
                    value={depart}
                    onChange={handleChange}/>
                <label>Date de retour : </label>
                <Search
                    id="arrive"
                    type="date"
                    value={arrive}
                    onChange={handleChange}/>
            </Row>
            <Button type='submit'> Rechercher </Button>
        </Form>
        <div>            
          {
            error && <p>{`${message}`}</p>
          }

          { 
            vols.length > 0 &&
            vols.map(vol => <VolItem key={vol.id} vol={vol}/>)
          }
        </div>
      </Wrapper>
    </div>
  );
}

export default App2;
