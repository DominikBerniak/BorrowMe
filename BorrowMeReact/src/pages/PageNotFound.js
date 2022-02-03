import ImageAPI from "../components/ImageAPI";

const PageNotFound = () => {
    return (
        <div>
            <h3 className="text-center blue-text p-4">
                Nie znaleziono strony o podanym adresie :(
            </h3>
            <div className="dog-image">
                <ImageAPI imageDirectory="site-images" imageName="saddog.png" />
            </div>
        </div>
    );
};

export default PageNotFound;