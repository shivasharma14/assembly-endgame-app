import clsx from "clsx"

export default function GameStatus(props:any){
    const gameStatusClass = clsx("game-status", {
        won: props.isGameWon,
        lost: props.isGameLost,
    })

    function renderGameStatus(){
        if(!props.isGameOver){
            return null
        }
        if(props.isGameWon){
            return (
                <> 
                <h2>You win!</h2>
                <p>Well done! &#127881;</p>
                </>
            )
        } else {
            if(props.isGameLost){
                return (
                    <> 
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                    </>
                )
            }
        }
    }

    return(
        <section className={gameStatusClass}>
            {renderGameStatus()}
        </section>
    )
}