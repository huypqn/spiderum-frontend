import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Header.module.scss';
import Button from '../Button';
import LeftNav from './LeftNav';
import { routesPath } from '~/config';
import SearchModal from './SearchModal';
import { dataService } from '~/services';
import { icons } from '~/assets'

function Header() {

    const [openSearch, setOpenSearch] = useState(false)
    const wrapperRef = useRef()

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

    const openSearchBox = () => {
        setOpenSearch(true)
    }

    const closeSearchBox = () => {
        setOpenSearch(false)
    }

    return (
        <header
            className={clsx(styles.wrapper, styles.container, "flex")}
            ref={wrapperRef}
        >
            <nav className={clsx(styles.navbar, "grid wide pad-16 flex")}>
                <LeftNav />
                
                <div className={clsx(styles.rightNav)}>
                    <Button className={clsx(styles.iconBtn)} onClick={openSearchBox}>
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
                <SearchModal open={openSearch} close={closeSearchBox}/>
            </nav>
        </header>
    )
}

function LoggedIn() {

    const [openSearch, setOpenSearch] = useState(false)
    const [topic, setTopic] = useState([])
    const wrapperRef = useRef()
    const subMenuRef = useRef()
    const userSettingRef = useRef()

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

    useEffect(() => {
        const getTopic = async () => {
            try {
                const res = await dataService.getTopics()
                setTopic(res)
            } catch (error) {
                console.log(error);
            }
        }
        getTopic()
    }, [])

    const openSearchBox = () => {
        setOpenSearch(true)
    }

    const closeSearchBox = () => {
        setOpenSearch(false)
    }

    const handleSubMenuOpenClose = (e) => {
        const subMenuBtn = document.querySelector(`.${styles.subMenuBtn}`)
        const userAvatar = document.querySelector(`.${styles.userAvatar}`)
        if (subMenuBtn && (e.target === subMenuBtn || subMenuBtn.contains(e.target))) {
            subMenuRef.current.classList.toggle(styles.show)
        }
        else {
            subMenuRef.current.classList.remove(styles.show)
        }

        if (userAvatar && (e.target === userAvatar || userAvatar.contains(e.target))) {
            userSettingRef.current.classList.toggle(styles.show)
        }
        else {
            userSettingRef.current.classList.remove(styles.show)
        }
    } 

    useEffect(() => {
        document.addEventListener('click', handleSubMenuOpenClose)

        return () => {
            document.removeEventListener('click', handleSubMenuOpenClose)
        }
    }, [])

    return (
        <div className={clsx(styles.wrapper)} ref={wrapperRef}>
            <header className={clsx(styles.container, "flex")}>
                <nav className={clsx(styles.navbar, "grid wide pad-16 flex")}>
                    <LeftNav />
            
                    <div className={clsx(styles.rightNav)}>
                        <Button className={clsx(styles.iconBtn)} onClick={openSearchBox}>
                            <img src={icons.search} alt="search icon"/>
                        </Button>
                        <Button className={clsx(styles.iconBtn, styles.messageBtn)}>
                            <img src={icons.message} alt="message icon"/>
                        </Button>
                        <Button className={clsx(styles.iconBtn)}>
                            <img src={icons.notify} alt="notify icon"/>
                        </Button>
                        <Button
                            className={clsx(styles.writePostBtn)}
                            category="outline" size="large" border="rounded"
                        >
                            <img src={icons.pen} alt="pen icon"/>
                            Viết bài
                        </Button>
                        <Button
                            className={clsx(styles.userAvatar)}
                            category="outline"
                            border="rounded"
                        >
                            <img src={icons.avt} alt="avatar"/>
                            <div
                                className={clsx(styles.userSetting, styles.subCategoriesMenu)}
                                ref={userSettingRef}
                            >
                                <header className={clsx(styles.userInfoContainer, "flex")}>
                                    <div className={styles.userInfo}>
                                        <img src={icons.avt} alt="user avatar"/>
                                        <div className={clsx(styles.userName)}>
                                            <p>Astral</p>
                                            <p>@shuu</p>
                                        </div>
                                    </div>
                                    <Button
                                        className={styles.userProfileBtn}
                                        category="outline"
                                        size="large"
                                        border="rounded"
                                        to="#"
                                    >
                                        Xem trang cá nhân
                                    </Button>
                                </header>
                                <hr />
                                <main>
                                    <Button
                                        className={clsx(styles.subCategoriesBtn)}
                                        category="textStyle"
                                        size="large"
                                        to="#"
                                    >
                                        <img src={icons.mypost} alt="my post icon"/>&nbsp;
                                        Bài viết của tôi
                                    </Button>
                                    <Button
                                        className={clsx(styles.subCategoriesBtn)}
                                        category="textStyle"
                                        size="large"
                                        to="#"
                                    >
                                        <img src={icons.draft} alt="my post icon"/>&nbsp;
                                        Nháp của tôi
                                    </Button>
                                    <Button
                                        className={clsx(styles.subCategoriesBtn)}
                                        category="textStyle"
                                        size="large"
                                        to="#"
                                    >
                                        <img src={icons.saved} alt="my post icon"/>&nbsp;
                                        Đã lưu
                                    </Button>
                                    <Button
                                        className={clsx(styles.subCategoriesBtn)}
                                        category="textStyle"
                                        size="large"
                                        to="#"
                                    >
                                        <img src={icons.setting} alt="my post icon"/>&nbsp;
                                        Tùy chỉnh tài khoản
                                    </Button>
                                    <hr />
                                    <Button
                                        className={clsx(styles.subCategoriesBtn)}
                                        category="textStyle"
                                        size="large"
                                        to="#"
                                    >
                                        <img src={icons.logout} alt="my post icon"/>&nbsp;
                                        Đăng xuất
                                    </Button>
                                </main>
                                <footer className={styles.logout}></footer>
                            </div>
                        </Button>
                    </div>
                    <SearchModal open={openSearch} close={closeSearchBox}/>
                </nav>
            </header>

            <header className={clsx(styles.navBottom, "flex")}>
                <nav className={clsx(styles.navbar, "grid wide pad-16 flex")}>
                    <div className={styles.categoriesMenu}>
                        {
                            topic.slice(0, 6).map((cat, index) => {
                                return (
                                    <Button
                                        className={styles.categoriesBtn}
                                        key={index}
                                        category="textStyle"
                                        to="#"
                                    >
                                        {cat.name}
                                    </Button>
                                )
                            })
                        }
                    </div>
                    <Button className={styles.subMenuBtn}>
                        <img src={icons.menu} alt="menu icon"/>
                        <div className={styles.subCategoriesMenu} ref={subMenuRef}>
                            {
                                topic.slice(6,).map((cat, index) => {
                                    return (
                                        <Button
                                            className={styles.subCategoriesBtn}
                                            key={index}
                                            category="textStyle"
                                            size="large"
                                            to="/register"
                                        >
                                            {cat.name}
                                        </Button>
                                    )
                                })
                            }
                        </div>
                    </Button>
                </nav>
            </header>
        </div>
    )
}

Header.LoggedIn = LoggedIn

export default Header;