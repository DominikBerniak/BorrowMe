import {useEffect} from "react";

const Home = ({toggleLoginStatus}) => {
    useEffect(()=>{
        toggleLoginStatus(true);
    },[])
    return (
        <div style={{height: "150vh"}}>

        </div>
    );
};

export default Home;