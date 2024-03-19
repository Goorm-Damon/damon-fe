import React from 'react';
import classes from './CommunityLists.module.scss';
import CommunityList from './CommunityList';

const CommunityLists = ({ backendData }) => {
  // Dummy data from the API specification
  const DUMMY_COMMUNITYLISTS = [
    {
      communityId: 0,
      title: 'Community 1',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 1',
      memberImage: 'dummy_image_url_1.jpg',
      createdDate: '2024-03-19T04:07:46.629Z',
      type: '번개',
      views: 10,
    },
    {
      communityId: 1,
      title: 'Community 2',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 2',
      memberImage: 'dummy_image_url_2.jpg',
      createdDate: '2024-03-19T04:07:46.629Z',
      type: '자유',
      views: 20,
    },
    {
      communityId: 2,
      title: 'Community 3',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 3',
      memberImage: 'dummy_image_url_3.jpg',
      createdDate: '2024-03-19T04:07:46.629Z',
      type: '번개',
      views: 15,
    },
    {
      communityId: 3,
      title: 'Community 4',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 4',
      memberImage: 'dummy_image_url_4.jpg',
      createdDate: '2024-03-19T04:07:46.629Z',
      type: '자유',
      views: 25,
    },
    {
      communityId: 4,
      title: 'Community 5',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 5',
      memberImage: 'dummy_image_url_5.jpg',
      createdDate: '2024-03-19T04:07:46.629Z',
      type: '번개',
      views: 18,
    },
  ];

  return (
    <div className={classes.CommunityLists}>
      <ul className={classes.list}>
        {backendData && backendData.content && backendData.content.length > 0 ? (
          backendData.content.map((data) => (
            <li key={data.communityId}>
              <CommunityList data={data} />
            </li>
          ))
        ) : (
          DUMMY_COMMUNITYLISTS.map((data) => (
            <li key={data.communityId}>
              <CommunityList data={data} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CommunityLists;