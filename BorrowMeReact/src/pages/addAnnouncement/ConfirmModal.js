import {useDetectClickOutside} from "react-detect-click-outside";
import {useEffect, useRef} from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const ConfirmModal = ({handleFormSubmit, hideModal, announcementTile, hasSubmitFailed}) => {
    const confirmModalRef = useDetectClickOutside({onTriggered: hideModal});
    const confirmModalContainerRef = useRef();
    useEffect(() => {
        confirmModalContainerRef.current.style.top = window.scrollY + "px";
        confirmModalRef.current.style.top = "50%";
    }, [])
    return (
        <div id="add-announcement-confirm-modal-container" ref={confirmModalContainerRef}>
            <div id="add-announcement-confirm-modal" ref={confirmModalRef}>
                <div className="d-flex w-100 align-items-center mt-4">
                    <h3 className="mx-auto ps-4">{hasSubmitFailed ? "Ups! Coś poszło nie tak :(" : "Potwierdź dodanie ogłoszenia"}</h3>
                    <div className="pe-4 cursor-pointer">
                        <ClearOutlinedIcon onClick={hideModal} sx={{fontSize: 30, color: "#8c8c8c"}}/>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center mt-5">
                    {hasSubmitFailed ?
                        <div className="d-flex flex-column align-items-center">
                            <div className="">
                                Podczas dodawania ogłoszenia wystąpił błąd.
                            </div>
                            <div>
                                Najprawdopodobniej dodane zdjęcie ma złe rozszerzenie.
                            </div>
                            <div className="mt-3">
                                Dodaj inne zdjęcie i spróbuj ponownie.
                            </div>
                        </div>
                        :
                        <>
                            <div className="">Czy na pewno chcesz dodać ogłoszenie o tytule:</div>
                            <div className="h4 py-3">{announcementTile}</div>
                        </>
                    }

                </div>
                {hasSubmitFailed ?
                    <div className="d-flex w-40 mt-4 mx-auto justify-content-center">
                        <button className="add-announcement-confirm-modal-button-cancel rounded px-3 py-2"
                                onClick={hideModal}
                        >Wróć
                        </button>
                    </div>
                    :
                    <div className="d-flex w-40 mt-4 mx-auto justify-content-between">
                        <button className="add-announcement-confirm-modal-button-confirm rounded px-3 py-2"
                                onClick={handleFormSubmit}
                        >Dodaj
                        </button>
                        <button className="add-announcement-confirm-modal-button-cancel rounded px-3 py-2"
                                onClick={hideModal}
                        >Anuluj
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default ConfirmModal;