import {Outlet} from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer"
import "./layout/layout.css"
import {useEffect, useRef} from "react";

const Layout = () => {
    const navbarRef = useRef();
    const navbarCategoriesRef = useRef();
    const footerRef = useRef();
    const outletRef = useRef();

    useEffect(() => {
        outletRef.current.style.paddingTop = (navbarRef.current.clientHeight + navbarCategoriesRef.current.clientHeight) + "px";
        outletRef.current.style.minHeight = (window.innerHeight - footerRef.current.clientHeight) + "px";
    }, [])
    return (
        <>
            <Navbar navBarRef={navbarRef} navbarCategoriesRef={navbarCategoriesRef}/>
            <div id="outlet-container" ref={outletRef} className="mt-5 d-flex flex-column">
                <Outlet/>
            </div>
            <Footer footerRef={footerRef} />
        </>
    );
};

export default Layout;