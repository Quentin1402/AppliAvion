export type Airport = {
    PlaceId : number;
    CityName : string;
    CountryName : string;
    PlaceName : string;
}

export type Vol = {
    date: string;
    id: string;
    legs : [
        {origine:{
            id: number,
            name:string
        }, destination:{
            id: number,
            name:string
        },
            id:"string",
            depart:string,
            arrive:string
        }
    ],
}