import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product: {}
    },
    reducers: {
        productRequest(state, action) {
            return {
                loading: true
            }
        },
        productSucsess(state, action) {
            return {
                loading: false,
                product: action.payload.prod
            }
        },
        productFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = productSlice;

export const { productRequest, productSucsess, productFail } = actions

export default reducer;
