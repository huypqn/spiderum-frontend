import { useEffect, useState } from 'react'
import clsx from 'clsx'

import styles from './Home.module.scss'
import Banner from './Banner'
import { Hcard, Vcard } from '~/components/Card'
import Button from '~/components/Button'
import { dataService } from '~/services'
import { icons, images } from '~/assets'
import MainContent from './MainContent'
import ScrollToTop from '~/components/ScrollToTop'

function Home() {

    const [popular, setPopular] = useState([])
    const [trending, setTrending] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const [popularPosts, trendingPosts] = await Promise.all([
                    dataService.getPosts({type: "popular"}),
                    dataService.getPosts({type: "trending"}),
                ])
                setPopular(popularPosts.data)
                setTrending(trendingPosts.data)

            } catch (error) {
                throw Error(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <Banner />
            <section className={clsx('grid wide pad-16', styles.popularSection)}>
                <span className={clsx(styles.title)}>PHỔ BIẾN TRÊN SPIDERUM</span>
                <div className={clsx(styles.popularPost)}>
                {
                    Array.isArray(popular) && popular.map((post, index) => {
                        return (
                            <Hcard key={index} data={post} trending view/>
                        )
                    })  
                }
                </div>
                <Button
                    className={clsx(styles.popularBanner)}
                    href="https://b.link/SP-Web-Combo-Seneca"
                >
                    <img src={images.home_popular_banner} alt="combo seneca banner" loading="lazy"/>
                </Button>
            </section>

            <section className={clsx(styles.trendingSection)}>
                <div className="grid wide pad-16">
                    <div className={clsx(styles.title)}>
                        <span>NỔI BẬT TRONG THÁNG</span>
                        <Button className={clsx(styles.top10)} to="/">
                            <span>Xem TOP 10 bài viết</span>
                        </Button>
                    </div>

                    <div className={clsx(styles.trendingContent)}>
                        {
                            Array.isArray(trending) && trending.map((post, index) => {
                                return (
                                    <Vcard key={index} data={post} date/>
                                )
                            })
                        }
                    </div>
                    <Button className={clsx(styles.top10Bottom)}>
                        <span>
                            Xem TOP 10 bài viết <img src={icons.arrow} alt="arrow icon" loading='lazy'/>
                        </span>
                    </Button>
                </div>
            </section>
            <MainContent />
            <ScrollToTop />
        </div>
    )
}

export default Home