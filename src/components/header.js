import React from "react";
import "../css/header.css";

import logo from "../img/logo.png";

import { AiOutlineHome } from "react-icons/ai";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="menu">
        <ul>
          <li>
            {" "}
            <AiOutlineHome /> HOME
          </li>
          <li>POKEMONY</li>
          <li>TRENERZY</li>
          <li>PRZEDMIOTY</li>
          <li>GRY</li>
          <li>
            <input type="search" placeholder="Wyszukaj..." utofocus required />{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}
