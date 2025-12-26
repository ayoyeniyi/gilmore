import Card from "./Card"

export default function CardDeck({ cards, handleCardClick }) {
    return (
        <>
            <div className="card-deck">
                {cards.map(card => (
                    <Card key={card.id} name={card.name} image={card.image} handleClickFn={() => handleCardClick(card.id)} />
                ))}
            </div>
        </>
    )

}