import "./App.css";

import { useState, useEffect } from "react";

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

  const [allTypePokemon, setAllTypePokemon] = useState([...allPokedex]); //Szczególy każdego pokemona

  const [typeClick, setTypeClick] = useState("all");

  const [viewPokemon, setViewPokemon] = useState({});

  const [toggleClick, setToggleClick] = useState(false);

  const [myTeam, setMyTeam] = useState([]);
  const [myTeamType, setMyTeamType] = useState([]);

  const [myTeamType, setMyTeamType] = useState([]);

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
        setMyTeamType([...myTeamType, pokemon.types[0]?.type.name])
      } else {
        alert("Możesz mieć maksymalnie 6 pokemonów.");
      }
    } else {
      alert(`Masz już ${pokemon.name}'a w swojej drużynie.`);
    }
  };

  const allPokemon =
    typeClick === "all"
      ? allPokedex.map((pokemon) => (
          <PokemonComponent
            pokemon={pokemon}
            addTeamClick={addPokemonToTeam}
            onClick={pokemonOnClick}
          />
        ))
      : allTypePokemon.map((pokemon) => (
          <PokemonComponent
            pokemon={pokemon}
            addTeamClick={addPokemonToTeam}
            onClick={pokemonOnClick}
          />
        ));

  const showTypes = allTypes.map((type) => (
    <>
      <li
        style={{ backgroundColor: typeColours[type] }}
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
      </li>
    </>
  ));

  const removePokemonFromTeam = (order) => {
    const tempTab = myTeam.filter((pokemon) => pokemon.order != order);
    setMyTeam(tempTab);
  };

  const pokemonTeam = myTeam.map((pokemon) => (
    <MyTeam {...pokemon} removePokemonFromTeam={removePokemonFromTeam} />
  ));

  const pokemonTeamTypes = myTeamType.map((type) => (
  <>
   <p>{type}</p>
   </>
  ));


  return (
    <>
      <div id="header">
        <Header />
      </div>
      <div id="nav">
        <div id="pokemonTeam">{pokemonTeam}{pokemonTeamTypes}</div>
        <div id="pokemonInfo">
          {toggleClick ? (
            <ViewPokemonComponent pokemonInfo={viewPokemon} />
          ) : null}
        </div>
      </div>
      <div id="main">
        <div id="content">
          <div className="showTypes">{showTypes}</div>
          <div className="showPokemon">{allPokemon}</div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default App;
