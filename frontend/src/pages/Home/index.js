import clsx from 'clsx'
import styles from './Home.module.scss'
import Button from '~/components/Button'

function Home() {
  
    return (
        <div>
            <div className={clsx(styles.homeBanner, "flex")}>
                <div className="grid wide pad-16">
                    <div className={clsx(styles.homeBannerContent)}>
                        <h1 className={clsx(styles.bannerHeading)}>
                            Góc nhìn đa chiều của thế hệ trẻ Việt Nam
                        </h1>
                        <div className={clsx(styles.bannerDetail)}>
                            Viết - Chia sẻ - Kết nối - Chiêm nghiệm <br/>
                            Tất cả tại Spiderum
                        </div>
                        <Button
                            className={clsx(styles.bannerButton)}
                            type="outline" size="large" border="rounded"
                        >
                            Đăng bài viết
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home