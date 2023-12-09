import React from "react";
import "../css/header.css";

import { Row, Col, Container } from "react-bootstrap";

import logo from "../img/logo.png";

import { AiOutlineHome } from "react-icons/ai";

export default function Header() {
  return (
    <>
      <Row className="header d-flex justify-content-center  py-4">
        {" "}
        <img src={logo} alt="" />
      </Row>
    </>
  );
}
