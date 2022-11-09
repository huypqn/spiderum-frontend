import { useEffect, useRef } from "react"
import styles from './ScrollToTop.module.scss'
import { icons } from "~/assets"

function ScrollToTop() {

    const buttonRef = useRef()

    const show = () => {
        const currentPosition = window.scrollY
        if (currentPosition >= 200) {
            buttonRef.current.style.transform = "scale(1)"
        }
        else {
            buttonRef.current.style.transform = "scale(0)"
        }
    }

    useEffect(() => {
        if (buttonRef && buttonRef.current) {
            window.addEventListener("scroll", show)
        }

        return () => {
            window.removeEventListener("scroll", show)
        }
    }, [buttonRef])

    const goToTop = () => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }

    return (
        <button
            ref={buttonRef}
            className={styles.scrollBtn}
            onClick={goToTop}
        >
            <img src={icons.scroll} alt="scroll button"/>
        </button>
    )
}

export default ScrollToTop