import {Outlet} from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer"
import "./layout/layout.css"
import {useEffect, useState} from "react";

const Layout = ({isLoggedIn}) => {
    const [navBarHeight, setNavbarHeight] = useState({height: 0});
    const [footerHeight, setFooterHeight] = useState({height: 0});

    const setHeight = (type, height) => {
        switch (type)
        {
            case "navbar":
                setNavbarHeight({height: height});
                break;
            case "footer":
                setFooterHeight({height: height});
                break;
        }
    }

    useEffect(() => {
        const outletContainer = document.getElementById("outlet-container");
        outletContainer.style.paddingTop = (navBarHeight.height + document.getElementById("categories-button").offsetHeight) + "px";
        outletContainer.style.minHeight = (window.innerHeight - footerHeight.height) + "px";

        document.getElementById("categories").style.top = navBarHeight.height + "px";
    }, [navBarHeight, footerHeight])
    return (
        <>
            <Navbar setHeight={setHeight} isLoggedIn={isLoggedIn}/>
            <div id="outlet-container">
                <Outlet/>
            </div>
            <Footer setHeight={setHeight} />
        </>
    );
};

export default Layout;