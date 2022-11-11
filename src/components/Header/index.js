import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Header.module.scss';
import Button from '../Button';
import { routesPath } from '~/config';
import { icons } from '~/assets'

function Header() {

    const [modalStatus, setModalStatus] = useState(false)

    const searchBox = useRef()
    const wrapperRef = useRef()

    useEffect(() =>  {
        if (modalStatus) {
            searchBox.current.focus()
        }
    }, [modalStatus])

    let prevScrollPosition = window.scrollY
    const handleHeaderShow = () => {
        const currentScrollPosition = window.scrollY;
        if (prevScrollPosition > currentScrollPosition) {
            wrapperRef.current.style.top = "0";
        }
        else {
            wrapperRef.current.style.top = "-100%";
        }
        prevScrollPosition = currentScrollPosition;
    }

    useEffect(() => {
        if (wrapperRef && wrapperRef.current) {
            window.addEventListener("scroll", handleHeaderShow)
        }

        return function cleanup() {
            window.removeEventListener("scroll", handleHeaderShow)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wrapperRef])


    const openSearchBox = (event) => {
        setModalStatus(true)
    }

    const cancelSearch = (event) => {
        console.log("cancel clicked");
        setModalStatus(false)
    }

    return (
        <header className={clsx(styles.wrapper, "flex")} ref={wrapperRef}>
            <nav className={clsx(styles.navbar, "grid wide pad-16 flex")}>
                <div className={clsx(styles.leftNav, "flex")}>
                    <Button className={clsx(styles.brandLogo)} to={routesPath.home}>
                        <picture>
                            <source
                                media="(max-width: 767px)"
                                srcSet={icons.logo}
                            >
                            </source>
                            <img
                                src={icons.wideLogo}
                                alt="Spiderum logo"
                                width={110}
                                height={25}
                            
                            />
                        </picture>
                    </Button>
                    <div className={clsx(styles.socialItem, "flex sm-0")}>
                        <Button
                            className={clsx(styles.socialIcon)}
                            href="https://www.facebook.com/Spiderum"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={icons.facebook} alt="facebook icon"/>
                        </Button>
                        <Button
                            className={clsx(styles.socialIcon)}
                            href="https://www.youtube.com/spiderum"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={icons.youtube} alt="youtube icon"/>
                        </Button>
                        <Button
                            className={clsx(styles.socialIcon)}
                            href="https://anchor.fm/spiderum"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={icons.spotify} alt="spotify icon"/>
                        </Button>
                        <Button
                            className={clsx(styles.navShop, styles.socialIcon, "md-0 sm-0")}
                            size="small"
                            border="rounded"
                            href="https://shopee.vn/spiderum"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={icons.shop} alt="cart icon"/>
                            <p>Spider's Shop</p>
                        </Button>
                    </div>
                </div>
                
                <div className={clsx(styles.rightNav)}>
                    <Button className={clsx(styles.searchBtn)} onClick={openSearchBox}>
                        <img src={icons.search} alt="search icon"/>
                    </Button>

                    <Button className="sm-0" category="textStyle" to={routesPath.about}>
                        Về Spiderum
                    </Button>
                    <Button className="sm-0" category="textStyle" to={routesPath.register}>
                        Đăng ký
                    </Button>
                    <Button category="primary" size="large" border="rounded" to={routesPath.login}>
                        Đăng nhập
                    </Button>
                </div>
            </nav>
            <div className={clsx(styles.navbar, styles.modal, "grid wide", {[styles.open]: modalStatus})}>
                <Button
                    className={clsx(styles.cancelSearch)}
                    onClick={cancelSearch}
                >
                </Button>
                <input
                    ref={searchBox}
                    className={clsx(styles.searchBox)}
                    type="text" placeholder='Tìm kiếm theo tiêu đề, tác giả hoặc tag'
                />
                <img src={icons.search} alt="search icon" loading="lazy"/>
            </div>
        </header>
    )

}

export default Header;