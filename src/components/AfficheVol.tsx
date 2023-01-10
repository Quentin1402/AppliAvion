import { Vol } from "../types/types";
import { CardWrapper } from "./styled";

interface VolProps{
    vol: Vol;
}

const VolItem: React.FC<VolProps> = ({vol}) =>{
    return(
        <CardWrapper id = "vol">
            <p>{vol.Id}</p>
            <p>Départ : {vol.Origine} &nbsp; Arrivée : {vol.Destination}</p>
        </CardWrapper>
    )
}

export default VolItem