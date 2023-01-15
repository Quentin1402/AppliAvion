import React, { useState, useEffect} from "react"
import '../App.css';
import { Vol } from "../types/types"
import { Header, Row, Wrapper } from './styled';
import { CardBottom, CardTop, CardWrapper } from "./styled";
import axios, { AxiosResponse } from "axios";

const Favori: React.FC = () => {
    const [vol, setVol] = useState<Vol[]>([])

    const getFavVol = () => {
        const stringifiedFavoriteIds = localStorage.getItem("favoriteIds");
        if(stringifiedFavoriteIds) {
            return JSON.parse(stringifiedFavoriteIds);
        } else {
            return [];
        }
    }

    useEffect( () => {
      const tab = getFavVol();
      if(tab != null) {
        
        for(let i = 0; i < tab.length ; i++){
            const options = {
                method: 'GET',
                url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlights',
                params: {id: tab[i]},
                headers: {
                'X-RapidAPI-Key': 'c2a4b54320msh39c2bd408379f9bp100c21jsnd83fb8c8efcf',
                'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
                }
            };
          
            axios.request(options).then(function (response :AxiosResponse<{data: Vol}>) {
                console.log(response);
                const data = response.data;
            }).catch(function (error) {
                console.error(error);
            });
        }
      }
  }, []);  

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

export default Favori;
