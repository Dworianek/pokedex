import React from "react";

import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

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
    <>
      <Row className="d-flex justify-content-center ">
        <p className="nameOrder">
          {props.pokemonInfo.name}{" "}
          <strong>#{pokemonNumber.toString().padStart(4, "0")}</strong>
        </p>{" "}
      </Row>
      <Row className="py-3">
        <Col xl={4} className="d-flex-row justify-content-between">
          <Row className="d-flex justify-content-center my-3 spritesChange">
            <img src={normal} alt="" onClick={() => setSpriteStyle(true)} />
            <img src={shiny} alt="" onClick={() => setSpriteStyle(false)} />
          </Row>
          <Row className="d-flex justify-content-center pokemonSprite">
            <img
              src={spriteStyle === true ? basicSprite : shinySprite}
              alt=""
            />
          </Row>
          <Row>
            <div className="types">
              {props.pokemonInfo.types.map((typesElement, index) => (
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
              ))}
            </div>
          </Row>
        </Col>
        <Col
          xl={7}
          className="d-flex justify-content-center align-items-center pokemonStatInfo"
        >
          <Col>
            <strong>
              <p className="infoHeader">Informacje</p>
            </strong>
            <div>
              <strong></strong>
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
            <strong>
              <p className="infoHeader">Statystyki</p>
            </strong>

            {props.pokemonInfo.stats.map((statPokemon) => (
              <div className="infoValue" key={statPokemon.stat.name}>
                <strong>{statPokemon.stat.name}</strong> :{" "}
                {statPokemon.base_stat}
              </div>
            ))}
          </Col>
        </Col>
      </Row>
    </>
  );
}
