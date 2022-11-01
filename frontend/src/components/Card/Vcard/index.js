import clsx from 'clsx'
import Button from '~/components/Button'
import styles from './Vcard.module.scss'
import { icons } from '~/assets'
import { routesPath } from '~/config'

function Vcard({ className, data, ...otherProps }) {

    return (
        <div className={clsx(styles.wrapper, "flex", {
            [className]: className
        })}>
            {/* post thumbnail */}
            <div className={clsx(styles.thumbnail)}>
                <Button to={data.url}>
                    <img src={data.thumbnail} alt="post's thumbnail" />
                </Button>
            </div>

            {/* post detail */}
            <div className={clsx("flex", styles.detail)}>
                <header className={clsx("flex", styles.detailHeader)}>
                    <div className={clsx(styles.headerLeft, styles.time)}>
                        {data.timeToRead}
                     </div>

                    <Button className={clsx(styles.headerRight)}>
                        <img src={icons.bookmark} alt="bookmark icon" />
                    </Button>
                </header>

                <section className={clsx(styles.detailContent)}>
                    <Button className={clsx(styles.title)} to={routesPath.home}>
                        <span>{data.title}</span>
                    </Button>
                </section>

                <footer className={clsx("flex", styles.detailFooter, styles.time)}>
                    <div className={clsx(styles.footerLeft, "flex")}>
                        <Button to={`${routesPath.user}/${data.username}`}>
                            <img
                                className={clsx(styles["avatar-sm"])}
                                src={data.avatar}
                                alt="author avatar"
                            />
                        </Button>
                        {/* author name */}
                        <Button className={clsx(styles.author)} to={`${routesPath.user}/${data.username}`}>
                            <span>{data.author}</span>
                        </Button>
                        {/* publish date */}
                        <span>{data.publishAt}</span>
                    </div>

                    {/* extra info include: upvote, comment, view */}
                    {/* <Extra data={data} {...otherProps}></Extra> */}
                </footer>
            </div>

        </div>
    )
}

export default Vcard