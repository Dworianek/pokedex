import React from "react";
import "../css/header.css";

import { Row, Col, Container } from "react-bootstrap";

import logo from "../img/logo.png";

import { AiOutlineHome } from "react-icons/ai";

export default function Header() {
  return (
    <>
      <Col lg={3} className="d-flex align-items-center justify-content-center">
        {" "}
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </Col>
      <Col
        lg={9}
        className="d-flex align-items-center justify-content-center menu"
      >
        {" "}
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
      </Col>
    </>
  );
}
