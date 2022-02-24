import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";

import locationReducer from "./features/location";
import searchPhraseReducer from "./features/searchPhrase";
import categoryReducer from "./features/category";


const store = configureStore({
    reducer: {
        location: locationReducer,
        searchPhrase: searchPhraseReducer,
        category: categoryReducer
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