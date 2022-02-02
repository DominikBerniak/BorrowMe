import {Outlet} from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer"
import "./layout/layout.css"

const Layout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default Layout;