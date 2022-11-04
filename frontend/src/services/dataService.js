import { httpRequest } from "~/utils"

const getTopics = async (options) => {
    try {
        const res = await httpRequest.get('/topic', {
            params: options
        })
        return res
    } catch (error) {
        console.log(error);
    }
}

const getPosts = async (options) => {
    try {
        const res = await httpRequest.get('/post', {
            params: options
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export { getPosts, getTopics }