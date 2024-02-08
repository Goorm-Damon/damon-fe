import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './ReviewCreate.module.scss'; // SCSS 파일을 임포트합니다.

const ReviewCreate = () => {
  // 생략된 상태 관리 및 핸들러 함수들 ...

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="text-input"
          />
        </div>

        <div className="date-picker-container">
          <div>
            <label>Start Date:</label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => handleDateChange('startDate', date)}
              className="date-input"
            />
          </div>

          <div>
            <label>End Date:</label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => handleDateChange('endDate', date)}
              className="date-input"
            />
          </div>
        </div>

        <div className="select-container">
          <label>Region:</label>
          <Select
            value={formData.region}
            onChange={handleSelectChange}
            options={[
              { value: 'asia', label: 'Asia' },
              { value: 'europe', label: 'Europe' },
              // 추가 지역 옵션
            ]}
            classNamePrefix="select"
          />
        </div>

        <div className="input-group">
          <label>Total Cost:</label>
          <input
            type="number"
            name="totalCost"
            value={formData.totalCost}
            onChange={handleInputChange}
            className="number-input"
          />
        </div>

        <div className="input-group">
          <label>Recommended Places:</label>
          <input
            type="text"
            name="recommendedPlaces"
            value={formData.recommendedPlaces}
            onChange={handleInputChange}
            className="text-input"
          />
        </div>

        <div className="image-upload-container">
          <label>Images:</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="file-input"
          />
        </div>

        <div className="input-group">
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="textarea-input"
          />
        </div>

        <div className="button-container">
          <button type="submit" className="submit">Submit</button>
          <button type="button" className="cancel">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewCreate;
