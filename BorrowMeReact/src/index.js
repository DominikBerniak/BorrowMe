import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import searchReducer from "./features/search";


const store = configureStore({
    reducer: {
        search: searchReducer,
    },
})

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);