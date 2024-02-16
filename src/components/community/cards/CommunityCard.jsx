import React, { useEffect, useState } from 'react'
import styles from './CommunityCard.module.scss'
import * as communityService from '../../../apis/services/communityService';
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const CommunityCard = ({ data }) => {

  const [contents, setContents] = useState(
    {
    communityId: 0,
    memberId: 0,
    memberName: "",
    memberImage: "",
    createdDate: "",
    type: "",
    title: "",
    content: "",
    views: 0,
    images: [],
    likes: [],
    comments: []
    });
  // const [contents, setContents] = useState({});

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
            {data.title && (data.title.length > 20 ? data.title.slice(0, 20) + "..." : data.title)}
          </div>
          {/* <div className={styles.content}>
            {data.content > 10 ? contents.content.slice(0, 10) + "..." : contents.content}
          </div> */}
        </div>

        <div className={styles.reaction}>
          <p><FaHeart color='#F05D67'/> {contents.comments & contents.comments.length}</p>
          <p><FaComment color='#5996DD'/> {contents.likes && contents.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default CommunityCard