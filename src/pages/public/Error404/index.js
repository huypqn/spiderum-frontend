import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import styles from './Error.module.scss'
import { icons } from '~/assets'
import { routesPath } from '~/config'

function Error404() {

    const navigate = useNavigate()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate(routesPath.home)
        }, 5000)

        return () => {
            clearTimeout(timeoutId)
        }
    })

    return (
        <div className={styles.wrapper}>
            <img src={icons.error} alt="404 error"/><br/>
            <div id={styles.error}>404</div>
            <p id={styles.notFound}>KHÔNG TÌM THẤY TRANG</p>
            <p id={styles.desc}>Trang đã bị xóa hoặc địa chỉ URL không đúng</p>
            <Button 
                id={styles.backBtn}
                    type="primary"
                    border="rounded"
                    size="medium"
                    to={routesPath.home}
                >
                <div>Trở về trang chủ</div>
            </Button>
        </div>
    )
}

export default Error404