import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";
import "./addAnnouncement/addAnnouncement.css"
import CategoriesModal from "./addAnnouncement/CategoriesModal";
import {getData} from "../services/apiFetch";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddedImage from "./addAnnouncement/AddedImage";
import CostTypesButtons from "./addAnnouncement/CostTypesButtons";

const AddAnnouncement = () => {
    const [isCategoriesModalVisible, setIsCategoriesModalVisible] = useState(false);

    const [announcementTitle, setAnnouncementTitle] = useState("");
    const [category, setCategory] = useState({
        mainCategory: "",
        subCategory: ""
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
    const [isImagesArrayFull, setIsImagesArrayFull] = useState(false);

    const [selectedType, setSelectedType] = useState(null);
    const [announcementCost, setAnnouncementCost] = useState();
    const [announcementCostOther, setAnnouncementCostOther] = useState("");


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
        if (!image) {
            return;
        }
        let newImages = [...images];
        for (let i = 0; i < newImages.length; i++) {
            if (newImages[i] === "") {
                newImages[i] = URL.createObjectURL(image[0]);
                break;
            }
        }
        setImages(newImages);
    }

    const handleDeleteImage = (index) => {
        let newImages = [...images];
        newImages[index] = "";
        setImages(newImages);
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
        setSelectedType(costType);
    }

    return (
        <div id="add-announcement-main-container"
             className="d-flex flex-column align-items-center w-70 mx-auto user-select-none">
            <Helmet>
                <title>Dodaj ogłoszenie | BorrowMe</title>
            </Helmet>
            <h2 className="mt-5">Dodaj nowe ogłoszenie</h2>
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
                        <div id="add-announcement-categories-button" onClick={showModal}
                             className="w-100 mt-1 px-3 py-1 rounded text-center cursor-pointer d-flex justify-content-center align-items-center"
                        >
                            {category.subCategory ? `${category.mainCategory} - ${category.subCategory}` : "Wybierz kategorie"}
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
                             className={"my-auto d-flex p-2 w-70 flex-column rounded align-items-center " +
                                 (isImagesArrayFull ? "add-announcement-image-add-button-disabled" : "cursor-pointer")}>
                            Dodaj zdjęcie
                            <AddBoxOutlinedIcon
                                sx={{fontSize: 50, color: (isImagesArrayFull ? "#eeeeee" : "#646464")}}/>
                        </div>
                        <input type="file" hidden disabled={isImagesArrayFull}/>
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
                <div id="add-announcement-cost-container" className="d-flex flex-column w-100 mt-4 p-5 rounded bg-white">
                    <label>Forma płatności za wypożyczenie przedmiotu:</label>
                    <CostTypesButtons handleCostTypeClick={handleCostTypeClick} selectedType={selectedType}/>
                    {selectedType &&
                        <div className="mt-3 d-flex justify-content-center w-100">
                            {selectedType === "money" ?
                                <label className="w-50">Chcesz wypożyczyć w zamian za:
                                    <div className="d-flex align-items-center mt-1">
                                        <input id="cost-money-input" type="number" className="d-block rounded w-80 px-3 py-1" maxLength={50}
                                               value={announcementCost} placeholder="kwota"
                                               onChange={(e) => setAnnouncementCost(e.target.value)}
                                        />
                                        <div className="ms-2">zł / dzień</div>
                                    </div>
                                </label>
                                :selectedType === "other" ?
                                    <label className="w-50">Chcesz wypożyczyć w zamian za:
                                        <input type="text" className="d-block w-100 rounded mt-1 px-3 py-1" maxLength={50}
                                               value={announcementCostOther} placeholder="np. kwiaty"
                                               onChange={(e) => setAnnouncementCostOther(e.target.value)}
                                        />
                                    </label>
                                    :
                                    <label>Chcesz wypożyczyć za darmo</label>
                            }
                        </div>
                    }
                </div>

            </form>
            {isCategoriesModalVisible &&
                <CategoriesModal handleCategorySelect={handleCategorySelect} hideModal={hideModal}/>
            }
        </div>
    );
};

export default AddAnnouncement;