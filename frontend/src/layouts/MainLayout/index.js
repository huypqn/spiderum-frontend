import Header from "~/components/Header";
import Footer from "~/components/Footer";

function MainLayout({ children }) {
    return (
        <>
            <Header />
            <div className="container">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default MainLayout