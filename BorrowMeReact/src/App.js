import {Route, Routes} from "react-router-dom";
import "./styles/main.css"
import Layout from "./pages/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;