import React from 'react';
import classes from './CommunityList.module.scss';// Make sure the file name is correct

const CommunityList = (props) => {
  return <li className={classes.CommunityList}>{props.name}</li>;
};

export default CommunityList;