import React from "react";

import "../css/pokemonElement.css";

export default function PokemonComponent(props) {
  const number = props.pokemon.order;
  return (
    <div
      className="pokemonElement"
      onClick={() => props.onClick(props.pokemon)}
    >
      <img
        src={props.pokemon.sprites.other["official-artwork"].front_default}
        alt=""
      />
      <p className="pokemonNumber">{number.toString().padStart(4, "0")}</p>
      <h2 className="pokemonName">{props.pokemon.name}</h2>
      <div className="types">
        {props.pokemon.types.map((typesElement, index) => (
          <>
            <div key={index} className="typeElements">
              <strong> {typesElement.type.name} </strong>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

{
}
