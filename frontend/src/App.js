import { useRoutes } from 'react-router-dom'
import { routing } from '~/routes'

function App() {

    let element = useRoutes(routing(false))

     return (
        <div className='App'>
            {element}
        </div>
    )
}

export default App;
