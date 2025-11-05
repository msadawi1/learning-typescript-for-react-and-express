import { useState, useRef, useEffect } from "react"
import type { JSX } from 'react'
import Die from "./Die"
import type { DiceFace } from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App(): JSX.Element {
  const [dice, setDice] = useState<DiceFace[]>((): DiceFace[] => generateAllNewDice())
  const buttonRef = useRef<HTMLButtonElement>(null)

  const gameWon: boolean = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (!buttonRef.current) return
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice(): DiceFace[] {
    return new Array(10)
      .fill(0)
      .map((): DiceFace => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  function rollDice(): void {
    if (!gameWon) {
      setDice((oldDice: DiceFace[]): DiceFace[] => oldDice.map((die: DiceFace): DiceFace =>
        die.isHeld ?
          die :
          { ...die, value: Math.ceil(Math.random() * 6) }
      ))
    } else {
      setDice(generateAllNewDice())
    }
  }

  function hold(id: string): void {
    setDice((oldDice: DiceFace[]): DiceFace[] => oldDice.map((die: DiceFace): DiceFace =>
      die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    ))
  }

  const diceElements: JSX.Element[] = dice.map((dieObj: DiceFace): JSX.Element => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ))

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}