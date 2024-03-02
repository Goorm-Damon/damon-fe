import React, { useEffect, useState } from 'react'
import styles from './DetailSidebar.module.scss'
import CreateDays from '../../calendar/create-days/CreateDays'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { calendarInfoState, clickedDateState, computeDateState, filteredTravelsSelector } from '../../../states/calendar/calendarInfoState';
import ShowCalendar from '../../calendar/show-calendar/ShowCalendar';
import { headerState } from '../../../states/header/headerState';
import * as calendarService from '../../../apis/services/calendarService';

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


const DetailSidebar = ({ showModal, places, setSearchPlace, setPlaceInfo, placeInfo }) => {

  const clickedDate = useRecoilValue(clickedDateState);
  const computeDate = useRecoilValue(computeDateState);
  const [inputText, setInputText] = useState("");
  const filteredTravels = useRecoilValue(filteredTravelsSelector);
  const [calendarInfo, setCalendarInfo] = useRecoilState(calendarInfoState);
  const setFilteredTravels = useSetRecoilState(filteredTravelsSelector);
  const [headerSettings, setHeaderSettings] = useRecoilState(headerState);
  const { showDefalut, showFeatures, showDetail, showModify } = headerSettings;

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPlace(inputText);
    setInputText("");
  };

  const handleModal = (item) => {
    setPlaceInfo({
      ...placeInfo,
      locationName: item.place_name,
      latitude: item.x,
      longitude: item.y,
      day: clickedDate,
    })
    showModal();
  }

  const handleEnd = (result) => {
    // 목적지가 없으면(이벤트 취소) 이 함수를 종료합니다.
    if (!result.destination) return;
  
    // 드래그 앤 드롭으로 순서가 변경된 새로운 배열 생성
    const newTravels = Array.from(calendarInfo.travels);
    // 변경시키는 아이템을 배열에서 임시로 제거
    const [reorderedItem] = newTravels.splice(result.source.index, 1);
    // 아이템을 새 위치에 삽입
    newTravels.splice(result.destination.index, 0, reorderedItem);
  
    // 바뀐 인덱스를 바탕으로 각 travel의 ordernum을 업데이트
    const updatedTravels = newTravels.map((travel, index) => ({
      ...travel,
      order: index // ordernum을 업데이트. 여기서는 1부터 시작하는 인덱스로 설정
    }));
  
    // 변경된 travels 배열로 calendarInfoState를 업데이트
    setCalendarInfo({
      ...calendarInfo,
      travels: updatedTravels
    });
  };
  
  useEffect(()=> {
    console.log(filteredTravels);
  },[clickedDate])

  return (
    <div className={styles.container}>
      <section className={styles.selecDay}>
        <div className={styles.dayContainer}>
          {[...Array(parseInt(computeDate + 1))].map((n, index) => {
            return <CreateDays key={index + 1} index={index} />
          })}
        </div>
      </section>
      <section className={styles.funcSide}>
        <div className={styles.addShow__btn}>
          일정 보기
        </div>
        {!(showModify && showDetail) ?
        <div className={styles.Calendar__Container}>
          {filteredTravels && filteredTravels.map((calendar, index) => {
            return <ShowCalendar key={index} calendar={calendar} index={index+1} showModal={showModal} setPlaceInfo={setPlaceInfo} placeInfo={placeInfo} />
          })}
          {filteredTravels && filteredTravels.length === 0 &&
            <div className={styles.no_calendar}>
              <p>일정이 없습니다. 추가해 보세요.</p>
            </div>
          }
        </div>
        :
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="calendars">
          {(provided) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.Calendar__Container}
            >
              {filteredTravels.map((calendar, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        // 적용할 커스텀 스타일
                      }}
                    >
                      <ShowCalendar
                        calendar={calendar}
                        index={index + 1}
                        showModal={showModal}
                        setPlaceInfo={setPlaceInfo}
                        placeInfo={placeInfo}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {filteredTravels && filteredTravels.length === 0 &&
            <div className={styles.no_calendar}>
              <p>일정이 없습니다. 추가해 보세요.</p>
            </div>
          }
            </div>
          )}
        </Droppable>
      </DragDropContext>
      }
      </section>
    </div>
  )
}

export default DetailSidebar