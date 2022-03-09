import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {getAuthUser} from "../services/getAuthUser";

const RequireAuth = ({children}) => {
    const authUser = useSelector(state => state.authUser.value);
    const location = useLocation();
    if (authUser.status === "initial")
    {
        getAuthUser()
            .then(user=>{
                if (!user.businessUserId)
                {
                    return <Navigate to="/login" state={{path: location.pathname}}/>;
                }
                return children;
            });
    }
    else {
        return authUser.status === "logged-in" ? children : <Navigate to="/login" state={{path: location.pathname}}/>
    }
    return null
};

export default RequireAuth;