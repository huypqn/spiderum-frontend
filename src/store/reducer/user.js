import { createReducer } from "@reduxjs/toolkit"
import { setLogIn, setSignOut } from '../actions'

const initialState = {
    isLoggedIn: false,
    info: {
        id: null,
        name: "",
        username: "",
        avatar: ""
    }
}

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setLogIn, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.info.id = action.payload.id
            state.info.name = action.payload.name
            state.info.username = action.payload.username
            state.info.avatar = action.payload.avatar
        })
        .addCase(setSignOut, (state, action) => {
            state.info.isLoggedIn = false
            state.info.id = null
            state.info.name = ""
            state.info.username = ""
            state.info.username = ""
            console.log("setSignOut reducer");
        })
        .addDefaultCase((state, action) => {})
})

export default userReducer