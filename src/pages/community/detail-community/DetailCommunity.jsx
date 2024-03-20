import React from 'react';
import styles from './Detail.module.scss';
import { faAngleLeft, faHeart, faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DetailCommunity = () => {
    return(
        <div className={styles.page}>
            <div className={styles.back__button}>
                <p> <FontAwesomeIcon icon={faAngleLeft} /> 뒤로가기</p>
            </div>

            <div className={styles.img__section}>
                <img className={styles.img__container} src={process.env.PUBLIC_URL+'/logo192.png'}></img>
                <span className={styles.id__container}>
                    아이디
                </span>
                <span className={styles.sub__span}>
                    N일전 
                    <span> 조회수 1회</span>
                </span>
            </div>

            <div className={styles.title__container}>
                제목
            </div>
            <div className={styles.like__container}>
                <FontAwesomeIcon icon={faHeart} style={{color: "#ff0000",}} /> 
                <span>999</span>
            </div>
            <div className={styles.comment__container}>
                <FontAwesomeIcon icon={faComment} style={{color: "#74C0FC",}} />
                <span>999</span>
            </div>
            
            <div className={styles.content__container}>
                내용asasd fadmslfkads jadskl adsjlkfadfjads lkasdjfldsk ajsdlkf jasdkfadsjlkfadsjflkasd jlakds asadksl jdslkfa djslkfads jlkdsajlfkadjlkasklfd
            </div>

            <div className={styles.like__container2}>
                 <icon><FontAwesomeIcon icon={faThumbsUp}/></icon>
            </div>
        </div>
    )
}

export default DetailCommunity;