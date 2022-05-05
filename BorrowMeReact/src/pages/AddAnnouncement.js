import {Helmet} from "react-helmet";
import {useEffect, useRef, useState} from "react";
import "./addAnnouncement/addAnnouncement.css"
import CategoriesModal from "./addAnnouncement/CategoriesModal";
import {getData, patchFormData, postData, postFormData} from "../services/apiFetch";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddedImage from "./addAnnouncement/AddedImage";
import CostTypesButtons from "./addAnnouncement/CostTypesButtons";
import ConfirmModal from "./addAnnouncement/ConfirmModal";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

const AddAnnouncement = ({isEditing = false}) => {
    const [isCategoriesModalVisible, setIsCategoriesModalVisible] = useState(false);

    const [announcementTitle, setAnnouncementTitle] = useState("");
    const [category, setCategory] = useState({
        mainCategoryName: "",
        mainCategoryId: "",
        subCategoryName: "",
        subCategoryId: ""
    });
    const [announcementDescription, setAnnouncementDescription] = useState("")
    const [location, setLocation] = useState({
        city: "",
        voivodeship: "",
        inputValue: ""
    });
    const [cityHints, setCityHints] = useState([])
    const [areCityHintsVisible, setAreCityHintsVisible] = useState(false);
    const [images, setImages] = useState([
        "", "", "", "", "", ""]);
    const [formImages, setFormImages] = useState([
        "", "", "", "", "", ""]);
    const [isImagesArrayFull, setIsImagesArrayFull] = useState(false);
    const [isImageWrong, setIsImageWrong] = useState(false);

    const [selectedCostType, setSelectedCostType] = useState(null);
    const [announcementCost, setAnnouncementCost] = useState("");
    const [announcementCostOther, setAnnouncementCostOther] = useState("");

    const [isFormFilled, setIsFormFilled] = useState(true);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState();

    const ownerId = useSelector(state=>state.user.value).userId;
    const [hasSubmitFailed, setHasSubmitFailed] = useState(false);

    const {announcementId} = useParams();
    const [announcementData, setAnnouncementData] = useState();

    const allCategories = useSelector(state => state.allCategories.value)

    const navigate = useNavigate();

    useEffect(()=>{
        if (isEditing && !announcementData)
        {
            getData(`/api/Announcements/${announcementId}`)
                .then(data=>{
                    let announcement = data.announcement;
                    setAnnouncementData(announcement);
                    setAnnouncementTitle(announcement.title);
                    setAnnouncementDescription(announcement.description);
                    setCategoryInfo(announcement)
                    setLocation({
                        city: announcement.city.name,
                        voivodeship: announcement.voivodeship.name,
                        inputValue: `${announcement.city.name}, ${announcement.voivodeship.name}`
                    });
                    setAnnouncementCostInfo(announcement)
                    setAnnouncementPictures(announcement)
                })
        }
    },[])

    const setAnnouncementCostInfo = (announcement) => {
        setSelectedCostType(getCorrectPaymentTypeFromNumber(announcement.paymentType))
        if (announcement.paymentType === 1)
        {
            setAnnouncementCost(announcement.price);
        }
        else if (announcement.paymentType === 2)
        {
            setAnnouncementCostOther(announcement.otherPaymentType);
        }
    }

    const setAnnouncementPictures = async (announcement) => {
        let newImages = [...images];
        let newFormImages = [...formImages];
        for (let i = 0; i < newImages.length; i++) {
            if (!announcement.pictureLocations[i])
            {
                break;
            }
            newImages[i] = `/api/StaticFiles/${announcement.pictureLocations[i].directoryName}/${announcement.pictureLocations[i].fileName}`;
            await fetch(`/api/StaticFiles/${announcement.pictureLocations[i].directoryName}/${announcement.pictureLocations[i].fileName}`)
                .then(response=>response.blob())
                .then(blob=>{
                    let file = new File([blob], announcement.pictureLocations[i].fileName, { lastModified: new Date().getTime(), type: blob.type });
                    newImages[i] = URL.createObjectURL(file);
                    newFormImages[i] = file;
                })

        }
        setImages(newImages);
        setFormImages(newFormImages);
    }

    const setCategoryInfo = (announcement) => {
        let mainCategory = allCategories.find(category=>category.subCategories.find(subCategory=>subCategory.id===announcement.subCategory.id))
        let subCategory = mainCategory.subCategories.find(subCategory=>subCategory.id===announcement.subCategory.id);
        setCategory({
            mainCategoryName: mainCategory.name,
            mainCategoryId: mainCategory.id,
            subCategoryName: subCategory.name,
            subCategoryId: subCategory.id
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", announcementTitle);
        formData.append("description", announcementDescription);
        formData.append("ownerId", ownerId);
        formData.append("subCategoryId", category.subCategoryId);
        formData.append("voivodeshipName", location.voivodeship);
        formData.append("cityName", location.city);
        formData.append("paymentType", getCorrectPaymentTypeNumber().toString());
        for (let i=0; i<formImages.length; i++)
        {
            if (formImages[i] !== "")
            {
                formData.append("imageFiles", formImages[i])
                formData.append("imageNames", formImages[i].name)
            }
        }
        if (announcementCost !== "")
        {
            formData.append("price", announcementCost);
        }
        if (announcementCostOther !== "")
        {
            formData.append("otherPaymentType", announcementCostOther);
        }
        if (!isEditing)
        {
            postFormData("/api/Announcements",formData)
                .then(data=>{
                    hideConfirmModal();
                    if (data === "Bad Request")
                    {
                        setHasSubmitFailed(true);
                        showConfirmModal()
                        return;
                    }
                    navigate(`/announcement/${data.id}`)
                })
        }
        else
        {
            patchFormData(`/api/Announcements/${announcementId}`,formData)
                .then(data=>{
                    hideConfirmModal();
                    if (data === "Bad Request")
                    {
                        setHasSubmitFailed(true);
                        showConfirmModal()
                        return;
                    }
                    navigate(`/announcement/${data.id}`)
                })
        }
    }
    const getCorrectPaymentTypeNumber = () => {
        switch (selectedCostType)
        {
            case "free":
                return 0;
            case "money":
                return 1;
            case "other":
                return 2;
        }
    }

    const getCorrectPaymentTypeFromNumber = (number) => {
        switch (number)
        {
            case 0:
                return "free";
            case 1:
                return "money";
            case 2:
                return "other";
        }
    }

    const showCategoriesModal = () => {
        setIsCategoriesModalVisible(true);
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
    }

    const hideCategoriesModal = () => {
        setIsCategoriesModalVisible(false);
        document.body.style.overflow = "auto";
    }

    const handleCategorySelect = (mainCategory, subCategory) => {
        setCategory({
            mainCategoryName: mainCategory.name,
            mainCategoryId: mainCategory.id,
            subCategoryName: subCategory.name,
            subCategoryId: subCategory.id,
        });
        hideCategoriesModal();
    }
    const handleLocationChange = (searchValue) => {
        if (searchValue.length > 2) {
            getData(`/api/Cities/Search/${searchValue}`)
                .then(citiesData => {
                    if (citiesData.length > 0) {
                        setCityHints(citiesData);
                        setAreCityHintsVisible(true);
                    }
                })
        } else {
            setCityHints([]);
            setAreCityHintsVisible(false);
        }
        setLocation({
            city: "",
            voivodeship: "",
            inputValue: searchValue
        })
    }

    const handleCityHintClick = (cityData) => {
        setLocation({
            city: cityData.cityName,
            voivodeship: cityData.voivodeshipName,
            inputValue: `${cityData.cityName}, ${cityData.voivodeshipName}`
        })
        setCityHints([]);
        setAreCityHintsVisible(false);
    }

    useEffect(() => {
        changeIsImagesArrayFull();
    }, [images])

    const handleImageSelect = (image) => {
        setIsImageWrong(false);
        let imageExtension = (image[0].name).split(".")[1]
        // let allowedImageExtensions =[
        //     "jpg", "jpeg", "png"
        // ]
        // if (!allowedImageExtensions.includes(imageExtension) || !image)
        // {
        //     setIsImageWrong(true);
        //     return;
        // }
        let newImages = [...images];
        let newFormImages = [...formImages];
        for (let i = 0; i < newImages.length; i++) {
            if (newImages[i] === "") {
                newImages[i] = URL.createObjectURL(image[0]);
                newFormImages[i] = image[0]
                break;
            }
        }
        console.log(image)
        setImages(newImages);
        setFormImages(newFormImages);
    }

    const handleDeleteImage = (index) => {
        let newImages = [...images];
        newImages[index] = "";
        setImages(newImages);
        let newFormImages = [...formImages];
        newFormImages[index] = "";
        setFormImages(newFormImages);
    }
    const changeIsImagesArrayFull = () => {
        let counter = 0;
        for (let i = 0; i < images.length; i++) {
            if (images[i] !== "") {
                counter++;
            }
        }
        setIsImagesArrayFull(counter === images.length);
    }

    const handleCostTypeClick = (costType) => {
        setSelectedCostType(costType);
        setAnnouncementCostOther("");
        setAnnouncementCost("");
    }

    useEffect(()=>{
        setIsFormFilled(checkIfFormIsFilled());
    },[announcementTitle, category, announcementDescription, location, selectedCostType, announcementCost, announcementCostOther])

    const checkIfFormIsFilled = () => {
        return announcementTitle !== "" && category.subCategoryName !== "" && announcementDescription !== "" &&
            location.city !== "" && (
                selectedCostType === "free" || (selectedCostType === "money" && announcementCost)
                || (selectedCostType === "other" && announcementCostOther !== "")
            );
    }
    const showConfirmModal = () => {
        setIsConfirmModalVisible(true);
        document.body.style.overflow = "hidden";
    }

    const hideConfirmModal = () => {
        setIsConfirmModalVisible(false);
        setHasSubmitFailed(false);
        document.body.style.overflow = "auto";
    }

    return (
        <div id="add-announcement-main-container"
             className="d-flex flex-column align-items-center w-70 mx-auto user-select-none mb-5">
            <Helmet>
                <title>
                    {!isEditing ? "Dodaj ogłoszenie" : "Edytuj ogłoszenie"} | BorrowMe
                </title>
            </Helmet>
            <h2 className="mt-5">{!isEditing ? "Dodaj nowe ogłoszenie" : "Edytuj swoje ogłoszenie"}</h2>
            <form id="add-announcement-form" className="d-flex flex-column align-items-center w-85" spellCheck="false"
                  onSubmit={handleSubmit}
            >
                <div className="d-flex w-100 mt-5 p-5 rounded justify-content-between bg-white">
                    <label className="w-50">Nazwa przedmiotu:
                        <input type="text" className="d-block w-100 rounded mt-1 px-3 py-1" maxLength={50}
                               value={announcementTitle} onChange={(e) => setAnnouncementTitle(e.target.value)}
                        />
                    </label>
                    <label className="w-35">Kategoria:
                        <div id="add-announcement-categories-button" onClick={showCategoriesModal}
                             className="w-100 mt-1 px-3 py-1 rounded text-center cursor-pointer d-flex justify-content-center align-items-center"
                        >
                            {category.subCategoryName ? `${category.mainCategoryName} - ${category.subCategoryName}` : "Wybierz kategorie"}
                        </div>
                    </label>
                </div>
                <div className="d-flex w-100 mt-4 p-5 rounded justify-content-between bg-white">
                    <label className="w-50">Opis przedmiotu:
                        <textarea className="d-block w-100 rounded mt-1 px-3 py-1" maxLength={500}
                                  value={announcementDescription}
                                  onChange={(e) => setAnnouncementDescription(e.target.value)}
                        />
                        <div
                            className="text-end add-announcement-annotation-text">{announcementDescription.length}/500
                        </div>
                    </label>
                    <div className="d-flex flex-column w-35">
                        <label className="w-100 mt-2">Lokalizacja:
                            <input type="text" className="d-block w-100 rounded mt-1 px-3 py-1"
                                   value={location.inputValue} onChange={(e) => handleLocationChange(e.target.value)}
                            />
                        </label>
                        {areCityHintsVisible &&
                            <div id="add-announcement-city-hints-container" className="d-flex flex-column">
                                {cityHints.map(cityData =>
                                    <button type="button" key={cityData.cityName + cityData.voivodeshipName}
                                            className="list-group-item voivodeship-button btn rounded-0 shadow-none p-2"
                                            onClick={(e) => {
                                                handleCityHintClick(cityData)
                                            }}>
                                        {`${cityData.cityName}, ${cityData.voivodeshipName}`}
                                    </button>
                                )}
                            </div>
                        }
                    </div>
                </div>
                <div className="d-flex w-100 mt-4 p-5 rounded justify-content-between bg-white">
                    <label className="w-25 d-flex flex-column justify-content-center"
                           onChange={(e) => handleImageSelect(e.target.files)}>
                        <div className="">Zdjęcia:</div>
                        <div id="add-announcement-image-add-button"
                             className={"mt-auto d-flex p-2 w-70 flex-column rounded align-items-center " +
                                 (isImagesArrayFull ? "add-announcementPage-image-add-button-disabled" : "cursor-pointer")}>
                            Dodaj zdjęcie
                            <AddBoxOutlinedIcon
                                sx={{fontSize: 50, color: (isImagesArrayFull ? "#eeeeee" : "#646464")}}/>
                        </div>
                        <div id="wrong-image-text" className="mt-auto text-start">
                        {isImageWrong &&
                            <div>Wybrane zdjęcie posiada nieodpowiednie rozszerzenie</div>
                        }
                        </div>
                        <input type="file" accept=".jpg, .jpeg, .png" hidden disabled={isImagesArrayFull}/>
                    </label>
                    <div className="d-flex flex-wrap w-70 justify-content-center">
                        <AddedImage image={images[0]} handleDeleteImage={handleDeleteImage} index={0}/>
                        <AddedImage image={images[1]} handleDeleteImage={handleDeleteImage} index={1}/>
                        <AddedImage image={images[2]} handleDeleteImage={handleDeleteImage} index={2}/>
                        <AddedImage image={images[3]} handleDeleteImage={handleDeleteImage} index={3}/>
                        <AddedImage image={images[4]} handleDeleteImage={handleDeleteImage} index={4}/>
                        <AddedImage image={images[5]} handleDeleteImage={handleDeleteImage} index={5}/>
                    </div>
                </div>
                <div id="add-announcement-cost-container" className="d-flex flex-column w-100 mt-4 mb-4 p-5 rounded bg-white">
                    <label>Forma płatności za wypożyczenie przedmiotu:</label>
                    <CostTypesButtons handleCostTypeClick={handleCostTypeClick} selectedType={selectedCostType}/>
                    {selectedCostType &&
                        <div className="mt-3 d-flex justify-content-center w-100">
                            {selectedCostType === "money" &&
                                <label className="w-50">Chcesz wypożyczyć w zamian za:
                                    <div className="d-flex align-items-center mt-1">
                                        <input id="cost-money-input" type="number"
                                               className="d-block rounded w-75 px-3 py-1" maxLength={50}
                                               value={announcementCost} placeholder="kwota"
                                               onChange={(e) => setAnnouncementCost(e.target.value)}
                                        />
                                        <div className="ms-2">zł / dzień</div>
                                    </div>
                                </label>
                            }
                            {selectedCostType === "other" &&
                                <label className="w-50">Chcesz wypożyczyć w zamian za:
                                    <input type="text" className="d-block w-100 rounded mt-1 px-3 py-1" maxLength={50}
                                           value={announcementCostOther} placeholder="np. kwiaty"
                                           onChange={(e) => setAnnouncementCostOther(e.target.value)}
                                    />
                                </label>
                            }
                            {selectedCostType === "free" &&
                                    <label>Chcesz wypożyczyć za darmo</label>
                            }
                        </div>
                    }
                </div>
                {isFormFilled &&
                    <div className="d-flex w-100 mb-5 p-5 rounded justify-content-end bg-white">
                        <button id="add-announcement-submit-button" type="button"
                                className="rounded px-4 py-2" onClick={showConfirmModal}>
                            {!isEditing ? "Dodaj ogłoszenie" : "Uaktualnij ogłoszenie"}
                        </button>
                    </div>
                }
            </form>
            {isCategoriesModalVisible &&
                <CategoriesModal handleCategorySelect={handleCategorySelect} hideModal={hideCategoriesModal}/>
            }
            {isConfirmModalVisible &&
                <ConfirmModal handleFormSubmit={handleSubmit} hideModal={hideConfirmModal} isEditing={isEditing}
                              announcementTile={announcementTitle} hasSubmitFailed={hasSubmitFailed}/>
            }
        </div>
    );
};

export default AddAnnouncement;
