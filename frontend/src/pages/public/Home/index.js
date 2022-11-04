import { useEffect, useState } from 'react'
import clsx from 'clsx'

import styles from './Home.module.scss'
import Banner from './Banner'
import { Hcard, Vcard } from '~/components/Card'
import Button from '~/components/Button'
import Pagination from '~/components/Pagination'
import { dataService } from '~/services'
import { icons, images } from '~/assets'

function Home() {

    const [popular, setPopular] = useState([])
    const [trending, setTrending] = useState([])

    useEffect(() => {
        const fetchPopular = async() => {
            try {
                const popularPosts = await dataService.getPosts({
                    type: "popular"
                })
                setPopular(popularPosts)
            } catch (error) {
                throw Error(error)
            }
        }
        fetchPopular()
    }, [])

    useEffect(() => {
        const fetchTrending = async() => {
            try {
                const trendingPosts = await dataService.getPosts({
                    type: "trending"
                })
                setTrending(trendingPosts)
            } catch (error) {
                throw Error(error)
            }
        }
        fetchTrending()
    }, [])

    return (
        <div>
            <Banner />
            <section className={clsx('grid wide pad-16', styles.popularSection)}>
                <span className={clsx(styles.title)}>PHỔ BIẾN TRÊN SPIDERUM</span>
                <div className={clsx(styles.popularPost)}>
                {
                    popular.map((post, index) => {
                        return <Hcard key={index} data={post} trending view/>
                    })
                }
                </div>
                <Button
                    className={clsx(styles.popularBanner)}
                    href="https://b.link/SP-Web-Combo-Seneca"
                >
                    <img src={images.home_popular_banner} alt="combo seneca banner" />
                </Button>
            </section>

            <div className={clsx(styles.trendingSection)}>
                <section className="grid wide pad-16">
                    <div className={clsx(styles.title)}>
                        <span>NỔI BẬT TRONG THÁNG</span>
                        <Button className={clsx(styles.top10)} to="/">
                            <span>Xem TOP 10 bài viết</span>
                        </Button>
                    </div>

                    <div className={clsx(styles.trendingContent)}>
                        {
                            trending.map((post, index) => {
                                return (
                                    <div className='flex'>
                                        <Vcard key={index} data={post} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Button className={clsx(styles.top10Bottom)}>
                        <span>
                            Xem TOP 10 bài viết <img src={icons.arrow} alt="arrow icon"/>
                        </span>
                    </Button>
                </section>
            </div>

            

        </div>
    )
}

export default Home