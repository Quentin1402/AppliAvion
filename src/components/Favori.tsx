import React, { useState, useEffect} from "react"
import '../App.css';
import { Vol } from "../types/types"
import { Header, Row, Wrapper } from './styled';
import { CardBottom, CardTop, CardWrapper } from "./styled";

import axios from "axios";


const App: React.FC = () => {
    const [vol, setVol] = useState<Vol[]>([])
    const [tab, setTab] = useState<string | null >("")
    const [final, setFinal] = useState<string[]>([])

    useEffect(() => {
        fetchFavAer();
    }, []);

    const fetchFavAer = () => {
        const stringifiedFavoriteIds = localStorage.getItem("favoriteIds");
        return stringifiedFavoriteIds;   
    }

    useEffect( () => {
      setTab(fetchFavAer);
      if(tab != null){
        let a = tab.replace('["', '');
        let b = a.replace('"]', '');
        let c = b.split('","');
        setFinal(c);
        
        for(let i = 0; i < c.length ; i++){
            const options = {
                method: 'GET',
                url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchAirport',
                params: {id: c[i]},
                headers: {
                'X-RapidAPI-Key': 'c2a4b54320msh39c2bd408379f9bp100c21jsnd83fb8c8efcf',
                'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
                }
            };
          
            axios.request(options).then(function (response) {
                const data = response.data;
                setVol(data.data)
            }).catch(function (error) {
                console.error(error);
            });
        }
      }
  }, [tab]);  

  return (
    <div>
        <Wrapper>
            <Row>
                <Header >Mes vols favoris </Header>
            </Row>
            <div>
                <CardWrapper>
                    <CardTop>
                    </CardTop>
                    <CardBottom>
                    </CardBottom>
                </CardWrapper>
            </div>
        </Wrapper>
    </div>
  );
}

export default App;