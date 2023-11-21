import axios from 'axios'
import { productsFail, productsRequest, productsSucsess } from '../slices/productsSlice'
import { productFail, productRequest, productSucsess } from '../slices/productSliice'

export const getProducts = (currentPage, keyword, price, category, ratings) => async (dispatch) => {
    try {
        dispatch(productsRequest())
        let link = `/api/v1/products?page=${currentPage}`

        if (keyword) {
            link += `&keyword=${keyword}`
        }
        if (price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if (category) {
            link += `&category=${category}`
        }
        if (ratings) {
            link += `&ratings=${ratings}`
        }
        const { data } = await axios.get(link)
        dispatch(productsSucsess(data))

    } catch (error) {
        //to handle errors if not data give back
        dispatch(productsFail(error.response.data.message))
    }
}

export const getProduct = id => async (dispatch) => {
    try {
        dispatch(productRequest())
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch(productSucsess(data))

    } catch (error) {
        //to handle errors if not data give back
        dispatch(productFail(error.response.data.message))
    }
}

