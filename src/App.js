import "./App.css";

import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import PokemonComponent from "./components/pokemonComponent";
import ViewPokemonComponent from "./components/viewPokemonComponent";
import Header from "./components/header";
import MyTeam from "./components/myTeam";
import Footer from "./components/footer";

import typeColours from "./components/colours";

const fetchLink = "https://pokeapi.co/api/v2/pokemon?limit=151";

function App() {
  const [pokemonList, setPokemonList] = useState([]); //Lista pokemonów

  const [allPokedex, setAllPokedex] = useState([]); //Szczególy każdego pokemona

  const [allTypePokemon, setAllTypePokemon] = useState([...allPokedex]); //Szczególy każdego pokemona dla konkretnego typu

  const [typeClick, setTypeClick] = useState("all");

  const [viewPokemon, setViewPokemon] = useState({});

  const [toggleClick, setToggleClick] = useState(false);

  const [myTeam, setMyTeam] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [allTypes, setAllTypes] = useState([
    "all",
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "steel",
    "fairy",
  ]);

  useEffect(() => {
    fetch(fetchLink)
      .then((response) => response.json())
      .then((data) => {
        const promises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((response2) => response2.json())
        );
        Promise.all(promises).then((allPokemonData) => {
          setAllPokedex(allPokemonData);
          setPokemonList(data.results);
        });
      });
  }, []);

  const pokemonOnClick = (pokemon) => {
    setViewPokemon(pokemon);
    setToggleClick(true);
  };

  const addPokemonToTeam = (pokemon) => {
    const index = myTeam.findIndex((obiekt) => obiekt.order === pokemon.order);

    if (index == -1) {
      if (myTeam.length < 6) {
        setMyTeam([
          ...myTeam,
          {
            order: pokemon.order,
            name: pokemon.name,
            img: pokemon.sprites.other["official-artwork"].front_default,
          },
        ]);
      } else {
        alert("Możesz mieć maksymalnie 6 pokemonów.");
      }
    } else {
      alert(`Masz już ${pokemon.name}'a w swojej drużynie.`);
    }
  };

  const allPokemonToRender = typeClick === "all" ? allPokedex : allTypePokemon;

  const filteredPokemon = allPokemonToRender.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderedPokemon = filteredPokemon.map((pokemon) => (
    <PokemonComponent
      key={pokemon.id}
      pokemon={pokemon}
      addTeamClick={addPokemonToTeam}
      onClick={pokemonOnClick}
    />
  ));

  const showTypes = allTypes.map((type) => (
    <Col>
      <div
        className="showTypes"
        style={{
          backgroundColor: typeColours[type],
        }}
        onClick={() => {
          setAllTypePokemon(
            allPokedex.filter(
              (pokemonType) =>
                pokemonType.types[0]?.type.name === type ||
                pokemonType.types[1]?.type.name === type
            )
          );
          setTypeClick(type);
        }}
      >
        {type}
      </div>
    </Col>
  ));

  const removePokemonFromTeam = (order) => {
    const tempTab = myTeam.filter((pokemon) => pokemon.order != order);
    setMyTeam(tempTab);
  };

  const pokemonTeam = myTeam.map((pokemon) => (
    <MyTeam
      key={pokemon.id}
      {...pokemon}
      removePokemonFromTeam={removePokemonFromTeam}
    />
  ));

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div id="mainPage">
        <Container style={{ backgroundColor: "#f0f0f0" }}>
          <Header />

          <Row className="my-4 gap-4 d-flex align-items-center justify-content-center">
            {myTeam.length > 0 ? (
              <Col
                sm={4}
                className="d-flex-column justify-content-center align-items-center"
              >
                <Row className="d-flex justify-content-center align-items-center my-2">
                  <h4 className="text-center">Wybierz swoją drużynę</h4>
                </Row>
                <Row
                  xxl={3}
                  className="d-flex justify-content-center align-items-center "
                >
                  {pokemonTeam}
                </Row>
              </Col>
            ) : null}
            {viewPokemon.order > 0 ? (
              <Col
                sm={7}
                className="d-flex-column justify-content-center align-items-center pokemonInfo py-2 px-4"
              >
                {toggleClick ? (
                  <ViewPokemonComponent pokemonInfo={viewPokemon} />
                ) : null}
              </Col>
            ) : null}
          </Row>
          <Row className="d-flex justify-content-center align-items-center my-5">
            <Col xl={9}>
              <Row className="gap-1">{showTypes}</Row>
            </Col>
            <Col
              xl={2}
              className="d-flex justify-content-center align-items-center"
            >
              <Form.Control
                className="inputSearch"
                onChange={handleSearchValue}
                type="text"
                placeholder="Wyszukaj po nazwie"
                value={searchValue}
              />
            </Col>
          </Row>

          <Row className="showPokemon"> {renderedPokemon}</Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Footer />
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
