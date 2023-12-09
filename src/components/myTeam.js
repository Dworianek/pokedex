import React from "react";

import { Row, Col } from "react-bootstrap";

import "../css/myTeam.css";

import oak from "../img/oak.png";

export default function MyTeams(props) {
  return (
    <Col className="my-xl-2">
      <div className="chooseTeam">
        <div className="pokemonTeamElement">
          <img src={props.img} alt="" />
        </div>
        <div className="removePokemon">
          <img
            className="oakImg"
            src={oak}
            alt=""
            onClick={() => props.removePokemonFromTeam(props.order)}
          />
        </div>
      </div>
    </Col>
  );
}
