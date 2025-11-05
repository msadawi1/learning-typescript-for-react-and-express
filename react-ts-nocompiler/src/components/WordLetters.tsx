import { clsx } from "clsx"
import type { JSX } from 'react'

export default function WordLetters({ currentWord, guessedLetters, isGameLost }: 
    { currentWord: string, guessedLetters: string[], isGameLost: boolean}): JSX.Element {
    return (
        <section className="word">
            {currentWord.split("").map((letter: string, index: number): JSX.Element => {
                const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
                const letterClassName = clsx(
                    isGameLost && !guessedLetters.includes(letter) && "missed-letter"
                )
                return (
                    <span key={index} className={letterClassName}>
                        {shouldRevealLetter ? letter.toUpperCase() : ""}
                    </span>
                )
            })}
        </section>
    )
}