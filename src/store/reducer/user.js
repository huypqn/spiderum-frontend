import { createReducer } from "@reduxjs/toolkit"
import { setLogIn, setSignOut } from '../actions'

const initialState = {
    isLoggedIn: false,
    info: {
        id: null,
        name: "",
        username: ""
    }
}

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setLogIn, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.info.id = action.payload.id
            state.info.name = action.payload.name
            state.info.username = action.payload.username
        })
        .addCase(setSignOut, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.info.id = action.payload.id
            state.info.name = action.payload.name
            state.info.username = action.payload.username
        })
        .addDefaultCase((state, action) => {})
})

export default userReducer