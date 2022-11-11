import { useState, useEffect, useCallback, useRef, memo } from 'react'
import clsx from "clsx"
import LazyLoad  from 'react-lazyload'

import styles from './MainContent.module.scss'
import Topic from './Topic'
import Button from '~/components/Button'
import { Form, FormGroup } from '~/components/Form'
import { Hcard } from '~/components/Card'
import Pagination from '~/components/Pagination'
import { dataService } from '~/services'
import { images } from '~/assets'

function MainContent() {

    const [feed, setFeed] = useState({})
    const [feedTab, setFeedTab] = useState("hot")
    const [pagination, setPagination] = useState()
    const [filters, setFilters] = useState({
        page: 1,
        limit: 15
    })
    const wrapperRef = useRef()
    const feedNavRef = useRef()

    useEffect(() => {
        const fetchData = async() => {
            try {
                const newFeed = await dataService.getPosts(filters)
                setFeed(newFeed)
                setPagination(newFeed.pagination)
            } catch (error) {
                throw Error(error)
            }
        }
        fetchData()
    }, [filters])

    const handlePageChange = useCallback((newPage) => {
        feedNavRef.current.scrollIntoView()
        setFilters(prevState => {
            return {
                ...prevState,
                page: newPage
            }
        })
    }, [])

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <Topic className="topicMobile" mobile/>

            <main className={clsx("grid wide pad-16", styles.mainContent)}>
                <section className={styles.content}>
                    <nav className={styles.contentNav} ref={feedNavRef}>
                        <Button 
                            className={clsx(styles.navBtn, {
                                [styles.activeTab]: feedTab === 'hot'
                            })}
                            category="textStyle"
                            onClick={() => setFeedTab('hot')}
                        >
                            DÀNH CHO BẠN
                        </Button>
                        <Button
                            className={clsx(styles.navBtn, {
                                [styles.activeTab]: feedTab === 'top'
                            })}
                            category="textStyle"
                            onClick={() => setFeedTab('top')}
                        >
                            ĐÁNH GIÁ CAO NHẤT
                        </Button>
                        <hr/>
                    </nav>
                    
                    {
                        Array.isArray(feed.data) && feed.data.map(post => {
                            return (
                                <LazyLoad key={post.id} height={200} offset={-100}>
                                    <Hcard
                                        className={styles.feedPost}
                                        data={post}
                                        date
                                        upvote
                                        comment
                                    />
                                </LazyLoad>
                            )
                        })
                    }
                    {
                        pagination && (
                            <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />)
                    }
                </section>
                <aside className={clsx(styles.sideBar)}>
                    <Topic className="topicSideBar" />
                    <Form
                        className={styles.sidebarForm}
                        rules={{
                            "#email": ["require", "email"],
                            "#name": ["require"]
                        }}
                    >
                        <strong className={styles.formTitle}>
                            <p>
                                NHỮNG BÀI VIẾT&nbsp;
                                <span className={styles.titleHighlight}>
                                    NỔI BẬT
                                </span><br/>
                                <span>BẠN KHÔNG NÊN BỎ LỠ!</span>
                            </p>
                        </strong>
                        <p className={styles.formDesc}>
                            Thứ Năm hàng tuần, bạn sẽ nhận được email từ Spiderum tổng hợp những bài viết đáng đọc nhất tuần qua.
                        </p>
                        <FormGroup
                            className={styles.group}
                            id="email"
                            label="Email của bạn là: "
                            placeholder="linh.phuong@gmail.com"
                        />
                        <FormGroup
                            className={styles.group}
                            id="name"
                            label="Chúng mình có thể gọi bạn là: "
                            placeholder="Nguyễn Phương Linh"
                        />
                        <Button
                            className={styles.submitBtn}
                            type="submit"
                            category="primary"
                            size="medium"
                            border="semiSquares"
                        >
                            <span>Đăng ký!</span>
                        </Button>
                    </Form>

                    <LazyLoad height={200} offset={-100}>
                        <Button
                            className={styles.sidebarBanner}
                            to="#"
                        >
                            <img
                                src={images.home_sidebar_banner}
                                alt="sidebar banner"
                            />
                        </Button>
                    </LazyLoad>
                </aside>
            </main>
        </div>
    )
}

export default memo(MainContent)