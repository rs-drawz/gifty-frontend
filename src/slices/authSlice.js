import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        isAuthenticated: false
    },
    reducers: {
        loginRequest(state, action) {
            return {
                ...state,
                loading: true,

            }
        },
        loginSucsess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearautherror(state, action) {
            return {
                ...state,
                loading: false,
                error: null
            }
        },
        registerRequest(state, action) {
            return {
                ...state,
                loading: true,

            }
        },
        registerSucsess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        registerFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loaduserRequest(state, action) {
            return {
                ...state,
                isAuthenticated: false,
                loading:true

            }
        },
        loaduserSucsess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loaduserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        logoutSucsess(state, action) {
            return {
                loading: false,
                isAuthenticated: false,
            }
        },
        logoutFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
       UpdateProfileRequest(state, action) {
            return {
                ...state,
                loading: true,
                isUpdated:false

            }
        },
        UpdateProfileSucsess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated:true
            }
        },
        UpdateProfileFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = authSlice;

export const { loginRequest, loginSucsess,
    loginFail, clearautherror,
    registerRequest, registerSucsess,
    registerFail,loaduserRequest,
    loaduserSucsess,loaduserFail,
    logoutFail,logoutSucsess,
    UpdateProfileRequest,UpdateProfileSucsess,UpdateProfileFail} = actions

export default reducer;
