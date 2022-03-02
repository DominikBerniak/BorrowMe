// import {Helmet} from "react-helmet";
// import {Route} from "react-router-dom";
// import Home from "../pages/Home";
//
// const RouteWithTitle = ({pageComponent}) => {
//     return (
//         <Route element={
//             pageComponent
//         }/>
//     );
// };
//
// export default RouteWithTitle;
//
// const RouteWithTitle = ({ component: Component, title, ...rest}) => (
//     <Route {...rest} render={(props)=> (
//         <Helmet>
//             <title>{title}</title>
//         </Helmet>
//         <Component {...routeProps} />
//         )} />
// )