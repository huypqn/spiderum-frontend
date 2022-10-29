import Header from "../common/Header";
import Footer from "../common/Footer";

function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout