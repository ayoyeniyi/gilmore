import Modal from "./Modal";

export default function LosingModal( { ref, restartFn, closeModal }) {
    return (
        <Modal text={"Game Over! You clicked on the same card twice!"} ref={ref} restartFn={restartFn} closeModal={closeModal}/>
    )
}