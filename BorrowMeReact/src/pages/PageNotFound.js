import ImageAPI from "../components/ImageAPI";

const PageNotFound = () => {
    return (
        <div className="d-flex flex-column align-items-center" style={{flex: 1}}>
            <h3 className="text-center text-grey">
                Nie znaleziono strony o podanym adresie :(
            </h3>
            <div id="dog-container" className="mt-auto">
                <ImageAPI imageDirectory="site-images" imageName="saddog.png" classNames="" />
            </div>
        </div>
    );
};

export default PageNotFound;