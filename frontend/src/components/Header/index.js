import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Header.module.scss';
import Button from '../Button';

function Header() {

    const [modalStatus, setModalStatus] = useState(false)

    const searchBox = useRef()

    useEffect(() =>  {
        if (modalStatus) {
            searchBox.current.focus()
        }
    }, [modalStatus])

    const openSearchBox = (event) => {
        setModalStatus(true)
    }

    const cancelSearch = (event) => {
        console.log("cancel clicked");
        setModalStatus(false)
    }

    return (
        <header className={clsx(styles.wrapper, "flex")}>
            <nav className={clsx(styles.navbar, "grid wide pad-16 flex")}>
                <div className={clsx(styles.leftNav, "flex")}>
                    <Button className={clsx(styles.brandLogo)} to='/'>
                        <picture>
                            <source
                                media="(max-width: 767px)"
                                srcSet={require('~/assets/icons/Logo.png')}
                            >
                            </source>
                            <img
                                src={require('~/assets/icons/WideLogo.png')}
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
                            <img
                                src={require('~/assets/icons/facebook.svg').default}
                                alt="facebook icon"
                            />
                        </Button>
                        <Button
                            className={clsx(styles.socialIcon)}
                            href="https://www.youtube.com/spiderum"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={require('~/assets/icons/youtube.svg').default}
                                alt="youtube icon"
                            />
                        </Button>
                        <Button
                            className={clsx(styles.socialIcon)}
                            href="https://anchor.fm/spiderum"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={require('~/assets/icons/spotify.svg').default}
                                alt="spotify icon"
                            />
                        </Button>
                        <Button
                            className={clsx(styles.navShop, styles.socialIcon, "md-0 sm-0")}
                            size="small"
                            border="rounded"
                            href="https://shopee.vn/spiderum"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={require('~/assets/icons/shop.svg').default}
                                alt="cart icon"
                            />
                            <p>Spider's Shop</p>
                        </Button>
                    </div>
                </div>
                
                <div className={clsx(styles.rightNav)}>
                    <Button className={clsx(styles.searchBtn)} onClick={openSearchBox}>
                        <img
                            src={require('~/assets/icons/search.svg').default}
                            alt="search icon"
                        >
                        </img>
                    </Button>

                    <Button className="sm-0" type="textStyle" to="/about">
                        Về Spiderum
                    </Button>
                    <Button className="sm-0" type="textStyle" to="/register">
                        Đăng ký
                    </Button>
                    <Button type="primary" size="large" border="rounded" to="/login">
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
                <img
                    src={require('~/assets/icons/search.svg').default}
                    alt="search icon"
                >
                </img>

            </div>
        </header>
    )

}

export default Header;