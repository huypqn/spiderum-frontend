import { useState, useMemo } from 'react'
import clsx from "clsx"
import Button from "../Button"
import styles from './Pagination.module.scss'
import pageList from '~/utils/pageList'

function Pagination({ pagination, onPageChange, maxSize = 10 }) {

    const { page, limit, total } = pagination
    const [active, setActive] = useState(page)

    const pages = useMemo(() => Math.ceil(total / limit), [limit, total])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const arrPages = pageList(pages, maxSize, active)
    
    const handleNext = () => {
        setActive(prevState => prevState + 1)
        onPageChange(active + 1)
    }

    const handlePrev = () => {
        setActive(prevState => prevState - 1)
        onPageChange(active - 1)
    }

    return (
        <div className={clsx(styles.wrapper)}>
            <Button
                className={clsx(styles.btn, {[styles.hide]: active <= 1})}
                disabled={active <= 1}
                onClick={handlePrev}
            >
                « Trước
            </Button>
            {
                arrPages.map((page, index) => {
                    return (
                        <Button
                            key={index}
                            className={clsx(styles.btn, {
                                [styles.active]: page === active
                            })}
                            onClick={() => setActive(page)}
                        >
                            {page}
                        </Button>
                    )
                })
            }
            <Button
                className={clsx(styles.btn, {[styles.hide]: active >= pages})}
                disabled={active >= pages}
                onClick={handleNext}
            >
                Tiếp »
            </Button>
        </div>
    )
}

export default Pagination