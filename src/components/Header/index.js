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
            </nav>
            <SearchModal open={openSearch} close={closeSearchBox}/>
        </header>
    )
}

function LoggedIn() {

    const [openSearch, setOpenSearch] = useState(false)
    const [topic, setTopic] = useState([])
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
    console.log(topic);
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

    return (
        <div className={clsx(styles.wrapper)} ref={wrapperRef}>
            <header className={clsx(styles.container, "flex")}>
                <nav className={clsx(styles.navbar, "grid wide pad-16 flex")}>
                    <LeftNav />
            
                    <div className={clsx(styles.rightNav)}>
                        <Button className={clsx(styles.iconBtn)} onClick={openSearchBox}>
                            <img src={icons.search} alt="search icon"/>
                        </Button>
                        <Button className={clsx(styles.iconBtn)}>
                            <img src={icons.message} alt="message icon"/>
                        </Button>
                        <Button className={clsx(styles.iconBtn)}>
                            <img src={icons.notify} alt="notify icon"/>
                        </Button>
                        <Button
                            className={clsx(styles.writePostBtn)}
                            category="outline" size="large" border="rounded"
                        >
                            <img src={icons.pen} alt="pen icon"/>&nbsp;
                            Viết bài
                        </Button>
                        <Button
                            className={clsx(styles.userAvatar)}
                            category="outline"
                            border="rounded"
                        >
                            <img src={icons.avt} alt="avatar"/>
                        </Button>
                    </div>
                </nav>
                <SearchModal open={openSearch} close={closeSearchBox}/>
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
                                        size="large"
                                        to="#"
                                    >
                                        {cat.name}
                                    </Button>
                                )
                            })
                        }
                    </div>
                    <Button className={styles.subMenu}>
                        <img src={icons.menu} alt="menu icon"/>
                    </Button>
                </nav>
            </header>
        </div>
    )
}

Header.LoggedIn = LoggedIn

export default Header;