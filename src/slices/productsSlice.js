import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false
    },
    reducers: {
        productsRequest(state, action) {
            return {
                loading: true
            }
        },
        productsSucsess(state, action) {
            return {
                loading: false,
                products: action.payload.products,
                productscount: action.payload.count,
                resPerPage:action.payload.countperpage
            }
        },
        productsFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = productsSlice;

export const { productsRequest, productsSucsess, productsFail } = actions

export default reducer;
