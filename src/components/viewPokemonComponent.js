import React from "react";

import "../css/pokemonInfo.css";

export default function ViewPokemonComponent(props) {
  const pokemonNumber = props.pokemonInfo.order;
  return (
    <div className="viewPokemon">
      <img
        src={props.pokemonInfo.sprites.other["official-artwork"].front_default}
        alt=""
      />
      <p className="pokemonNumber">
        {pokemonNumber.toString().padStart(4, "0")}
      </p>
      <h3>{props.pokemonInfo.name}</h3>
      <div className="pokemonDetails">
        <div className="attack">
          <strong>
            <p>Statystyki</p>
          </strong>
          <p>
            {props.pokemonInfo.stats.map((statPokemon) => (
              <div className="stats">
                <p>
                  {statPokemon.stat.name} : {statPokemon.base_stat}
                </p>
              </div>
            ))}
          </p>
        </div>
        <div className="pokemonInfo">
          <strong>
            <p>Informacje</p>
          </strong>
          <p>Umiejętność: {props.pokemonInfo.abilities[0].ability.name}</p>
          <p>Wysokość: {props.pokemonInfo.height}</p>
          <p>Waga: {props.pokemonInfo.weight}</p>
        </div>
      </div>
    </div>
  );
}
