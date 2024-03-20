import React, {useState, useNavigate} from 'react';
import styles from './Register.module.scss'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsPlusCircleDotted } from "react-icons/bs";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import * as communityService from '../../../apis/services/communityService'

const Register = () => {
    const navigate = useNavigate();
    const [postImg, setPostImg] = useState([]);
    const [previewImg, setPreviewImg] = useState([]);
    const [communityInfo, setCommunityInfo] = useState({
        title: "",
        type: null,
        content: "",
        image: []
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommunityInfo(prev => ({ ...prev, [name]: value }));
    };


    const onChangeUploadFile = (e) => {

        const files = Array.from(e.target.files); // Convert FileList to array
        setPostImg(files);
        const fileUrls = [];
    
        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (e) => {
            fileUrls.push(e.target.result); // Add the file URL to the array
            if (fileUrls.length === files.length) { // Check if all files are read
              setPreviewImg(fileUrls); // Update the state with all file URLs
            }
          };
          reader.readAsDataURL(file); // Start reading the file
        });
      }

    const handleSubmit = () => {
      
      if (postImg) {
        postImg.forEach((file) => {
        setCommunityInfo(prev => ({ ...prev, image: file}))  
        })
      } 
      communityInfo.image = postImg;
      const response = communityService.createCommunity(communityInfo);
      if (response.success) {
        alert("커뮤니티 등록되었습니다.");
        navigate('/');
      }
    }

    const imgcheck = () => {
      console.log(communityInfo)
    }

    return (
        <div className={styles.page}>
            <div className={styles.back__button}>
                <p> <FontAwesomeIcon icon={faAngleLeft} /> 뒤로가기</p>
            </div>

            <div className={styles.community__header}>커뮤니티 게시글 등록</div>
            
            <div className={styles.select__community}>
                <p>게시판 선택</p>
            </div>

            <div className={styles.bungae__container}>
                <box><icon>번개</icon></box>
            </div>

            <div className={styles.notice__container}>
                <box><icon>자유</icon></box>
            </div>

            <div className={styles.title__container}>
                <span>제목</span>
                <input onChange={handleInputChange} name="title" value={communityInfo.title} className={styles.title__box} placeholder='20자 내외로 제목을 입력해 주세요'></input>
            </div>

            <div className={styles.img__container}>
                <span>이미지 추가하기</span>

                <div className={styles.preview__images}>
                    <label htmlFor="imgs">
                        <div>
                        <BsPlusCircleDotted />
                        </div>
                    </label>
                    <input accept=".png, .svg, .jpeg, .jpg" type="file"
                id='imgs'
                multiple
                onChange={onChangeUploadFile}
              />
              {
                previewImg.map((imgSrc, i) =>
                  <div key={i}>
                    {/* <button type="button">
                  <img alt="업로드 이미지 제거" src="src/assets/icon-close-button.svg" />
                </button> */}
                    <img alt={imgSrc} src={imgSrc} />
                  </div>
                )
              }
                </div>
            </div>

            <div className={styles.content__container}>
                <span>내용</span>
                <CKEditor
                    className={styles.editor}
                    editor={ClassicEditor}
                    name="content"
                    onChange={(event, editor) => {
                    const data = editor.getData();
                    setCommunityInfo(prev => ({ ...prev, content: data }));
              }}
            />
            </div>

            <div className={styles.apply__container} onClick={handleSubmit}>
              <div><span>등록하기</span></div>
            </div>
        
        </div>

        
    )
}

export default Register;