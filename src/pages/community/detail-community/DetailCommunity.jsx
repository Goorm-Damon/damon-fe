import React, {useEffect, useState} from 'react';
import styles from './Detail.module.scss';
import { faAngleLeft, faHeart, faComment, faThumbsUp, faPen, faTrash, faReply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from 'react-router-dom';
import * as communityService from '../../../apis/services/communityService'
import { useRecoilState } from 'recoil';
import { communityInfoState } from '../../../states/community/communityState';
import HTMLReactParser from 'html-react-parser';
import { userInfostate } from '../../../states/user/userInfoState';

const DetailCommunity = () => {
    const navigate = useNavigate();
    const maxLength = 100; //댓글 최대 길이
    const [comment, setComment] = useState('');
    const communityId = useLocation().state.communityId;
    const [communityInfo, setCommunityInfo] = useRecoilState(communityInfoState);
    const [userInfo, setUserInfo] = useRecoilState(userInfostate);

    const fetchDetailCommunity = async () => {
        try {
            const response = await communityService.getDetailCommunity(communityId);
            setCommunityInfo(response.data.data);
            console.log(communityInfo, communityId);
        } catch (error) {
            console.log(error);
        }
    }
    //입력 댓글 data setComment 
    const handleComment = (e) => {
        const { value } = e.target;
        setComment(value);
    }
    
    console.log(userInfo);
    useEffect(() => {
        fetchDetailCommunity();
    }, []);
    return(
        <div className={styles.page}>
            <div className={styles.back__button}>
                <p> <FontAwesomeIcon icon={faAngleLeft} /> 뒤로가기</p>
            </div>

            <div className={styles.img__section}>
                <img className={styles.img__container} src={communityInfo.memberImage}></img>
                <span className={styles.id__container}>
                    {communityInfo.memberName}
                </span>
                <span className={styles.sub__span}>
                    N일전 
                    <span> 조회수 {communityInfo.views}회</span>
                </span>
            </div>

            <div className={styles.title__container}>
                {communityInfo.title}
            </div>
            <div className={styles.like__container}>
                <FontAwesomeIcon icon={faHeart} style={{color: "#ff0000",}} /> 
                <span>{communityInfo.likes.length}</span>
            </div>
            <div className={styles.comment__container}>
                <FontAwesomeIcon icon={faComment} style={{color: "#74C0FC",}} />
                <span>{communityInfo.comments.length}</span>
            </div>
            
            <div className={styles.content__container}>
                {HTMLReactParser(communityInfo.content)}
            </div>

            <div className={styles.like__container2}>
                 <icon><FontAwesomeIcon icon={faThumbsUp}/></icon>
            </div>

            <div className={styles.list__container} onClick={()=>navigate('/community')}>
                <div className={styles.box}>
                    <span>목록으로</span>
                </div>
            </div>

            <div className={styles.list__container2} onClick={()=>navigate('/community')}>
                <div className={styles.box}>
                    <span>수정하기</span>
                </div>
            </div>

            <div className={styles.commnet__div}>
                <span className={styles.comment__span}>
                <FontAwesomeIcon icon={faComment} style={{color: "#74C0FC",}} />
                    &nbsp;댓글
                </span>

                <textarea className={styles.comment__box} placeholder=
                '개인정보를 요청하거나, 명예훼손, 무단 광고, 불법 정보 유출 시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 당사자에게 있습니다.'
                value={comment}
                onChange={handleComment}
                maxLength={maxLength}
                />

                <span className={styles.comment__limit}>{comment.length}/100</span>

                <div className={styles.comment__reg__container}>
                    <div className={styles.box}>
                        <span>등록하기</span>
                    </div>
                </div>
            </div>
            

            <div className={styles.myComment__container}>
                <section className={styles.comment__div}>
                    <img src=''/>
                    <span>아이디</span>
                    <div className={styles.myComment__update}>
                        <FontAwesomeIcon icon={faPen} style={{color: "#adbad2",}} />
                        <span>수정</span>
                    </div>

                    <div className={styles.myComment__delete}><FontAwesomeIcon icon={faTrash} style={{color: "#adbad2",}} />
                        <span>삭제</span>
                    </div>

                    <div className={styles.myComment__reply}><FontAwesomeIcon icon={faReply} style={{color: "#adbad2",}} />
                        <span>답글</span>
                    </div>

                    <span className={styles.myComment__comment}>asfadsfadsfadf</span>

                    <span className={styles.myComment__regdate}>2024-03-25</span>

                    <div className={styles.myComment__line}/>
                </section>

                {/* <section className={styles.comment__div}>
                    <img src=''/>
                    <span>아이디</span>
                    <div className={styles.myComment__update}><FontAwesomeIcon icon={faPen} style={{color: "#adbad2",}} />
                        <span>수정</span>
                    </div>

                    <div className={styles.myComment__delete}><FontAwesomeIcon icon={faTrash} style={{color: "#adbad2",}} />
                        <span>삭제</span>
                    </div>

                    <div className={styles.myComment__reply}><FontAwesomeIcon icon={faReply} style={{color: "#adbad2",}} />
                        <span>답글</span>
                    </div>

                    <span className={styles.myComment__comment}>asfadsfadsfadf</span>

                    <span className={styles.myComment__regdate}>2024-03-25</span>

                    <div className={styles.myComment__line}/>
                </section> */}

                

                
            </div>
            
            
                
            
            
        </div>
    )
}

export default DetailCommunity;