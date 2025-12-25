export default function Header ( {score, highScore} ) {
    return (
        <nav className="header">
            <h1 className="header-title">Gilmore</h1>
            <div className="score-container">
                <div className="score-current">
                    <p className="header-score">{score}</p>
                    <p className="score-label">score</p>
                </div>
                <div className="score-high">
                    <p className="header-score">{highScore}</p>
                    <p className="score-label">high score</p>
                </div>
            </div>
        </nav>
    )
}