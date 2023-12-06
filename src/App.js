import "./App.css";

import { useState, useEffect } from "react";

import PokemonComponent from "./components/pokemonComponent";
import ViewPokemonComponent from "./components/viewPokemonComponent";
import Header from "./components/header";
import MyTeam from "./components/myTeam";

const fetchLink = "https://pokeapi.co/api/v2/pokemon?limit=151";

function App() {
  const [pokemonList, setPokemonList] = useState([]); //Lista pokemonów
  const [allPokedex, setAllPokedex] = useState([]); //Szczególy każdego pokemona

  const [allTypePokemon, setAllTypePokemon] = useState([...allPokedex]); //Szczególy każdego pokemona

  const [typeClick, setTypeClick] = useState("all");

  const [viewPokemon, setViewPokemon] = useState({});

  const [toggleClick, setToggleClick] = useState(false);

  const [myTeam,setMyTeam] = useState([
    {
      order:'001',
      name:"bulbasaur",
      img : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" 
    },
    {
      order:'0209',
      name:"tauros",
      img : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/128.svg"
    }
    ])

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

  const typeColours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

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

  const addPokemonToTeam = (pokemon) =>{
    setMyTeam([...myTeam,{ 
      order:pokemon.order,
      name: pokemon.name,
      img : pokemon.sprites.other.dream_world.front_default
    }])
  }

  const allPokemon =
    typeClick === "all"
      ? allPokedex.map((pokemon) => (
          <PokemonComponent pokemon={pokemon} addTeamClick={addPokemonToTeam} onClick={pokemonOnClick} />
        ))
      : allTypePokemon.map((pokemon) => (
          <PokemonComponent pokemon={pokemon} addTeamClick={addPokemonToTeam} onClick={pokemonOnClick} />
        ));

  const showTypes = allTypes.map((type) => (
    <>
      <li style={{backgroundColor:typeColours[type]}}
        onClick={() => {
          setAllTypePokemon(
            allPokedex.filter(
              (pokemonType) => pokemonType.types[0]?.type.name === type ||
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


  const pokekemonTeam = myTeam.map(pokemon => (
    <MyTeam {...pokemon}/>
  ))

  return (
    <>
      <div id="header">
        <Header />
      </div>
      <div id="nav">
        <div id="pokemonTeam">{pokekemonTeam}</div>
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
    </>
  );
}

export default App;
