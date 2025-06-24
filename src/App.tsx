import Header from "./components/Header";
import GameStatus from "./components/GameStatus";
import LanguageChips from "./components/LanguageChips";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import NewGame from "./components/NewGame";
import { useState } from "react";
import { clsx } from "clsx";
import { languages } from "./assets/languages";
import { getRandomWord } from "./assets/utils";
import Confetti from "react-confetti";

export default function App() {
  //State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([] as string[]);

  //Derived values
  const numGuessesLeft = languages.length - 1;
  const wrongGuessesArray = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  );
  const wrongGuessCount = wrongGuessesArray.length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
  const languageRemoved =
    wrongGuessCount > 0 ? languages[wrongGuessCount - 1].name : null; //important to handle the wrong guess count as 0 scenario

  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    );
    return (
      <span key = {index} className = {letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  function addGuessedLetter(letter: string) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className = {className}
        key = {letter}
        disabled = {isGameOver}
        aria-disabled = {guessedLetters.includes(letter)}
        aria-label = {`Letter ${letter}`}
        onClick = {() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      {isGameWon && <Confetti recycle = {false} numberOfPieces = {1000} />}
      <Header />
      <GameStatus
        isGameOver = {isGameOver}
        isGameWon = {isGameWon}
        isGameLost = {isGameLost}
        isLastGuessIncorrect = {isLastGuessIncorrect}
        languageRemoved = {languageRemoved}
      />
      <LanguageChips wrongGuessCount = {wrongGuessCount} />
      <Word
        letterElements = {letterElements}
        currentWord = {currentWord}
        lastGuessedLetter = {lastGuessedLetter}
        numGuessesLeft = {numGuessesLeft}
        guessedLetters = {guessedLetters}
      />
      <Keyboard keyboardElements = {keyboardElements} />
      <NewGame isGameOver = {isGameOver} startNewGame = {startNewGame} />
    </main>
  );
}
