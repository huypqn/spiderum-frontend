import { httpRequest } from "~/utils"

const getTopics = async (options) => {
    try {
        const res = await httpRequest.get('/topic', {
            params: options
        })
        return res
    } catch (error) {
        console.log(error.response);

    }
}

const getPosts = async (options) => {
    try {
        const res = await httpRequest.get('/post', {
            params: options
        })
        return res
    } catch (error) {
        console.log(error.response);

    }
}

const register = async (payload) => {
    try {
        const res = await httpRequest.post('/user/register', payload)
        return res
    } catch (error) {
        console.log(error.response);
    }
}

export { getPosts, getTopics, register }