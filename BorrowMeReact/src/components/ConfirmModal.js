import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({type, showModal, confirmModal, hideModal}) => {
    let message;
    let title;
    let classnames;
    if (type === "delete reservation")
    {
        title = "Usuwanie rezerwacji";
        message = "Czy na pewno chcesz usunąć tę rezerwację?";
        classnames = "alert alert-danger";
    } else if (type === "accept reservation")
    {
        title = "Akceptowanie rezerwacji";
        message = "Czy na pewno chcesz zaakceptować tę rezerwację?";
        classnames = "alert alert-success";
    } else if (type === "unaccept reservation") {
        title = "Usuwanie akceptacji rezerwacji";
        message = "Czy na pewno chcesz usunąć akceptację tej rezerwacji?";
        classnames = "alert alert-info";
    } else if (type === "delete announcement")
    {
        title = "Usuwanie ogłoszenia";
        message = "Czy na pewno chcesz usunąć to ogłoszenie?";
        classnames = "alert alert-danger";
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
            <Button variant={(type === "delete reservation" || type === "delete announcement") ? "danger" : (type === "accept reservation" ? "success" : "info")} onClick={confirmModal}>
                Tak
            </Button>
        </Modal.Footer>
    </Modal>)
}

export default ConfirmModal
