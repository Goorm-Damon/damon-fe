import React, {useEffect, useState } from 'react';
import classes from './CommunityLists.module.scss';
import CommunityList from './CommunityList';
import Listchat from '../Listchat/Listchat'; // Import Listchat component

const CommunityLists = ({ backendData, communityType, sortByLatest, currentPage, setCurrentPage }) => {
  const DUMMY_COMMUNITYLISTS = [
    {
      communityId: 0,
      title: 'Community 1',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 1',
      memberImage: 'dummy_image_url_1.jpg',
      createdDate: '2024-03-26T10:30:00.000Z', // Updated timestamp for sorting
      type: '번개',
      views: 10,
      message: '가나다나라마바사가나다나라마바사가나다나라마바사가나다나라마바사',
    },
    {
      communityId: 1,
      title: 'Community 2',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 2',
      memberImage: 'dummy_image_url_2.jpg',
      createdDate: '2024-03-23T09:45:00.000Z', // Updated timestamp for sorting
      type: '자유',
      views: 20,
      message: '가나다나라마바사가나다나라마바사가나다나라마바사',
    },
    {
      communityId: 2,
      title: 'Community 3',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 3',
      memberImage: 'dummy_image_url_3.jpg',
      createdDate: '2024-03-22T09:00:00.000Z', // Updated timestamp for sorting
      type: '번개',
      views: 15,
      message: '가나다나라마바사가나다나라마바사가나다나라마바사',
    },
    {
      communityId: 3,
      title: 'Community 4',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 4',
      memberImage: 'dummy_image_url_4.jpg',
      createdDate: '2024-03-20T08:15:00.000Z', // Updated timestamp for sorting
      type: '자유',
      views: 25,
      message: '가나다나라마바사가나다나라마바사가나다나라마바사',
    },
    {
      communityId: 4,
      title: 'Community 5',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 5',
      memberImage: 'dummy_image_url_5.jpg',
      createdDate: '2024-03-24T07:30:00.000Z', // Updated timestamp for sorting
      type: '번개',
      views: 18,
      message: '가나다나라마바사가나다나라마바사가나다나라마바사',
    },
    {
      communityId: 5,
      title: 'Community 6',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 5',
      memberImage: 'dummy_image_url_5.jpg',
      createdDate: '2024-03-23T06:45:00.000Z', // Updated timestamp for sorting
      type: '번개',
      views: 18,
      message: '가나다나라마바사가나다나라마바사가나다나라마바사',
    },
    {
      communityId: 6,
      title: 'Community 7',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 5',
      memberImage: 'dummy_image_url_5.jpg',
      createdDate: '2024-03-22T06:00:00.000Z', // Updated timestamp for sorting
      type: '번개',
      views: 18,
      message: '가나다나라마바사가나다나라마바사가나다나라마바사',
    },
    {
      communityId: 7,
      title: 'Community 8',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 5',
      memberImage: 'dummy_image_url_5.jpg',
      createdDate: '2024-03-21T05:15:00.000Z', // Updated timestamp for sorting
      type: '번개',
      views: 18,
      message: '가나다나라마바사가나다나라마바사가나다나라마바사',
    },
    {
      communityId: 8,
      title: 'Community 9',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 5',
      memberImage: 'dummy_image_url_5.jpg',
      createdDate: '2024-03-19T04:30:00.000Z', // Updated timestamp for sorting
      type: '번개',
      views: 18,
      message: '가나다나라마바사가나다나라마바사가나다나라마바사',
    },
    {
      communityId: 9,
      title: 'Community 10',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 5',
      memberImage: 'dummy_image_url_5.jpg',
      createdDate: '2024-03-18T03:45:00.000Z', // Updated timestamp for sorting
      type: '번개',
      views: 18,
      message: '가나다나라마바사가나다나라마바사가나다나라마바사',
    },
    {
      communityId: 10,
      title: 'Community 11',
      likesCount: 0,
      commentsCount: 0,
      memberName: 'Dummy Member 5',
      memberImage: 'dummy_image_url_5.jpg',
      createdDate: '2024-03-16T03:00:00.000Z', // Updated timestamp for sorting
      type: '번개',
      views: 18,
      message: '가나다나라마바사가나다나라마바사가나다나라마바사',
    },
  ];

  const listsPerPage = 3;
  const [filteredData, setFilteredData] = useState([]);
  const [showListChat, setShowListChat] = useState(false); // State to manage Listchat visibility
  const [selectedMemberName, setSelectedMemberName] = useState(''); // State to store selected member name

  useEffect(() => {
    // Filter community data based on communityType
    if (communityType === '전체') {
      setFilteredData(backendData?.data?.content || DUMMY_COMMUNITYLISTS);
    } else {
      setFilteredData(
        (backendData?.data?.content || DUMMY_COMMUNITYLISTS).filter(
          (item) => item.type === communityType
        )
      );
    }
  }, [backendData, communityType]);

  useEffect(() => {
    // Sort data by createdDate when sortByLatest changes
    if (sortByLatest) {
      const sortedData = [...filteredData];
      sortedData.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      setFilteredData(sortedData);
    }
  }, [sortByLatest, filteredData]); // Adding filteredData as dependency

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMemberImageClick = (memberName) => {
    setSelectedMemberName(memberName); // Set selected member name
    setShowListChat(true); // Show Listchat component
  };

  const renderCommunityLists = () => {
    const startIndex = (currentPage - 1) * listsPerPage;
    const endIndex = startIndex + listsPerPage;
    const currentPageData = filteredData.slice(startIndex, endIndex);

    return currentPageData.map((data) => (
      <li key={data.communityId}>
        <CommunityList data={data} onMemberImageClick={handleMemberImageClick} />
      </li>
    ));
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(filteredData.length / listsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`${classes.pageNumber} ${currentPage === i && classes.activePage}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={classes.CommunityLists}>
      {showListChat && (
        <div className={classes.listChatWrapper}> {/* Wrapper to position Listchat */}
          <Listchat userName={selectedMemberName} />
        </div>
      )}
      <ul className={classes.list}>
        {renderCommunityLists()}
      </ul>
      <div className={classes.pagination}>
        {renderPageNumbers()}
      </div>
    </div>
  );
};

export default CommunityLists;

