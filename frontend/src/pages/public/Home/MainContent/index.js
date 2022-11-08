import { useState, useEffect, useCallback, memo } from 'react'
import clsx from "clsx"
import LazyLoad from 'react-lazyload'

import styles from './MainContent.module.scss'
import Topic from './Topic'
import Button from '~/components/Button'
import Form from '~/components/Form'
import Loading from '~/components/Loading'
import { Hcard } from '~/components/Card'
import Pagination from '~/components/Pagination'
import { dataService } from '~/services'
import { images } from '~/assets'

function MainContent({ sort }) {

    const [feed, setFeed] = useState({})
    const [feedTab, setFeedTab] = useState("hot")
    const [pagination, setPagination] = useState()
    const [filters, setFilters] = useState({
        page: 1,
        limit: 15
    })

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
        setFilters(prevState => {
            return {
                ...prevState,
                page: newPage
            }
        })
    }, [])

    return (
        <div className={styles.wrapper}>
            <Topic className="topicMobile" mobile/>

            <main className={clsx("grid wide pad-16", styles.mainContent)}>
                <section className={styles.content}>
                    <nav className={styles.contentNav}>
                        <Button 
                            className={clsx(styles.navBtn, {
                                [styles.activeTab]: feedTab === 'hot'
                            })}
                            type="text"
                            onClick={() => setFeedTab('hot')}
                        >
                            DÀNH CHO BẠN
                        </Button>
                        <Button
                            className={clsx(styles.navBtn, {
                                [styles.activeTab]: feedTab === 'top'
                            })}
                            type="text"
                            onClick={() => setFeedTab('top')}
                        >
                            ĐÁNH GIÁ CAO NHẤT
                        </Button>
                        <hr/>
                    </nav>
                    {
                        Array.isArray(feed.data) && feed.data.map(post => {
                            return (
                                <LazyLoad key={post.id} placeholder={<Loading />}>
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
                    <div className={clsx(styles.sidebarForm)}>
                        <Form
                            title={<>NHỮNG BÀI VIẾT <span style={{color: '#3d85c6'}}>NỔI BẬT</span> BẠN KHÔNG NÊN BỎ LỠ!</>}
                            desc="Thứ Năm hàng tuần, bạn sẽ nhận được email từ Spiderum tổng hợp những bài viết đáng đọc nhất tuần qua."
                            border
                            fields={[
                                {
                                    "id": "email",
                                    "label": "Email của bạn là:",
                                    "type": "email",
                                    "placeholder": "linh.phuong@gmail.com"
                                },
                                {
                                    "id": "name",
                                    "label": "Chúng mình có thể gọi bạn là:",
                                    "type": "text",
                                    "placeholder": "Nguyễn Phương Linh"
                                }
                            ]}
                            button={{
                                "text": "Đăng ký!",
                                "type": "primary",
                                "border": "rounded",
                                "size": "medium"
                            }}
                            rules={{
                                "#email": ["require", "email"],
                                "#name": ["require"]
                            }}
                        >
                        </Form>
                    </div>
                    <LazyLoad placeholder={<Loading />}>
                        <Button
                            className={styles.sidebarBanner}
                            to="#"
                        >
                                <img src={images.home_sidebar_banner} alt="sidebar banner"/>
                        </Button>
                    </LazyLoad>
                </aside>
            </main>
        </div>
    )
}

export default memo(MainContent)