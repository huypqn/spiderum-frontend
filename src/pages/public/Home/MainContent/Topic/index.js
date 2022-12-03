import { useEffect, useState, useRef } from "react"
import clsx from "clsx"
import styles from './Topic.module.scss'
import Button from "~/components/Button"
import { dataService } from "~/services"
import { pathName } from "~/config"
import { vnEncodeUrl } from "~/utils"

function Topic({ className, mobile }) {

    const [topics, setTopics] = useState([])
    const [topicShow, setTopicShow] = useState(false)
    const categoryRef = useRef()

    useEffect(() => {
        const fetchData = async() => {
            try {
                const topicData = await dataService.getTopics()
                setTopics(topicData)

            } catch (error) {
                throw Error(error)
            }
        }
        fetchData()
    }, [])

    const handleTopicMobileShow = () => {
        categoryRef.current.classList.toggle(clsx(styles.show))
        setTopicShow(prevState => !prevState)
    }

    return (
        <section className={clsx(styles.topic, styles[className], {
            "grid wide pad-16": mobile,
        })}>
            <div className={clsx(styles.title)}>CHỦ ĐỀ</div>
            <div className={clsx(styles.category, {
                [styles.categoryMobile]: mobile
            })} ref={categoryRef}>
                {
                    Array.isArray(topics) && topics.map((topic) => {
                        return (
                            <Button
                                key={topic.id}
                                category="outline"
                                border="rounded"
                                size="medium"
                                to='#'
                            >
                                {topic.name}
                            </Button>
                        )
                    })
                }
            </div>
            {
                mobile && (
                    <Button 
                        className={clsx(styles.topicMobileShow)}
                        category="primary"
                        border="rounded"
                        size="medium"
                        onClick={handleTopicMobileShow}
                    >
                        { topicShow ? "Ẩn bớt" : "Hiển thị thêm" }
                    </Button>
                )
            }
        </section>
    )
}

export default Topic