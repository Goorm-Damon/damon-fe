import React, { useEffect, useState } from 'react'
import styles from './CreateSidebar.module.scss'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { calendarInfoState, clickedDateState, computeDateState, filteredTravelsSelector } from '../../../states/calendar/calendarInfoState';
import CreateDays from './../../calendar/create-days/CreateDays';
import ShowCalendar from '../../calendar/show-calendar/ShowCalendar';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const CreateSidebar = ({ setSearchPlace, places, showModal, setPlaceInfo, placeInfo }) => {

  const clickedDate = useRecoilValue(clickedDateState);
  const computeDate = useRecoilValue(computeDateState);
  const [inputText, setInputText] = useState("");
  const [calendars, setCalendars] = useState([]);

  const filteredTravels = useRecoilValue(filteredTravelsSelector);
  const setFilteredTravels = useSetRecoilState(filteredTravelsSelector);
  const [calendarInfo, setCalendarInfo] = useRecoilState(calendarInfoState);

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
      latitude: item.y,
      longitude: item.x,
      day: clickedDate,
    })
    showModal();
  }

  const handleEnd = (result) => {
    if (!result.destination) return; // 목적지가 없으면 함수 종료
  
    // 드래그 앤 드롭으로 순서 변경
    const newFilteredTravels = Array.from(filteredTravels);
    const [reorderedItem] = newFilteredTravels.splice(result.source.index, 1);
    newFilteredTravels.splice(result.destination.index, 0, reorderedItem);
  
    // 변경된 순서로 order 업데이트
    const updatedFilteredTravels = newFilteredTravels.map((travel, index) => ({
      ...travel,
      order: index
    }));
  
    // 기존 travels에서 해당 day의 항목을 제거
    const remainingTravels = calendarInfo.travels.filter(travel => travel.day !== clickedDate);
  
    // updatedFilteredTravels를 remainingTravels에 삽입
    const updatedTravels = [...remainingTravels, ...updatedFilteredTravels].sort((a, b) => {
      if (a.day === b.day) {
        return a.order - b.order; // 같은 day 내에서는 order 순으로 정렬
      }
      return a.day - b.day; // 다른 day는 day 순으로 정렬
    });
  
    // 변경된 travels 배열로 calendarInfoState 업데이트
    setCalendarInfo(prev => ({
      ...prev,
      travels: updatedTravels
    }));
  };
  

  const handleDate = () => {
    const currentEndDate = calendarInfo.endDate;
    const nextEndDate = new Date(currentEndDate);
    nextEndDate.setDate(nextEndDate.getDate() + 1);
    setCalendarInfo({ ...calendarInfo, endDate: nextEndDate });
  };

  useEffect(() => {
    setInputText(inputText);

  }, [inputText])


  return (
    <div className={styles.container}>
      <section className={styles.selecDay}>
        <div className={styles.dayContainer}>
          {[...Array(parseInt(computeDate + 1))].map((n, index) => {
            return <CreateDays key={index + 1} index={index} />
          })}
          <button className={styles.plusbtn} onClick={handleDate}>+ 날짜 추가</button>
        </div>
      </section>
      <section className={styles.funcSide}>
        <div className={styles.addShow__btn}>
          일정 보기
        </div>
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
    </section>
    </div >
  )
}

export default CreateSidebar