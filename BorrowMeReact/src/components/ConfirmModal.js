import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({type, showModal, confirmModal, hideModal}) => {
    let message;
    let title;
    let classnames;
    if (type === "delete")
    {
        title = "Usuwanie rezerwacji";
        message = "Czy na pewno chcesz usunąć te rezerwację?";
        classnames = "alert alert-danger"
    } else if (type === "accept")
    {
        title = "Akceptowanie rezerwacji";
        message = "Czy na pewno chcesz zaakceptować te rezerwację?";
        classnames = "alert alert-success";
    } else if (type === "unaccept") {
        title = "Usuwanie akceptacji rezerwacji";
        message = "Czy na pewno chcesz usunąć akceptację tej rezerwacji?";
        classnames = "alert alert-info"
    }


    return (<Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className={classnames}>{message}</div></Modal.Body>
        <Modal.Footer>
            <Button variant="default" onClick={hideModal}>
                Nie
            </Button>
            <Button variant={type === "delete" ? "danger" : (type === "accept" ? "success" : "info")} onClick={confirmModal}>
                Tak
            </Button>
        </Modal.Footer>
    </Modal>)
}

export default ConfirmModal