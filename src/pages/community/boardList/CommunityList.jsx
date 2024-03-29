import React from 'react';
import styles from './CommunityList.module.scss';

const CommunityList = ({ communityData, onMemberImageClick }) => {
  const handleClick = () => {
    if (typeof onMemberImageClick === 'function') {
      onMemberImageClick(communityData.memberName);
    }
  };

  return (
    <div className={styles.communityList} key={communityData.communityId}>
      <div className={styles.title}>
        {/* Display community title */}
        {communityData.title}
      </div>
      <div className={styles.details}>
        {/* Display member name and image */}
        <div className={styles.member} onClick={handleClick}> {/* Handle click event */}
          <img src={communityData.memberImage} alt={communityData.memberName} className={styles.memberImage} />
          <p className={styles.memberName}>{communityData.memberName}</p>
        </div>
        <div className={styles.messagePreview}>{communityData.message.slice(0, 25)}</div>
        {/* Display created date */}
        <p className={styles.createdDate}>Created: {new Date(communityData.createdDate).toLocaleDateString()}</p>
        {/* Display community type */}
        <p className={styles.type}>Type: {communityData.type}</p>
        {/* Display views count */}
        <p className={styles.views}>Views: {communityData.views}</p>
        {/* Display message preview */}
      </div>
      <div className={styles.reaction}>
        {/* Display like count */}
        <p>Like Count: {communityData.likesCount}</p>
        {/* Display comment count */}
        <p>Comment Count: {communityData.commentsCount}</p>
      </div>
    </div>
  );
};

export default CommunityList;