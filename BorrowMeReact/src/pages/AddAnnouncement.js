import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import "./addAnnouncement/addAnnouncement.css"
import CategoriesModal from "./addAnnouncement/CategoriesModal";

const AddAnnouncement = () => {
    const authUser = useSelector(state=>state.authUser.value)
    const navigate = useNavigate();
    const [isCategoriesModalVisible, setIsCategoriesModalVisible] = useState(true);

    const [announcementTitle, setAnnouncementTitle] = useState("");
    const [category, setCategory] = useState({
        mainCategory: "",
        subCategory: ""
    });
    useEffect(()=>{
        if (authUser.role === "")
        {
            navigate("/login")
        }
    },[])

    const showModal = () => {
        setIsCategoriesModalVisible(true);
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
    }

    const hideModal = () => {
        setIsCategoriesModalVisible(false);
        document.body.style.overflow = "auto";
    }

    const handleCategorySelect = (mainCategoryName, subCategoryName) => {
        setCategory({
            mainCategory: mainCategoryName,
            subCategory: subCategoryName
        });
        hideModal();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div id="add-announcement-main-container" className="d-flex flex-column align-items-center w-70 mx-auto">
            <Helmet>
                <title>Dodaj ogłoszenie | BorrowMe</title>
            </Helmet>
            <h2 className="">Dodaj nowe ogłoszenie</h2>
            <form className="d-flex flex-column align-items-center w-70" spellCheck="false"
                onSubmit={handleSubmit}
            >
                <label className="w-100 mb-3">Tytuł ogłoszenia:
                    <input type="text" className="d-block w-100 rounded px-3 py-1"
                           value={announcementTitle} onChange={(e) => setAnnouncementTitle(e.target.value)}
                    />
                </label>
                <label className="w-100 mb-3">Kategoria ogłoszenia:
                    <div onClick={showModal}
                        className="w-100 rounded px-3 py-1 border"
                    >
                        {category.subCategory ? `${category.mainCategory} - ${category.subCategory}` : "Wybierz kategorie"}
                    </div>
                </label>
            </form>
            {isCategoriesModalVisible &&
                <CategoriesModal handleCategorySelect={handleCategorySelect} hideModal={hideModal} />
            }
        </div>
    );
};

export default AddAnnouncement;