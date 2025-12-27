export default function Modal({ ref, restartFn, closeModal, text }) {
    return (
        <div>
            <dialog ref={ref}>
                <p>{text}</p>
                <button onClick={() => {restartFn(); closeModal()}}>Play Again</button>
            </dialog>
        </div>
    )
}