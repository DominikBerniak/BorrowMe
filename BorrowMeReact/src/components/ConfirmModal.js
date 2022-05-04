import { Modal, Button } from "react-bootstrap";

const ConfirmModal = (type, showModal, confirmModal, hideModal) => {
    let message = "";
    if (type === "delete")
    {
        message = "Czy na pewno chcesz usunąć te rezerwację?";
    } else if (type === "accept")
    {
        message = "Czy na pewno chcesz zaakceptować te rezerwację?";
    } else if (type === "unaccept") {
        message = "Czy na pewno chcesz usunąć akceptację tej rezerwacji?";
    }


    return (<Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
            <Modal.Title>Tytuł</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
            <Button variant="default" onClick={hideModal}>
                Nie
            </Button>
            <Button variant="danger" onClick={confirmModal}>
                Tak
            </Button>
        </Modal.Footer>
    </Modal>)
}

export default ConfirmModal