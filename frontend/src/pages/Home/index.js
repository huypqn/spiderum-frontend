import { useEffect } from 'react'

const api = '/v1/api/user'

function Home() {

    useEffect(() => {
        async function getData() {
            const res = await fetch(api)
            const data = await res.json()

            console.log(data);
        }

        getData()
    }, [])

    return (
        <div>
            <h1>Home page</h1>
        </div>
    )
}

export default Home