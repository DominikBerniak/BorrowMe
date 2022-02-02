const PageNotFound = () => {
    return (
        <div>
            <h3 className="text-center blue-text p-4">
                Nie znaleziono strony o podanym adresie :(
            </h3>
            <div className="dog-image">
                <img src="http://127.0.0.1:8080/BorrowMeReact/src/images/saddog.png" alt="sad dog image"/>
            </div>
        </div>
    );
};

export default PageNotFound;