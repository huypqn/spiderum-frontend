import { useState, useEffect } from 'react'
import clsx from "clsx"

import styles from './MainContent.module.scss'
import Topic from './Topic'
import Button from '~/components/Button'
import { Hcard } from '~/components/Card'
import Pagination from '~/components/Pagination'
import { dataService } from '~/services'
import { pathName, pageConfig } from '~/config'
import { vnEncodeUrl } from '~/utils'

function MainContent({ sort }) {

    const [feed, setFeed] = useState({})
    const [feedTab, setFeedTab] = useState("hot")
    const [pagination, setPagination] = useState()

    useEffect(() => {
        const fetchData = async() => {
            try {
                const newFeed = await dataService.getPosts(pageConfig)
                setFeed(newFeed)
                setPagination(newFeed.pagination)
            } catch (error) {
                throw Error(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className={styles.wrapper}>
            <Topic mobile/>

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
                        feed?.data?.map(post => {
                            return (
                                <Hcard
                                    key={post.id}
                                    className={styles.feedPost}
                                    data={post}
                                    date
                                    upvote
                                    comment
                                />
                            )
                        })
                    }
                    {
                        pagination && <Pagination pagination={pagination}/>
                    }
                </section>
                <aside className={styles.sideBar}>
                    <Topic />
                </aside>
            </main>
        </div>
    )
}

export default MainContent