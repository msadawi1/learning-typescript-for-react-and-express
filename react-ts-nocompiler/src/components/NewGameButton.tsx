export default function NewGameButton({ isGameOver, startNewGame }: { isGameOver: boolean, startNewGame: () => void}) {
    if (!isGameOver) {
        return null
    } else {
        return (
            <button className="new-game" onClick={startNewGame}>
                New Game
            </button>
        )
    }
}