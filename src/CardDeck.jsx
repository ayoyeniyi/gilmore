import Card from "./Card"

export default function CardDeck({ cards }) {
    return (
        <>
            <p className="instructions">Click an image to begin. Don't click the same image twice!</p>
            <div className="card-deck">
                {cards.map(card => (
                    <Card key={card.id} name={card.name} image={card.image} />
                ))}
            </div>
        </>
    )

}