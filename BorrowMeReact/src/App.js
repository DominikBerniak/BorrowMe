import {Route, Routes} from "react-router-dom";
import "./styles/main.css"
import Layout from "./pages/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path="search-results" element={<SearchResults />}/>
                <Route path="search-results/:categoryParam" element={<SearchResults />}/>
                <Route path="search-results/:categoryParam/:voivodeshipParam" element={<SearchResults />}/>
                <Route path="search-results/:categoryParam/:voivodeshipParam/:cityParam" element={<SearchResults />}/>

                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;