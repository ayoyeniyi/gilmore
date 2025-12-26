export default function Card({ name, image, handleClickFn }) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <div className="card" onClick={handleClickFn}>
            <img src={image} alt={`Picture of ${capitalizedName}`} className="pokemon-img"/>
            <p>{capitalizedName}</p>
        </div>
    )
}