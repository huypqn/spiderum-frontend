import clsx from 'clsx'
import Button from '../Button'
import { icons } from '~/assets'
import styles from './Card.module.scss'

function Extra({ className, data, ...props}) {

    return (
        <div className={clsx("flex", styles.extra)}>
            { props.upvote && (
                <Button>
                    <img src={icons.upvote} alt=" upvote icon" loading="lazy"/>
                    <span>{data.upvote}</span>
                </Button>
            )}
            { props.comment && (
                <Button>
                    <img src={icons.comment} alt="comment icon" loading="lazy"/>
                    <span>{data.comment}</span>
                </Button>
            )}
            { props.view && (
                <Button>
                    <img src={icons.view} alt="view icon" loading="lazy"/>
                    <span>{data.view}</span>
                </Button>
            )}
        </div>
    )
}

export default Extra