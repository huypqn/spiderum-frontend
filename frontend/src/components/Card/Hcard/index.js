import clsx from 'clsx'
import Button from '~/components/Button'
import Extra from '../Extra'
import styles from './Hcard.module.scss'
import { routesPath } from '~/config'
import { icons } from '~/assets'
import { vnEncodeUrl } from '~/utils'

function Hcard({ className, data, ...otherProps }) {

    return (
        <div className={clsx("flex", styles.wrapper, {
            [styles.trending]: otherProps.trending,
            [className]: className,
        })}>
            {/* post thumbnail */}
            <div className={clsx(styles.thumbnail, {
                [styles.trending]: otherProps.trending,
            })}>
                <Button className={clsx(styles.thumbLink)} to={data.url}>
                    <img src={data.thumbnail} alt="post's thumbnail" />
                </Button>
            </div>

            {/* post detail */}
            <div className={clsx("flex", styles.detail, {
                [styles.trending]: otherProps.trending,
            })}>
                {/* detail header include: topic, time to read, bookmark */}
                <header className={clsx("flex", styles.detailHeader)}>
                    <div className={clsx(styles.headerLeft, styles.time)}>
                        <Button
                            to={`${routesPath.topic}/${vnEncodeUrl(data.topic)}`}
                            className={clsx(styles.topic, styles.time)}
                        >
                            {data.topic}
                        </Button>
                        {data.timeToRead}
                     </div>

                    <Button className={clsx(styles.headerRight)}>
                        <img src={icons.bookmark} alt="bookmark icon" />
                    </Button>
                </header>

                {/* detail content include: title, description */}
                <section className={clsx(styles.detailContent)}>
                    <Button
                        className={clsx(styles.title, {
                            [styles["title-md"]]: otherProps.trending
                        })}
                        to={routesPath.home}
                    >
                        <span>{data.title}</span>
                    </Button>
                    <span className={clsx(styles.desc, {
                        [styles["desc-sm"]]: otherProps.trending
                    })}>
                        {data.desc}
                    </span>
                </section>

                {/* detail footer include: avatar, author name, publish date */}
                <footer className={clsx("flex", styles.detailFooter, styles.time)}>
                    <div className={clsx(styles.footerLeft, "flex")}>
                        <Button to={`${routesPath.user}/${data.username}`}>
                            <img
                                className={clsx(styles["avatar-lg"], {
                                    [styles["avatar-sm"]]: otherProps.trending
                                })}
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
                    <Extra data={data} {...otherProps}></Extra>

                </footer>
            </div>
        </div>
    )
}

export default Hcard