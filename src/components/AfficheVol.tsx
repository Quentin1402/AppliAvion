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
        <>
            <CardWrapper>
                <CardTop>
                    <p>Aéroport de départ allé : {vol.legs[0].origin.name}</p>
                    <p>Aéroport d'arrivée allé : {vol.legs[0].destination.name}</p>
                </CardTop>
                <CardBottom>
                    <p>Date de départ allé : {vol.legs[0].departure.toLocaleString()}</p>
                    <p>Date d'arrivée allé : {vol.legs[0].arrival.toLocaleString()}</p>
                    <button onClick={handleFavoriteClick}>Ajouter au favoris</button>
                </CardBottom>
            </CardWrapper>
            {vol.legs[1]? 
                <CardWrapper>
                    <CardTop>
                        <p>Aéroport de départ retour : {vol.legs[1].origin.name}</p>
                        <p>Aéroport d'arrivée retour : {vol.legs[1].destination.name}</p>
                    </CardTop>
                    <CardBottom>
                        <p>Date de départ retour : {vol.legs[1].departure.toLocaleString()}</p>
                        <p>Date d'arrivée retour : {vol.legs[1].arrival.toLocaleString()}</p>
                        <button onClick={handleFavoriteClick}>Ajouter au favoris</button>
                    </CardBottom>
                </CardWrapper>
            : null}
        </>
    )
}

export default VolItem
