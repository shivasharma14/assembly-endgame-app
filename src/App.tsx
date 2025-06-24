import Header from "./components/Header";
import GameStatus from "./components/GameStatus";
import LanguageChips from "./components/LanguageChips";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import NewGame from "./components/NewGame";
import { useState } from "react";
import { clsx } from "clsx";
import { languages } from "./assets/languages";

export default function App(){

  //State values
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([] as string[])

  //Derived values
  const wrongGuessesArray = guessedLetters.filter(letter => !currentWord.includes(letter))
  const wrongGuessCount = wrongGuessesArray.length
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length -1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
  const languageRemoved = wrongGuessCount > 0 ? languages[wrongGuessCount - 1].name : null //important to handle the wrong guess count as 0 scenario

  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const letterElements = currentWord.split("").map((letter,index) =>(
    <span key={index}>
      {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
    </span>
  ))

  function addGuessedLetter(letter: string)
  {
    setGuessedLetters( prevLetters =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    )
  }

  const keyboardElements = alphabet.split("").map(letter=> {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    })

    return (
      <button
        className = {className}
        key={letter}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    )
})

  return(
    <main>
      <Header/>
      <GameStatus isGameOver = {isGameOver} isGameWon = {isGameWon} isGameLost = {isGameLost} isLastGuessIncorrect = {isLastGuessIncorrect} languageRemoved = {languageRemoved}/>
      <LanguageChips wrongGuessCount = {wrongGuessCount}/>
      <Word letterElements = {letterElements}/>
      <Keyboard keyboardElements = {keyboardElements}/>
      <NewGame isGameOver={isGameOver}/>
    </main>
  )
}