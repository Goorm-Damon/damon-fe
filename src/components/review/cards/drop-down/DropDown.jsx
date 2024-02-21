// import React, { useState } from 'react'

// const areas = [
//   {
//     id: '1',
//     title: '수정',
//     path: '/services/aboutUs',
//     cName: 'dropdown-link'
//   },
//   {
//     id: '2',
//     title: '카카오로 공유',
//     path: '',
//     cName: 'dropdown-link'
//   },
// ];

// const DropDown = ({setClick, click}) => {

//     const handleClick = () => setClick(!click);

//     return (
//         <>
//             <ul onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
//                 {MenuItems.map((item, index) => {
//                     return (
//                         <li key={index}>
//                             <Link className={item.cName} to={item.path} onClick={() => setClick(false)}>
//                                 {item.title}
//                             </Link>
//                         </li>
//                     );
//                 })}
//             </ul>
//         </>
//     );
// }

// export default DropDown