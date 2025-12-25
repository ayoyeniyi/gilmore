import Header from "./Header";
import CardDeck from "./CardDeck";
import { useState, useEffect } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    setHighScore(currScore => Math.max(currScore, score));
  }, [score])

  async function loadCards() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await res.json();
    setPokemon(data.results);
  }

  useEffect(() => {
    loadCards();
  }, [])

  return (
    <>
      <Header score={score} highScore={highScore} />
      <CardDeck pokemon={pokemon}/>
    </>
  )
}

export default App