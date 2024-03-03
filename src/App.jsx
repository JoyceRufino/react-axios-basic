import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import pokemonInstance from "./axios-instance";
import useAxios from "./hooks/use-axios";

function App() {
  const [pokemonList, loading, error] = useAxios({
    axiosInstance: pokemonInstance,
    method: "GET",
    url: "pokemon",
    // otherConfigs,
  });
  const [pokedex, loadingPokedex, errorPokedex] = useAxios({
    axiosInstance: pokemonInstance,
    method: "GET",
    url: "pokedex",
    // otherConfigs,
  });

  const [shape, loadingShape, errorShape] = useAxios({
    axiosInstance: pokemonInstance,
    method: "GET",
    url: "pokemon-shape",
    // otherConfigs,
  });

  console.log(pokemonList, loading, error);

  if (loading) {
    return <div>Carregando.....</div>;
  }
  if (error) {
    return <div>erro 404</div>;
  }
  return (
    <>
      <div>INICIO DE PROJETO</div>
      <div>
        {pokemonList.results.map((pokemon, index) => (
          <div key={index}>{pokemon.name}</div>
        ))}
      </div>
      <p>----</p>
      <div>
        {pokedex.results.map((pokemon, index) => (
          <div key={index}>{pokemon.name}</div>
        ))}
      </div>
      <p>----</p>
      <div>
        {shape.results.map((pokemon, index) => (
          <div key={index}>{pokemon.name}</div>
        ))}
      </div>
    </>
  );
}

export default App;
