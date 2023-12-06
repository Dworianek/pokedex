import React from "react";

import "../css/pokemonElement.css";

import typeColours from './colours'
import pokeballIcon from '../img/pokeball.png'


export default function PokemonComponent(props) {
  const number = props.pokemon.order;
  return (
    <div
      className="pokemonElement"
      onClick={() => {props.onClick(props.pokemon)}}
    >
      <img
         className="pokemonIcon" src={props.pokemon.sprites.other["official-artwork"].front_default}
        alt=""
      />
      <p className="pokemonNumber">{number.toString().padStart(4, "0")}</p>
      <h2 className="pokemonName">{props.pokemon.name}</h2>
      <div className="types">
        {props.pokemon.types.map((typesElement, index) => (
          <>
            <div  key={index} className="typeElements" style={{backgroundColor:typeColours[typesElement.type.name], padding:"2px 7px 2px 7px,", borderRadius:"10px"}}>
               {typesElement.type.name}
            </div>
          </>
        ))}
      </div>
      <img className="pokeballIcon" src={pokeballIcon} alt="" onClick={()=>{props.addTeamClick(props.pokemon)}}/>
    </div>

  );
}

{
}
