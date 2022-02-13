const ImageAPI = ({imageDirectory, imageName, classNames}) => {
    return <img src={`/StaticFiles/${imageDirectory}/${imageName}`} className={classNames}/>;
};

export default ImageAPI