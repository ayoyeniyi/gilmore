import Header from "./Header";
import CardDeck from "./CardDeck";
import Modal from "./Modal";
import WinningModal from "./WinningModal";
import LosingModal from "./LosingModal";
import { useState, useEffect, useRef } from "react";


function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [cards, setCards] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const winningDialogRef = useRef(null);
  const losingDialogRef = useRef(null);

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

  function shuffleDeck(deck) {
    const shuffled = [...deck];

    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  function handleCardClick(cardID) {
    const card = cards.find(c => c.id === cardID);

    if (card.isClicked === true) {
      setHighScore(oldHighScore => Math.max(oldHighScore, score));
      setScore(0);
      openLosingModal();
      return;
    }

    //mark the card as clicked then update state
    const updatedDeck = cards.map(card => {
      if (card.id === cardID) {
        return {...card, isClicked: true};
      }

      return card;
    })

    setCards(shuffleDeck(updatedDeck));
    setScore(oldScore => oldScore + 1);
    setHighScore(oldHighScore => Math.max(oldHighScore, score));
    
    //check if user has won
    if (reachedMaxScore(score + 1)) {
      setIsWon(true);
      openWinningModal();
    }
  }

  function restartGame() {
    setScore(0);
    setIsWon(false);
    setCards(prevCards => prevCards.map(c => ({...c, isClicked: false})));
  }

  //fn to check if the user has reached the max possible score 
  function reachedMaxScore(updatedScore) {
    if (updatedScore === cards.length) return true;
    return false;
  }

  //modal functionality
  function openWinningModal() {
    winningDialogRef.current.showModal();
  }

  function openLosingModal() {
    losingDialogRef.current.showModal();
  }

  function closeWinningModal() {
    winningDialogRef.current.close();
  }

  function closeLosingModal() {
    losingDialogRef.current.close();
  }


  return (
    <>
      <Header score={score} highScore={highScore} />
      <p className="instructions">Click an image to begin. Don't click the same image twice!</p>
      <CardDeck cards={cards} handleCardClick={handleCardClick}/>
      <WinningModal ref={winningDialogRef} restartFn={restartGame} closeModal={closeWinningModal}/>
      <LosingModal ref={losingDialogRef} restartFn={restartGame} closeModal={closeLosingModal}/>
    </>
  )
}

export default App