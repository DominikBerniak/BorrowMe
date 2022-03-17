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
import costFilterReducer from "./features/costFilter"
import sortReducer from "./features/sort";
import authUserReducer from "./features/authUser";
import userReducer from "./features/user";
import allCategoriesReducer from "./features/allCategories";
import activeChatWindowReducer from "./features/activeChatWindow";
import activeChatFetchedMessagesReducer from "./features/activeChatFetchedMessages";


const store = configureStore({
    reducer: {
        location: locationReducer,
        searchPhrase: searchPhraseReducer,
        category: categoryReducer,
        cityHints: cityHintsReducer,
        costFilter: costFilterReducer,
        sort: sortReducer,
        authUser: authUserReducer,
        user: userReducer,
        allCategories: allCategoriesReducer,
        activeChatWindow: activeChatWindowReducer,
        activeChatFetchedMessages: activeChatFetchedMessagesReducer
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
