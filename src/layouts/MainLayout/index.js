import Header from "~/components/Header";
import Footer from "~/components/Footer";

function MainLayout({ children }) {
    return (
        <>
            <Header.LoggedIn />
            <div className="container">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default MainLayout