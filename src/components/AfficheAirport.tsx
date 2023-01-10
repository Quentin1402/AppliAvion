import { Airport } from "../types/types";
import { CardWrapper } from "./styled";

interface AirportProps{
    airport: Airport;
}

const AirportItem: React.FC<AirportProps> = ({airport}) =>{
    return(
        <CardWrapper id = "airport">
            <p>Pays : {airport.CountryName} &nbsp; Ville : {airport.CityName} </p>
            <p>Aéroport : {airport.PlaceName} &nbsp; Aéroport ID : {airport.PlaceId}</p>
        </CardWrapper>
    )
}

export default AirportItem