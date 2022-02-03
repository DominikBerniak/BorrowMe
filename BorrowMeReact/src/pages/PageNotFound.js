import ImageAPI from "../components/ImageAPI";
import {useEffect} from "react";

const PageNotFound = () => {
    useEffect(()=>{
        const footer = document.getElementById("footer");
        const dog = document.getElementById("dog-container");
        dog.style.bottom = footer.offsetHeight + "px";
    })
    return (
        <div className="mt-5">
            <h3 className="text-center text-grey">
                Nie znaleziono strony o podanym adresie :(
            </h3>
            <div id="dog-container">
                <ImageAPI imageDirectory="site-images" imageName="saddog.png" classNames="" />
            </div>
        </div>
    );
};

export default PageNotFound;