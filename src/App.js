import { useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { routing } from '~/routes'

function App() {

    const auth = useSelector(state => state.user.isLoggedIn)

    let element = useRoutes(routing(auth))

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
