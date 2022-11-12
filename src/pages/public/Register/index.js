import { useCallback, useRef } from 'react'
import clsx from 'clsx'
import styles from './Register.module.scss'
import { Form, FormGroup } from "~/components/Form"
import Button from "~/components/Button"
import { icons } from "~/assets"
import { routesPath } from "~/config"
import { request } from '~/utils/httpRequest'

function Register() {

    const notifyRef = useRef()
    const messageRef = useRef()

    const handleFormData = useCallback((data) => {
        const sendData = async () => {
            const res = await request.get(`/register?email=${data.email}`)
            if (res.data.code === 200) {
                notifyRef.current.classList.add(styles.success)
            }
            else {
                notifyRef.current.classList.add(styles.failure)
            }
            messageRef.current.innerHTML = res.data.message
            notifyRef.current.classList.add(styles.show)
        }

        sendData()
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
                    rules={{
                        "#email": ["require", "email"]
                    }}
                    handleData={handleFormData}
                >
                    <FormGroup
                        className={styles.field}
                        id="email"
                        label="Đăng ký bằng email"
                        type="text"
                        placeholder="email@example.com"
                        autoFocus
                    />
                    <div className={clsx(styles.submit)}>
                        <label className={styles.submitLabel}>
                            Thư xác nhận sẽ được gửi vào hòm thư của bạn
                        </label>
                        <Button
                            className={styles.submitBtn}
                            category="primary"
                            size="small"
                        >
                            Gửi
                        </Button>
                    </div>
                    <p className={styles.bottom}>
                        Đã có tài khoản?
                        <Button
                            className={styles.loginBtn}
                            category="textStyle"
                            to={`/${routesPath.login}`}
                        >
                            &nbsp;Đăng Nhập
                        </Button>
                    </p>
                </Form>
            </div>
        </>
    )
}

export default Register