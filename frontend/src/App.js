import { useRoutes } from 'react-router-dom'
import { routing } from '~/routes'

function App() {

  let element = useRoutes(routing(false))

  return (

        <div className='App' style={{height: 1200}}>
            {element}
        </div>

  )
}

export default App;
