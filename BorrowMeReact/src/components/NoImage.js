const NoImage = ({classNames}) => {
    return (
        <div className={"w-100 h-100 d-flex justify-content-center align-items-center user-select-none " + classNames}>Brak zdjęcia</div>
    );
};

export default NoImage;
