import { useCallback, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import clsx from "clsx"
import styles from './AccountCreate.module.scss'
import { Form, FormGroup } from "~/components/Form"
import Button from "~/components/Button"
import { dataService } from "~/services"
import { routesPath } from "~/config"
import { icons } from "~/assets"

function AccountCreate() {

    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    const notifyRef = useRef()
    const messageRef = useRef()

    const handleFormData = useCallback((data) => {
        const token = window.location.search
        const params = new URLSearchParams(token)
        const payload = {
            username: data.username,
            name: data.name.trim(),
            password: data.password,
            identity_number: data.identity.trim(),
            phone_number: data.phone_number.trim(),
            token: params.get('token')
        }

        const createAccount = async () => {
            const res = await dataService.register(payload)
            if (res.code === 200) {
                notifyRef.current.classList.remove(styles.failure)
                notifyRef.current.classList.add(styles.success)
            }
            else {
                notifyRef.current.classList.remove(styles.success)
                notifyRef.current.classList.add(styles.failure)
            }

            messageRef.current.innerHTML = res.message
            notifyRef.current.classList.add(styles.show)

            if (res.code === 200) {
                setTimeout(() => {
                    navigate(routesPath.home)
                }, 3000)
            }
        }

        createAccount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const hideNotify = () => {
        notifyRef.current.classList.remove(styles.show)
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
                    rules={{
                        "#username": ["require", "min:6", "username"],
                        "#password": ["require", "min:3"],
                        "#confirm_password": ["require", "min:3", "confirm:password"]
                    }}
                    handleData={handleFormData}
                >
                    <FormGroup
                        className={clsx(styles.group, styles.mgbt)}
                        id="username"
                        type="text"
                        placeholder="Tên đăng nhập"
                        autoFocus
                    />
                    <FormGroup
                        className={clsx(styles.group, styles.mgbt)}
                        id="name"
                        type="text"
                        placeholder="Tên hiển thị"
                    />
                    <FormGroup
                        className={clsx(styles.group, styles.mgbt)}
                        id="password"
                        type="password"
                        placeholder="Mật khẩu"
                    />
                    <FormGroup
                        className={clsx(styles.group, styles.mgbt)}
                        id="confirm_password"
                        type="password"
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
                    <Button type="submit" category="primary" size="large">Đăng ký</Button>
                </Form>
                <div className={styles.spacer}></div>
            </div>
        </>
    )
}

export default AccountCreate