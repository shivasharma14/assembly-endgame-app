import Header from "./components/Header";
import GameStatus from "./components/GameStatus";
import LanguageChips from "./components/LanguageChips";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import NewGame from "./components/NewGame";
import { useState } from "react";

export default function App(){

  const [currentWord, setCurrentWord] = useState("react")

  const letterElements = currentWord.split("").map((letter,index) =>(
    <span key={index}>{letter.toUpperCase()}</span>
  ))

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const keyboardElements = alphabet.split("").map(letter=>(
    <button key={letter}>{letter.toUpperCase()}</button>
  ))

  return(
    <main>
      <Header/>
      <GameStatus/>
      <LanguageChips/>
      <Word letterElements = {letterElements}/>
      <Keyboard keyboardElements = {keyboardElements}/>
      <NewGame/>
    </main>
  )
}