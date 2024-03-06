import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './DropDown.module.scss'

const MenuItems = [
  {
    id: '1',
    title: '수정',
    path: '/edit',
    cName: 'dropdown-edit'
  },
  {
    id: '1',
    title: '삭제',
    path: '/services/aboutUs',
    cName: 'dropdown-delete'
  },
  {
    id: '2',
    title: '카카오로 공유',
    path: '',
    cName: 'dropdown-share'
  },
];

const DropDown = () => {

  return (
    <>
      <ul className={styles.dropdown__menu}>
        <li className={styles.menu_edit}>수정</li>
        <li className={styles.menu_dele}>삭제</li>
      </ul>
    </>
  );
}

export default DropDown