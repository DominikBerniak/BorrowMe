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
import cityHintsReducer from "./features/cityHints";


const store = configureStore({
    reducer: {
        location: locationReducer,
        searchPhrase: searchPhraseReducer,
        category: categoryReducer,
        cityHints: cityHintsReducer
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