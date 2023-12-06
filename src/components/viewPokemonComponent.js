import React from "react";

import { useState } from "react";

import typeColours from "./colours";

import "../css/pokemonInfo.css";

import normal from "../img/normal.png";
import shiny from "../img/shiny.png";

export default function ViewPokemonComponent(props) {
  const pokemonNumber = props.pokemonInfo.order;

  const [spriteStyle, setSpriteStyle] = useState(true);

  const basicSprite =
    props.pokemonInfo.sprites.other["official-artwork"].front_default;
  const shinySprite =
    props.pokemonInfo.sprites.other["official-artwork"].front_shiny;

  return (
    <div className="mainAboutPokemon">
      <p className="nameOrder">
        {props.pokemonInfo.name}{" "}
        <strong>#{pokemonNumber.toString().padStart(4, "0")}</strong>
      </p>{" "}
      <div className="viewPokemon">
        <div className="viewPokemonLeft">
          <div className="spritesChange">
            <img src={normal} alt="" onClick={() => setSpriteStyle(true)} />
            <img src={shiny} alt="" onClick={() => setSpriteStyle(false)} />
          </div>
          <img src={spriteStyle === true ? basicSprite : shinySprite} alt="" />
        </div>
        <div className="viewPokemonRight">
          <div className="pokemonDetails">
            <div className="attack">
              <strong>
                <p className="infoHeader">Statistics</p>
              </strong>
              <p>
                {props.pokemonInfo.stats.map((statPokemon) => (
                  <div className="stats">
                    <p className="infoValue">
                      <strong>{statPokemon.stat.name}</strong> :{" "}
                      {statPokemon.base_stat}
                    </p>
                  </div>
                ))}
              </p>
            </div>
            <div className="pokemonInfo">
              <div className>
                <strong>
                  <p className="infoHeader">Information</p>
                </strong>
                <p className="infoValue">
                  <strong>Abilities:</strong>{" "}
                  {props.pokemonInfo.abilities[0].ability.name}
                </p>
                <p className="infoValue">
                  <strong>Height:</strong> {props.pokemonInfo.height}
                </p>
                <p className="infoValue">
                  <strong>Weight:</strong> {props.pokemonInfo.weight} lbs
                </p>
              </div>

              <div className="types">
                {props.pokemonInfo.types.map((typesElement, index) => (
                  <>
                    <div
                      key={index}
                      className="typeElements"
                      style={{
                        backgroundColor: typeColours[typesElement.type.name],
                        padding: "5px 20px 5px 20px",
                        borderRadius: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {typesElement.type.name}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
