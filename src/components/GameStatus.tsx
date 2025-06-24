import clsx from "clsx"
import { getFarewellText } from "../assets/utils"

export default function GameStatus(props:any){
    const gameStatusClass = clsx("game-status", {
        won: props.isGameWon,
        lost: props.isGameLost,
        farewell: !props.isGameOver && props.isLastGuessIncorrect
    })

    function renderGameStatus(){
        if(!props.isGameOver && props.isLastGuessIncorrect && props.languageRemoved){
            return(
                <p className="farewell-message">{getFarewellText(props.languageRemoved)}</p>
            )
        }
        if(props.isGameWon){
            return (
                <> 
                <h2>You win!</h2>
                <p>Well done! &#127881;</p>
                </>
            )
        } 
        if(props.isGameLost){
                return (
                    <> 
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                    </>
                )
        }
        return null
    }

    return(
        <section className = {gameStatusClass} aria-live = "polite" role = "status">
            {renderGameStatus()}
        </section>
    )
}