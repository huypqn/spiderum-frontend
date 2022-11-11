import clsx from 'clsx'
import styles from './Footer.module.scss'
import { icons } from '~/assets'

function Footer() {

    return (
        <footer className={clsx(styles.wrapper)}>
            <hr></hr>
            <div className="grid wide pad-16">
                <div className={clsx(styles.footerTop, "row flex")}>
                    <img
                        className='md-12 sm-12'
                        src={icons.wideLogo}
                        alt="Spiderum logo"
                        loading="lazy"
                    />
                    <a href="https://aboutus.spiderum.com/dieu-khoan" className='md-12 sm-12'>
                        ĐIỀU KIỆN SỬ DỤNG
                    </a>
                </div>
                <div className={clsx(styles.footerBottom, "row flex")}>
                    <section className={clsx(styles.bottomLeft, "col")}>
                        <p><strong>CÔNG TY CỔ PHẦN FELIZZ</strong></p>
                        <p>Trực thuộc Công ty Cổ Phần Spiderum Việt Nam (Spiderum Vietnam JSC)</p>
                        <p>Người chịu trách nhiệm nội dung: Trần Việt Anh</p>
                        <p>Giấy phép MXH số 341/GP-TTTT do Bộ TTTT cấp ngày 27 tháng 6 năm 2016</p>
                        <img
                            src={icons.dmca}
                            alt="dmca protected icon"
                            width={72}
                            height={24}
                            loading="lazy"
                        />
                    </section>
                    <section className={clsx(styles.bottomRight, "col")}>
                        <p><strong>© Copyright 2017-2022</strong></p>
                        <p>0946.042.093</p>
                        <p>contact@spiderum.com</p>
                        <p>Tầng 11, tòa nhà HL Tower, lô A2B, phố Duy Tân, phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội</p>
                    </section>
                </div>
            </div>
        </footer>
    )
}

export default Footer;