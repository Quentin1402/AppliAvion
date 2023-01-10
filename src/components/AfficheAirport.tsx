import { Airport } from "../types/types";
import { CardBottom, CardTop, CardWrapper } from "./styled";

interface AirportProps{
    airport: Airport;
}

const AirportItem: React.FC<AirportProps> = ({airport}) =>{
    return(
        <CardWrapper id = "airport">
            <CardTop>
                <p>Pays : {airport.CountryName} &nbsp;&nbsp;&nbsp;&nbsp; Ville : {airport.CityName} </p>
            </CardTop>
            <CardBottom>
                <p>Aéroport : {airport.PlaceName} &nbsp;&nbsp;&nbsp;&nbsp; Aéroport ID : {airport.PlaceId}</p>
            </CardBottom>
        </CardWrapper>
    )
}

export default AirportItem