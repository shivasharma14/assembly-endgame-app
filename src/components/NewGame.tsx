export default function NewGame(props:any) {
    return (
        <>
            {props.isGameOver && <button className = "new-game" onClick={props.startNewGame}>New Game</button>}
        </>
    )
}