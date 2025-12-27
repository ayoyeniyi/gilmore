import Modal from "./Modal"

export default function WinningModal({ ref, restartFn, closeModal }) {
    return (
        <Modal text={"Congratulations! You won!"} ref={ref} restartFn={restartFn} closeModal={closeModal}/>
    )
}