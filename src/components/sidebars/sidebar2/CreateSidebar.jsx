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