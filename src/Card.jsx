export default function Card({ name, image }) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <div className="card">
            <img src={image} alt={`Picture of ${capitalizedName}`} />
            <p>{capitalizedName}</p>
        </div>
    )
}