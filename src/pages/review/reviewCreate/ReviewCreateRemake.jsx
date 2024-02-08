import React, { useState } from 'react';
import './ReviewCreate.module.scss';

export default function ReviewCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);

  const addTag = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  const removeTag = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const submitReview = () => {
    // Submit review logic
    console.log({ title, content, tags });
    // Reset fields after submission
    setTitle('');
    setContent('');
    setTags([]);
  };

  return (
    <div className="review-create">
      <h1 className="title">리뷰 작성하기</h1>
      <div className="input-group">
        <label htmlFor="review-title">제목</label>
        <input
          id="review-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="제목을 작성해주세요."
        />
      </div>
      <div className="input-group">
        <label htmlFor="review-content">내용</label>
        <textarea
          id="review-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 작성해주세요."
        />
      </div>
      <div className="tag-input-group">
        <label>태그</label>
        <input
          onKeyUp={addTag}
          type="text"
          placeholder="태그를 입력하고 Enter를 눌러주세요."
        />
        <div className="tags-display">
          {tags.map((tag, index) => (
            <div key={index} className="tag">
              {tag}
              <button onClick={() => removeTag(index)}>x</button>
            </div>
          ))}
        </div>
      </div>
      <div className="button-group">
        <button onClick={submitReview} className="submit-button">
          등록하기
        </button>
      </div>
    </div>
  );
}