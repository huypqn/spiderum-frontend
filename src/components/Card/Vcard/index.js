import clsx from 'clsx'
import Button from '~/components/Button'
import styles from './Vcard.module.scss'
import { icons } from '~/assets'
import { pathName } from '~/config'
import { vnEncodeUrl } from '~/utils'

function Vcard({ className, data, ...otherProps }) {

    return (
        <div className={clsx(styles.wrapper, {
            [className]: className
        })}>
            {/* post thumbnail */}
            <div className={clsx(styles.thumbnail)}>
                <Button to={`${pathName.post}/${vnEncodeUrl(data.title)}`}>
                    <img src={data.thumbnail} alt="post's thumbnail" loading="lazy"/>
                </Button>
            </div>

            {/* post detail */}
            <div className={clsx("flex", styles.detail)}>
                <header className={clsx("flex", styles.detailHeader)}>
                    <div className={clsx(styles.headerLeft, styles.time)}>
                        {data.time_to_read}
                    </div>
                    <Button className={clsx(styles.headerRight)}>
                        <img src={icons.bookmark} alt="bookmark icon" loading="lazy"/>
                    </Button>
                </header>

                <section className={clsx(styles.detailContent)}>
                    <Button
                        className={clsx(styles.title)}
                        to={`${pathName.post}/${vnEncodeUrl(data.title)}`}
                    >
                        <div>{data.title}</div>
                    </Button>
                </section>

                <footer className={clsx("flex", styles.detailFooter, styles.time)}>
                    <div className={clsx(styles.footerLeft, "flex")}>
                        <Button to={`${pathName.user}/${data.username}`}>
                            <img
                                className={clsx(styles["avatar-sm"])}
                                src={data.avatar}
                                alt="author avatar"
                                loading="lazy"
                            />
                        </Button>
                        {/* author name */}
                        <Button
                            className={clsx(styles.author)}
                            to={`${pathName.user}/${data.username}`}
                        >
                            <span>{data.author}</span>
                        </Button>
                        {/* publish date */}
                        <span className={clsx(styles.time, {
                            [styles.dateShow]: otherProps.date
                        })}>{data.publish}</span>
                    </div>

                    {/* extra info include: upvote, comment, view */}
                    {/* <Extra data={data} {...otherProps}></Extra> */}
                </footer>
            </div>

        </div>
    )
}

export default Vcard