import React, { useState } from 'react';
import CommunityList from './CommunityList';
import classes from './CommunityLists.module.scss';

const DUMMY_COMMUNITYLISTS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

const CommunityLists = () => {
  const [showCommunityLists, setShowCommunityLists] = useState(true);

  const toggleCommunityListsHandler = () => {
    setShowCommunityLists((curState) => !curState);
  };

  const CommunityListsList = (
    <ul>
      {DUMMY_COMMUNITYLISTS.map((data) => (
        <CommunityList key={data.communityId} data={data} />
      ))}
    </ul>
  );

  return (
    <div className={classes.CommunityLists}>
      <button onClick={toggleCommunityListsHandler}>
        {showCommunityLists ? 'Hide' : 'Show'} CommunityLists
      </button>
      {showCommunityLists && CommunityListsList}
    </div>
  );
};

export default CommunityLists;