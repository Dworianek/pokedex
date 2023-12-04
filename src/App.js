import "./App.css";

import { useState, useEffect } from "react";

import PokemonComponent from "./components/pokemonComponent";
import ViewPokemonComponent from "./components/viewPokemonComponent";
import Header from "./components/header";

const fetchLink = "https://pokeapi.co/api/v2/pokemon";

function App() {
  const [pokemonList, setPokemonList] = useState([]); //Lista pokemonów
  const [allPokedex, setAllPokedex] = useState([]); //Szczególy każdego pokemona

  const [allTypePokemon, setAllTypePokemon] = useState([...allPokedex]); //Szczególy każdego pokemona

  const [allTypes, setAllTypes] = useState([
    "all",
    "fire",
    "grass",
    "water",
    "bug",
    "normal",
  ]);

  const [typeClick, setTypeClick] = useState("all");

  const [viewPokemon, setViewPokemon] = useState({});

  const [toggleClick, setToggleClick] = useState(false);

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

  const allPokemon =
    typeClick === "all"
      ? allPokedex.map((pokemon) => (
          <PokemonComponent pokemon={pokemon} onClick={pokemonOnClick} />
        ))
      : allTypePokemon.map((pokemon) => (
          <PokemonComponent pokemon={pokemon} onClick={pokemonOnClick} />
        ));

  const showTypes = allTypes.map((type) => (
    <>
      <li
        onClick={() => {
          setAllTypePokemon(
            allPokedex.filter(
              (pokemonType) => pokemonType.types[0].type.name === type
            )
          );
          setTypeClick(type);
        }}
      >
        {type}
      </li>
    </>
  ));

  return (
    <>
      <div id="header">
        <Header />
      </div>
      <div id="main">
        <div id="content">
          <div className="showTypes">{showTypes}</div>
          <div className="showPokemon">{allPokemon}</div>
        </div>
        <div id="aside">
          {toggleClick ? (
            <ViewPokemonComponent pokemonInfo={viewPokemon} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
