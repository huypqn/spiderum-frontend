import clsx from 'clsx'
import React from 'react'
import styles from './Footer.module.scss'

function Footer() {

    return (
        <React.Fragment>
            <hr></hr>
            <footer className={clsx(styles.wrapper, "grid wide")}>
                <div className={clsx(styles.footerTop, "row flex")}>
                    <img
                        className='md-12 sm-12'
                        src={require('~/assets/icons/WideLogo.png')}
                        alt="Spiderum logo"
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
                            src={require('~/assets/icons/dmca_protected.png')}
                            alt="dmca protected icon"
                            width={72}
                            height={24}
                        />
                    </section>
                    <section className={clsx(styles.bottomRight, "col")}>
                        <p><strong>© Copyright 2017-2022</strong></p>
                        <p>0946.042.093</p>
                        <p>contact@spiderum.com</p>
                        <p>Tầng 11, tòa nhà HL Tower, lô A2B, phố Duy Tân, phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội</p>
                    </section>
                </div>
                
            </footer>
        </React.Fragment>
    )
}

export default Footer;