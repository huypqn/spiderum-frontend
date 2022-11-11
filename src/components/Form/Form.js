import { useEffect, useRef, memo } from "react"
import clsx from "clsx"
import styles from './Form.module.scss'
import { FormValidator } from '~/utils'


function Form({ className, rules, handleData, children }) {

    const formRef = useRef()

    useEffect(() => {
        
        const validator = new FormValidator({
            form: formRef.current,
            rules: rules,
            message: styles.formMessage,
            css: styles.invalid
        })

        validator.validate()

        formRef.current.onsubmit = (e) => {
            e.preventDefault()

            const { isPassed, submitData } = validator.validateAll()

            if (isPassed) {
                if (typeof handleData === 'function') {
                    handleData(submitData)
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rules])

    return (
        <form action="" noValidate ref={formRef} className={clsx({
            [className]: className
        })}>
            {children}
        </form>
    )
}

export default memo(Form)