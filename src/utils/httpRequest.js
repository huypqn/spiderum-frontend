import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,

})

async function get(path, options = {}) {
    const response = await request.get(path, options)
    return response.data
}

async function post(path, options = {}, config = {}) {
    const response = await request.post(path, options, config)
    return response.data
}

export { request, get, post }