const SortingPanel = ({pageNumber, incrementPageNum, decrementPageNum, numberOfPages}) => {
    return (
        <div id="sorting-container" className="d-flex justify-content-center p-3">
            <button className="btn text-black btn-primary" disabled={pageNumber < 2}
                    onClick={decrementPageNum}>{"<"}</button>
            <h1 className="text-center px-2">
                {pageNumber}/{numberOfPages}
            </h1>
            <button className="btn text-black btn-primary"
                    onClick={incrementPageNum}
                    disabled={pageNumber === numberOfPages }>{">"}</button>
        </div>
    );
};

export default SortingPanel;