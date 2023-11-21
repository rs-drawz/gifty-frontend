import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";//for making store as async
import productsReducer from "./slices/productsSlice";
import productReducer from "./slices/productSliice"
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer,
    authState: authReducer,
    cartState: cartReducer
})

const store = configureStore({
    reducer,
    middleware: [thunk]
})

export default store;