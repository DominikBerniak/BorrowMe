import {Outlet} from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer"
import "./layout/layout.css"
import {useEffect, useState} from "react";

const Layout = ({isLoggedIn}) => {
    const [navBarHeight, setNavbarHeight] = useState({height: 0});

    const setHeight = (height) => {
        setNavbarHeight({height: height});
    }

    useEffect(() => {
        document.getElementById("outlet-container").style.paddingTop = navBarHeight.height + "px";
        document.getElementById("categories").style.top = navBarHeight.height + "px";
    }, [navBarHeight])
    return (
        <>
            <Navbar setHeight={setHeight} isLoggedIn={isLoggedIn}/>
            <div id="outlet-container">
                <Outlet/>
            </div>
            <Footer/>
        </>
    );
};

export default Layout;