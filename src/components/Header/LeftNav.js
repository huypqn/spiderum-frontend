import clsx from "clsx"
import Button from "../Button"
import styles from './Header.module.scss'
import { routesPath } from "~/config"
import { icons } from "~/assets"

function LeftNav() {

    return (
        <div className={clsx(styles.leftNav, "flex")}>
            <Button className={clsx(styles.brandLogo)} to={routesPath.home}>
                <picture>
                    <source
                        media="(max-width: 767px)"
                        srcSet={icons.logo}
                    >
                    </source>
                    <img
                        src={icons.wideLogo}
                        alt="Spiderum logo"
                        width={110}
                        height={25}
                    />
                </picture>
            </Button>
            <div className={clsx(styles.socialItem, "flex sm-0")}>
                <Button
                    className={clsx(styles.socialIcon)}
                    href="https://www.facebook.com/Spiderum"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={icons.facebook} alt="facebook icon"/>
                </Button>
                <Button
                    className={clsx(styles.socialIcon)}
                    href="https://www.youtube.com/spiderum"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={icons.youtube} alt="youtube icon"/>
                </Button>
                <Button
                    className={clsx(styles.socialIcon)}
                    href="https://anchor.fm/spiderum"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={icons.spotify} alt="spotify icon"/>
                </Button>
                <Button
                    className={clsx(styles.navShop, styles.socialIcon, "md-0 sm-0")}
                    size="small"
                    border="rounded"
                    href="https://shopee.vn/spiderum"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={icons.shop} alt="cart icon"/>
                    <p>Spider's Shop</p>
                </Button>
            </div>
        </div>
    )
}

export default LeftNav