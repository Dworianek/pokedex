import React from "react";

import "../css/myTeam.css";

import oak from "../img/oak.png";

export default function MyTeams(props) {
  return (
    <div className="chooseTeam">
      <div className="pokemonTeamElement">
        <img src={props.img} alt="" />
      </div>
      <img
        width={35}
        src={oak}
        alt=""
        onClick={() => props.removePokemonFromTeam(props.order)}
      />
    </div>
  );
}
