import React, { useEffect, useState } from 'react'
import styles from './CommunityCard.module.scss'
import * as communityService from '../../../apis/services/communityService';
import { TbMessageCircle } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";

const CommunityCard = ({ data }) => {

  const [contents, setContents] = useState([]);

  const fetchDetailCommu = async () => {
    try {
      const response = await communityService.getDetailCommunity(data.communityId);
      setContents(response.data.data);
      console.log("contents", contents);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDetailCommu();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.card__contents}>
          <div className={styles.title}>
            {data.title && (data.title.length > 10 ? data.title.slice(0, 10) + "..." : data.title)}
          </div>
          <div className={styles.content}>
            {contents.content.length > 10 ? contents.content.slice(0, 10) + "..." : contents.content}
          </div>
        </div>

        <div className={styles.reaction}>
          <p><TbMessageCircle /></p>{contents.likes && contents.likes.length}
          <p><CiHeart /></p>{contents.comments & contents.comments.length}
        </div>
      </div>
      <hr />
    </div>
  )
}

export default CommunityCard