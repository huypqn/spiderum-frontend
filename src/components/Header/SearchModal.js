import clsx from "clsx"
import Button from "../Button"
import styles from './Header.module.scss'
import { icons } from "~/assets"


function SearchModal({ className, open, close }) {

    return (
        <div className={clsx(styles.navbar, styles.modal, "grid wide", {
            [styles.open]: open,
            [className]: className
        })}>
            <Button
                className={clsx(styles.cancelSearch)}
                onClick={close}
            >
            </Button>
            <input
                className={clsx(styles.searchBox)}
                type="text" placeholder='Tìm kiếm theo tiêu đề, tác giả hoặc tag'
                autoFocus
            />
            <img src={icons.search} alt="search icon" loading="lazy"/>
        </div>
    )
}

export default SearchModal