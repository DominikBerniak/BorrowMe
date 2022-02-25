import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const SearchResultsRedirect = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate("/search-results/all/all/")
    },[])
    return (<></>)
};

export default SearchResultsRedirect;