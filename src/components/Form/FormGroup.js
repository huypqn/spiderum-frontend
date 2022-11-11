import clsx from 'clsx'
import styles from './Form.module.scss'

function FormGroup({className, label, id, type, placeholder, ...attr}) {

    return (
        <div className={clsx(styles.formGroup, {
            [className]: className
        })}>
            {
                (type === "radio" || type === "checkbox")
                    ?   <>
                            <input
                                id={id}
                                className={styles.formInput}
                                name={id} type={type}
                                placeholder={placeholder}
                                {...attr}
                            />
                            <label
                                htmlFor={id}
                                className={styles.formLabel}
                            >
                                {label}
                            </label>
                        </>
                    :   <>
                            <label
                                htmlFor={id}
                                className={styles.formLabel}
                            >
                                {label}
                            </label>
                            <input
                                id={id}
                                className={styles.formInput}
                                name={id} type={type}
                                placeholder={placeholder}
                                {...attr}
                            />
                    </>
            }
            <span className={styles.formMessage}></span>
        </div>
    )
}

export default FormGroup