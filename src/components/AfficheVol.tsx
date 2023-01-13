import { Vol } from "../types/types";
import { CardBottom, CardTop, CardWrapper } from "./styled";

interface VolProps{
    vol: Vol;
}

const VolItem: React.FC<VolProps> = ({vol}) =>{

    const handleFavoriteClick = (  ) => {
        
        let stringifiedFavoriteIds = localStorage.getItem("favoriteIds");
        let favoriteIds = [];
    
        if (stringifiedFavoriteIds) {
          favoriteIds = JSON.parse(stringifiedFavoriteIds);
        }
    
        if (!favoriteIds.includes(vol.id)) {
          favoriteIds.push(vol.id);
          stringifiedFavoriteIds = JSON.stringify(favoriteIds);
          localStorage.setItem("favoriteIds", stringifiedFavoriteIds);
        }
    };

    return(
        <CardWrapper>
            <CardTop>
                <p>Aéroport de départ : {vol.legs[0].origin.name}</p>
                <p>Aéroport d'arrivée : {vol.legs[0].destination.name}</p>
            </CardTop>
            <CardBottom>
                <p>Date de départ : {vol.legs[0].departure.toLocaleString()}</p>
                <p>Date d'arrivée : {vol.legs[0].arrival.toLocaleString()}</p>
                {/*<button onClick={handleFavoriteClick}>Ajouter au favoris</button>*/}
            </CardBottom>
        </CardWrapper>
    )
}

export default VolItem