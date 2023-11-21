import { addcartItemRequest, addcartItemSucsess } from "../slices/cartSlice"
import axios from "axios"
export const addCartItem = (id, quantity) => async (dispatch) => {
    try {
        dispatch(addcartItemRequest())
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch(addcartItemSucsess({
            product: data.prod._id,
            name: data.prod.name,
            price: data.prod.price,
            image: data.prod.images[0].image,
            stock: data.prod.stock,
            quantity

        }))
    } catch (error) {

    }
}