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
        feedNavRef.current.scrollIntoView({
            block: 'nearest',
            inline: 'start'
        })
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
                    <nav className={styles.contentNav} ref={feedNavRef}>
                        <Button 
                            className={clsx(styles.navBtn, {
                                [styles.activeTab]: feedTab === 'hot'
                            })}
                            category="textStyle"
                            onClick={() => setFeedTab('hot')}
                        >
                            D??NH CHO B???N
                        </Button>
                        <Button
                            className={clsx(styles.navBtn, {
                                [styles.activeTab]: feedTab === 'top'
                            })}
                            category="textStyle"
                            onClick={() => setFeedTab('top')}
                        >
                            ????NH GI?? CAO NH???T
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
                                NH???NG B??I VI???T&nbsp;
                                <span className={styles.titleHighlight}>
                                    N???I B???T
                                </span><br/>
                                <span>B???N KH??NG N??N B??? L???!</span>
                            </p>
                        </strong>
                        <p className={styles.formDesc}>
                            Th??? N??m h??ng tu???n, b???n s??? nh???n ???????c email t??? Spiderum t???ng h???p nh???ng b??i vi???t ????ng ?????c nh???t tu???n qua.
                        </p>
                        <FormGroup
                            className={styles.group}
                            id="email"
                            label="Email c???a b???n l??: "
                            placeholder="linh.phuong@gmail.com"
                        />
                        <FormGroup
                            className={styles.group}
                            id="name"
                            label="Ch??ng m??nh c?? th??? g???i b???n l??: "
                            placeholder="Nguy???n Ph????ng Linh"
                        />
                        <Button
                            className={styles.submitBtn}
                            type="submit"
                            category="primary"
                            size="medium"
                            border="semiSquares"
                        >
                            <span>????ng k??!</span>
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