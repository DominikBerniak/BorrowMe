import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeSort} from "../../features/sort";


const SortingPanel = ({pageNumber, incrementPageNum, decrementPageNum, numberOfPages, announcements, changePageToNumber}) => {
    const dispatch = useDispatch();
    const [inputPageNum, setInputPageNum] = useState(pageNumber.toString());
    const sortFilter = useSelector(state=>state.sort.value);

    useEffect(()=>{
        setInputPageNum(pageNumber);
    },[pageNumber])

    const handleSortChange = (value) => {
        let sortValues = value.split(":");
        dispatch(changeSort({
            sortBy: sortValues[0],
            sortDirection: sortValues[1]
        }));
    }


    return (
        <div id="sorting-container" className="d-flex align-items-center p-3 user-select-none">
            <div className="">
                <GridViewOutlinedIcon sx={{fontSize: 50, color: "#666666"}}/>
            </div>
            <div className="w-100 d-flex justify-content-center align-items-center">
                <span>sortowanie:</span>
                <div className="w-40 ms-3">
                    <select className="form-select shadow-none" value={`${sortFilter.sortBy}:${sortFilter.sortDirection}`} onChange={e=>handleSortChange(e.target.value)}>
                        {/*<option value="trafność: największa" className="">trafność: największa</option>*/}
                        <option value="publishDate:desc">data dodania: od najnowszej</option>
                        <option value="publishDate:asc">data dodania: od najstarszej</option>
                        <option value="cost:asc">koszt: od najniższego</option>
                        <option value="cost:desc">koszt: od największego</option>
                        {/*<option value="ocena: od najniższej">ocena: od najniższej</option>*/}
                        {/*<option value="ocena: od najwyższej">ocena: od najwyższej</option>*/}
                    </select>
                </div>
            </div>
            {announcements ?
                <div id="pagination-container" className="d-flex justify-content-end align-items-center w-40 h-90 ms-auto user-select-none">
                    {pageNumber !== 1 &&
                        <button className="btn text-black shadow-none" onClick={decrementPageNum}>{"<"}</button>
                    }
                    <form onSubmit={(e)=>changePageToNumber(e,inputPageNum)}
                        className="w-17 h-100 mx-3">
                        <input type="number" id="search-results-pagination-current-page"
                               className="text-center h-100 w-100 rounded" autoComplete="off"
                               value={inputPageNum} onChange={(e)=>setInputPageNum(e.target.value)}
                       />
                    </form>
                    <div className="">{"/"}</div>
                    <div className="px-3 user-select-none">{numberOfPages}</div>
                    {pageNumber < numberOfPages ?
                        <button className="btn text-black shadow-none"
                                onClick={incrementPageNum}>{">"}</button>
                        :
                        <div className="btn text-white shadow-none  pe-none">{">"}</div>
                    }
                </div>
                :
                <div className="w-40"></div>
            }
        </div>
    );
};

export default SortingPanel;