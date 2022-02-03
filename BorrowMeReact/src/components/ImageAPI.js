import {useEffect, useState} from "react";
import {getImage} from "../services/apiFetch";

const ImageAPI = ({imageDirectory, imageName, classNames}) => {
    const [screenShot, setScreenshot] = useState(undefined)
    const url = `api/Images/${imageDirectory}/${imageName}`

    useEffect(() => {
        const fetchData = async () => {
            const [response, error] = await getImage(url)
            if (error)
                console.log(error)
            else {
                setScreenshot(response)
            }
        }
        fetchData();
    }, [url])

    return <img src={screenShot} className={classNames}/>;
};

export default ImageAPI;