import { createAction } from "@reduxjs/toolkit"

const setLogIn = createAction('user/setLogIn')
const setSignOut = createAction('user/setSignOut')


export { setLogIn, setSignOut }