import Header from "./Header";
import CardDeck from "./CardDeck";
import { useState, useEffect } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [cards, setCards] = useState([]);


  useEffect(() => {
    setHighScore(currScore => Math.max(currScore, score));
  }, [score])

  async function loadPokemon() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await res.json();
    setPokemon(data.results);
  }

  useEffect(() => {
    loadPokemon();
  }, [])

  useEffect(() => {
    async function loadCard() {
      if (!pokemon.length) return;

      const cardsArray = await Promise.all(pokemon.map(async (beast) => {
        const res = await fetch(beast.url);
        const data = await res.json();
        return {
          id: data.id,
          name: data.name,
          image: data.sprites["front_default"]
        }
      }));

      setCards(cardsArray);
    }
    loadCard();
  }, [pokemon])

  useEffect(() => {
    console.log(cards);
  }, [cards])

  return (
    <>
      <Header score={score} highScore={highScore} />
      <CardDeck cards={cards} />
    </>
  )
}

export default App