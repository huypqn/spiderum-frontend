import clsx from 'clsx'
import Button from '~/components/Button'
import Extra from '../Extra'
import styles from './Hcard.module.scss'
import { icons, images } from '~/assets'


function Hcard({ className, data, ...otherProps }) {

    return (
        <div className={clsx("flex", styles.wrapper, {
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
                {/* detail header include: topic, time to read, bookmark */}
                <header className={clsx("flex", styles.detailHeader)}>
                    <div className={clsx(styles.headerLeft, styles.time)}>
                        <Button to='/' className={clsx(styles.topic, styles.time)}>
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
                    <Button className={clsx(styles.title)} to='/'>
                        <span>{data.title}</span>
                    </Button>
                    <span className={clsx(styles.desc)}>
                        {data.desc}
                    </span>
                </section>

                {/* detail footer include: avatar, author name, publish date */}
                <footer className={clsx("flex", styles.detailFooter, styles.time)}>
                    <div className={clsx(styles.footerLeft, "flex")}>
                        <Button to='/'>
                            <img src={data.avatar} alt="author avatar"/>
                        </Button>
                        {/* author name */}
                        <Button className={clsx(styles.author)} to='/'>
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