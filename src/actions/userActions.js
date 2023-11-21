import axios from "axios"
import {
    loginFail, loginRequest,
    loginSucsess, clearautherror,
    registerRequest,
    registerFail, registerSucsess, loaduserRequest, loaduserSucsess, loaduserFail, logoutSucsess, logoutFail, UpdateProfileRequest, UpdateProfileSucsess, UpdateProfileFail
} from "../slices/authSlice"

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(loginRequest())
        const { data } = await axios.post(`https://rsdrawz-backend.onrender.com/api/v1/login/rs`, { email, password })
        dispatch(loginSucsess(data))
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }
}
export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post(`api/v1/register`, userData, config)
        dispatch(registerSucsess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }
}

export const loaduser = async (dispatch) => {

    try {
        dispatch(loaduserRequest())

        const { data } = await axios.get(`api/v1/myprofile`)
        dispatch(loaduserSucsess(data))
    } catch (error) {
        dispatch(loaduserFail(error.response.data.message))
    }
}

export const logout = async (dispatch) => {

    try {
        await axios.get(`api/v1/logout`)
        dispatch(logoutSucsess())
    } catch (error) {
        dispatch(logoutFail())
    }
}
export const clearerror = dispatch => {
    dispatch(clearautherror())
}

export const UpdateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(UpdateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`api/v1/update`, userData, config)
        dispatch(UpdateProfileSucsess(data))
    } catch (error) {
        dispatch(UpdateProfileFail(error.response.data.message))
    }
}

