import React from 'react';
import classes from './CommunityList.module.scss';

const CommunityList = ({ data }) => {
  return (
    <div className={classes.CommunityList} key={data.communityId}>
      <div className={classes['title']}>
        {data.title &&
          (data.title.length > 20 ? data.title.slice(0, 20) + '...' : data.title)}
      </div>
      <div className={classes['reaction']}>
        <p>Like Count: {data.likes && data.likes.length}</p>
        <p>Comment Count: {data.comments && data.comments.length}</p>
      </div>
    </div>
  );
};

export default CommunityList;