import clsx from "clsx"
import { useCallback, useRef, useState } from "react"
import styles from './AccountCreate.module.scss'
import { Form, FormGroup } from "~/components/Form"
import Button from "~/components/Button"
import { icons } from "~/assets"

function AccountCreate() {

    const [show, setShow] = useState(false)

    const notifyRef = useRef()
    const messageRef = useRef()

    const handleFormData = useCallback((data) => {
        // do something
    }, [])

    const hideNotify = () => {
        notifyRef.current.classList.remove(styles.success, styles.failure, styles.show)
    }

    return (
        <>
            <div className={clsx(styles.notify)} ref={notifyRef}>
                <p className={styles.notifyContent} ref={messageRef}></p>
                <span className={styles.close} onClick={hideNotify}>&#215;</span>
            </div>
            <div className={styles.container}>
                <div className={styles.brandLogo}>
                    <img src={icons.spider} alt="spiderum logo"/>
                </div>
                <Form
                    className={styles.registerForm}
                    handleData={handleFormData}
                >
                    <FormGroup
                        className={clsx(styles.group, styles.mgbt)}
                        id="username"
                        placeholder="Tên đăng nhập"
                    />
                    <FormGroup
                        className={clsx(styles.group, styles.mgbt)}
                        id="name"
                        placeholder="Tên hiển thị"
                    />
                    <FormGroup
                        className={clsx(styles.group, styles.mgbt)}
                        id="password"
                        placeholder="Mật khẩu"
                    />
                    <FormGroup
                        className={clsx(styles.group, styles.mgbt)}
                        id="verify_password"
                        placeholder="Nhập lại mật khẩu"
                    />
                    <Button
                        className={clsx(styles.moreBtn, styles.mgbt)}
                        type="button"
                        category="outline" 
                        size="medium"
                        onClick={() => {setShow(!show)}}
                    >
                        Thông tin khác
                    </Button>
                    <div className={clsx(styles.moreField, {
                        [styles.show]: show
                    })}>
                        <FormGroup
                            className={clsx(styles.group, styles.mgbt)}
                            id="identity"
                            placeholder="Số chứng minh nhân dân"
                        />
                        <FormGroup
                            className={clsx(styles.group, styles.mgbt)}
                            id="phone_number"
                            placeholder="Số điện thoại"
                        />
                    </div>
                    <p className={styles.agreement}>
                        Bằng việc nhấn vào Đăng ký, bạn đã đồng ý với&nbsp;
                        <Button className={styles.highlight} href="#">
                            Điều khoản sử dụng
                        </Button> và&nbsp;
                        <Button className={styles.highlight}>
                            Chính sách bảo mật
                        </Button> của&nbsp;
                        <strong>Spiderum</strong>
                    </p>
                    <Button category="primary" size="large" href="#">Đăng ký</Button>
                </Form>
                <div className={styles.spacer}></div>
            </div>
        </>
    )
}

export default AccountCreate