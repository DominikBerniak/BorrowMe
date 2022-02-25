import {Route, Routes} from "react-router-dom";
import "./styles/main.css"
import Layout from "./pages/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SearchResultsRedirect from "./pages/searchResults/SearchResultsRedirect";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path="search-results" element={<SearchResultsRedirect />}/>
                <Route path="search-results/:mainCategoryParam" element={<SearchResults />}/>
                <Route path="search-results/:mainCategoryParam/:subCategoryParam" element={<SearchResults />}/>
                <Route path="search-results/:mainCategoryParam/:subCategoryParam/:voivodeshipParam" element={<SearchResults />}/>
                <Route path="search-results/:mainCategoryParam/:subCategoryParam/:voivodeshipParam/:cityParam" element={<SearchResults />}/>

                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;