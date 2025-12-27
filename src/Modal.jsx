export default function Modal({ ref, restartFn, closeModal, text }) {
    return (
        <div>
            <dialog ref={ref}>
                <p>{text}</p>
                <button onClick={restartFn}>Play Again</button>
                <button onClick={closeModal}>Close</button>
            </dialog>
        </div>
    )
}