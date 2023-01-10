import { Vol } from "../types/types";
import { CardBottom, CardTop, CardWrapper } from "./styled";

interface VolProps{
    vol: Vol;
}

const VolItem: React.FC<VolProps> = ({vol}) =>{

    return(
        <CardWrapper>
            <CardTop>
                    <p>{vol.legs[0].origine.name}</p>
                    <p>{vol.legs[0].destination.name}</p>
            </CardTop>
            <CardBottom>
                <p>{vol.legs[0].depart}</p>
                <p>{vol.legs[0].arrive}</p>
            </CardBottom>
        </CardWrapper>

    )
}

export default VolItem