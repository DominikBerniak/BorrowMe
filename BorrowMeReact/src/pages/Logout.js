import {useEffect} from "react";

const Logout = ({toggleLoginStatus}) => {
    useEffect(()=>{
        toggleLoginStatus(false);
    },[])
    return (
        <h1 style={{height: "150vh"}}>
           Wylogowałeś się!
        </h1>
    );
};

export default Logout;