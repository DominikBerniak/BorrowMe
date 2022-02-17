import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import {useEffect, useState} from "react";

const SortingPanel = ({pageNumber, incrementPageNum, decrementPageNum, numberOfPages, announcements, changePageToNumber}) => {
    const [inputPageNum, setInputPageNum] = useState(pageNumber);
    useEffect(()=>{
        setInputPageNum(pageNumber);
    },[pageNumber])
    return (
        <div id="sorting-container" className="d-flex align-items-center p-3">
            <div className="">
                <GridViewOutlinedIcon sx={{fontSize: 50, color: "#666666"}}/>
            </div>
            <div className="w-100 d-flex justify-content-center align-items-center">
                <span>sortowanie:</span>
                <form className="w-40 ms-3">
                    <select className="form-select shadow-none">
                        <option value="trafność: największa" className="">trafność: największa</option>
                        <option value="koszt: od najniższej">koszt: od najniższej</option>
                        <option value="koszt: od najwyższej">koszt: od najwyższej</option>
                        <option value="ocena:od najniższej">ocena:od najniższej</option>
                        <option value="ocena:od najwyższej">ocena:od najwyższej</option>
                    </select>
                </form>
            </div>
            {announcements &&
                <div id="pagination-container" className="d-flex justify-content-end align-items-center w-40 h-90 ms-auto">
                    {pageNumber !== 1 &&
                        <button className="btn text-black shadow-none" onClick={decrementPageNum}>{"<"}</button>
                    }
                    <form onSubmit={(e)=>changePageToNumber(e,inputPageNum)}
                        className="w-15 h-100 mx-3">
                        <input type="number" id="search-results-pagination-current-page"
                               className="text-center h-100 w-100 rounded"
                               value={inputPageNum} onChange={(e)=>setInputPageNum(e.target.value)}
                       />
                    </form>
                    <div className="">{"/"}</div>
                    <div className="px-3">{numberOfPages}</div>
                    <button className="btn text-black shadow-none"
                            onClick={incrementPageNum}
                            disabled={pageNumber === numberOfPages }>{">"}</button>
                </div>
            }

        </div>
    );
};

export default SortingPanel;