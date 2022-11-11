import clsx from "clsx";
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

function Button({ category, size, border, disabled, to, href, className,
                children, ...otherProps }) {

    const classes = clsx(styles.wrapper, {
        [className]: className,
        [styles[category]]: category,
        [styles[size]]: size,
        [styles[border]]: border,
        [styles.disabled]: disabled,
    })
    const _props = {
        ...otherProps
    }
    
    let Component = 'button';
    if (to) {
        Component = Link
        _props.to = to
    }
    else if (href) {
        Component = 'a'
        _props.href = href
    }

    if (disabled) {
        Object.keys(_props).forEach((key) => {
            if (key.startsWith('on') && typeof _props[key] === 'function') {
                delete _props[key]
            }
        })
    }
    
    return (
        <Component className={classes} {..._props}>
            {children}
        </Component>
    )
}

export default Button