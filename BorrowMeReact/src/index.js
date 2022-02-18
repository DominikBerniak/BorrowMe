import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import searchReducer from "./features/location";
import ScrollToTop from "./components/ScrollToTop";


const store = configureStore({
    reducer: {
        search: searchReducer,
    },
})

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ScrollToTop />
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);