const ImageAPI = ({imageDirectory, imageName, classNames}) => {
    return <img src={`/api/StaticFiles/${imageDirectory}/${imageName}`} className={classNames}/>;
};

export default ImageAPI