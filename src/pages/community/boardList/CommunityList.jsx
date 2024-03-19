import React from 'react';
import classes from './CommunityList.module.scss';

const CommunityList = ({ data }) => {
  return (
    <div className={classes.CommunityList} key={data.communityId}>
      <div className={classes.title}>
        {/* Display community title */}
        {data.title}
      </div>
      <div className={classes.details}>
        {/* Display member name and image */}
        <div className={classes.member}>
          <img src={data.memberImage} alt={data.memberName} className={classes.memberImage} />
          <p className={classes.memberName}>{data.memberName}</p>
        </div>
        {/* Display created date */}
        <p className={classes.createdDate}>Created: {new Date(data.createdDate).toLocaleDateString()}</p>
        {/* Display community type */}
        <p className={classes.type}>Type: {data.type}</p>
        {/* Display views count */}
        <p className={classes.views}>Views: {data.views}</p>
      </div>
      <div className={classes.reaction}>
        {/* Display like count */}
        <p>Like Count: {data.likesCount}</p>
        {/* Display comment count */}
        <p>Comment Count: {data.commentsCount}</p>
      </div>
    </div>
  );
};

export default CommunityList;