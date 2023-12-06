import React from "react";

import {useState} from "react"

import "../css/pokemonInfo.css";

export default function ViewPokemonComponent(props) {
  const pokemonNumber = props.pokemonInfo.order;

  const [spriteStyle,setSpriteStyle] = useState(true)

  const basicSprite = props.pokemonInfo.sprites.other["official-artwork"].front_default
  const shinySprite = props.pokemonInfo.sprites.other["official-artwork"].front_shiny

  return (
    
    <div className="viewPokemon">
      <div className="viewPokemonLeft">
      <div className="spritesChange">
        <button onClick={()=>setSpriteStyle(true)}>Basic</button>
        <button onClick={()=>setSpriteStyle(false)}>Shiny</button>
      </div>
      <img
        src={spriteStyle===true ? basicSprite: shinySprite}
        alt=""
      />
      <h3>{props.pokemonInfo.name}</h3>
      <p className="pokemonNumber">
        {pokemonNumber.toString().padStart(4, "0")}
      </p>
      </div>
      <div className="viewPokemonRight">
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
    </div>
  );
}
