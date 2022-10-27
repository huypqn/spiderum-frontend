import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {

    const [modalStatus, setModalStatus] = useState(false)

    const openSearchBox = (event) => {
        setModalStatus(true)
    }

    const cancelSearch = (event) => {
        setModalStatus(false)
    }

    return (
        <header className={clsx(styles.wrapper)}>
            <nav className={clsx(styles.navbar, "grid wide pad-16")}>
                <div className={clsx(styles.leftnav)}>
                    <Link className={clsx(styles.brandLogo)}
                        to='/'
                    >
                        <picture>
                            <source
                                media="(max-width: 767px)"
                                srcSet={require('~/assets/icons/Logo.png')}
                                sizes="(max-width: 767px) 40px, 47px"
                            >
                            </source>
                            <img
                                src={require('~/assets/icons/WideLogo.png')}
                                alt="Spiderum logo"
                                width={110}
                                height={25}
                            />
                        </picture>
                    </Link>
                    <div className={clsx(styles.socialItem, "sm-0")}>
                        <a
                            className={clsx(styles.socialIcon)}
                            href="https://www.facebook.com/Spiderum"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={require('~/assets/icons/facebook.svg').default}
                                alt="facebook icon"
                            />
                        </a>
                        <a
                            className={clsx(styles.socialIcon)}
                            href="https://www.youtube.com/spiderum"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={require('~/assets/icons/youtube.svg').default}
                                alt="youtube icon"
                            />
                        </a>
                        <a
                            className={clsx(styles.socialIcon)}
                            href="https://anchor.fm/spiderum"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={require('~/assets/icons/spotify.svg').default}
                                alt="spotify icon"
                            />
                        </a>
                        <a
                            className={clsx(styles.socialIcon, styles.navShop)}
                            href="https://shopee.vn/spiderum"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={require('~/assets/icons/shop.svg').default}
                                alt="cart icon"
                            />
                            <p>Spider's Shop</p>
                        </a>
                    </div>
                </div>
                
                <div className={clsx(styles.subnav)}>
                    <button
                        className={clsx(styles.searchBtn)}
                        onClick={openSearchBox}
                    >
                        <img
                            src={require('~/assets/icons/search.svg').default}
                            alt="search icon"
                        >
                        </img>
                    </button>
                    <div className={styles.subnavItem}>
                        <Link
                            className={clsx(styles.aboutBtn, "sm-0")}
                            to="/about"
                        >
                            Về Spiderum
                        </Link>
                        <Link
                            className={clsx(styles.registerBtn, "sm-0")}
                            to="/register"
                        >
                            Đăng ký
                        </Link>
                        <Link
                            className={clsx(styles.loginBtn)}
                            to="/login"
                        >
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </nav>
            <div className={clsx(styles.navbar, styles.modal, "grid wide", {[styles.open]: modalStatus})}>
                <button
                    className={clsx(styles.cancelSearch)}
                    onClick={cancelSearch}
                >
                </button>
                <input
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