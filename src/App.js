import { useRoutes } from 'react-router-dom'
import { routing } from '~/routes'

function App() {

    let element = useRoutes(routing(false))

    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (!isSafari) {
        document.documentElement.style.scrollBehavior = "smooth"
    }

    return (
        <div className='App'>
            {element}
        </div>
    )
}

export default App;
