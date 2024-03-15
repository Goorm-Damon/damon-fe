import { useState } from 'react';
import CommunityList from './CommunityList';

import classes from './CommunityLists.module.scss'; // Make sure the file name is correct

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
      {DUMMY_COMMUNITYLISTS.map((user) => (
        <CommunityList key={user.id} name={user.name} />
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