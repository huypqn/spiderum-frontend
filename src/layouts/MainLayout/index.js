import { useSelector } from "react-redux";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

function MainLayout({ children }) {

    const auth = useSelector(state => state.user.isLoggedIn)
    return (
        <>
            { auth ? <Header.LoggedIn /> : <Header />}
            <div className="container">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default MainLayout