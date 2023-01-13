import React from "react";
import '../App.css';
import {Link} from "react-router-dom"

export default function Vols() {
    return(
        
        <nav id="nav">
            <Link id="accueil" to="/">Accueil</Link>
            &ensp; &ensp;
            <Link id="aeroport" to="/airport">Chercher Aéroport</Link>
            &ensp; &ensp;
            <Link id="vol" to="/vols">Chercher Vols</Link>
            &ensp; &ensp;
            <Link id="favori" to="/Favori">Mes Vols Favoris</Link>
        </nav>

    )
}

