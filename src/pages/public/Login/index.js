import { useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogIn } from '~/store/actions/user'
import clsx from 'clsx'
import styles from './Login.module.scss'
import { Form, FormGroup } from '~/components/Form'
import Button from '~/components/Button'
import { httpRequest } from '~/utils'
import { routesPath } from '~/config'
import { icons } from '~/assets'

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const notifyRef = useRef()
    const messageRef = useRef()

    const handleFormData = useCallback((data) => {
        const logIn = async () => {
            const res = await httpRequest.post('/login', {
                "username": data.username,
                "password": data.password
            })
            if (res.code === 401) {
                messageRef.current.innerHTML = res.message
                notifyRef.current.classList.add(styles.show)
            }
            else {
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('user', JSON.stringify(res))
                const action = setLogIn({
                    isLoggedIn: true,
                    id: res.id,
                    name: res.name,
                    username: res.username,
                    avatar: res.avatar
                })
                dispatch(action)
                navigate(routesPath.home)
            }
        }

        logIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <img className={styles.logo} src={icons.spider} alt="spider logo"/>
                <Form
                    className={styles.loginForm}
                    handleData={handleFormData}
                >
                    <FormGroup
                        className={styles.group}
                        id="username"
                        placeholder="Tên đăng nhập hoặc email"
                        autoFocus
                    />
                    <FormGroup
                        className={styles.group}
                        id="password"
                        type="password"
                        placeholder="Mật khẩu"/>
                    <Button
                        className={styles.submitBtn}
                        type="submit" category="primary" size="medium"
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        type="button"
                        className={styles.forgetPasswordBtn}
                        category="textStyle"
                        size="medium"
                        to="#"
                    >
                        Quên mật khẩu?
                    </Button>
                    <p className={styles.registerNow}>
                        Không có tài khoản? &nbsp;
                        <Button
                            type="button"
                            className={styles.registerBtn}
                            category="textStyle"
                            to={`/${routesPath.register}`}
                        >
                            Đăng ký ngay
                        </Button>
                    </p>
                </Form>
            </div>
       </>
    )
}

export default Login