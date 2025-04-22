import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calendar from '/svg/calendar.svg';

export const DiaryDateСalendar = ({ date, setDate }) => {
  return (
    <div className='flex flex-row items-center gap-4 ml-1'>
      <img
        src={calendar}
        alt="Calendar Icon"
        className="w-5 h-5 cursor-pointer"
        onClick={(e) => {
          // Trigger the calendar dropdown
          e.preventDefault();
          e.stopPropagation();
          document
            .querySelector('.react-datepicker__input-container input')
            .focus();
        }}
      />
      <DatePicker
        dateFormat="dd.MM.yyyy"
        selected={date}
        onChange={(date) => setDate(date)}
        className="text-xl font-bold max-w-[130px]"
      />
    </div>
  );
};
