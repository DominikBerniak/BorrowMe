import {Route, Routes} from "react-router-dom";
import "./styles/main.css"
import Layout from "./pages/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import {useState} from "react";
import Logout from "./pages/Logout";
import ImageAPI from "./components/ImageAPI";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const toggleLoginStatus = (isLogged) => {
        setIsLoggedIn(isLogged)
    }

    return (
        <Routes>
            <Route path="/" element={<Layout isLoggedIn={isLoggedIn}/>}>
                <Route index element={<Home toggleLoginStatus={toggleLoginStatus}/>}/>
                <Route path="logout" element={<Logout toggleLoginStatus={toggleLoginStatus}/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;