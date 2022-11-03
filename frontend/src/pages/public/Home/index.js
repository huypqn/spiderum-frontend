import clsx from 'clsx'
import styles from './Home.module.scss'
import Banner from './Banner'
import { Hcard, Vcard } from '~/components/Card'
import Pagination from '~/components/Pagination'

function Home() {

    const data = [
        {
            "id": 1,
            "title": "5 giai đoạn thay đổi bản thân",
            "author": "Viet Anh Tran",
            "email": "hello@gmail.com",
            "topic": "quan điểm tranh luận",
            "publishAt": "21 Th10",
            "timeToRead": "17 phút đọc",
            "upvote": 209,
            "comments": 28,
            "desc": "Trong mỗi chúng ta ai ai cùng đều có khát vọng được vươn lên, muốn được người khác coi trọng, nói đúng hơn là làm \"Ông này bà nọ\"",
            "seen": 2408,
            "url": "/post",
            "thumbnail": "https://images.spiderum.com/sp-thumbnails/08075570543d11ed876f794cb3e9e345.png",
            "avatar": "https://images.spiderum.com/sp-xs-avatar/f2eebc60eb8211eba7d9d3760b47d866.jpg"
        },
        {
            "id": 1,
            "title": "Nhật ký vượt bão của một nhà đầu tư thích viết lách",
            "author": "Viet Anh Tran",
            "email": "hello@gmail.com",
            "topic": "quan điểm tranh luận",
            "publishAt": "21 Th10",
            "timeToRead": "17 phút đọc",
            "upvote": 209,
            "comments": 28,
            "desc": "Mình từng nghe rất nhiều người nói: \"Phải làm chủ chứ đi làm thuê thì làm sao mà giàu được?\". Thoạt nghe qua thì câu nói này có vẻ",
            "seen": 2408,
            "url": "/post",
            "thumbnail": "https://images.spiderum.com/sp-thumbnails/08075570543d11ed876f794cb3e9e345.png",
            "avatar": "https://images.spiderum.com/sp-xs-avatar/f2eebc60eb8211eba7d9d3760b47d866.jpg"
        }
    ]
  
    return (
        <div>
            <Banner />          
            <div className='grid wide pad-16'>

                <div className={clsx(styles.test)}>
                    <Hcard data={data[0]} trending></Hcard>
                    <Hcard data={data[1]} trending></Hcard>
                    <Hcard data={data[0]} trending></Hcard>
                    <Hcard data={data[1]} trending></Hcard>
                </div>

                <div className='row'>
                    <Vcard className='col lg-3 md-6 sm-12' data={data[0]}></Vcard>
                    <Vcard className='col lg-3 md-6 sm-12' data={data[1]}></Vcard>
                    <Vcard className='col lg-3 md-6 sm-12' data={data[0]}></Vcard>
                    <Vcard className='col lg-3 md-6 sm-12' data={data[1]}></Vcard>
                </div>
                
                <div className='row' style={{paddingTop: 100}}>
                    <div className='col lg-8'>
                        <Hcard data={data[0]} upvote comment></Hcard>
                        <Hcard data={data[1]} view></Hcard>
                        <Pagination pagination={{"page": 1, "limit": 10, "total": 170}} maxSize={6}/>
                    </div>
                    <div className='col lg-4'></div>
                </div>
            </div>

        </div>
    )
}

export default Home