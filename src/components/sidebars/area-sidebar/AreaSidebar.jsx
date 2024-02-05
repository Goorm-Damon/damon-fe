import React from 'react'
import styles from './AreaSidebar.module.scss'

const areas = [
  { value: 'ALL', label: "전체" },
  { value: 'GAPYEONG', label: "가평" },
  { value: 'GANGWON', label: "강원" },
  { value: 'GEYONGGI', label: "경기" },
  { value: 'INCHEON', label: "인천" },
  { value: 'SEOUL', label: "서울" },
  { value: 'CHUNGCHEONG', label: "충청" },
  { value: 'GYEONGSANG', label: "경상" },
  { value: 'JEOLLLA', label: "전라" },
  { value: 'JEJU', label: "제주" },
];

const AreaSidebar = ({setArea,area}) => {

  const handleClickedArea = (area) => {
    setArea(area);
  }

  return (
    <div className={styles.area__sidebar}>
      {areas.map((item, i) => (
        <div key={item.value} 
        className={`${styles.area__labels} ${item.value === area ? styles.btnActive : ""}`}
        onClick={(e)=>handleClickedArea(item.value)}
        >
          {item.label}
        </div>
      
      ))}
    </div>
  )
}

export default AreaSidebar