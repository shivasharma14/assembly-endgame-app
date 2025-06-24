export default function Word(props:any){
    return (
            <>
            <section className = "word">
                {props.letterElements}
            </section>

            {/* Combined visually-hidden aria-live region for status updates */}
            <section className = "sr-only" aria-live = "polite" role = "status">
                <p>
                    {props.currentWord.includes(props.lastGuessedLetter) ? 
                    `Correct! The letter ${props.lastGuessedLetter} is in the word.` :
                    `Sorry, the letter ${props.lastGuessedLetter} is not in the word.`}
                    You have {props.numGuessesLeft} attempts left.
                </p>
                <p> Current word : {props.currentWord.split("").map((letter: string) =>
                    props.guessedLetters.includes(letter) ? letter + "." : "blank").join(" ")}
                </p>
            </section>
        </>
    )
}