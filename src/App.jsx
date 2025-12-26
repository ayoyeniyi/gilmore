import Header from "./Header";
import CardDeck from "./CardDeck";
import { useState, useEffect } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [cards, setCards] = useState([]);

  async function loadPokemon() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=16");
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
          image: data.sprites["front_default"],
          isClicked: false
        }
      }));

      setCards(cardsArray);
    }
    loadCard();
  }, [pokemon])

  function shuffleDeck() {
    const shuffled = [...cards];

    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setCards(shuffled);
  }

  function handleCardClick(cardID) {
    const card = cards.find(c => c.id === cardID);

    if (card.isClicked === true) {
      setHighScore(oldHighScore => Math.max(oldHighScore, score));
      setScore(0);
      //displayModal();
      return;
    }

    //mark the card as clicked then update state
    const updatedDeck = cards.map(card => {
      if (card.id === cardID) {
        return {...card, isClicked: true}
      }

      return card;
    })

    setCards(updatedDeck);
    setScore(oldScore => oldScore + 1);
    setHighScore(oldHighScore => Math.max(oldHighScore, score));
    shuffleDeck();
  }

  return (
    <>
      <Header score={score} highScore={highScore} />
      <p className="instructions">Click an image to begin. Don't click the same image twice!</p>
      <CardDeck cards={cards} handleCardClick={handleCardClick}/>
    </>
  )
}

export default App