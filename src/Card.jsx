export default function Card({ name, image }) {
    return (
        <div>
            <img src={image.src} alt={`Picture of ${name}`} />
            <p>{name}</p>
        </div>
    )
}