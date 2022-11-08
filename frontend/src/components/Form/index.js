import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import styles from './Form.module.scss'
import Button from "~/components/Button"
import { FormValidator } from '~/utils'

// const props.fields = {
//     "id": "id",
//     "label": "something",
//     "type": "abc",
//     "placeholder": ""
// }

// const props.button = [
//     {
//         "text": "dang nhap",
//         "type": "",
//         "border": "",
//         "size": "",
//     }
// ]

function Form({ className, children, ...props }) {

    const formRef = useRef()

    useEffect(() => {
        const formValidator = new FormValidator({
            form: formRef.current,
            rules: props.rules,
            msgElement: "#message",
            css: styles.invalid,
        })

        formValidator.validate()

        formRef.current.onsubmit = (e) => {
            e.preventDefault()
            // eslint-disable-next-line no-unused-vars
            const { isPassed, submitData } = formValidator.validateAll()
            if (isPassed) {
                // call API with submitData
                
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <form
            ref={formRef}
            id={styles.formContainer}
            className={clsx({
                [styles.border]: props.border,
                [className]: className
            })}
            action=""
            method="POST"
        >
            {
                props.title && (
                    <p className={styles.title}>
                        { props.title }
                    </p>
                )
            }
            {
                props.desc && (
                    <p className={styles.desc}>
                        { props.desc }
                    </p>
                )
            }
            {
                props.fields.map((field, index) => {
                    return (
                        <div key={index} className={styles.formGroup}>
                            <label className={styles.formLabel}
                                htmlFor={field.id}
                            >
                                {field.label}
                                {props.rules[`#${field.id}`].includes("require") && (
                                    <span className={styles.asterisk}>&nbsp;*</span>
                                )}
                            </label>
                            <input
                                id={field.id}
                                className={styles.formInput}
                                type={field.type}
                                placeholder={field.placeholder}
                            />
                            <span id="message" className={styles.formMessage}></span>
                        </div>
                    )
                })
            }

            <Button
                className={styles.submitBtn}
                type={props.button.type}
                border={props.button.border}
                size={props.button.size}
            >
                { props.button.text }
            </Button>

            { children }
        </form>
    )
}

export default Form