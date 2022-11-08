import clsx from 'clsx'
import styles from './Loading.module.scss'

function Loading() {
    return (
        <div className={clsx(styles.wrapper, styles.skeleton)}></div>
    )
}

export default Loading