export default function NewGame(props:any) {
    return (
        <>
            {props.isGameOver && <button className="new-game">New Game</button>}
        </>
    )
}