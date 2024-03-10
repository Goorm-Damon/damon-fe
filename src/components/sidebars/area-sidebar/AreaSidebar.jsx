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

const img_url = {
  'ALL': 'regions-img/all.svg',
  'GAPYEONG': 'regions-img/gapyeong.svg',
  'GANGWON': 'regions-img/gangwon.svg',
  'GEYONGGI': 'regions-img/geyonggi.svg',
  'INCHEON': 'regions-img/incheon.svg',
  'SEOUL': 'regions-img/seoul.svg',
  'CHUNGCHEONG': 'regions-img/chungcheon.svg',
  'GYEONGSANG': 'regions-img/gyeongsang.svg',
  'JEOLLLA': 'regions-img/jeolla.svg',
  'JEJU': 'regions-img/jeju.svg',
};

const AreaSidebar = ({ setArea, area }) => {

  const handleClickedArea = (area) => {
    setArea(area);
  }

  return (
    <div className={styles.area__sidebar}>
      {areas.map((item, i) => (
        <div key={item.value}
          className={`${styles.img__out} ${item.value === area ? styles.btnActive : ""}`}
          onClick={(e) => handleClickedArea(item.value)}
        >
          <div className={styles.img__container}>
            <img src={img_url[item.value]} />
            <div className={styles.labels}>
            {item.label}
          </div>
          </div>
        </div>

      ))}
    </div>
  )
}

export default AreaSidebar