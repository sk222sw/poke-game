import React, { useState, useEffect } from "react";
import "./App.css";
import { getPokemon } from "./api";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function App() {
  const [currentPokemon, setCurrentPokemon] = useState(undefined);
  const [showName, setShowName] = useState(false);
  const [id, setId] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [max, setMax] = useState(807);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    const fetchData = async () => {
      const result = await (await getPokemon(id)).json();
      setCurrentPokemon(result);

      setShowName(false);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  function go() {
    setId(getRandomInt(max));
  }

  console.log(currentPokemon);
  return (
    <div className="App">
      <header className="App-header">POKEMON</header>
      <div className="content">
        <div className="options">
          {loading ? (
            <p className="loading">loading</p>
          ) : (
            <button className="get-button" onClick={go}>
              Get random
            </button>
          )}
          <input
            type="number"
            max={max}
            min="1"
            onChange={x => setMax(+x.target.value)}
          />
        </div>

        {currentPokemon && (
          <div className="current-pokemon">
            <img
              onClick={() => setShowName(true)}
              alt={`${currentPokemon.name}`}
              src={currentPokemon.sprites.front_default}
            />
            {showName && <p>{currentPokemon.name}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
